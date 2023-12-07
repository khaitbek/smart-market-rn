import { useRef } from "react";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { EmptySearch } from "~/components/ui/empty-search";
import { MyStack } from "~/components/ui/my-stack";
import { ProductGrid } from "~/components/ui/product-grid";
import { searchProducts } from "~/utils/api-utils";

export function SearchPageResults() {
  const initialized = useRef(null);
  const { query } = useGlobalSearchParams();
  const { catalogId } = useLocalSearchParams();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["product", "search"],
    queryFn: async () => {
      if (!initialized.current) return [];
      return searchProducts({
        query: query as string,
        category_id: +catalogId!,
        page_size: 50,
      });
    },
  });
  return (
    <MyStack ref={initialized}>
      {!isLoading && data?.length === 0 && <EmptySearch />}
      <ProductGrid
        products={data! ?? []}
        seeAllButtonPath="/"
        title="Results"
        isLoading={isLoading || isRefetching}
      />
    </MyStack>
  );
}
