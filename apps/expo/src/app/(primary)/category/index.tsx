import React from "react";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import type { StackProps, YStackProps } from "tamagui";
import {
  Button,
  Image,
  ScrollView,
  Stack,
  Text,
  XStack,
  YStack,
} from "tamagui";

import { CatalogGroupLoader } from "~/components/loaders/category";
import { AccountPageIcons } from "~/components/ui/icons";
import { useLangStore } from "~/store/lang-store";
import { getCatalogs } from "~/utils/api-utils";
import { createImgUrl } from "~/utils/image";

function CategoryPage() {
  const { lang } = useLangStore();
  const { data, isLoading } = useQuery({
    queryKey: ["catalog"],
    queryFn: async () =>
      await getCatalogs({
        lang,
      }),
  });
  if (isLoading)
    return (
      <CategoryPageContainer>
        <CatalogGroupLoader childCount={10} />
      </CategoryPageContainer>
    );
  return (
    <CategoryPageContainer>
      <CategoryList categories={data?.data?.categories ?? []} />
    </CategoryPageContainer>
  );
}

export function CategoryPageContainer({ children }: StackProps) {
  return (
    <Stack paddingHorizontal={16} backgroundColor="$background">
      <ScrollView>{children}</ScrollView>
    </Stack>
  );
}

interface CategoryListProps extends YStackProps {
  categories: Category[];
}

export function CategoryList({ categories, ...props }: CategoryListProps) {
  const { push } = useRouter();
  return (
    <YStack {...props}>
      {categories?.map((catalog) => (
        <XStack
          borderBottomWidth={1}
          borderColor="#E8EAEE"
          paddingVertical={8}
          paddingHorizontal={16}
          key={catalog.id}
        >
          {!!catalog.icon && (
            <Image
              source={{
                uri: createImgUrl(catalog.icon),
              }}
            />
          )}
          <XStack gap="$2" flexGrow={2}>
            <Text fontSize={12}>{catalog.name}</Text>
            <Text color="blue" fontSize={12}>
              ({catalog.amount})
            </Text>
          </XStack>
          <Button
            onPress={() => {
              push({
                pathname: "/(catalog)/catalog/[catalogId]",
                params: {
                  catalogId: catalog.id,
                },
              });
            }}
            unstyled
          >
            {AccountPageIcons.NEXT_PAGE({})}
          </Button>
        </XStack>
      ))}
    </YStack>
  );
}

export default CategoryPage;
