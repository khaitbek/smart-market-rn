import { useMemo } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { View, XStack, YStack } from "tamagui";

interface CategoryLoaderProps {
  childCount?: number;
}

export function CategoryLoader({ childCount = 10 }: CategoryLoaderProps) {
  const array = useMemo(() => {
    return Array(childCount).fill("") as string[];
  }, [childCount]);

  return (
    <YStack>
      <SkeletonPlaceholder borderRadius={4}>
        <XStack flexWrap="wrap">
          {array.map((_, index) => (
            <View
              flexGrow={1}
              flexBasis="50%"
              height={150}
              key={index}
              padding="$2"
            >
              <SkeletonPlaceholder.Item
                flexDirection="column"
                alignItems="center"
                height={150}
                borderRadius={15}
              ></SkeletonPlaceholder.Item>
            </View>
          ))}
        </XStack>
      </SkeletonPlaceholder>
    </YStack>
  );
}

export function CatalogGroupLoader({ childCount }: CategoryLoaderProps) {
  const array = useMemo(() => {
    return Array(childCount).fill("") as string[];
  }, [childCount]);
  return (
    <SkeletonPlaceholder>
      <YStack gap="$3">
        {array.map((_, index) => (
          <SkeletonPlaceholder.Item
            paddingVertical={16}
            paddingHorizontal={16}
            borderRadius={10}
            key={index}
          />
        ))}
      </YStack>
    </SkeletonPlaceholder>
  );
}
