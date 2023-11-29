/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { Suspense, useCallback } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { TamaguiProvider, Text, Theme } from "tamagui";

import { ToastProvider } from "~/components/native-cn/toast-context";
import { MySafeAreaView } from "~/components/ui/safe-area";
import { RQProvider } from "~/utils/api";
import config from "../../tamagui.config";

// This is the main layout of the app
// It wraps your pages with the providers they need

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Inter: require("../../assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("../../assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("../../assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("../../assets/fonts/Inter-Bold.ttf"),
    InterExtraBold: require("../../assets/fonts/Inter-ExtraBold.ttf"),
  });

  useCallback(async () => {
    await SplashScreen.hideAsync();
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;
  return (
    <RQProvider>
      <TamaguiProvider config={config}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Theme name="light">
            <ToastProvider>
              <MySafeAreaView>
                <Stack
                  screenOptions={{
                    contentStyle: {
                      backgroundColor: "#fff",
                      flex: 1,
                    },

                    title: "Smart market",
                    headerShown: false,
                  }}
                />
              </MySafeAreaView>
            </ToastProvider>
          </Theme>
        </Suspense>
      </TamaguiProvider>
    </RQProvider>
  );
};

export default RootLayout;
