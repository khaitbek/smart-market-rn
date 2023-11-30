import React, { lazy } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";

import { Back } from "~/components/ui/back";
import { Header } from "~/components/ui/header";
import {
  AccountPageTabIcon,
  CartPageTabIcon,
  CategoryPageTabIcon,
  FavoritesPageTabIcon,
  MainPageTabIcon,
} from "~/components/ui/icons";
import Home from ".";

const Category = lazy(() => import("./category"));
const Favorites = lazy(() => import("./favorites"));
const Cart = lazy(() => import("./cart"));
const Account = lazy(() => import("./account"));

// This is the main layout of the app
// It wraps your pages with the providers they need
const Tab = createBottomTabNavigator();
export const navigationContainerRef = createNavigationContainerRef();

// export function navigate(name: any, params: QueryParams) {
//   if (navigationContainerRef.isReady()) {
//     // Perform navigation if the react navigation is ready to handle actions
//   } else {
//     // You can decide what to do if react navigation is not ready
//     // You can ignore this, or add these actions to a queue you can call later
//   }
// }

export function goBack() {
  if (navigationContainerRef.isReady()) {
    navigationContainerRef.goBack();
  } else {
    console.warn("Navigation ref isn't ready yet");
  }
}

const RootLayout = () => {
  return (
    <NavigationContainer ref={navigationContainerRef} independent>
      <Tab.Navigator>
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
            headerLeft() {
              return <Back />;
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
            headerLeft() {
              return <Back />;
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
      {/* <Header />
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "#fff",
          },
          title: "Smart market",
          headerShown: false,
        }}
      /> */}
    </NavigationContainer>
  );
};

export default RootLayout;
