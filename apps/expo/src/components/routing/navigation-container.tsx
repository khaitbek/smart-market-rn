import type { ReactNode } from "react";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";

export const navigationContainerRef = createNavigationContainerRef();
export function goBack() {
  if (navigationContainerRef.isReady()) {
    navigationContainerRef.goBack();
  } else {
    console.warn("Navigation ref isn't ready yet");
  }
}

export function NavigationContainerProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <NavigationContainer ref={navigationContainerRef} independent>
        {children}
      </NavigationContainer>
    </>
  );
}
