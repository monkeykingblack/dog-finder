import type { IBreed } from "./type";

import { axios } from "../helpers/axios";

export function getBreadDetail(breadId: string) {
  return axios.get<IBreed>("/breeds/" + breadId);
}
