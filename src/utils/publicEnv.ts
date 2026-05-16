const LOCAL_API_ROOT = "http://localhost:5001/api";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

const configuredApiRoot = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "") || "";

const isLocalBrowser = () => {
  if (typeof window === "undefined") return false;
  return LOCAL_HOSTS.has(window.location.hostname);
};

export const API_ROOT = configuredApiRoot || (isLocalBrowser() ? LOCAL_API_ROOT : "/api");
export const BACKEND_ROOT = API_ROOT.endsWith("/api") ? API_ROOT.slice(0, -4) : API_ROOT;
export const HAS_PUBLIC_API_URL = Boolean(configuredApiRoot);
