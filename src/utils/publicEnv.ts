const LOCAL_API_ROOT = "http://localhost:5001/api";
const LOCAL_BACKEND_ROOT = "http://localhost:5001";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

const trimTrailingSlash = (value?: string | null) => value?.trim().replace(/\/$/, "") || "";
const toBackendRoot = (apiRoot: string) => (apiRoot.endsWith("/api") ? apiRoot.slice(0, -4) : apiRoot);

const configuredApiRoot = trimTrailingSlash(process.env.NEXT_PUBLIC_API_URL);
const configuredAuthApiRoot = trimTrailingSlash(
  process.env.NEXT_PUBLIC_AUTH_API_URL || process.env.NEXT_PUBLIC_ADMIN_API_URL,
);
const configuredBackendRoot =
  trimTrailingSlash(process.env.NEXT_PUBLIC_BACKEND_URL) ||
  toBackendRoot(configuredAuthApiRoot || configuredApiRoot);

const isLocalBrowser = () => {
  if (typeof window === "undefined") return false;
  return LOCAL_HOSTS.has(window.location.hostname);
};

export const API_ROOT = configuredApiRoot || (isLocalBrowser() ? LOCAL_API_ROOT : "/api");
export const AUTH_API_ROOT = configuredAuthApiRoot || API_ROOT;
export const BACKEND_ROOT =
  configuredBackendRoot ||
  (isLocalBrowser() ? LOCAL_BACKEND_ROOT : toBackendRoot(API_ROOT));
export const AUTH_BACKEND_ROOT = toBackendRoot(AUTH_API_ROOT);
export const HAS_PUBLIC_API_URL = Boolean(configuredApiRoot);
export const HAS_AUTH_API_URL = Boolean(configuredAuthApiRoot);
