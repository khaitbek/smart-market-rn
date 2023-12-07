import { useGlobalSearchParams, useRouter } from "expo-router";
import { LmFormRhfProvider, LmInputRhf } from "@tamagui-extras/form";
import { useQueryClient } from "@tanstack/react-query";
import { Form, useDebounce, XStack } from "tamagui";
import { z } from "zod";

import { Back } from "~/components/ui/back";

const schema = z.object({
  deep_search: z.string(),
});

type SearchPageFormFields = Pick<z.infer<typeof schema>, "deep_search">;

export function SearchPageTop() {
  const { deep_search } = useGlobalSearchParams();
  const { setParams } = useRouter();
  const queryClient = useQueryClient();

  const func = useDebounce(
    async (deep_search: string) => {
      setParams({
        deep_search: deep_search,
      });
      if (!deep_search) {
        queryClient.setQueryData(["deepsearch"], {
          catalogs: [],
          products: [],
        });
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ["deepsearch"] });
    },
    1000,
    {
      leading: false,
    },
    [deep_search],
  );
  return (
    <XStack padding={16}>
      <Back />
      <LmFormRhfProvider<SearchPageFormFields>>
        {({ control, handleSubmit }) => (
          <Form
            flexGrow={1}
            paddingBottom={12}
            onSubmit={handleSubmit(() => ({}))}
          >
            <LmInputRhf
              width="100%"
              borderColor="#eee"
              onChange={async (evt) => {
                await func(evt.nativeEvent.text);
              }}
              control={control}
              placeholder="Search products and categories"
              aria-label="Search products and categories"
              name="deep_search"
            />
          </Form>
        )}
      </LmFormRhfProvider>
    </XStack>
  );
}
