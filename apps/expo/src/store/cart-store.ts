import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "~/types/product";

interface AddToCartProps {
  id: Product["id"];
  seller: Product["seller"];
}
export interface CartStoreDef {
  productIds: Product["id"][];
  products: Record<
    Product["seller"]["id"],
    {
      id: number;
      count: number;
      sellerName: Product["seller"]["name"];
    }[]
  >;
  addToCart: ({ id, seller }: AddToCartProps) => void;
  removeFromCart: ({ id, seller }: AddToCartProps) => void;
  clear: () => void;
}

export const useCartStore = create(
  persist<CartStoreDef>(
    (set) => ({
      productIds: [],
      addToCart: ({ id, seller }) =>
        set((state) => {
          console.log({
            id,
            seller,
          });
          const { products } = state;
          const copyProducts = {
            ...products,
          };
          const sellerCartProducts = copyProducts[seller.id] ?? [];
          copyProducts[seller.id] = [
            ...sellerCartProducts,
            {
              id,
              count: 0,
              sellerName: seller.name,
            },
          ];
          return {
            products: {
              ...copyProducts,
            },
            productIds: [...state.productIds, id],
          };
        }),
      clear: () =>
        set(() => ({
          products: {},
          productIds: [],
        })),
      products: [],
      removeFromCart: ({ id, seller }) =>
        set((state) => {
          const copyProducts = {
            ...state.products,
          };
          const mapKeyToFilter = copyProducts[seller.id] ?? [];
          copyProducts[seller.id] = mapKeyToFilter.filter((p) => p.id !== id);
          // mapKeyToFilter = copyProducts[seller.id]?.filter(p => p.id !== id)
          return {
            products: {
              ...copyProducts,
            },
            productIds: state.productIds.filter((i) => i !== id),
          };
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
