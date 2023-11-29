import { useQuery } from "@tanstack/react-query";

import { useLangStore } from "~/store/lang-store";
import { getProductsByCategory } from "~/utils/api-utils";
import { ProductGrid } from "./product-grid";

interface RelatedProductsProps {
  category_id: Category["id"];
}

export function RelatedProducts({ category_id }: RelatedProductsProps) {
  const { lang } = useLangStore();
  const { data, isLoading } = useQuery({
    queryKey: ["product", "related"],
    queryFn: async () =>
      await getProductsByCategory({
        category_id,
        lang,
      }),
  });
  if (!data) return null;
  return (
    <ProductGrid
      products={data.data.products ?? []}
      headerProps={{
        paddingTop: 32,
        paddingHorizontal: 12,
      }}
      title="Related products"
      seeAllButtonPath="/"
    />
  );
}
