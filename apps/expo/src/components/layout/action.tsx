import type { ReactNode } from "react";
import { H2, Paragraph, View, YStack } from "tamagui";

import Logo from "../ui/logo";

interface ActionLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function ActionLayout({ title, subtitle, children }: ActionLayoutProps) {
  return (
    <View className="flex h-full flex-col items-start justify-center">
      <YStack marginBottom="$5" gap="$3">
        <Logo />
        <YStack>
          <H2 className="font-bold">{title}</H2>
          <Paragraph className="text-gray-500">{subtitle}</Paragraph>
        </YStack>
      </YStack>
      {children}
    </View>
  );
}
