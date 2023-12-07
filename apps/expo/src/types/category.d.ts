interface Category {
  id: number;
  name: string;
  icon: string;
  num: string;
  type: string;
  amount: number;
  parent_id: number;
}
interface Catalogs extends BaseResponse {
  data: {
    categories: Category[];
  };
}
