import type { FC } from "react";
import React from "react";
import type { ViewProps } from "react-native";
import { Button, Paragraph, YStack } from "tamagui";

type WeekDay = Record<number, string>;
type Months = Record<number, string>;

const weekdays: WeekDay = {
  0: "Yakshanba",
  1: "Dushanba",
  2: "Seshanba",
  3: "Chorshanba",
  4: "Payshanba",
  5: "Juma",
  6: "Shanba",
};

const months: Months = {
  0: "Yanvar",
  1: "Fevral",
  2: "Mart",
  3: "Aprel",
  4: "May",
  5: "Iyun",
  6: "Iyul",
  7: "Avgust",
  8: "Sentabr",
  9: "Oktabr",
  10: "Noyabr",
  11: "Dekabr",
};

export const DateDisplayer: FC<ViewProps> = () => {
  const currentDate = new Date();
  return (
    <YStack gap="$3">
      <Paragraph>
        {weekdays[currentDate.getDay()]}, {currentDate.getDate()}{" "}
        {months[currentDate.getMonth()]}
      </Paragraph>
      <Button themeInverse>Toshkent</Button>
      
    </YStack>
  );
};
