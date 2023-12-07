import { useQuery } from "@tanstack/react-query";

import type { Product } from "~/types/product";
import { getCheapestProducts } from "~/utils/api-utils";
import { ProductGrid } from "./product-grid";

export function CheapestProducts() {
  const { data: products, isFetching } = useQuery({
    queryKey: ["product", "latest"],
    queryFn: async () => getCheapestProducts(6),
    keepPreviousData: true,
    refetchInterval: 60 * 5000,
  });
  return (
    <ProductGrid
      products={(products?.products as unknown as Product[]) ?? []}
      seeAllButtonPath="/"
      title="Cheapest"
      isLoading={isFetching}
    />
  );
}
