interface Seller extends BaseResponse {
  data: {
    items: {
      id: number;
      name: string;
    }[];
    count: number;
    name: string;
    slug: string;
    type: string;
  }[];
}
