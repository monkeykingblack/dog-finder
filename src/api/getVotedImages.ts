import { axios } from "../helpers/axios";

export default function getVotedImages() {
  return axios.get("/votes");
}
