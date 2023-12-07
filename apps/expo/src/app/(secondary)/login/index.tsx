import { ActionLayout } from "~/components/layout/action";
import { LoginForm } from "~/components/routing/login-form";
import { MyStack } from "~/components/ui/my-stack";

export default function Login() {
  return (
    <MyStack>
      <ActionLayout
        title="Войти в систему"
        subtitle="Выберите удобный для вас способ
входа в систему"
      >
        <LoginForm />
      </ActionLayout>
    </MyStack>
  );
}
