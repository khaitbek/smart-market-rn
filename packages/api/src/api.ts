import { publicApiClient } from "./client";

export async function getCategories(lang: "en" | "khmer") {
  return (
    await publicApiClient.get("/home/main/categories", {
      params: {
        lang,
      },
    })
  ).data as Category[];
}
