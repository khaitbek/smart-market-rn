import Ion from "@expo/vector-icons/Ionicons";
import type { ButtonProps } from "tamagui";
import { Button } from "tamagui";

import { goBack } from "~/app/(primary)/_layout";

export function Back({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={className}
      onPress={() => goBack()}
      icon={<Ion size={24} name="arrow-back" />}
      {...props}
    />
  );
}
