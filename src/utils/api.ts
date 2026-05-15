import axios from "axios";

export const API_ROOT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
export const AUTH_API_URL = `${API_ROOT}/auth`;

export const api = axios.create({
  baseURL: AUTH_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Authenticated API client — attaches Bearer token automatically
export const authApi = axios.create({
  baseURL: API_ROOT,
  headers: { "Content-Type": "application/json" },
});

authApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("dg_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

authApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err.response?.status === 401 &&
      typeof window !== "undefined" &&
      window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("dg_token");
      localStorage.removeItem("dg_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
