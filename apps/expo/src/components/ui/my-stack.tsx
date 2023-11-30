import { styled, YStack } from "tamagui";

export const MyStack = styled(YStack, {
  name: "MyStack",
  backgroundColor: "$background",
  flex: 1,
  justifyContent: "space-between",
  padding: "$4",
  space: "$true",
  className: "h-full h-screen",
});
