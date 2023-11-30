import type { FC } from "react";
import React from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";
import { XStack } from "tamagui";

import { HeaderSearchInput } from "./header-search-input";

export const Header: FC<ViewProps> = () => {
  return (
    <View>
      <XStack
        paddingHorizontal={20}
        paddingVertical={30}
        space
        justifyContent="space-between"
        alignItems="center"
        theme="primary"
        backgroundColor="$background"
      >
        <HeaderSearchInput />
      </XStack>
    </View>
  );
};
