import { useQuery } from "@tanstack/react-query";

import { getCheapestProducts } from "~/utils/api-utils";
import { ProductGrid } from "./product-grid";

export function CheapestProducts() {
  const { data: products, isFetching } = useQuery({
    queryKey: ["product", "latest"],
    queryFn: async () => getCheapestProducts(),
  });
  return (
    <ProductGrid
      products={products?.products ?? []}
      seeAllButtonPath="/"
      title="Cheapest"
      isLoading={isFetching}
    />
  );
}
