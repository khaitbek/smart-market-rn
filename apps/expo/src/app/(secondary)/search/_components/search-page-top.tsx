import { useGlobalSearchParams, useRouter } from "expo-router";
import { LmFormRhfProvider, LmInputRhf } from "@tamagui-extras/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Text, useDebounce, XStack, YStack } from "tamagui";
import { z } from "zod";

import { Back } from "~/components/ui/back";
import { searchProducts } from "~/utils/api-utils";
import { HeaderFilterComponent } from "./filter-component";
import { HeaderSortComponent } from "./sort-component";

const schema = z.object({
  query: z.string(),
  sortOrder: z.enum(["asc", "desc"]),
  sortType: z.enum(["popular", "price", "comments", "rating", "sale", "new"]),
});

type SearchPageFormFields = Pick<z.infer<typeof schema>, "query">;

export function SearchPageTop() {
  const { query } = useGlobalSearchParams();
  const { setParams } = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["search", "product"],
    mutationFn: async (q: string) => await searchProducts(q),
    async onSuccess() {
      // queryClient.setQueryData(["product", "search"], {
      //   products: data,
      // });
      await queryClient.invalidateQueries({ queryKey: ["product", "search"] });
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
    <YStack className="px-6 py-4">
      <Back
        alignSelf="flex-start"
        height="$3"
        paddingHorizontal={8}
        marginVertical={8}
      />
      <LmFormRhfProvider<SearchPageFormFields>>
        {({ control, handleSubmit }) => (
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          <Form paddingBottom={12} onSubmit={handleSubmit(() => {})}>
            <LmInputRhf
              onChange={(evt) => {
                setParams({
                  query: evt.nativeEvent.text,
                });
                func(evt.nativeEvent.text);
                // mutate(evt.nativeEvent.text);
              }}
              control={control}
              placeholder="Search..."
              aria-label="Enter your search"
              name="query"
            />
          </Form>
        )}
      </LmFormRhfProvider>
      <XStack gap="$3" alignItems="center">
        <HeaderSortComponent />
        <Text className="flex-1 text-center font-bold">0 products</Text>
        <HeaderFilterComponent />
      </XStack>
    </YStack>
  );
}
