import React from "react";
import { Stack } from "expo-router";

import { ProductViewBottom } from "./product/_components/product-view-bottom";
import { ProductViewTop } from "./product/_components/product-view-top";

// This is the main layout of the app
// It wraps your pages with the providers they need

const RootLayout = () => {
  return (
    <>
      <ProductViewTop />
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "#fff",
          },
          title: "Smart market",
          headerShown: false,
        }}
      />
      <ProductViewBottom />
    </>
  );
};

export default RootLayout;
