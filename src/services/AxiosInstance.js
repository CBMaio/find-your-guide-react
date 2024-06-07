import axios from "axios";
import { API_URL } from "../features/constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["x-access-token"] = localStorage.getItem("userToken");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
