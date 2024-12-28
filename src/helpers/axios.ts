import axiosInstance, { AxiosHeaders } from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";
import qs from "qs";

const X_API_KEY = "x-api-key";

export const axios = axiosInstance.create({
  baseURL: "https://api.thedogapi.com/v1",
  headers: {
    "Content-Type": "application/json",
    [X_API_KEY]: import.meta.env.VITE_API_KEY,
  },
  paramsSerializer: (params) => {
    return qs.stringify(decamelizeKeys(params), { arrayFormat: "brackets" });
  },
});

// Convert camelCase to snake_case
axios.interceptors.request.use((config) => {
  if (config.headers["Content-Type"] === "multipart/form-data") {
    return config;
  }

  return {
    ...config,
    data: config.data && decamelizeKeys(config.data),
  };
});

// Convert snake_case to camelCase
axios.interceptors.response.use((response) => {
  if (
    response.data &&
    (response.headers.hasContentType as AxiosHeaders["hasContentType"])(
      /application\/json/,
    )
  ) {
    response.data = camelizeKeys(response.data);
  }
  return response;
});
