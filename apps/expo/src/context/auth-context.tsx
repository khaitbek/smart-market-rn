import { createContext, ReactNode, useContext } from "react";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import axios from "axios";

import type { GoogleUser, Root } from "~/types/user";

type LoginProps = {
  token: string | undefined;
} & (
  | {
      provider: "google";
      session: GoogleUser | undefined;
    }
  | {
      provider: "credentials";
      session: Root | undefined;
    }
);

type AuthContextDef = Partial<{
  provider: "google" | "credentials";
  session: GoogleUser | Root | undefined;
  login: (props: LoginProps) => Promise<unknown>;
  logout: () => Promise<unknown>;
  getCredentials: () => Promise<{
    session: string | null;
    provider: string | null;
  }>;
}>;

// type AuthContextState = Partial<{
//   authenticated: true;
//   session: AuthContextDef["session"];
//   provider: LoginProps["provider"];
// }>;

export const AuthContext = createContext<AuthContextDef>({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const value: AuthContextDef = {
    async login(props) {
      await setItemAsync("token", props.token!);
      await setItemAsync("provider", props.provider);
      await setItemAsync("session", JSON.stringify(props.session));
      axios.defaults.headers.post.Authorization = `Bearer ${props.token}`;
      axios.defaults.headers.put.Authorization = `Bearer ${props.token}`;
      axios.defaults.headers.delete.Authorization = `Bearer ${props.token}`;
    },
    async logout() {
      await deleteItemAsync("token");
      await deleteItemAsync("provider");
      await deleteItemAsync("session");
    },
    async getCredentials() {
      const credentials = {
        session: await getItemAsync("session"),
        provider: await getItemAsync("provider"),
      };
      return credentials;
    },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
