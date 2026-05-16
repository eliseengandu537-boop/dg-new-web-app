import "server-only";

const LOCAL_API_ROOT = "http://127.0.0.1:5001/api";
const LOCAL_BACKEND_ROOT = "http://127.0.0.1:5001";

const trimTrailingSlash = (value?: string | null) =>
  value?.trim().replace(/\/$/, "") || "";

const configuredApiRoot = trimTrailingSlash(
  process.env.API_PROXY_TARGET ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL,
);

const configuredBackendRoot = trimTrailingSlash(
  process.env.BACKEND_URL ||
    process.env.UPLOADS_BASE_URL?.replace(/\/uploads\/?$/, ""),
);

export const getServerApiRoot = () => {
  if (configuredApiRoot) return configuredApiRoot;
  return process.env.NODE_ENV === "production" ? "" : LOCAL_API_ROOT;
};

export const getServerBackendRoot = () => {
  if (configuredBackendRoot) return configuredBackendRoot;

  const apiRoot = getServerApiRoot();
  if (apiRoot.endsWith("/api")) return apiRoot.slice(0, -4);
  if (apiRoot) return apiRoot;

  return process.env.NODE_ENV === "production" ? "" : LOCAL_BACKEND_ROOT;
};
