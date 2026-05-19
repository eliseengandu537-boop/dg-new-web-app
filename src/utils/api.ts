import axios from "axios";
import { API_ROOT, AUTH_API_ROOT } from "./publicEnv";
export {
  API_ROOT,
  AUTH_API_ROOT,
  BACKEND_ROOT,
  AUTH_BACKEND_ROOT,
  HAS_PUBLIC_API_URL,
  HAS_AUTH_API_URL,
} from "./publicEnv";

export const AUTH_API_URL = `${AUTH_API_ROOT}/auth`;

export const api = axios.create({
  baseURL: AUTH_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Authenticated API client — attaches Bearer token automatically
export const authApi = axios.create({
  baseURL: AUTH_API_ROOT,
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
