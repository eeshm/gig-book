import axios from "axios";

import Cookies from "js-cookie";
import { cookies } from "next/dist/server/request/cookies";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
(response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("token");
      if(typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
}
);

export default api;
