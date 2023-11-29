import React from "react";
import { Stack } from "expo-router";

import { Header } from "~/components/ui/header";

// This is the main layout of the app
// It wraps your pages with the providers they need

const RootLayout = () => {
  return (
    <>
      <Header />
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "#fff",
          },
          title: "Smart market",
          headerShown: false,
        }}
      />
    </>
  );
};

export default RootLayout;
