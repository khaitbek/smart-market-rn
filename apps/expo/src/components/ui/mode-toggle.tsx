import { useState } from "react";
import { Switch } from "@tamagui/switch";
import { updateTheme } from "@tamagui/theme";
import { useThemeName } from "tamagui";

export function ModeToggle() {
  const [check, setCheck] = useState<boolean>();
  const theme = useThemeName({ parent: true });
  const toggleDarkMode = () => {
    updateTheme({
      name: "dark",
      theme: {},
    });
  };
  return (
    <Switch
      onCheckedChange={(val) => {
        toggleDarkMode();
        setCheck(val);
      }}
      theme={check ? "dark" : "light"}
      size="$2"
    >
      <Switch.Thumb animation="quickest" />
    </Switch>
  );
}
