import type { ParagraphProps, StackProps } from "tamagui";
import { Paragraph, View, XStack } from "tamagui";

import { AppIcon, AsaxiyIcon } from "./icons";

export function MainPageAsaxiyBanner() {
  return (
    <BaseBanner>
      <BannerTitle marginBottom={2}>Endi asaxiy mahsulotlari</BannerTitle>
      <BannerSubTitle marginBottom={16} skewY="-2deg">
        smart-market.uz <Paragraph color="#000">da</Paragraph>
      </BannerSubTitle>
      <BannerDescription marginBottom={16}>
        Istalgan turdagi asaxiy ilovasi maxsulotlarini smart-market.uz orqali
        harid qiling.
      </BannerDescription>
      <XStack gap={16}>
        <AppIcon />
        <AsaxiyIcon />
      </XStack>
    </BaseBanner>
  );
}

function BaseBanner(props: StackProps) {
  return (
    <View
      borderRadius={12}
      padding={16}
      backgroundColor="#095AE3"
      width="100%"
      {...props}
    />
  );
}
function BannerTitle(props: ParagraphProps) {
  return (
    <Paragraph
      backgroundColor="black"
      color="white"
      borderRadius={6}
      padding={6}
      textTransform="uppercase"
      {...props}
    />
  );
}
function BannerSubTitle(props: ParagraphProps) {
  return (
    <Paragraph
      textTransform="uppercase"
      color="#095AE3"
      borderRadius={6}
      backgroundColor="white"
      padding={6}
      {...props}
    />
  );
}
function BannerDescription(props: ParagraphProps) {
  return <Paragraph color="white" {...props} />;
}
