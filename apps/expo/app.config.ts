import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "com.smartmarket.app",
  slug: "smart-market",
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
  plugins: ["expo-router", "./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
