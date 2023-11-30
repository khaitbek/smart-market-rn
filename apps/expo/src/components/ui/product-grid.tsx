import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { useRouter } from "expo-router";
import Fa from "@expo/vector-icons/FontAwesome";
import { Heart } from "@tamagui/lucide-icons";
import { useQueryClient } from "@tanstack/react-query";
import type { CardProps, XStackProps } from "tamagui";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  H2,
  Image,
  Paragraph,
  Text,
  XStack,
  YStack,
} from "tamagui";

import { useCartStore } from "~/store/cart-store";
import { useFavoriteStore } from "~/store/favorites-store";
import type { Product } from "~/types/product";
import { cn } from "~/utils/cn";
import { createImgUrl } from "~/utils/image";
import { ProductLoader } from "../loaders/product";
import { PrimaryButton } from "./primary-btn";

interface ProductGridProps {
  title?: string;
  seeAllButtonPath?: string;
  products: Product[];
  isLoading?: boolean;
  headerProps?: XStackProps;
  filter?: (id: Product["id"]) => boolean;
}
interface ProductCardProps extends CardProps {
  product: Product;
  index: number;
  products: Product[];
  filterProduct?: (id: Product["id"]) => boolean;
}
export function ProductGrid({
  title,
  products,
  isLoading = false,
  headerProps,
  seeAllButtonPath,
  filter,
}: ProductGridProps) {
  const router = useRouter();
  if (isLoading) return <ProductLoader childCount={10} />;
  return (
    <YStack gap="$3">
      <XStack
        alignItems="center"
        justifyContent="space-between"
        gap="$2"
        {...headerProps}
      >
        {!!title && <H2 fontWeight="700">{title}</H2>}
        {!!seeAllButtonPath && (
          <Button
            onPress={() => router.push("/search/")}
            color="#979797"
            unstyled
          >
            See all
          </Button>
        )}
      </XStack>
      <XStack flexWrap="wrap">
        {products?.map((product, index, array) => {
          return (
            <ProductCard
              key={product.id}
              index={index}
              products={array}
              product={product}
              filterProduct={filter}
            />
          );
        })}
      </XStack>
    </YStack>
  );
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { products, addToCart, removeFromCart } = useCartStore();
  const {
    products: favorites,
    addToFavorites,
    removeFromFavorites,
  } = useFavoriteStore();
  const doesProductExistInCart =
    products.find((p) => p.id === product.id) != null;
  const isFavoriteProduct = favorites.includes(product.id);

  return (
    <Card
      width="50%"
      className={cn(" items-stretch bg-transparent p-2 ", className!)}
    >
      <Animated.View
        layout={Layout.stiffness(1)}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <YStack className="justify-between rounded-xl border border-[#E8EAEE] bg-white pb-4">
          <YStack
            onPress={() => {
              push({
                pathname: "/(product)/product/[id]",
                params: {
                  id: product.id,
                },
              });
            }}
          >
            <CardHeader className="relative">
              <Image
                source={{
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                  uri: createImgUrl(product.photos[0].id),
                  width: 156,
                  height: 130,
                }}
                style={{
                  objectFit: "contain",
                }}
                backgroundColor="$strongBg"
                className="max-w-full rounded-xl"
              />
              <Button
                width={24}
                height={24}
                onPress={async () => {
                  if (isFavoriteProduct) removeFromFavorites(product.id);
                  else addToFavorites(product.id);
                  console.log("Invalidating!");
                  await queryClient.invalidateQueries({
                    queryKey: ["favorite", "products"],
                  });
                }}
                outlineColor="transparent"
                unstyled
                className="absolute right-3 top-2"
              >
                <Heart
                  width={24}
                  height={24}
                  color="blue"
                  fill={isFavoriteProduct ? "blue" : "white"}
                />
              </Button>
            </CardHeader>
            <YStack padding={14} gap="$3">
              <Paragraph
                lineHeight={20}
                numberOfLines={1}
                ellipsizeMode="head"
                className="text-[12px] font-[700]"
              >
                {product.name}
              </Paragraph>
              <Paragraph fontSize={14}>
                <Paragraph fontWeight="700">{product.price}</Paragraph>{" "}
                <Paragraph color="#DADADA">UZS</Paragraph>
              </Paragraph>
              <Button
                display="flex"
                justifyContent="flex-start"
                paddingHorizontal="$3"
                fontSize={10}
                height="$2"
                backgroundColor="#F4F5F8"
              >
                <Fa name="eye" color="#7B7D81" />
                <Text color="#7B7D81">{product.counter} views</Text>
              </Button>
            </YStack>
          </YStack>
          <CardFooter paddingHorizontal={14}>
            {doesProductExistInCart ? (
              <Button
                fontSize={13}
                width="100%"
                backgroundColor="crimson"
                color="white"
                icon={<Fa size={16} name="shopping-cart" />}
                className="font-bold"
                onPress={() => removeFromCart(product.id)}
              >
                Remove
              </Button>
            ) : (
              <PrimaryButton
                fontSize={13}
                width="100%"
                icon={<Fa size={16} name="shopping-cart" />}
                className="font-bold"
                onPress={() => addToCart(product.id)}
              >
                Add to card
              </PrimaryButton>
            )}
          </CardFooter>
        </YStack>
      </Animated.View>
    </Card>
  );
}
