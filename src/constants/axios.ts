import axios from "axios";
import { keys } from "./config";
import { getData } from "../helpers/localStorage";
import { baseURL } from "./endpoints";

const http = axios.create({
  baseURL: `${baseURL}`,
});

// Add request interceptor
http.interceptors.request.use(
  (config: any) => {
    // Exclude certain endpoints (e.g., refresh token) from requiring Authorization
    const excludedEndpoints = ["/Auth/refresh-token"];
    if (!excludedEndpoints.some((endpoint) => config.url?.includes(endpoint))) {
      const token = getData(keys.API_TOKEN);
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    }

    // Common headers for all requests
    config.headers = {
      ...config.headers,
      Accept: "Application/json",
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
