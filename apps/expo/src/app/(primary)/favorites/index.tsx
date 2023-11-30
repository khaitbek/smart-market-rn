import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, Text } from "tamagui";

import { ProductLoader } from "~/components/loaders/product";
import { MyStack } from "~/components/ui/my-stack";
import { ProductGrid } from "~/components/ui/product-grid";
import { MySafeAreaView } from "~/components/ui/safe-area";
import { useFavoriteStore } from "~/store/favorites-store";
import type { Product } from "~/types/product";
import { getProductsByMultipleIds } from "~/utils/api-utils";

const FavoritesPage = () => {
  const { products } = useFavoriteStore();
  const {
    data: favoriteProducts,
    isLoading,
    status,
    isRefetching,
    isRefetchError,
  } = useQuery({
    queryKey: ["favorite", "products", products],
    queryFn: async () =>
      await getProductsByMultipleIds({
        ids: products.join(","),
      }),
    keepPreviousData: true,
  });
  const filterProduct = (id: Product["id"]) => products.includes(id);
  return (
    <ScrollView>
      <MySafeAreaView>
        <Text>{JSON.stringify(products)}</Text>
        <Text>Status {status}</Text>
        <Text>{isRefetching && "isRefetching"}</Text>
        <Text>isRefetchError{isRefetchError}</Text>
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

export default FavoritesPage;
