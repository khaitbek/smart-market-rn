interface Region extends BaseResponse {
  data: {
    id: number;
    name: string;
    districts: District[];
  }[];
}

interface District {
  id: number;
  name: string;
  region: Region["id"];
}
