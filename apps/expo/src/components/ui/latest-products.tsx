import { useQuery } from "@tanstack/react-query";

import { getLatestProducts } from "~/utils/api-utils";
import { ProductGrid } from "./product-grid";

export function LatestProducts() {
  const { data: products, isFetching } = useQuery({
    queryKey: ["product", "latest"],
    queryFn: async () => getLatestProducts(),
  });
  return (
    <ProductGrid
      products={products?.products ?? []}
      seeAllButtonPath="/"
      title="Latest"
      isLoading={isFetching}
    />
  );
}
