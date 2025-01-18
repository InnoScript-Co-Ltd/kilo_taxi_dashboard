import axios from "axios";
import { keys } from "./config";
import { getData } from "../helpers/localStorage";
import { baseURL } from "./endpoints";
import { refreshToken } from "../modules/auth/auth.service";

const http = axios.create({
  baseURL: `${baseURL}`,
});

http.interceptors.request.use(
  (config: any) => {
    const token = getData(keys.API_TOKEN) ? getData(keys.API_TOKEN) : null;

    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
        Accept: "Application/json",
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
