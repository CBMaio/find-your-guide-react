import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_JAVA_BACK_URL || "",
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "userToken"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
