import RNSkeleton from "react-native-skeleton-placeholder";
import { ScrollView, YStack } from "tamagui";

import { Separator } from "../ui/separator";
import { ProductLoader } from "./product";

export function SingleProductLoader() {
  return (
    <ScrollView>
      <YStack gap={30}>
        <RNSkeleton>
          <YStack
            borderBottomWidth={1}
            borderBottomColor="#E8EAEE"
            gap="$4"
            separator={<Separator />}
          >
            {/* img */}
            <RNSkeleton.Item height={300} width="100%" />
            {/* main info */}
            <RNSkeleton.Item
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              padding={16}
            >
              <RNSkeleton.Item gap={8} marginRight={20}>
                <RNSkeleton.Item borderRadius={10} width={200} height={20} />
                <RNSkeleton.Item
                  borderRadius={10}
                  marginTop={6}
                  width={170}
                  height={20}
                />
              </RNSkeleton.Item>
              <RNSkeleton.Item width={60} height={60} borderRadius={50} />
            </RNSkeleton.Item>
            {/* price */}
            <RNSkeleton.Item gap={8} padding={16}>
              <RNSkeleton.Item borderRadius={10} width={200} height={20} />
              <RNSkeleton.Item
                borderRadius={10}
                marginTop={6}
                width={170}
                height={20}
              />
            </RNSkeleton.Item>
            {/* payment */}
            <RNSkeleton.Item
              flexDirection="row"
              justifyContent="space-between"
              padding={16}
              gap={16}
              width={200}
            >
              <RNSkeleton.Item
                width="auto"
                borderRadius={8}
                flexBasis="100%"
                maxWidth={100}
                height={40}
              ></RNSkeleton.Item>
              <RNSkeleton.Item
                width="auto"
                borderRadius={8}
                flexBasis="100%"
                maxWidth={100}
                height={40}
              ></RNSkeleton.Item>
              <RNSkeleton.Item
                width="auto"
                borderRadius={8}
                flexBasis="100%"
                maxWidth={100}
                height={40}
              ></RNSkeleton.Item>
            </RNSkeleton.Item>
            {/* phone */}
            <RNSkeleton.Item gap={16} padding={16}>
              <RNSkeleton.Item
                borderRadius={10}
                height={40}
                width="100%"
              ></RNSkeleton.Item>
              <RNSkeleton.Item
                borderRadius={10}
                height={20}
                width="100%"
                marginLeft="auto"
                marginRight="auto"
              ></RNSkeleton.Item>
            </RNSkeleton.Item>
            {/* location */}
            <RNSkeleton.Item marginBottom={40} padding={16}>
              <RNSkeleton.Item height={30} borderRadius={10} width="100%" />
            </RNSkeleton.Item>
            {/* characteristics */}
            <YStack gap={16} padding={16} marginBottom={16}>
              <RNSkeleton.Item
                width="100%"
                height={40}
                borderRadius={10}
              ></RNSkeleton.Item>
              <RNSkeleton.Item
                width="100%"
                height={40}
                borderRadius={10}
              ></RNSkeleton.Item>
              <RNSkeleton.Item
                width="100%"
                height={40}
                borderRadius={10}
              ></RNSkeleton.Item>
              <RNSkeleton.Item
                width="100%"
                height={40}
                borderRadius={10}
              ></RNSkeleton.Item>
              <RNSkeleton.Item
                width="100%"
                height={40}
                borderRadius={10}
              ></RNSkeleton.Item>
              <RNSkeleton.Item
                width="100%"
                height={40}
                borderRadius={10}
              ></RNSkeleton.Item>
              <RNSkeleton.Item
                width="100%"
                height={40}
                borderRadius={10}
              ></RNSkeleton.Item>
            </YStack>
          </YStack>
        </RNSkeleton>
        <ProductLoader childCount={10} />
      </YStack>
    </ScrollView>
  );
}
