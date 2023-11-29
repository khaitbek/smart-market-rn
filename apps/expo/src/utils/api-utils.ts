/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios";

import { useAuthStore } from "~/store/auth-store";
import type { Locale } from "~/store/lang-store";
import type {
  Product,
  ProductByCategory,
  ProductGetResponse,
  SingleProduct,
} from "~/types/product";

export const publicApiClientV2 = axios.create({
  baseURL: "https://api.kh.smart-market.uz/api/v2",
});
export const publicApiClientV1 = axios.create({
  baseURL: "https://api.kh.smart-market.uz/api/v1",
});
export const uploadsApiClient = axios.create({
  baseURL: "https://api.cabinet.smart-market.uz/uploads",
});

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
    const user = (await response.data) as object;
    useAuthStore.setState({
      authorized: true,
      user,
    });
  } catch (error) {
    return {
      error,
    };
  }
}

export async function getPopularProducts(
  max: number,
  code = 12,
): Promise<ProductGetResponse> {
  return (
    await publicApiClientV2.get("/home/product/max", {
      params: {
        max,
        code,
      },
    })
  ).data.data as ProductGetResponse;
}
export async function getLatestProducts(
  size = 10,
  code = 4,
): Promise<ProductGetResponse> {
  return (
    await publicApiClientV2.get("/home/product/new", {
      params: {
        size,
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
  size = 10,
  code = 4,
): Promise<ProductGetResponse> {
  return (
    await publicApiClientV2.get("/home/product/cheap", {
      params: {
        size,
        code,
      },
    })
  ).data.data as ProductGetResponse;
}

interface GetProductsByCategoryProps {
  category_id: number;
  lang?: "en" | "khmer";
  page?: number;
  page_size?: number;
  sorting?: string;
  order?: "asc" | "desc";
  all_regions?: number;
}

export async function getProductsByCategory({
  category_id,
  page = 1,
  page_size = 10,
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
export async function searchProducts(query: string) {
  if (!query) return (await getCheapestProducts()).products;
  const products = await getCheapestProducts(50);
  const filteredProducts = products.products.filter((p) => {
    const regex = new RegExp(query, "i");
    return regex.test(p.name);
  });
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
interface GetCartProducts {
  ids: string;
}
export async function getCartProducts({ ids }: GetCartProducts) {
  return (
    await publicApiClientV2.post("/v2/products_by_ids", {
      ids,
    })
  ).data;
}
