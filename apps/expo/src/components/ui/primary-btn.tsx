import type { ButtonProps } from "tamagui";
import { Button } from "tamagui";

import { cn } from "~/utils/cn";

export function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      color="white"
      fontWeight="700"
      className={cn("bg-[#095AE3]", className!)}
      {...props}
    >
      {props.children}
    </Button>
  );
}
