import type { FC } from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";

import { cn } from "~/utils/cn";

export const Grid: FC<ViewProps> = ({ ...props }) => {
  return <View className={cn("grid")} {...props} />;
};
