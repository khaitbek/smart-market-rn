import { Paragraph, Text, XStack, YStack } from "tamagui";

import { PrimaryButton } from "~/components/ui/primary-btn";

export function CartLatestInfo() {
  return (
    <XStack
      padding={20}
      backgroundColor="$background"
      className="border-t border-[#E8EAEE]"
      gap="$4"
      justifyContent="space-between"
    >
      <YStack>
        <XStack alignItems="baseline" gap="$3">
          <Text color="#7B7D81">Delivery:</Text>
          <XStack alignItems="baseline" gap="$2">
            <Paragraph>50000</Paragraph>
            <Text color="#7B7D81">UZS</Text>
          </XStack>
        </XStack>
        <XStack alignItems="baseline" gap="$3">
          <Text color="#7B7D81" className="mr-4">
            Total:
          </Text>
          <XStack alignItems="baseline" gap="$2">
            <Paragraph>50000</Paragraph>
            <Text color="#7B7D81">UZS</Text>
          </XStack>
        </XStack>
      </YStack>
      <PrimaryButton>Make an order (2)</PrimaryButton>
    </XStack>
  );
}
