import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  H2,
  Image,
  Paragraph,
  XStack,
  YStack,
} from "tamagui";

import { getCategories } from "~/utils/api-utils";
import { createImgUrl } from "~/utils/image";
import { CategoryLoader } from "../loaders/category";

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
        <H2 fontWeight="700">Main categories</H2>
        <XStack flexWrap="wrap">
          {isLoading && <CategoryLoader />}
          {data?.map((category) => (
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
                  className="object-cover"
                  aspectRatio={1}
                  style={{
                    objectFit: "contain",
                  }}
                />
                <Paragraph fontSize={13}>{category.name}</Paragraph>
              </CardHeader>
            </Card>
          ))}
        </XStack>
      </YStack>
    </>
  );
}
