import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { LmFormRhfProvider, LmInputRhf } from "@tamagui-extras/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, useDebounce, XStack, YStack } from "tamagui";
import { z } from "zod";

import { Back } from "~/components/ui/back";
import { searchProducts } from "~/utils/api-utils";
import { HeaderFilterComponent } from "./filter-component";
import { HeaderSortComponent } from "./sort-component";

const schema = z.object({
  query: z.string(),
});

type SearchPageFormFields = Pick<z.infer<typeof schema>, "query">;

export function SearchPageTop() {
  const queryClient = useQueryClient();
  const { query } = useGlobalSearchParams();
  const { catalogId } = useLocalSearchParams();
  const { setParams } = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["search", "product"],
    mutationFn: async (q: string) =>
      await searchProducts({
        query: q,
        category_id: +catalogId!,
        page_size: 50,
      }),
    async onSuccess(data) {
      await queryClient.invalidateQueries({
        fetchStatus: "fetching",
        queryKey: ["product", "search"],
        exact: true,
      });
      queryClient.setQueryData(["product", "search"], data);
    },
  });
  const func = useDebounce(
    (query: string) => {
      mutate(query);
    },
    1000,
    {
      leading: false,
    },
    [query],
  );
  return (
    <YStack gap={16} padding={16}>
      <XStack>
        <Back />
        <LmFormRhfProvider<SearchPageFormFields>>
          {({ control, handleSubmit }) => (
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <Form flexGrow={1} onSubmit={handleSubmit(() => {})}>
              <LmInputRhf
                onChange={(evt) => {
                  setParams({
                    query: evt.nativeEvent.text,
                  });
                  func(evt.nativeEvent.text);
                }}
                borderColor="#eee"
                width="100%"
                control={control}
                placeholder="Search..."
                aria-label="Enter your search"
                name="query"
              />
            </Form>
          )}
        </LmFormRhfProvider>
      </XStack>
      <XStack gap="$3" alignItems="center" justifyContent="space-between">
        <HeaderSortComponent />
        <HeaderFilterComponent />
      </XStack>
    </YStack>
  );
}
