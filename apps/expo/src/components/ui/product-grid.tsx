import ErrorBoundary from "react-native-error-boundary";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { Link, useRouter } from "expo-router";
import Fa from "@expo/vector-icons/FontAwesome";
import type { CardProps, XStackProps, YStackProps } from "tamagui";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  H2,
  H3,
  Image,
  Paragraph,
  Text,
  XStack,
  YStack,
} from "tamagui";

import type { PopularProduct, Product, SingleProduct } from "~/types/product";
import { cn } from "~/utils/cn";
import { createImgUrl } from "~/utils/image";
import { ProductLoader } from "../loaders/product";
import { navigationContainerRef } from "../routing/navigation-container";
import CartButton from "./cart-button";
import { AccountPageIcons } from "./icons";
import { LikeButton } from "./like-button";
import { Separator } from "./separator";

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
    <ErrorBoundary
      FallbackComponent={() => {
        navigationContainerRef.navigate("Home" as never);
        return null;
      }}
    >
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
    </ErrorBoundary>
  );
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { push } = useRouter();
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
                  uri:
                    product?.photos?.find?.((p) => p.is_main)?.id ??
                    createImgUrl(
                      product?.photos?.[0]?.id ??
                        (product as PopularProduct).main_photo,
                    ),
                  width: 156,
                  height: 130,
                }}
                style={{
                  objectFit: "contain",
                }}
                backgroundColor="$strongBg"
                className="max-w-full rounded-xl"
              />
              <LikeButton product={product} />
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
            <CartButton product={product} />
          </CardFooter>
        </YStack>
      </Animated.View>
    </Card>
  );
}

interface SearchProductTitleProps {
  id: Product["id"];
  name: Product["name"];
}
interface SearchProductListProps extends YStackProps {
  products: SingleProduct[];
}

export function SearchProductTitle({ id, name }: SearchProductTitleProps) {
  return (
    <Link
      href={{
        pathname: "/(product)/product/[id]",
        params: {
          id,
        },
      }}
    >
      <XStack
        paddingVertical={16}
        justifyContent="space-between"
        alignItems="center"
        gap="$2"
      >
        <H3 numberOfLines={1}>{name}</H3>
        {AccountPageIcons.NEXT_PAGE({})}
      </XStack>
    </Link>
  );
}

export function SearchProductList({
  products,
  ...props
}: SearchProductListProps) {
  return (
    <YStack separator={<Separator />} {...props}>
      {!!products &&
        products?.map((p) => (
          <SearchProductTitle
            name={(p as unknown as SingleProduct["data"]).name}
            id={(p as unknown as SingleProduct["data"]).id}
            key={(p as unknown as SingleProduct["data"]).id}
          />
        ))}
    </YStack>
  );
}
