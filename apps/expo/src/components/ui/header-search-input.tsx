import { useRouter } from "expo-router";
import { Bell } from "@tamagui/lucide-icons";
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
          push("/search/");
        }}
      >
        Search...
      </Button>
      <Button
        theme="skyOutlined"
        onPress={() => push("/notifications/")}
        className="px-3"
        icon={<Bell size={24} />}
      ></Button>
    </XStack>
  );
}
