import { uploadsApiClient } from "./api-utils";

export function createImgUrl(imgPath: string) {
  return uploadsApiClient.defaults.baseURL + "/images/" + imgPath;
}
