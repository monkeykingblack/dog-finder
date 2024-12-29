import { axios } from "../helpers/axios";

type GetVotedImagesParams = {
  page?: number;
  limit?: number;
  attachImage?: boolean;
  order?: "ASC" | "DESC";
};

export default function getVotedImages(params?: GetVotedImagesParams) {
  return axios.get("/votes", { params });
}
