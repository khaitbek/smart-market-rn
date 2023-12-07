import type { YStackProps } from "tamagui";
import { H2, Paragraph, YStack } from "tamagui";

import { EmptySearchIcon } from "./icons";

export function EmptySearch(props: YStackProps) {
  return (
    <YStack alignItems="center" gap="$3" {...props}>
      <EmptySearchIcon />
      <H2>No results found</H2>
      <Paragraph
        color="#A1A1A9"
        textAlign="center"
        lineHeight={14}
        fontSize={14}
      >
        Unfortunately, your search returned no results. There may be an error in
        the product name or we do not have such a product.
      </Paragraph>
    </YStack>
  );
}
