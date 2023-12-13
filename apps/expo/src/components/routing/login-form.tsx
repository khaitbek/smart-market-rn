import { useEffect } from "react";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { LmFormRhfProvider } from "@tamagui-extras/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Separator, Spinner, Text, YStack } from "tamagui";
import { z } from "zod";

import { useAuth } from "~/context/auth-context";
import type { Root } from "~/types/user";
import { getUserInfo, loginHandler } from "~/utils/api-utils";
import { useToast } from "../native-cn/toast-context";
import { CustomInput } from "../ui/custom-input";

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoginFields extends z.infer<typeof loginSchema> {}
WebBrowser.maybeCompleteAuthSession();
export function LoginForm() {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const { toast } = useToast();
  const {
    mutate: handleLogin,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationKey: ["login"],

    mutationFn: async (data: LoginFields) => {
      const loginRes = await loginHandler(data);
      return loginRes.data as Root;
    },
    onError() {
      toast("Username or password is incorrect", "destructive");
    },
    async onSuccess(data) {
      await login?.({
        provider: "credentials",
        token: data.token,
        session: data,
      });

      toast("Successfully authorized!", "success", 10000, "bottom", true);
      // navigationContainerRef.navigate("Home" as never);
      await queryClient.invalidateQueries({
        queryKey: ["session"],
      });
    },
  });
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "989495383111-2r49in6gn5thbt4gcef3sfsfo679615g.apps.googleusercontent.com",
    webClientId:
      "989495383111-i6ksh7unbs8b5h2a6dhapgmi3j6raer2.apps.googleusercontent.com",
    redirectUri: makeRedirectUri(),
  });
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  async function handleEffect() {
    if (response?.type === "success") {
      const loginResponse = await getUserInfo(
        response.authentication?.accessToken ?? "",
      );
      await login?.({
        provider: "google",
        session: loginResponse?.user,
        token: response.authentication?.accessToken,
      });
      toast("Successfully authorized!", "success", 10000, "bottom", true);
      await queryClient.invalidateQueries({
        queryKey: ["session"],
      });
      // navigationContainerRef.navigate("Home" as never);
    }
  }
  return (
    <LmFormRhfProvider<LoginFields>>
      {({ control, handleSubmit, reset }) => (
        <YStack gap="$3">
          <Text>{JSON.stringify(SecureStore.getItemAsync("session"))}</Text>
          <CustomInput
            fullWidth
            name="username"
            // @ts-expect-error @tamagui/extras-form needs to fix this
            control={control}
            placeholder="Username"
            required
          />
          <CustomInput
            fullWidth
            name="password"
            isPassword
            // @ts-expect-error @tamagui/extras-form needs to fix this
            control={control}
            required
          />
          <Button
            onPress={handleSubmit((data) => {
              handleLogin(data);
              if (isSuccess) reset();
            })}
            theme="sky"
          >
            {isLoading ? <Spinner size="small" /> : "Submit"}
          </Button>

          <Separator />
          <Button
            theme="light"
            disabled={!request}
            onPress={async () => {
              await promptAsync();
            }}
            alignItems="center"
          >
            <Text>Continue with</Text>
            <Text className="font-bold">Google</Text>
          </Button>
        </YStack>
      )}
    </LmFormRhfProvider>
  );
}
