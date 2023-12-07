import { useMemo } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Paragraph,
  View,
  XStack,
  YStack,
} from "tamagui";

interface ProductLoaderProps {
  childCount?: number;
}

export function ProductLoader({ childCount = 10 }: ProductLoaderProps) {
  const array = useMemo(() => {
    return Array(childCount).fill("") as string[];
  }, [childCount]);

  return (
    <YStack>
      <XStack rowGap={16} flexWrap="wrap">
        {array.map((_, index) => (
          <Card
            key={index}
            animation="bounce"
            className="flex-1 basis-[160px] items-stretch  bg-transparent p-2"
          >
            <SkeletonPlaceholder key={index} borderRadius={4}>
              <YStack
                padding={32}
                className="justify-between rounded-xl  bg-white pb-4"
              >
                <CardHeader className="relative">
                  <View
                    borderRadius={12}
                    backgroundColor="#F4F5F8"
                    height={130}
                  />
                </CardHeader>
                <YStack padding={14} gap="$3">
                  <Paragraph
                    borderRadius={12}
                    height={20}
                    backgroundColor="#F4F5F8"
                    className="line-clamp-2 text-[12px] font-[700]"
                  ></Paragraph>
                  <Paragraph
                    borderRadius={12}
                    backgroundColor="#F4F5F8"
                    height={20}
                    fontSize={14}
                  ></Paragraph>
                  <Button
                    display="flex"
                    justifyContent="flex-start"
                    paddingHorizontal="$3"
                    fontSize={10}
                    height="$1"
                    backgroundColor="#F4F5F8"
                  ></Button>
                </YStack>
                <CardFooter height={30} paddingHorizontal={14}>
                  {/* <PrimaryButton
            fontSize={13}
            width="100%"
            icon={<Fa size={16} name="shopping-cart" />}
            className="font-bold"
          >
            Add to card
          </PrimaryButton> */}
                  <Button width="100%" height={30}></Button>
                </CardFooter>
              </YStack>
            </SkeletonPlaceholder>
          </Card>
        ))}
      </XStack>
    </YStack>
  );
}
