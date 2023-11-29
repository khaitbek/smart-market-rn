import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStoreStateDef {
  authorized: boolean;
  signIn: () => void;
  signOut: () => void;
  user: object;
}

export const useAuthStore = create(
  persist<AuthStoreStateDef>(
    (set) => ({
      authorized: false,
      signIn() {
        return set({ authorized: true });
      },
      signOut() {
        return set({ authorized: false });
      },
      user: {},
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
