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

export async function getBreedImages(params: GetBreedImagesParams = {}) {
  const res = await axios.get(`/images/search`, { params });
  const data = res.data as IBreedImage[];
  return data.map((d) => ({
    id: d.id,
    url: d.url,
    breeds: d.breeds.map((b) => ({ name: b.name, for: b.bredFor })),
  }));
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
