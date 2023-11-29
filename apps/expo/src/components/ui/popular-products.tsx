import { useQuery } from "@tanstack/react-query";

import { getPopularProducts } from "~/utils/api-utils";
import { ProductGrid } from "./product-grid";

export function PopularProducts() {
  const { data: products, isFetching } = useQuery({
    queryKey: ["product", "popular"],
    queryFn: async () => getPopularProducts(5),
  });
  return (
    <ProductGrid
      products={products?.products ?? []}
      seeAllButtonPath="/"
      title="Popular"
      isLoading={isFetching}
    />
  );
}
