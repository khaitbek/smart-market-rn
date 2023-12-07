import { z } from "zod";

export const productSchema = z.object({
  category_id: z.string(),
  comment_number: z.string().transform((v) => Number(v)),
  counter: z.string().transform((v) => Number(v)),
  delivery_types_brings: z.array(),
  delivery_types_delivery: z.object({
    available: z.boolean(),
  }),
  has_discount: z.boolean(),
  name: z.string(),
  id: z.string().transform((v) => Number(v)),
  min_amount: z.string().transform((v) => Number(v)),
  old_price: z.string().transform((v) => Number(v)),
  price: z.string().transform((v) => Number(v)),
  rating: z.object({
    rating: z.string().transform((v) => Number(v)),
    first: z.string().transform((v) => Number(v)),
    second: z.string().transform((v) => Number(v)),
    third: z.string().transform((v) => Number(v)),
    fourth: z.string().transform((v) => Number(v)),
    fifth: z.string().transform((v) => Number(v)),
  }),
  photos: z.array(
    z.object({
      id: z.string(),
      is_main: z.boolean(),
      product_id: z.string(),
    }),
  ),
  seller: z.object({
    address: z.string(),
    district_id: z.string().transform((v) => Number(v)),
    email: z.string().email(),
    header_name: z.string(),
    id: z.string().transform((v) => Number(v)),
    region_id: z.string().transform((v) => Number(v)),
    mobile_phone: z.string(),
    name: z.string(),
  }),
  source_client: z.string(),
  unit_id: z.string().transform((v) => Number(v)),
});

type Product = z.infer<typeof productSchema>;
interface ProductGetResponse {
  count: number;
  products: SingleProduct[];
}
interface SingleProductDetails extends Product {
  make_name: string;
  country_name: string;
  expiration_life: string;
  free_service_life: string;
  technical_parameters: string;
  unit: string;
  ayear: number;
  name: string;
}
interface SingleProduct extends BaseResponse {
  data: SingleProductDetails;
}

interface ProductByCategory extends BaseResponse {
  data: {
    count: number;
    products: Product[];
  };
}

interface FavoriteProducts extends BaseResponse {
  data: Product[];
}
interface PopularProduct extends Product {
  main_photo: string;
}
