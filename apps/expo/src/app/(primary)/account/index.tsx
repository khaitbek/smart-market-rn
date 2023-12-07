import React from "react";
import { Link } from "expo-router";
import type { TextProps, XStackProps } from "tamagui";
import { ScrollView, Stack, Text, View, XStack, YStack } from "tamagui";

import { AccountPageIcons } from "~/components/ui/icons";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { useAuthStore } from "~/store/auth-store";

const AccountPage = () => {
  const { signOut } = useAuthStore();
  return (
    <Stack paddingVertical={4} className="h-full">
      <ScrollView>
        <YStack gap={4}>
          <AccountGroup
            label="Personal details"
            leftIcon={AccountPageIcons.PERSONAL_DETAILS({})}
          >
            <Link href="/search/">
              {AccountPageIcons.NEXT_PAGE({
                width: 20,
                height: 20,
              })}
            </Link>
          </AccountGroup>
          <InnerAccountGroup
            label="Documents"
            leftIcon={AccountPageIcons.DOCUMENTS({})}
          >
            <YStack gap="$1">
              <AccountGroup
                paddingLeft={50}
                className="border-b border-gray-200"
                label="Contracts"
                leftIcon={<></>}
              >
                <Link href="/search/">
                  {AccountPageIcons.NEXT_PAGE({
                    width: 20,
                    height: 20,
                  })}
                </Link>
              </AccountGroup>
              <AccountGroup
                paddingLeft={50}
                className="border-b border-gray-200"
                label="Invoices"
                leftIcon={<></>}
              >
                <Link href="/search/">
                  {AccountPageIcons.NEXT_PAGE({
                    width: 20,
                    height: 20,
                  })}
                </Link>
              </AccountGroup>
              <AccountGroup
                paddingLeft={50}
                className=" border-gray-200"
                label="Cash"
                leftIcon={<></>}
              >
                <Link href="/search/">
                  {AccountPageIcons.NEXT_PAGE({
                    width: 20,
                    height: 20,
                  })}
                </Link>
              </AccountGroup>
            </YStack>
          </InnerAccountGroup>
          <AccountGroup
            label="Notifications"
            leftIcon={AccountPageIcons.NOTIFICATIONS({})}
          >
            <XStack gap="$2">
              <Text
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                backgroundColor="#B3261E"
                color="$background"
                width={20}
                height={20}
                borderRadius={100}
              >
                3
              </Text>
              <Link href="/search/">
                {AccountPageIcons.NEXT_PAGE({
                  width: 20,
                  height: 20,
                })}
              </Link>
            </XStack>
          </AccountGroup>
          <AccountGroup label="Cards" leftIcon={AccountPageIcons.CARDS({})}>
            <Link href="/search/">
              {AccountPageIcons.NEXT_PAGE({
                width: 20,
                height: 20,
              })}
            </Link>
          </AccountGroup>
          <AccountGroup
            label="Orders"
            leftIcon={AccountPageIcons.NOTIFICATIONS({})}
          >
            <XStack alignItems="center" gap="$2">
              <Text
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                backgroundColor="#B3261E"
                color="$background"
                width={6}
                height={6}
                borderRadius={100}
              />
              <Link href="/search/">
                {AccountPageIcons.NEXT_PAGE({
                  width: 20,
                  height: 20,
                })}
              </Link>
            </XStack>
          </AccountGroup>
          <AccountGroup
            label="Favorites"
            leftIcon={AccountPageIcons.FAVORITES({})}
          >
            <Link href="/search/">
              {AccountPageIcons.NEXT_PAGE({
                width: 20,
                height: 20,
              })}
            </Link>
          </AccountGroup>
          <AccountGroup label="Cart" leftIcon={AccountPageIcons.CART({})}>
            <Link href="/search/">
              {AccountPageIcons.NEXT_PAGE({
                width: 20,
                height: 20,
              })}
            </Link>
          </AccountGroup>
          <AccountGroup
            label="Trusted devices"
            leftIcon={AccountPageIcons.TRUSTED_DEVICES({})}
          >
            <Link href="/search/">
              {AccountPageIcons.NEXT_PAGE({
                width: 20,
                height: 20,
              })}
            </Link>
          </AccountGroup>
          <AccountGroup
            label="Dark mode"
            leftIcon={AccountPageIcons.DARK_MODE({})}
          >
            <ModeToggle />
          </AccountGroup>
          <AccountGroup
            onPress={() => signOut()}
            focusable
            label="Log out"
            leftIcon={AccountPageIcons.LOGOUT({})}
            labelProps={{
              color: "#FB577C",
            }}
          />
        </YStack>
      </ScrollView>
    </Stack>
  );
};

interface AccountGroupProps extends XStackProps {
  leftIcon: JSX.Element;
  label: string;
  labelProps?: TextProps;
}

function AccountGroup({
  leftIcon,
  label,
  children,
  labelProps,
  ...props
}: AccountGroupProps) {
  return (
    <XStack
      backgroundColor="$background"
      alignItems="center"
      gap="$3"
      padding={16}
      {...props}
    >
      {leftIcon}
      <View flexGrow={2}>
        <Text fontSize={12} {...labelProps}>
          {label}
        </Text>
      </View>
      {children}
    </XStack>
  );
}

function InnerAccountGroup({
  leftIcon,
  label,
  children,
  ...props
}: AccountGroupProps) {
  return (
    <YStack backgroundColor="$background" {...props}>
      <XStack paddingHorizontal={16} paddingBottom={0} paddingTop={8} gap="$3">
        {leftIcon}
        <View flexGrow={2}>
          <Text fontSize={12}>{label}</Text>
        </View>
      </XStack>
      {children}
    </YStack>
  );
}

export default AccountPage;
