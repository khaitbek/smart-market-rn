import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Locale = "en" | "khmer";

interface LangStoreDef {
  lang: "en" | "khmer";
  setLang: (lang: Locale) => void;
}

export const useLangStore = create(
  persist<LangStoreDef>(
    (set) => ({
      lang: "en",
      setLang: (lang) => set(() => ({ lang })),
    }),
    {
      name: "lang-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
