import type { Config } from "tailwindcss";

export default {
  content: [""],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
        interBold: "Inter-Bold",
        interExtraBold: "Inter-ExtraBold",
        interRegular: "Inter-Regular",
        interMedium: "Inter-Medium",
        amiri: "Amiri-Regular",
        surah: "Surah",
        hafs: "Hafs",
      },
      colors: {
        primary: "#095AE3",
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
