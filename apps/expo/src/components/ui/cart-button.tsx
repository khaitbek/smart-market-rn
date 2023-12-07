import React from "react";
import { ShoppingCart } from "@tamagui/lucide-icons";
import { useQueryClient } from "@tanstack/react-query";
import type { ButtonProps } from "tamagui";
import { Button } from "tamagui";

import { useCartStore } from "~/store/cart-store";
import type { FavoriteProducts, Product } from "~/types/product";
import { PrimaryButton } from "./primary-btn";

interface CartButtonProps extends ButtonProps {
  product: Product;
}

export default function CartButton({ product, ...props }: CartButtonProps) {
  const { productIds, removeFromCart, addToCart } = useCartStore();
  const doesProductExistInCart = productIds.includes(product.id);
  const queryClient = useQueryClient();
  const existingCartProducts: FavoriteProducts | undefined =
    queryClient.getQueryData(["cart", "products"]);
  if (doesProductExistInCart) {
    return (
      <Button
        fontSize={13}
        width="100%"
        backgroundColor="crimson"
        color="white"
        icon={<ShoppingCart size={16} />}
        className="font-bold"
        onPress={() => {
          removeFromCart({
            id: product.id,
            seller: product.seller,
          });
          queryClient.setQueryData(["cart", "products"], () => ({
            data: existingCartProducts?.data.filter(
              (p: { id: Product["id"] }) => p.id !== product.id,
            ),
          }));
        }}
        {...props}
      >
        Remove
      </Button>
    );
  }
  return (
    <PrimaryButton
      fontSize={13}
      width="100%"
      icon={<ShoppingCart size={16} />}
      className="font-bold"
      onPress={() => {
        addToCart({
          id: product.id,
          seller: product.seller,
        });
        queryClient.setQueryData(["cart", "products"], () => ({
          data: [...(existingCartProducts?.data ?? []), product],
        }));
      }}
      {...props}
    >
      Add to card
    </PrimaryButton>
  );
}
