const path = require("path");
const loadConfig = require("tailwindcss/loadConfig");

/** @type {import("tailwindcss").Config | null} */
let _tailwindConfig = null;
/**
 * Transpiles tailwind.config.ts for babel
 * Fix until nativewind babel plugin supports tailwind.config.ts files
 */

process.env.TAMAGUI_TARGET = "native";

function lazyLoadConfig() {
  return (
    _tailwindConfig ?? loadConfig(path.join(__dirname, "tailwind.config.ts"))
  );
}

/** @type {import("@babel/core").ConfigFunction} */
module.exports = function (api) {
  api.cache.forever();

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "nativewind/babel",
        {
          tailwindConfig: lazyLoadConfig(),
        },
      ],
      require.resolve("expo-router/babel"),
      [
        "transform-inline-environment-variables",
        // NOTE: include is optional, you can leave this part out
        {
          include: ["TAMAGUI_TARGET", "EXPO_ROUTER_APP_ROOT"],
        },
      ],
      [
        "@tamagui/babel-plugin",
        {
          components: [
            "tamagui",
            "@tamagui-extras/form",
            "@tamagui/lucide-icons",
          ],
          config: "./tamagui.config.ts",
          logTimings: true,
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
