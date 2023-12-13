import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "Smart Market",
  slug: "expo",
  scheme: "com.smartmarket.app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.smartmarket.app",
    supportsTablet: true,
  },
  android: {
    package: "com.smartmarket.app",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
    },
  },
  extra: {
    eas: {
      projectId: "6764ff05-8867-4e92-9595-cc0eac586ebb",
      // projectId: "f06a71f2-9742-4d29-a746-26765cdeb3fc",
      // projectId: "6764ff05-8867-4e92-9595-cc0eac586ebb",
      // projectId: "smart-market",
    },
  },
  // extra: {
  //   eas: {
  //     projectId: "your-eas-project-id",
  //   },
  // },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "./expo-plugins/with-modify-gradle.js",
    ["expo-community-flipper"], // first
    ["react-native-flipper-performance-plugin"],
  ],
});

export default defineConfig;
