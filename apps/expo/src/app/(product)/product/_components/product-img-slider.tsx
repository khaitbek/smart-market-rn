import { Image, View } from "tamagui";

import type { Product } from "~/types/product";
import { createImgUrl } from "~/utils/image";

interface ProductImageSliderProps {
  images: Product["photos"];
}

export function ProductImageSlider({ images }: ProductImageSliderProps) {
  if (!images) return <></>;
  return (
    <View backgroundColor="#F4F5F8" padding="$4">
      <Image
        className="mx-auto"
        source={{
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          uri: createImgUrl(images?.[0]?.id as unknown as string),
          width: 255,
          height: 255,
        }}
        marginHorizontal="auto"
        borderRadius={20}
      />
    </View>
  );
}
