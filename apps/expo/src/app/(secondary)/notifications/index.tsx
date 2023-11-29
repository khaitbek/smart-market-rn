import { useRouter } from "expo-router";
import Ion from "@expo/vector-icons/Ionicons";
import { Button, H3, View, XStack, YStack } from "tamagui";

export default function NotificationsPage() {
  const { back, canGoBack } = useRouter();
  return (
    <View className="flex h-full">
      <XStack>
        <Button
          onPress={() => {
            canGoBack() && back();
          }}
          icon={<Ion name="arrow-back" size={24} />}
        />
      </XStack>
      <YStack
        className="mx-auto flex-grow grid-rows-2 items-center justify-center px-4"
        gap="$4"
      >
        <Ion name="notifications-outline" size={64} />
        <H3 className="text-center ">You do not have any notifications</H3>
      </YStack>
    </View>
  );
}
