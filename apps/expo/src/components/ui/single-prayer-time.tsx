import type { FC } from "react";
import React from "react";
import type { ViewProps } from "react-native";
import { Paragraph, YStack } from "tamagui";

export const SinglePrayerTime: FC<ViewProps> = () => {
  return (
    <YStack gap="$2" className="aspect-[1] w-[130px] justify-center items-center rounded-full border border-white text-center">
      <Paragraph margin={0} fontWeight="800">
        Bomdod
      </Paragraph>
      <Paragraph fontSize={24}>04:33</Paragraph>
      <Paragraph fontWeight={"300"}>-08:08:17</Paragraph>
    </YStack>
  );
};
