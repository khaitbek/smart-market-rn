/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios";

import type { Locale } from "~/lang/index";
import type {
  FavoriteProducts,
  Product,
  ProductByCategory,
  ProductGetResponse,
  SingleProduct,
  SingleProductDetails,
} from "~/types/product";
import type { GoogleUser, LoginPayload } from "~/types/user";

export const baseApiClient = axios.create({
  baseURL: "https://api.kh.smart-market.uz",
});
export const publicApiClientV3 = axios.create({
  baseURL: "https://api.kh.smart-market.uz/api/v3",
});
export const publicApiClientV2 = axios.create({
  baseURL: "https://api.kh.smart-market.uz/api/v2",
});
export const publicApiClientV1 = axios.create({
  baseURL: "https://api.kh.smart-market.uz/api/v1",
});
export const uploadsApiClient = axios.create({
  baseURL: "https://api.cabinet.smart-market.uz/uploads",
});
export async function loginHandler({ password, username }: LoginPayload) {
  return await baseApiClient.post("/auth/login", {
    password,
    username,
  });
}
export async function getUserInfo(token: string) {
  if (!token) return;
  try {
    const response = await axios.get(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const user = (await response.data) as GoogleUser;
    return {
      user,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export async function getPopularProducts(
  max: number,
  code = 0,
): Promise<ProductGetResponse> {
  return (
    await publicApiClientV3.get("/mobile/products/popular", {
      params: {
        page_size: max,
        unit_id: code,
      },
    })
  ).data.data as ProductGetResponse;
}
export async function getLatestProducts(
  size = 5,
  code = 4,
): Promise<ProductGetResponse> {
  return (
    await publicApiClientV2.get("/home/product/new", {
      params: {
        page_size: size,
        code,
      },
    })
  ).data.data as ProductGetResponse;
}

interface GetSingleProductProps {
  product_id: Product["id"];
  lang?: Locale;
  region_id?: number;
  district_id?: number;
}

export async function getSingleProduct({
  region_id = 26,
  district_id = 2601,
  lang = "en",
  product_id,
}: GetSingleProductProps) {
  return (
    await publicApiClientV2.get("/sync/frontend/catalog/product/detail", {
      params: {
        region_id,
        district_id,
        lang,
        product_id,
      },
    })
  ).data as unknown as SingleProduct;
}
export async function getCheapestProducts(
  size = 5,
  code = 4,
): Promise<ProductGetResponse> {
  return (
    await publicApiClientV3.get("/home/product/cheap", {
      params: {
        page_size: size,
        code,
      },
    })
  ).data.data as ProductGetResponse;
}

interface GetProductsByCategoryProps {
  category_id: number;
  lang?: Locale;
  page?: number;
  page_size?: number;
  sorting?: string;
  order?: "asc" | "desc";
  all_regions?: number;
}

export async function getProductsByCategory({
  category_id,
  page = 1,
  page_size = 5,
  sorting = "popular",
  order = "asc",
  all_regions = 1,
  lang,
}: GetProductsByCategoryProps) {
  return (
    await publicApiClientV2.get("/sync/frontend/catalog/products", {
      params: {
        category_id,
        lang,
        page,
        page_size,
        sorting,
        order,
        all_regions,
      },
    })
  ).data as ProductByCategory;
}

interface SearchProductsProps extends GetProductsByCategoryProps {
  query: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(cb: Function, delay = 1000) {
  let timer: NodeJS.Timeout;
  return (...args: never[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
export const debounceSearch = debounce(searchProducts);
export async function searchProducts({
  query = "",
  ...params
}: SearchProductsProps) {
  if (!params.category_id) return [];
  const products = await getProductsByCategory({
    ...params,
  });
  const filteredProducts = products.data.products.filter((p) => {
    const regex = new RegExp(query, "i");
    return regex.test((p as unknown as SingleProductDetails).name);
  });
  return filteredProducts;
}
export async function deepSearchProducts({ query }: { query: string }) {
  const products = await getCheapestProducts(50);
  const regexPattern = new RegExp(query, "i");
  const filteredProducts = products.products.filter((p) =>
    regexPattern.test((p as unknown as SingleProduct["data"]).name),
  );
  return filteredProducts;
}
export async function getCategories(lang: Locale) {
  return (
    await publicApiClientV2.get("/home/main/categories", {
      params: {
        lang,
      },
    })
  ).data.data as Category[];
}

interface GetCatalogProps {
  code?: number;
  lang: Locale;
}

interface GetSingleCatalogProps extends GetCatalogProps {
  id: Category["id"];
}

export async function getCatalogs({ lang, code }: GetCatalogProps) {
  return (
    await publicApiClientV1.get("/sync/frontend/catalogs", {
      params: {
        lang,
        code,
      },
    })
  ).data as Catalogs;
}
export async function getSingleCatalog({ lang, id }: GetSingleCatalogProps) {
  const catalogs = await getCatalogs({
    lang,
  });
  const catalog = catalogs.data.categories.find((c) => c.id === id);
  const subCatalogs = catalogs.data.categories.filter(
    (c) => c.parent_id === catalog?.parent_id,
  );
  return {
    catalog,
    subCatalogs,
  };
}

interface SearchCatalogProps {
  lang: Locale;
  query: string;
}

export async function searchCatalogs({ lang, query }: SearchCatalogProps) {
  const categories = await getCatalogs({
    lang,
  });
  const queryRegex = new RegExp(query, "i");
  const filteredCategories = categories.data.categories.filter((c) =>
    queryRegex.test(c.name),
  );
  return filteredCategories;
}

// regions
export async function getRegions(lang: Locale) {
  return (
    await publicApiClientV1.get("/sync/frontend/region", {
      params: {
        lang,
      },
    })
  ).data as Region;
}

// sellers
interface GetSellerProps {
  lang: Locale;
  category_id: number;
  page: number;
  page_size: number;
  search: string;
  all_regions: number;
}
export async function getSellers({
  category_id = 0,
  page = 1,
  page_size = 20,
  search = "",
  all_regions = 1,
  ...params
}: Partial<GetSellerProps>) {
  return (
    await publicApiClientV2.get("/filters", {
      params: {
        category_id,
        page,
        page_size,
        search,
        all_regions,
        ...params,
      },
    })
  ).data as Seller;
}

// cart
interface GetProductsByMultipleIdsProps {
  ids: string;
}
export async function getProductsByMultipleIds({
  ids,
}: GetProductsByMultipleIdsProps) {
  const data = (
    await publicApiClientV2.get("/products_by_ids", {
      params: {
        ids,
      },
    })
  ).data as FavoriteProducts;
  return data;
}
