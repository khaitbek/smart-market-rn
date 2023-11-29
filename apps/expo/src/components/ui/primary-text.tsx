import type { TextProps } from "tamagui";
import { Text } from "tamagui";

export function PrimaryText(props: TextProps) {
  return <Text className="text-primary" fontSize={15} {...props} />;
}
