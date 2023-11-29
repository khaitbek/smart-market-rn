import { useState } from "react";
import MIcon from "@expo/vector-icons/MaterialIcons";
import { Button, ListItem, View, YGroup } from "tamagui";

const items = [
  { name: "Apple" },
  { name: "Pear" },
  { name: "Blackberry" },
  { name: "Peach" },
  { name: "Apricot" },
  { name: "Melon" },
  { name: "Honeydew" },
  { name: "Starfruit" },
  { name: "Blueberry" },
  { name: "Raspberry" },
  { name: "Strawberry" },
  { name: "Mango" },
  { name: "Pineapple" },
  { name: "Lime" },
  { name: "Lemon" },
  { name: "Coconut" },
  { name: "Guava" },
  { name: "Papaya" },
  { name: "Orange" },
  { name: "Grape" },
  { name: "Jackfruit" },
  { name: "Durian" },
];
export function HeaderSortComponent() {
  const [openSortMenu, setOpenSortMenu] = useState<boolean>(false);
  return (
    <View overflow="visible" position="relative">
      <Button
        backgroundColor="#ccc"
        fontWeight="500"
        onPress={() => setOpenSortMenu((prev) => !prev)}
        flexDirection="row-reverse"
        icon={<MIcon name="sort" size={24} />}
      >
        Sort
      </Button>
      <YGroup
        display={openSortMenu ? "flex" : "none"}
        zIndex={20000000}
        top="100%"
        left={0}
        position="absolute"
        alignSelf="center"
        bordered
        backgroundColor="white"
        width={240}
        gap="$2"
      >
        <YGroup.Item>
          <ListItem fontWeight="400" fontSize="$4" hoverTheme>
            By popularity
          </ListItem>
        </YGroup.Item>
        <YGroup.Item>
          <ListItem fontWeight="400" fontSize="$4" hoverTheme>
            By price
          </ListItem>
        </YGroup.Item>
        <YGroup.Item>
          <ListItem fontWeight="400" fontSize="$4" hoverTheme>
            By rating
          </ListItem>
        </YGroup.Item>
        <YGroup.Item>
          <ListItem fontWeight="400" fontSize="$4" hoverTheme>
            By recommendations
          </ListItem>
        </YGroup.Item>
      </YGroup>
    </View>
  );
}
