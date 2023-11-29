import { PortalProvider, ScrollView } from "tamagui";

import { SearchPageResults } from "./_components/search-results";

export default function SearchPage() {
  return (
    <ScrollView>
      <PortalProvider>
        <SearchPageResults />
      </PortalProvider>
    </ScrollView>
  );
}
