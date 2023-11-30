import { Redirect } from "expo-router";
import { ScrollView, YStack } from "tamagui";

import { MainPageCategories } from "~/components/routing/main-page-categories";
import { CheapestProducts } from "~/components/ui/cheapest-products";
import { Container } from "~/components/ui/container";
import { LatestProducts } from "~/components/ui/latest-products";
import { MyStack } from "~/components/ui/my-stack";
import { PopularProducts } from "~/components/ui/popular-products";
import { useAuthStore } from "~/store/auth-store";

const Home = () => {
  const { authorized } = useAuthStore();
  if (!authorized) return <Redirect href="/welcome/" />;
  // return (
  //   <Redirect
  //     href={{
  //       pathname: "/(product)/product/[id]",
  //       params: {
  //         id: 450031,
  //       },
  //     }}
  //   />
  // );
  return (
    <ScrollView>
      <MyStack>
        <Container>
          <YStack gap="$8">
            <MainPageCategories />
            <CheapestProducts />
            <PopularProducts />
            <LatestProducts />
          </YStack>
        </Container>
      </MyStack>
    </ScrollView>
  );
};

export default Home;
