import { ScrollView, YStack } from "tamagui";

import { MainPageCategories } from "~/components/routing/main-page-categories";
import { MainPageAsaxiyBanner } from "~/components/ui/banner";
import { CheapestProducts } from "~/components/ui/cheapest-products";
import { Container } from "~/components/ui/container";
import { LatestProducts } from "~/components/ui/latest-products";
import { MyStack } from "~/components/ui/my-stack";
import { PopularProducts } from "~/components/ui/popular-products";

const Home = () => {
  return (
    <ScrollView>
      <MyStack>
        <Container>
          <YStack gap="$8">
            <MainPageAsaxiyBanner />
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
