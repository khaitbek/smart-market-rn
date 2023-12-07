import React, { lazy } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
import { useAuthStore } from "~/store/auth-store";
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
  const { authorized } = useAuthStore();
  if (!authorized) {
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
              const user = useAuthStore.getState().user as GoogleUser;
              return (
                <XStack
                  alignItems="center"
                  backgroundColor="$background"
                  gap="$3"
                  paddingVertical={8}
                  paddingHorizontal={16}
                >
                  <Image
                    source={{
                      uri: user.picture,
                      width: 40,
                      height: 40,
                      cache: "force-cache",
                    }}
                    alt={user.name}
                    style={{
                      borderRadius: 100,
                    }}
                  />
                  <H2>{user.name}</H2>
                </XStack>
              );
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
