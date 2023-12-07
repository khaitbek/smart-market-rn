import { useLocalSearchParams } from "expo-router";
import { ShoppingCart } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { Button, H3, Text, XStack } from "tamagui";

import { PrimaryButton } from "~/components/ui/primary-btn";
import { useCartStore } from "~/store/cart-store";
import type { SingleProduct } from "~/types/product";
import { getSingleProduct } from "~/utils/api-utils";

export function ProductViewBottom() {
  const { id } = useLocalSearchParams();
  const { addToCart, productIds, removeFromCart } = useCartStore();
  const { data: product } = useQuery<SingleProduct>({
    queryKey: ["product", id],
    queryFn: async () => await getSingleProduct({ product_id: Number(id) }),
  });
  if (!product) return null;
  const doesProductExistInCart = productIds.find((i) => i === +id!) != null;
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      padding={16}
      borderTopWidth={1}
      borderTopColor="#E8EAEE"
    >
      <XStack alignItems="baseline" gap="$3">
        <Text>Price:</Text>
        <H3>{product?.data.price}</H3>
        <Text>UZS</Text>
      </XStack>
      {doesProductExistInCart ? (
        <Button
          fontSize={13}
          backgroundColor="crimson"
          color="white"
          icon={<ShoppingCart size={16} />}
          className="font-bold"
          onPress={() =>
            removeFromCart({
              id: product.data.id,
              seller: product.data.seller,
            })
          }
        >
          Remove
        </Button>
      ) : (
        <PrimaryButton
          fontSize={13}
          icon={<ShoppingCart size={16} />}
          className="font-bold"
          onPress={() =>
            addToCart({
              id: product.data.id,
              seller: product.data.seller,
            })
          }
        >
          Add to card
        </PrimaryButton>
      )}
    </XStack>
  );
}
