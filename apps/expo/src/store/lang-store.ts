import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Locale, Messages } from "~/lang";

interface LangStoreDef {
  lang: Locale;
  setLang: (lang: Locale) => void;
  messages: Messages | undefined;
}

export const useLangStore = create(
  persist<LangStoreDef>(
    (set) => ({
      lang: "en",
      setLang: (lang) => set(() => ({ lang })),
      messages: undefined,
    }),
    {
      name: "lang-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
