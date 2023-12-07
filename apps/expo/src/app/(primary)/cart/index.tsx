import React from "react";
import { ScrollView, Stack } from "tamagui";

import { CartLatestInfo } from "./_components/cart-latest-info";
import { CartList } from "./_components/cart-list";

const CartPage = () => {
  return (
    <Stack className="h-full">
      <ScrollView backgroundColor="$background">
        <CartList />
      </ScrollView>
      <CartLatestInfo />
    </Stack>
  );
};

export default CartPage;
