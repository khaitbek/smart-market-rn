import { useQuery } from "@tanstack/react-query";

import type { Product } from "~/types/product";
import { getLatestProducts } from "~/utils/api-utils";
import { ProductGrid } from "./product-grid";

export function LatestProducts() {
  const { data: products, isFetching } = useQuery({
    queryKey: ["product", "latest"],
    queryFn: async () => getLatestProducts(6),
    keepPreviousData: true,
    refetchInterval: 60 * 5000,
  });
  return (
    <ProductGrid
      products={(products?.products as unknown as Product[]) ?? []}
      seeAllButtonPath="/"
      title="Latest"
      isLoading={isFetching}
    />
  );
}
