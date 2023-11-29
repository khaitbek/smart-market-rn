import axios from "axios";

export const publicApiClient = axios.create({
  baseURL: "https://api.kh.smart-market.uz/api/v2",
});
