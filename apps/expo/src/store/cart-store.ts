import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "~/types/product";

interface CartStoreDef {
  products: {
    id: number;
    count: number;
  }[];
  addToCart: (id: Product["id"]) => void;
  removeFromCart: (id: Product["id"]) => void;
  clear: () => void;
}

export const useCartStore = create(
  persist<CartStoreDef>(
    (set) => ({
      addToCart: (id) =>
        set((state) => ({
          products: [
            ...state.products,
            {
              id,
              count: 0,
            },
          ],
        })),
      clear: () =>
        set(() => ({
          products: [],
        })),
      products: [],
      removeFromCart: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
