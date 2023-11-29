import { useRouter } from "expo-router";
import Icon from "@expo/vector-icons/Ionicons";
import { Button, XStack } from "tamagui";

export function HeaderSearchInput() {
  const { push } = useRouter();
  return (
    <XStack gap="$3">
      <Button
        color="gray"
        textAlign="left"
        className="flex-grow border border-black/5 bg-transparent px-0"
        onPress={() => {
          console.log("Clicked");
          push("/search/");
        }}
      >
        Search...
      </Button>
      <Button
        onPress={() => push("/notifications/")}
        className="px-3"
        icon={<Icon name="notifications" size={24} />}
      ></Button>
    </XStack>
  );
}
