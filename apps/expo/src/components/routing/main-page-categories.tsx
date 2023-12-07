import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, Image, Paragraph, XStack, YStack } from "tamagui";

import { getCategories } from "~/utils/api-utils";
import { createImgUrl } from "~/utils/image";
import { CategoryLoader } from "../loaders/category";
import { SectionTitle } from "../ui/section-title";

export function MainPageCategories() {
  const { data, isLoading } = useQuery({
    queryFn: async () => await getCategories("en"),
    queryKey: ["category"],
  });
  if (!data) {
    return <CategoryLoader />;
  }
  return (
    <>
      <YStack gap="$2">
        <SectionTitle>Main categories</SectionTitle>
        <XStack flexWrap="wrap">
          {isLoading && <CategoryLoader />}
          {data?.slice(0, 6).map((category) => (
            <Card
              padding="$2"
              backgroundColor="transparent"
              flexBasis="50%"
              key={category.id}
            >
              <CardHeader backgroundColor="#F4F5F8" borderRadius={15} gap="$4">
                <Image
                  aria-hidden
                  alt={category.name}
                  source={{
                    uri: createImgUrl(category.icon),
                    width: 62,
                    height: 53,
                    cache: "force-cache",
                  }}
                  marginHorizontal="25%"
                  resizeMode="contain"
                  style={{
                    objectFit: "contain",
                  }}
                />
                <Paragraph fontWeight="400" textAlign="center" fontSize={13}>
                  {category.name}
                </Paragraph>
              </CardHeader>
            </Card>
          ))}
        </XStack>
      </YStack>
    </>
  );
}
