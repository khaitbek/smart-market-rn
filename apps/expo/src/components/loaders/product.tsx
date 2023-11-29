import { useMemo } from "react";
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
      <XStack flexWrap="wrap">
        {array.map((_, index) => (
          <Card
            animation="bounce"
            key={index}
            className="flex-1 basis-[160px] items-stretch bg-transparent p-2"
          >
            <YStack className="justify-between rounded-xl border border-[#E8EAEE] bg-white pb-4">
              <CardHeader className="relative">
                <View
                  borderRadius={12}
                  backgroundColor="#F4F5F8"
                  height={130}
                />
                <Button
                  className="absolute right-2 top-2 h-3"
                  variant="outlined"
                ></Button>
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
              <CardFooter paddingHorizontal={14}>
                {/* <PrimaryButton
            fontSize={13}
            width="100%"
            icon={<Fa size={16} name="shopping-cart" />}
            className="font-bold"
          >
            Add to card
          </PrimaryButton> */}
                <Button
                  width="100%"
                  height="$3"
                  backgroundColor="#F4F5F8"
                ></Button>
              </CardFooter>
            </YStack>
          </Card>
        ))}
      </XStack>
    </YStack>
  );
}
