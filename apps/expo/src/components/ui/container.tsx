import type { FC } from "react";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { View } from "tamagui";

type ContainerProps = ViewProps;

export const Container: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <View
      className="container mx-auto"
      style={{
        marginLeft: "auto",
        marginRight: "auto",
      }}
      {...props}
    >
      {children}
    </View>
  );
};
