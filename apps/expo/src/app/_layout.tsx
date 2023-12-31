/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { Suspense, useCallback, useLayoutEffect } from "react";
import ErrorBoundary from "react-native-error-boundary";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { connectToDevTools } from "react-devtools-core";
import { TamaguiProvider, Text, Theme } from "tamagui";

import { ToastProvider } from "~/components/native-cn/toast-context";
import { MySafeAreaView } from "~/components/ui/safe-area";
import { AuthContextProvider } from "~/context/auth-context";
import { getMessages } from "~/lang";
import { useLangStore } from "~/store/lang-store";
import { RQProvider } from "~/utils/api";
import config from "../../tamagui.config";

// This is the main layout of the app
// It wraps your pages with the providers they need
SplashScreen.preventAutoHideAsync();
connectToDevTools({
  host: "localhost",
  port: 8097,
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
require("react-native-performance-flipper-reporter").setupDefaultFlipperReporter();
if (__DEV__) {
}
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
  useLayoutEffect(() => {
    (async () => {
      const messages = await getMessages(useLangStore.getState().lang);
      useLangStore.setState({
        messages,
      });
    })();
  });
  if (!fontsLoaded) return null;
  return (
    <ErrorBoundary>
      <RQProvider>
        <AuthContextProvider>
          <TamaguiProvider config={config}>
            <Suspense fallback={<Text>Loading...</Text>}>
              <Theme name="primary" forceClassName>
                <ToastProvider>
                  <MySafeAreaView>
                    <Stack
                      screenOptions={{
                        contentStyle: {
                          flex: 1,
                          backgroundColor: "$background",
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
        </AuthContextProvider>
      </RQProvider>
    </ErrorBoundary>
  );
};

export default RootLayout;
