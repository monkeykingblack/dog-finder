import { axios } from "../helpers/axios";

export type VoteImageData = {
  imageId: string;
  value: number;
  subId?: string;
};

export function voteImage(data: VoteImageData) {
  return axios.post<void>("/votes", data);
}
