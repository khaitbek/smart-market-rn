import { useRouter } from "expo-router";
import Ion from "@expo/vector-icons/Ionicons";
import type { ButtonProps } from "tamagui";
import { Button } from "tamagui";

export function Back({ className, ...props }: ButtonProps) {
  const { back, canGoBack } = useRouter();
  return (
    <Button
      className={className}
      onPress={() => {
        canGoBack() && back();
      }}
      icon={<Ion size={24} name="arrow-back" />}
      {...props}
    />
  );
}
