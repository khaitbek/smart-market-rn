import { useQuery } from "@tanstack/react-query";

import { useAuth } from "~/context/auth-context";
import type { GoogleUser, Root } from "~/types/user";

export function UseAuthUser() {
  const { getCredentials } = useAuth();
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: async () => await getCredentials?.(),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const authorizedUser = JSON.parse(data?.session ?? "{}");
  return {
    user: authorizedUser as GoogleUser | Root,
    provider: data?.provider as "google" | "credentials",
  };
}
