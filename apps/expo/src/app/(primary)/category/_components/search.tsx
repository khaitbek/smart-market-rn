import { useGlobalSearchParams, useRouter } from "expo-router";
import type { InputProps } from "tamagui";
import { Input } from "tamagui";

export function CategorySearchInput(props: InputProps) {
  const { setParams } = useRouter();
  const { categoryGroup } = useGlobalSearchParams();

  return (
    <Input
      defaultValue={(categoryGroup as string) ?? ""}
      onChange={(evt) => {
        const val = evt.nativeEvent.text;
        setParams({
          categoryGroup: val,
        });
      }}
      borderColor="#E8EAEE"
      placeholder="Search categories"
      {...props}
    />
  );
}
