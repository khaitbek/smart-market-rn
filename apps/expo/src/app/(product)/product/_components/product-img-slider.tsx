import { ImageSlider } from "react-native-image-slider-banner";
import type { DataType } from "react-native-image-slider-banner/src";
import { View } from "tamagui";

import type { Product } from "~/types/product";
import { createImgUrl } from "~/utils/image";

interface ProductImageSliderProps {
  images: Product["photos"];
}
interface Image {
  id: string;
}
export function ProductImageSlider({ images }: ProductImageSliderProps) {
  if (!images) return <></>;
  return (
    <View backgroundColor="#F4F5F8">
      <ImageSlider
        data={
          ((images as Image[])?.map((image) => ({
            img: createImgUrl(image.id),
          })) as DataType[]) ?? []
        }
        autoPlay
        activeIndicatorStyle={{
          backgroundColor: "#FF4269",
        }}
      />
    </View>
  );
}
