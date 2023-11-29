/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ReactElement } from "react";
import { cloneElement, useContext } from "react";
import { getSize, getSpace } from "@tamagui/get-token";
import type { GetProps, SizeTokens } from "@tamagui/web";
import {
  createStyledContext,
  Stack,
  styled,
  Text,
  useTheme,
  withStaticProperties,
} from "@tamagui/web";

export const ButtonContext = createStyledContext({
  size: "$md" as SizeTokens,
});
export const ButtonFrame = styled(Stack, {
  name: "Button",

  context: ButtonContext,

  backgroundColor: "$background",

  alignItems: "center",

  flexDirection: "row",
  hoverStyle: {
    backgroundColor: "$backgroundHover",
  },
  pressStyle: {
    backgroundColor: "$backgroundPress",
  },
  variants: {
    size: {
      "...size": (name, { tokens }) => {
        return {
          height: tokens.size[name],

          borderRadius: tokens.radius[name],

          // note the getSpace and getSize helpers will let you shift down/up token sizes

          // whereas with gap we just multiply by 0.2

          // this is a stylistic choice, and depends on your design system values
          // @ts-expect-error looks like an error with the tamagui itself
          gap: tokens.space?.[name]?.val * 0.2,

          paddingHorizontal: getSpace(name, {
            shift: -1,
          }),
        };
      },
    },
  } as const,
  defaultVariants: {
    size: "$md",
  },
});
export type ButtonProps = GetProps<typeof ButtonFrame>;
export const ButtonText = styled(Text, {
  name: "ButtonText",

  context: ButtonContext,

  color: "$color",

  userSelect: "none",
  variants: {
    size: {
      "...fontSize": (name, { font }) => ({
        // @ts-expect-error with tamagui
        fontSize: font?.size[name],
      }),
    },
  } as const,
});
const ButtonIcon = (props: { children: ReactElement }) => {
  const { size } = useContext(ButtonContext.context);

  const smaller = getSize(size, {
    shift: -2,
  });

  const theme = useTheme();

  return cloneElement(props.children, {
    size: smaller.val * 0.5,

    color: theme.color?.get?.(),
  });
};
export const Button = withStaticProperties(ButtonFrame, {
  Props: ButtonContext.Provider,

  Text: ButtonText,

  Icon: ButtonIcon,
});
