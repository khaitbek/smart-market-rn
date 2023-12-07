import { useEffect } from "react";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { LmFormRhfProvider } from "@tamagui-extras/form";
import { useMutation } from "@tanstack/react-query";
import { Button, Separator, Spinner, Text, YStack } from "tamagui";
import { z } from "zod";

import { useAuthStore } from "~/store/auth-store";
import { getUserInfo } from "~/utils/api-utils";
import { cn } from "~/utils/cn";
import { CustomInput, inputStyles } from "../ui/custom-input";

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoginFields extends z.infer<typeof loginSchema> {}
WebBrowser.maybeCompleteAuthSession();
export function LoginForm() {
  const {
    mutate: handleLogin,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationKey: ["login"],
    // eslint-disable-next-line @typescript-eslint/require-await
    mutationFn: async (data: LoginFields) => {
      useAuthStore.setState({
        user: {
          ...data,
        },
        authorized: true,
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
  }, [response]);
  async function handleEffect() {
    const { authorized } = useAuthStore.getState();
    if (authorized) return;
    if (response?.type === "success") {
      await getUserInfo(response.authentication?.accessToken ?? "");
    }
  }
  return (
    <LmFormRhfProvider<LoginFields>>
      {({ control, handleSubmit, reset }) => (
        <YStack gap="$3">
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
            className={cn(inputStyles())}
            name="password"
            placeholder="Password"
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
