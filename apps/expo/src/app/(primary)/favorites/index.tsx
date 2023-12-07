import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollView } from "tamagui";

import { ProductLoader } from "~/components/loaders/product";
import { MyStack } from "~/components/ui/my-stack";
import { ProductGrid } from "~/components/ui/product-grid";
import { MySafeAreaView } from "~/components/ui/safe-area";
import { useFavoriteStore } from "~/store/favorites-store";
import type { Product } from "~/types/product";
import { getProductsByMultipleIds } from "~/utils/api-utils";

const FavoritesPage = () => {
  const { products } = useFavoriteStore();
  const { data: favoriteProducts, isLoading } = useQuery({
    queryKey: ["favorite", "products"],
    queryFn: async () =>
      await getProductsByMultipleIds({
        ids: products.join(","),
      }),
    staleTime: Infinity,
    refetchInterval: 60 * 5000,
  });
  const filterProduct = (id: Product["id"]) => products.includes(id);

  return (
    <ScrollView>
      <MySafeAreaView>
        <MyStack>
          {isLoading ? (
            <ProductLoader />
          ) : (
            <ProductGrid
              filter={filterProduct}
              products={favoriteProducts?.data ?? []}
            />
          )}
        </MyStack>
      </MySafeAreaView>
    </ScrollView>
  );
};

// export function ErrorBoundary(props: ErrorBoundaryProps) {
//   return (
//     <View style={{ flex: 1, backgroundColor: "red" }}>
//       <Text>{props.error.message}</Text>
//       <Text onPress={props.retry}>Try Again?</Text>
//     </View>
//   );
// }

export default FavoritesPage;
