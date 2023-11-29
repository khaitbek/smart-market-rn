import { useMemo } from "react";
import { Card, CardHeader, Paragraph, XStack, YStack } from "tamagui";

interface CategoryLoaderProps {
  childCount?: number;
}

export function CategoryLoader({ childCount = 10 }: CategoryLoaderProps) {
  const array = useMemo(() => {
    return Array(childCount).fill("") as string[];
  }, [childCount]);

  return (
    <YStack>
      <XStack flexWrap="wrap">
        {array.map((_, index) => (
          <Card
            padding="$2"
            backgroundColor="transparent"
            flexBasis="50%"
            key={index}
          >
            <CardHeader
              className="animate-pulse"
              backgroundColor="#F4F5F8"
              borderRadius={15}
              paddingVertical="$8"
              gap="$4"
            >
              <Paragraph fontSize={13}></Paragraph>
            </CardHeader>
          </Card>
        ))}
      </XStack>
    </YStack>
  );
}
