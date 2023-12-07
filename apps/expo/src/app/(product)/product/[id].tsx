import type { ReactNode } from "react";
import { useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { useWindowDimensions } from "react-native";
import HTMLToRN from "react-native-render-html";
import { useAssets } from "expo-asset";
import { useLocalSearchParams } from "expo-router";
import { Heart, Star } from "@tamagui/lucide-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParagraphProps } from "tamagui";
import {
  Button,
  H2,
  Image,
  ListItem,
  Paragraph,
  ScrollView,
  View,
  XStack,
  YGroup,
  YStack,
} from "tamagui";

import { SingleProductLoader } from "~/components/loaders/single-product";
import { EyeIcon, PhoneIcon, ProductLocationIcon } from "~/components/ui/icons";
import { Separator } from "~/components/ui/separator";
import { RelatedProducts } from "~/components/ui/similar-products";
import { useFavoriteStore } from "~/store/favorites-store";
import type { Product, SingleProduct } from "~/types/product";
import { getSingleProduct } from "~/utils/api-utils";
import { ProductImageSlider } from "./_components/product-img-slider";

export default function ProductViewPage() {
  const [assets] = useAssets([
    require("../../../../public/images/oila-kredit.png"),
  ]);
  const { id } = useLocalSearchParams();
  const { data: product } = useQuery<SingleProduct>({
    queryKey: ["product", id],
    queryFn: async () => await getSingleProduct({ product_id: Number(id) }),
  });
  const {
    products: favorites,
    addToFavorites,
    removeFromFavorites,
  } = useFavoriteStore();
  const isFavoriteProduct = favorites.includes(+id!);
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();
  if (!product) return <SingleProductLoader />;
  return (
    <ScrollView>
      <ProductImageSlider images={product?.data.photos ?? []} />
      <YGroup separator={<Separator />}>
        <ProductDetailGroup>
          <XStack justifyContent="space-between">
            <YStack flexGrow={1}>
              <H2 fontSize={16} lineHeight={16} fontWeight="600">
                {product?.data.name}
              </H2>
              <Paragraph color="#7B7D81" fontWeight="500">
                {product?.data.seller.name}
              </Paragraph>
            </YStack>
            <Button
              width={24}
              height={24}
              onPress={async () => {
                if (isFavoriteProduct) removeFromFavorites(+id!);
                else addToFavorites(+id!);
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
          </XStack>
        </ProductDetailGroup>
        <ProductDetailGroup>
          <YStack gap="$2">
            <Paragraph fontWeight="600">Price:</Paragraph>
            {/* {product?.data.old_price && (
              <Paragraph
                style={{
                  color: "#7B7D81",
                  textDecorationLine: "line-through",
                }}
              >
                {product?.data.old_price}
              </Paragraph>
            )} */}
            <XStack alignItems="center" gap="$2">
              <H2 lineHeight={20} fontSize={20}>
                {product?.data.price}
              </H2>
              <Paragraph fontWeight="500" color="#7B7D81">
                UZS
              </Paragraph>
            </XStack>
          </YStack>
        </ProductDetailGroup>
        <ProductDetailGroup>
          <YStack gap="$2">
            <Paragraph fontWeight="500">Payment</Paragraph>
            <XStack gap="$3">
              <Button>
                <Image source={assets?.[0] as ImageSourcePropType} />
              </Button>
              <Button fontWeight="500">Cash</Button>
              <Button fontWeight="500">RealPay</Button>
            </XStack>
          </YStack>
        </ProductDetailGroup>
        <ProductDetailGroup>
          <ProductPhoneNumber product={product.data} />
        </ProductDetailGroup>
        <ProductDetailGroup>
          <XStack gap="$3">
            <ProductLocationIcon />
            <Paragraph fontWeight="500" color="#44475C">
              {product?.data.seller.address}
            </Paragraph>
          </XStack>
        </ProductDetailGroup>
        <ProductDetailGroup>
          <YStack>
            <ProductDetailGroupTitle>Description</ProductDetailGroupTitle>
            <View>
              <HTMLToRN
                enableUserAgentStyles
                defaultViewProps={{
                  style: {
                    padding: 0,
                    margin: 0,
                  },
                }}
                baseStyle={{
                  whiteSpace: "normal",
                  maxWidth: width - 50,
                }}
                contentWidth={100}
                source={{
                  html: product.data.technical_parameters,
                }}
              />
            </View>
          </YStack>
        </ProductDetailGroup>
        <ProductDetailGroup paddingVertical={0} paddingHorizontal={0}>
          <YStack width="100%">
            <View padding={20}>
              <ProductDetailGroupTitle>Characteristics</ProductDetailGroupTitle>
            </View>
            <ProductCharacteristics product={product.data} />
          </YStack>
        </ProductDetailGroup>
        {!!product.data.comment_number && (
          <ProductDetailGroup paddingVertical={0} paddingHorizontal={0}>
            <View padding={20}>
              <YStack gap="$3" width="100%">
                <ProductDetailGroupTitle>Comments</ProductDetailGroupTitle>
                <XStack alignItems="center">
                  <XStack gap="$2">
                    {Array(5)
                      .fill("")
                      .map((item, index) => (
                        <Star
                          key={index}
                          fill={
                            Math.ceil(product.data.rating.rating) >= index + 1
                              ? "yellow"
                              : "#E8EAEE"
                          }
                          color={
                            Math.ceil(product.data.rating.rating) >= index + 1
                              ? "yellow"
                              : "#E8EAEE"
                          }
                        />
                      ))}
                  </XStack>
                  <Paragraph color="#7B7D81" fontWeight="400">
                    {product.data.comment_number} comments
                  </Paragraph>
                </XStack>
              </YStack>
            </View>
          </ProductDetailGroup>
        )}
      </YGroup>
      <RelatedProducts category_id={Number(product.data.category_id)} />
    </ScrollView>
  );
}
export function ProductCharacteristics({
  product,
}: {
  product: SingleProduct["data"];
}) {
  return (
    <YGroup>
      <YGroup.Item>
        <ListItem padding={0}>
          <ProductCharacteristicsGroup
            label="Country"
            value={product.country_name}
          />
        </ListItem>
      </YGroup.Item>
      <YGroup.Item>
        <ListItem padding={0}>
          <ProductCharacteristicsGroup
            theme="light"
            label="Measurement unit"
            value={product.unit}
          />
        </ListItem>
      </YGroup.Item>
      <YGroup.Item>
        <ListItem padding={0}>
          <ProductCharacteristicsGroup
            label="Warranty"
            value={product.expiration_life}
          />
        </ListItem>
      </YGroup.Item>
      <YGroup.Item>
        <ListItem padding={0}>
          <ProductCharacteristicsGroup
            theme="light"
            label="Free service"
            value={product.free_service_life}
          />
        </ListItem>
      </YGroup.Item>
      <YGroup.Item>
        <ListItem padding={0}>
          <ProductCharacteristicsGroup
            label="Manifactured year"
            value={String(product.ayear)}
          />
        </ListItem>
      </YGroup.Item>
      <YGroup.Item>
        <ListItem padding={0}>
          <ProductCharacteristicsGroup
            label="Minimum quantity"
            value={String(product.min_amount)}
          />
        </ListItem>
      </YGroup.Item>
    </YGroup>
  );
}
function ProductCharacteristicsGroup({
  label,
  value,
  theme = "gray",
}: {
  label: string;
  value: string;
  theme?: "light" | "gray";
}) {
  const background = {
    light: "#FFF",
    gray: "#F4F5F8",
  };
  return (
    <XStack
      padding={16}
      backgroundColor={background[theme]}
      width="100%"
      justifyContent="space-between"
    >
      <Paragraph color="#7B7D81">{label}</Paragraph>
      <Paragraph fontWeight="500">{value}</Paragraph>
    </XStack>
  );
}
function ProductDetailGroupTitle({ children, ...props }: ParagraphProps) {
  return (
    <Paragraph fontWeight="500" color="#44475C" {...props}>
      {children}
    </Paragraph>
  );
}

function ProductDetailGroup({
  children,
  paddingVertical = 20,
  paddingHorizontal = 16,
}: {
  children: ReactNode;
  paddingVertical?: number;
  paddingHorizontal?: number;
}) {
  return (
    <YGroup.Item>
      <ListItem
        paddingHorizontal={paddingHorizontal}
        paddingVertical={paddingVertical}
      >
        {children}
      </ListItem>
    </YGroup.Item>
  );
}
function ProductPhoneNumber({ product }: { product: Product }) {
  const [showPhone, setShowPhone] = useState<boolean>(false);
  const toggleShowPhoneNumber = () => setShowPhone((prev) => !prev);
  return (
    <YStack width="100%" gap="$3">
      <Button
        width="100%"
        backgroundColor="#4BB16F"
        color="white"
        icon={<PhoneIcon />}
      >
        {!showPhone && "+998 ** *** ** **"}
        {showPhone && product.seller.mobile_phone}
        <Button
          icon={<EyeIcon />}
          onPress={() => toggleShowPhoneNumber()}
          unstyled
        ></Button>
      </Button>
      <Button
        width="100%"
        textAlign="center"
        color="#095AE3"
        onPress={() => toggleShowPhoneNumber()}
        unstyled
      >
        Show phone number
      </Button>
    </YStack>
  );
}
