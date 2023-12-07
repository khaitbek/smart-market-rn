import React, { Suspense } from "react";
import { Stack, useGlobalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { H2, XStack } from "tamagui";

import { CategoryLoader } from "~/components/loaders/category";
import { Back } from "~/components/ui/back";
import { useLangStore } from "~/store/lang-store";
import { getSingleCatalog } from "~/utils/api-utils";

// This is the main layout of the app
// It wraps your pages with the providers they need

const SingleCatalogViewLayout = () => {
  const { lang } = useLangStore();
  const { catalogId } = useGlobalSearchParams();
  const { data } = useQuery({
    queryKey: ["catalog", catalogId],
    queryFn: async () =>
      getSingleCatalog({
        lang,
        id: +catalogId!,
      }),
  });

  return (
    <Suspense
      fallback={
        <Stack>
          <CategoryLoader childCount={10} />
        </Stack>
      }
    >
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "#fff",
          },
          title: "Smart market",
          header() {
            return (
              <XStack alignItems="center">
                <Back />
                <H2>{data?.catalog?.name}</H2>
              </XStack>
            );
          },
        }}
      />
    </Suspense>
  );
};

export default SingleCatalogViewLayout;
