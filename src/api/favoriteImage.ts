import { axios } from "../helpers/axios";

export function favoriteImage(imageId: string) {
  return axios.post("/favourites", { imageId });
}
