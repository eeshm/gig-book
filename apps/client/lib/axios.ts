import axios from "axios";

import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://gig-book.onrender.com/api",
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
      // Only clear token and redirect if we're not already on auth pages
      const isAuthPage =
        typeof window !== "undefined" &&
        (window.location.pathname === "/login" || window.location.pathname === "/register");

      Cookies.remove("token");

      if (typeof window !== "undefined" && !isAuthPage) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
