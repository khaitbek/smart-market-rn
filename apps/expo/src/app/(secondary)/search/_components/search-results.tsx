import { useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { Paragraph, YStack } from "tamagui";

import { CategoryList } from "~/app/(primary)/category";
import { CatalogGroupLoader } from "~/components/loaders/category";
import { ProductLoader } from "~/components/loaders/product";
import { EmptySearch } from "~/components/ui/empty-search";
import { MyStack } from "~/components/ui/my-stack";
import { SearchProductList } from "~/components/ui/product-grid";
import { useLangStore } from "~/store/lang-store";
import { deepSearchProducts, searchCatalogs } from "~/utils/api-utils";

export function SearchPageResults() {
  const { lang } = useLangStore();
  const { deep_search } = useGlobalSearchParams();
  const { data, isLoading, mutate } = useMutation({
    mutationKey: ["deepsearch"],
    mutationFn: async (searchString: string) => {
      console.log({
        deepSearchInsideQuery: searchString,
      });
      if (!searchString)
        return {
          products: [],
          catalogs: [],
        };
      const products = await deepSearchProducts({
        query: searchString,
      });
      const catalogs = await searchCatalogs({
        lang,
        query: searchString,
      });
      return {
        products,
        catalogs,
      };
    },
    cacheTime: 60,
  });
  useEffect(() => {
    mutate(deep_search as string);
  }, [deep_search]);
  if (isLoading)
    return (
      <MyStack>
        <CatalogGroupLoader childCount={10} />
        <ProductLoader childCount={10} />
      </MyStack>
    );

  return (
    <MyStack>
      {!!deep_search && !!data?.catalogs && (
        <YStack gap={48}>
          <Paragraph>
            Category results for
            <Paragraph color="crimson"> {deep_search}</Paragraph>
          </Paragraph>
          {data.catalogs.length === 0 && <EmptySearch />}
        </YStack>
      )}
      <CategoryList marginBottom="$6" categories={data?.catalogs ?? []} />
      {!!deep_search && !!data?.products && (
        <YStack gap={48}>
          <Paragraph>
            Product results for{" "}
            <Paragraph color="crimson">{deep_search}</Paragraph>
          </Paragraph>
          {data.products.length === 0 && <EmptySearch />}
        </YStack>
      )}
      <SearchProductList products={data?.products ?? []} />
    </MyStack>
  );
}
