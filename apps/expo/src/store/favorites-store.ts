import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "~/types/product";

interface FavoriteStoreDef {
  products: number[];
  addToFavorites: (id: Product["id"]) => void;
  removeFromFavorites: (id: Product["id"]) => void;
  clear: () => void;
}

export const useFavoriteStore = create(
  persist<FavoriteStoreDef>(
    (set) => ({
      addToFavorites: (id) =>
        set((state) => ({
          products: [...state.products, id],
        })),
      clear: () =>
        set(() => ({
          products: [],
        })),
      products: [],
      removeFromFavorites: (id) =>
        set((state) => ({
          products: state.products.filter((p) => +p !== +id),
        })),
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
