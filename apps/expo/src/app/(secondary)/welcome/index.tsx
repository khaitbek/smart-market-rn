import { useRootNavigationState, useRouter } from "expo-router";
import { Button, XStack } from "tamagui";

import { ActionLayout } from "~/components/layout/action";
import { MyStack } from "~/components/ui/my-stack";
import { useLangStore } from "~/store/lang-store";

export default function Welcome() {
  return (
    <MyStack>
      <ActionLayout
        title="Choose language"
        subtitle="Choose your preferred language"
      >
        <XStack gap="$4">
          <LanguageSelect />
        </XStack>
      </ActionLayout>
    </MyStack>
  );
}

function LanguageSelect() {
  const navigationState = useRootNavigationState();
  const { push } = useRouter();
  const { setLang } = useLangStore();
  function setLangAndRedirectToLogin(lang: "en" | "khmer") {
    setLang(lang);
    if (!navigationState?.key) return;
    push("/login/");
  }

  return (
    <>
      <Button onPress={() => setLangAndRedirectToLogin("en")} fontSize={16.0}>
        English
      </Button>
      <Button
        onPress={() => setLangAndRedirectToLogin("khmer")}
        fontSize={16.0}
      >
        Khmer
      </Button>
    </>
  );
}
