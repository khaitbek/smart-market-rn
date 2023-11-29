import React from "react";
import { Stack } from "expo-router";

import { SearchPageTop } from "./_components/search-page-top";

const RootLayout = () => {
  return (
    <>
      <SearchPageTop />
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
