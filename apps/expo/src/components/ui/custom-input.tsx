import { LmInputRhf, LmInputRhfProps } from "@tamagui-extras/form";
import { cva } from "class-variance-authority";

export const inputStyles = cva(["font-semibold", "border", "rounded"], {
  variants: {
    intent: {
      primary: ["transition-all"],
      // **or**
      // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
      secondary: [],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      size: "medium",
      class: "uppercase",
      // **or** if you're a React.js user, `className` may feel more consistent:
      // className: "uppercase"
    },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export function CustomInput(props: LmInputRhfProps) {
  return (
    <LmInputRhf
      className={inputStyles({})}
      focusStyle={{
        borderColor: "blue",
      }}
      {...props}
    />
  );
}
