import { useMemo } from "react";
import RNSkeleton from "react-native-skeleton-placeholder";
import { Stack } from "expo-router";

export function CartLoader({ childCount = 3 }: { childCount?: number }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const array = useMemo(() => Array(childCount).fill(""), [childCount]);
  return (
    <RNSkeleton>
      <Stack>
        {array.map((_, index) => (
          <RNSkeleton.Item key={index} gap={32} padding={16}>
            <RNSkeleton.Item
              height={30}
              borderRadius={10}
              width="100%"
            ></RNSkeleton.Item>
            <RNSkeleton.Item flexDirection="row" gap={12}>
              <RNSkeleton.Item width={100} height={150} borderRadius={10} />
              <RNSkeleton.Item flexGrow={1} gap={30}>
                <RNSkeleton.Item width="80%" borderRadius={10} height={30} />
                <RNSkeleton.Item width="80%" borderRadius={10} height={30} />
                <RNSkeleton.Item width="80%" borderRadius={10} height={30} />
              </RNSkeleton.Item>
            </RNSkeleton.Item>
          </RNSkeleton.Item>
        ))}
      </Stack>
    </RNSkeleton>
  );
}
