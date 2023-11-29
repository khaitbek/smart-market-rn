import type { FC } from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";

import { cn } from "~/utils/cn";

export const Flex: FC<ViewProps> = ({ ...props }) => {
  return <View className={cn("flex flex-row")} {...props} />;
};
