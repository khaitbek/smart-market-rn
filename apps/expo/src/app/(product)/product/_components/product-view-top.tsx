import { Path, Svg } from "react-native-svg";
import { useRouter } from "expo-router";
import { Button, XStack } from "tamagui";

import { Back } from "~/components/ui/back";

export function ProductViewTop() {
  const { push } = useRouter();
  return (
    <XStack justifyContent="space-between" alignItems="center" gap="$6">
      <Back
        backgroundColor="transparent"
        icon={
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M17.835 3.87l-1.78-1.77-9.89 9.9 9.9 9.9 1.77-1.77L9.705 12l8.13-8.13z"
              fill="#095AE3"
            />
          </Svg>
        }
        color="blue"
      />
      <XStack>
        <Button
          backgroundColor="transparent"
          icon={
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M18.175 22c-.783 0-1.454-.28-2.012-.837a2.744 2.744 0 01-.688-2.863L7.9 13.9c-.25.283-.558.512-.925.688a2.586 2.586 0 01-1.125.262c-.783 0-1.454-.28-2.012-.838A2.744 2.744 0 013 12c0-.8.28-1.475.837-2.025A2.765 2.765 0 015.85 9.15c.383 0 .75.075 1.1.225.35.15.667.367.95.65l7.575-4.35a1.742 1.742 0 01-.112-.4 2.59 2.59 0 01-.038-.425c0-.8.28-1.475.838-2.025A2.765 2.765 0 0118.175 2c.8 0 1.475.275 2.025.825.55.55.825 1.225.825 2.025 0 .783-.275 1.454-.825 2.013-.55.558-1.225.837-2.025.837-.383 0-.754-.063-1.113-.188a2.135 2.135 0 01-.912-.612l-7.575 4.2a4.619 4.619 0 01.125.9c0 .117-.012.242-.037.375a6.869 6.869 0 01-.088.4l7.575 4.3c.25-.233.542-.42.875-.563a2.918 2.918 0 011.15-.212c.8 0 1.475.275 2.025.825.55.55.825 1.225.825 2.025 0 .783-.275 1.454-.825 2.013-.55.558-1.225.837-2.025.837z"
                fill="#095AE3"
              />
            </Svg>
          }
        ></Button>
        <Button
          onPress={() => push("/")}
          backgroundColor="transparent"
          icon={
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M5.625 19.375H9V13h6v6.375h3.375V9.8L12 5.025 5.625 9.8v9.575zm0 1.975c-.55 0-1.017-.192-1.4-.575a1.905 1.905 0 01-.575-1.4V9.8c0-.3.07-.592.212-.875.142-.283.338-.517.588-.7L10.8 3.45a2.063 2.063 0 011.2-.4c.217 0 .425.033.625.1s.392.167.575.3l6.35 4.775c.25.183.45.417.6.7.15.283.225.575.225.875v9.575c0 .55-.196 1.017-.588 1.4a1.947 1.947 0 01-1.412.575h-5.2v-6.525h-2.35v6.525h-5.2z"
                fill="#095AE3"
              />
            </Svg>
          }
        ></Button>
        <Button
          backgroundColor="transparent"
          icon={
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.792 2H1v2h3.218l2.77 12.678H7V17h13v-.248l2.193-9.661L22.531 6H6.655l-.57-2.611L5.792 2zm14.195 6H7.092l1.529 7h9.777l1.589-7z"
                fill="#095AE3"
              />
              <Path
                d="M10 22a2 2 0 100-4 2 2 0 000 4zM19 20a2 2 0 11-4 0 2 2 0 014 0z"
                fill="#095AE3"
              />
            </Svg>
          }
        ></Button>
      </XStack>
    </XStack>
  );
}
