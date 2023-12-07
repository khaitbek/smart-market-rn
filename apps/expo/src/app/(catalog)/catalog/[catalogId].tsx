import { Link, useGlobalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, Separator, Text, XStack, YStack } from "tamagui";

import { MyStack } from "~/components/ui/my-stack";
import { useLangStore } from "~/store/lang-store";
import { getSingleCatalog } from "~/utils/api-utils";

export default function SingleCatalogView() {
  const { catalogId } = useGlobalSearchParams();
  const { lang } = useLangStore();
  const { data: subCatalogs } = useQuery({
    queryKey: ["catalog", catalogId],
    queryFn: async () =>
      await getSingleCatalog({
        id: +catalogId!,
        lang,
      }),
  });
  return (
    <MyStack paddingHorizontal={16} backgroundColor="$background">
      <ScrollView>
        <YStack
          separator={
            <Separator backgroundColor="#E8EAEE" borderColor="#E8EAEE" />
          }
        >
          {subCatalogs?.subCatalogs?.map((subCatalog) => (
            <SubCatalog
              id={subCatalog.id}
              amount={subCatalog.amount}
              name={subCatalog.name}
              key={subCatalog.id}
            />
          ))}
        </YStack>
      </ScrollView>
    </MyStack>
  );
}

interface SubCatalogProps {
  name: Category["name"];
  amount: Category["amount"];
  id: Category["id"];
}

function SubCatalog({ amount, name, id }: SubCatalogProps) {
  return (
    <Link
      href={{
        pathname: "/(secondary)/products/[catalogId]",
        params: {
          catalogId: id,
        },
      }}
    >
      <XStack paddingVertical={16} alignItems="center" gap="$2">
        <Text>{name}</Text>
        <Text color="blue">({amount})</Text>
      </XStack>
    </Link>
  );
}
