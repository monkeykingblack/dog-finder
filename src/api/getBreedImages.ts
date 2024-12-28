import type { IBreedImage } from "./type";

import { axios } from "../helpers/axios";

export type GetBreedImagesParams = {
  page?: number;
  limit?: number;
  size?: "thumb" | "small" | "med" | "full";
  mimeTypes?: "jpg" | "png" | "gif" | "gifs";
  format?: "json" | "src";
  hasBreeds?: boolean;
  breadIds?: string;
  order?: "RANDOM" | "ASC" | "DESC";
};

export function getBreedImages(params: GetBreedImagesParams = {}) {
  return axios.get<IBreedImage[]>(`/images/search`, { params });
}

export function getBreedImageSrc() {
  return axios.getUri({
    url: "/images/search",
    params: {
      size: "small",
      mimeTypes: "jpg",
      format: "src",
      hasBreeds: true,
      order: "RANDOM",
    } satisfies GetBreedImagesParams,
  });
}
