import React, { lazy } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useQuery } from "@tanstack/react-query";
import { H2, Image, XStack } from "tamagui";

import { NavigationContainerProvider } from "~/components/routing/navigation-container";
import { Back } from "~/components/ui/back";
import { Header } from "~/components/ui/header";
import {
  AccountPageTabIcon,
  CartPageTabIcon,
  CategoryPageTabIcon,
  FavoritesPageTabIcon,
  MainPageTabIcon,
} from "~/components/ui/icons";
import { useAuth } from "~/context/auth-context";
import { UseAuthUser } from "~/hooks/use-auth-user";
import { GoogleUser, Root } from "~/types/user";
import { createImgUrl } from "~/utils/image";
import Home from ".";
import Login from "../(secondary)/login";
import Welcome from "../(secondary)/welcome";
import { CategorySearchInput } from "./category/_components/search";

const Category = lazy(() => import("./category"));
const Favorites = lazy(() => import("./favorites"));
const Cart = lazy(() => import("./cart"));
const Account = lazy(() => import("./account"));

// This is the main layout of the app
// It wraps your pages with the providers they need
const Tab = createBottomTabNavigator();
export const navigationContainerRef = createNavigationContainerRef();
export const Stack = createStackNavigator();
// export function navigate(name: any, params: QueryParams) {
//   if (navigationContainerRef.isReady()) {
//     // Perform navigation if the react navigation is ready to handle actions
//   } else {
//     // You can decide what to do if react navigation is not ready
//     // You can ignore this, or add these actions to a queue you can call later
//   }
// }

const RootLayout = () => {
  const { getCredentials } = useAuth();
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: async () => await getCredentials?.(),
  });
  if (!data?.session) {
    return (
      <NavigationContainerProvider>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={Login}
          />
        </Stack.Navigator>
      </NavigationContainerProvider>
    );
  }
  return (
    <NavigationContainerProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            padding: 16,
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: MainPageTabIcon,
            header() {
              return <Header />;
            },
            // headerShown: false,
          }}
          name="Home"
          // component={Home}
          component={Home}
        />
        <Tab.Screen
          options={{
            header() {
              return (
                <XStack padding={16} backgroundColor="$background" gap="$2">
                  <Back />
                  <CategorySearchInput
                    focusStyle={{
                      borderColor: "blue",
                    }}
                    flexGrow={2}
                  />
                </XStack>
              );
            },
            tabBarIcon: CategoryPageTabIcon,
          }}
          name="Category"
          component={Category}
        />
        <Tab.Screen
          options={{
            headerLeft() {
              return <Back />;
            },
            tabBarIcon: FavoritesPageTabIcon,
          }}
          name="Favorites"
          component={Favorites}
        />
        <Tab.Screen
          options={{
            headerLeft() {
              return <Back />;
            },
            tabBarIcon: CartPageTabIcon,
          }}
          name="Cart"
          component={Cart}
        />
        <Tab.Screen
          options={{
            header() {
              return <ProfileTop />;
            },
            tabBarIcon({ focused }) {
              const fillColor = focused ? "blue" : "#AFB6C0";
              return <AccountPageTabIcon fill={fillColor} />;
            },
          }}
          name="Account"
          component={Account}
        />
      </Tab.Navigator>
    </NavigationContainerProvider>
  );
};

export default RootLayout;

function ProfileTop() {
  const { provider, ...props } = UseAuthUser();
  let user;
  if (provider === "credentials") {
    user = (props.user as Root).user;

    return (
      <XStack
        alignItems="center"
        backgroundColor="$background"
        gap="$3"
        paddingVertical={8}
        paddingHorizontal={16}
      >
        {!!user.photo && (
          <ProfileImg alt={user.fullName} url={createImgUrl(user.photo)} />
        )}
        <H2>{user.postName}</H2>
      </XStack>
    );
  }
  user = props.user as GoogleUser;
  return (
    <XStack
      alignItems="center"
      backgroundColor="$background"
      gap="$3"
      paddingVertical={8}
      paddingHorizontal={16}
    >
      <ProfileImg alt={user.name} url={user.picture} />
      <H2>{user.name}</H2>
    </XStack>
  );
}
function ProfileImg({ url, alt }: { url: string; alt: string }) {
  return (
    <Image
      source={{
        uri: url,
        width: 40,
        height: 40,
        cache: "force-cache",
      }}
      alt={alt}
      style={{
        borderRadius: 100,
      }}
    />
  );
}
