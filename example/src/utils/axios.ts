import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    //... other custom headers
  },
});

axiosInstance.interceptors.request.use((config) => {
  const userData = Cookies.get("user-storage");
  const user = JSON.parse(userData as string) || {};
  const token = user.state.user.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
