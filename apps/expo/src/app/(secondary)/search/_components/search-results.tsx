import { useGlobalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { MyStack } from "~/components/ui/my-stack";
import { ProductGrid } from "~/components/ui/product-grid";
import { searchProducts } from "~/utils/api-utils";

export function SearchPageResults() {
  const { query } = useGlobalSearchParams();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["product", "search"],
    queryFn: async () => searchProducts(query as string),
  });
  return (
    <MyStack>
      <ProductGrid
        products={data ?? []}
        seeAllButtonPath="/"
        title="Results"
        isLoading={isLoading || isRefetching}
      />
    </MyStack>
  );
}
