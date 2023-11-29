import { publicApiClient } from "../client";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getCategories: publicProcedure.query(async () => {
    console.log("fetching categories....");
    return (await publicApiClient.get("/home/main/categories?lang=en"))
      .data as Category[];
  }),
});
