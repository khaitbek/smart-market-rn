import { useRootNavigationState } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Button, XStack } from "tamagui";

import { ActionLayout } from "~/components/layout/action";
import { MyStack } from "~/components/ui/my-stack";
import type { Locale } from "~/lang";
import { useLangStore } from "~/store/lang-store";

export default function Welcome() {
  const { messages } = useLangStore();
  return (
    <MyStack>
      <ActionLayout
        title={messages?.interface.choose_lang}
        subtitle={messages?.interface.choose_preferred_lang}
      >
        <XStack gap="$4">
          <LanguageSelect />
        </XStack>
      </ActionLayout>
    </MyStack>
  );
}

function LanguageSelect() {
  const navigation = useNavigation();
  const navigationState = useRootNavigationState();
  const { setLang } = useLangStore();
  function setLangAndRedirectToLogin(lang: Locale) {
    setLang(lang);
    if (!navigationState?.key) return;
    navigation.navigate("Login" as never);
  }

  return (
    <>
      <Button
        theme="light"
        textProps={{
          lineHeight: 16.0,
          fontSize: 16.0,
        }}
        onPress={() => setLangAndRedirectToLogin("en")}
      >
        English
      </Button>
      <Button
        theme="light"
        textProps={{
          lineHeight: 16.0,
          fontSize: 16.0,
        }}
        onPress={() => setLangAndRedirectToLogin("kh")}
      >
        Khmer
      </Button>
    </>
  );
}
