import { createAnimations } from "@tamagui/animations-moti";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createFont, createTamagui } from "tamagui";

const interFont = createFont({
  family: "Inter",
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    true: 14,
    // ...
  },
  lineHeight: {
    true: 14,
  },
  weight: {
    700: 700,
    true: 400,
  },
  letterSpacing: {},

  // for native only, alternate family based on weight/style
  face: {
    // pass in weights as keys
    400: { normal: "Inter" },
    500: { normal: "InterMedium" },
    600: { normal: "InterSemiBold" },
    700: { normal: "InterBold" },
    800: { normal: "InterExtraBold" },
  },
});
const config = createTamagui({
  // @ts-expect-error library error
  animations: createAnimations({
    fast: {
      type: "spring",
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      type: "spring",
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      type: "spring",
      damping: 20,
      stiffness: 60,
    },
  }),
  defaultTheme: "primary",

  shouldAddPrefersColorThemes: true,

  themeClassNameOnRoot: true,

  shorthands,
  fonts: {
    body: interFont,
    heading: interFont,
  },
  themes: {
    ...themes,
    primary: {
      background: "#FFF",
      color: "#000",
      strongBg: "#F4F5F8",
    },
    sky: {
      background: "#095AE3",
      color: "#FFF",
    },
    skyOutlined: {
      color: "#095AE3",
      background: "#FFF",
    },
  },

  tokens,

  media: createMedia({
    xs: { maxWidth: 660 },

    sm: { maxWidth: 800 },

    md: { maxWidth: 1020 },

    lg: { maxWidth: 1280 },

    xl: { maxWidth: 1420 },

    xxl: { maxWidth: 1600 },

    gtXs: { minWidth: 660 + 1 },

    gtSm: { minWidth: 800 + 1 },

    gtMd: { minWidth: 1020 + 1 },

    gtLg: { minWidth: 1280 + 1 },

    short: { maxHeight: 820 },

    tall: { minHeight: 820 },

    hoverNone: { hover: "none" },

    pointerCoarse: { pointer: "coarse" },
  }),
});
export type AppConfig = typeof config;
declare module "tamagui" {
  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  type TamaguiCustomConfig = AppConfig;
}
export default config;
