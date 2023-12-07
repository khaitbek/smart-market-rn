import { useRouter } from "expo-router";
import type { ButtonProps } from "tamagui";
import { Button } from "tamagui";

import {
  goBack,
  navigationContainerRef,
} from "~/components/routing/navigation-container";
import { BackIcon } from "./icons";

export function Back({ className, ...props }: ButtonProps) {
  const { canGoBack, back } = useRouter();
  return (
    <Button
      backgroundColor="$background"
      className={className}
      onPress={() => {
        navigationContainerRef.canGoBack() && goBack();
        if (navigationContainerRef.canGoBack()) goBack();
        else canGoBack() && back();
      }}
      icon={<BackIcon />}
      {...props}
    />
  );
}
