import { useQuery } from "@tanstack/react-query";

import type { Product } from "~/types/product";
import { getPopularProducts } from "~/utils/api-utils";
import { ProductGrid } from "./product-grid";

export function PopularProducts() {
  const { data: products, isFetching } = useQuery({
    queryKey: ["product", "popular"],
    queryFn: async () => getPopularProducts(6),
    // staleTime: 60 * 1000,
    keepPreviousData: true,
    refetchInterval: 60 * 5000,
  });
  return (
    <ProductGrid
      products={(products?.products as unknown as Product[]) ?? []}
      seeAllButtonPath="/"
      title="Popular"
      isLoading={isFetching}
    />
  );
}
