import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { LmCheckbox } from "@tamagui-extras/form";
import { Minus, Plus } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  H3,
  Image,
  Input,
  Text,
  View,
  XStack,
  YGroup,
  YStack,
} from "tamagui";

import { CartLoader } from "~/components/loaders/cart";
import { useCartStore } from "~/store/cart-store";
import type { Product } from "~/types/product";
import { getProductsByMultipleIds } from "~/utils/api-utils";
import { createImgUrl } from "~/utils/image";

export function CartList() {
  const { products, productIds } = useCartStore();
  const { data: cartProducts, isLoading } = useQuery({
    queryKey: ["cart", "products"],
    queryFn: async () =>
      getProductsByMultipleIds({
        ids: productIds.join(","),
      }),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 5000,
  });
  const iterator = Object.keys(products);
  if (isLoading) return <CartLoader childCount={3} />;
  return (
    <View>
      <YGroup>
        {iterator.map((sellerId) => {
          return (
            <CartGroup
              key={sellerId}
              products={cartProducts?.data ?? []}
              price={0}
              seller={{
                name: products[+sellerId]?.[0]?.sellerName ?? "",
                id: +sellerId,
              }}
            />
          );
        })}
      </YGroup>
    </View>
  );
}

interface CartGroupProps {
  seller: {
    id: Product["seller"]["id"];
    name: Product["seller"]["name"];
  };
  products: Product[];
  price: number;
  expectedDelivery?: string;
}

export function CartGroup({ products, seller }: CartGroupProps) {
  return (
    <YStack theme="primary">
      <XStack
        theme="primary"
        gap="$3"
        padding={16}
        backgroundColor="$strongBg"
        alignItems="center"
      >
        <LmCheckbox
          checkboxProps={{
            width: 24,
            height: 24,
          }}
        />
        <Text
          margin={0}
          textTransform="uppercase"
          fontWeight="500"
          fontSize={16}
          color="$strongText"
        >
          {seller.name}
        </Text>
      </XStack>
      {products.map((product) => (
        <XStack
          padding={20}
          gap="$3"
          className="border-b border-[#E8EAEE]"
          key={product.id}
        >
          <LmCheckbox
            checkboxProps={{
              width: 24,
              height: 24,
            }}
          />
          <XStack gap="$3">
            <Image
              source={{
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                uri: createImgUrl(product.photos[0].id),
                width: 84,
                height: 120,
              }}
              borderRadius={10}
              backgroundColor="$strongBg"
            />
            <YStack>
              <H3
                flex={1}
                flexShrink={1}
                lineHeight={20}
                maxWidth={250}
                marginBottom="$6"
              >
                {product.name}
              </H3>

              <XStack marginBottom={20} alignItems="baseline" gap="$2">
                <Text fontWeight="700" lineHeight={14} margin={0}>
                  {product.price}
                </Text>
                <Text lineHeight={20} fontWeight="500" color="#7B7D81">
                  UZS
                </Text>
              </XStack>
              <XStack gap="$2">
                <Button circular backgroundColor="$darkBg">
                  <Minus />
                </Button>
                <XStack theme="primary" borderRadius={10} alignItems="stretch">
                  <Input
                    borderColor="#E8EAEE"
                    defaultValue={String(product.min_amount)}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={0}
                  />
                  <View
                    theme="primary"
                    backgroundColor="$darkBg"
                    paddingHorizontal={12}
                    paddingVertical={7}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderTopRightRadius={10}
                    borderBottomRightRadius={10}
                  >
                    <Text theme="primary" color="$strongText">
                      kg
                    </Text>
                  </View>
                </XStack>
                <Button
                  theme="primary"
                  borderColor="$border"
                  circular
                  className="border"
                >
                  <Plus />
                </Button>
              </XStack>
            </YStack>
          </XStack>
        </XStack>
      ))}
    </YStack>
  );
}

interface CartItemProps {
  count: number;
  product: Product;
}

export function CartItem({ product }: CartItemProps) {
  return (
    <Animated.View
      layout={Layout.stiffness(1)}
      entering={FadeIn}
      exiting={FadeOut}
    >
      {JSON.stringify(product, undefined, 2)}
    </Animated.View>
  );
}
