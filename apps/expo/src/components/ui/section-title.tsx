import type { HeadingProps } from "tamagui";
import { H2 } from "tamagui";

export function SectionTitle(props: HeadingProps) {
  return <H2 fontWeight="600" fontSize={15} {...props} />;
}
