import { Heart } from "@tamagui/lucide-icons";
import { useQueryClient } from "@tanstack/react-query";
import type { ButtonProps } from "tamagui";
import { Button } from "tamagui";

import { useFavoriteStore } from "~/store/favorites-store";
import type { FavoriteProducts, Product } from "~/types/product";

interface LikeButtonProps extends ButtonProps {
  product: Product;
}

export function LikeButton({ product, ...props }: LikeButtonProps) {
  const {
    products: favorites,
    addToFavorites,
    removeFromFavorites,
  } = useFavoriteStore();
  const { id: productId, ...restProduct } = product;
  const queryClient = useQueryClient();
  const isFavoriteProduct = favorites.includes(productId);
  return (
    <Button
      width={24}
      height={24}
      onPress={() => {
        const existingFavoriteProducts: FavoriteProducts =
          queryClient.getQueryData(["favorite", "products"])!;
        let optimisticallyUpdatedFavoriteProducts: Product[] = [
          ...(existingFavoriteProducts?.data ?? []),
        ];
        if (isFavoriteProduct) {
          removeFromFavorites(productId);
          optimisticallyUpdatedFavoriteProducts =
            optimisticallyUpdatedFavoriteProducts.filter(
              (p) => p.id !== productId,
            );
        } else {
          addToFavorites(productId);
          optimisticallyUpdatedFavoriteProducts.push({
            ...restProduct,
            id: productId,
          });
        }

        queryClient.setQueryData(["favorite", "products"], () => ({
          data: optimisticallyUpdatedFavoriteProducts,
        }));
        console.log({
          optimisticallyUpdatedFavoriteProducts:
            optimisticallyUpdatedFavoriteProducts.length,
        });
      }}
      outlineColor="transparent"
      unstyled
      className="absolute right-3 top-2"
      {...props}
    >
      <Heart
        width={24}
        height={24}
        color="blue"
        fill={isFavoriteProduct ? "blue" : "white"}
      />
    </Button>
  );
}
