import { AUTH_BACKEND_ROOT, BACKEND_ROOT } from "./publicEnv";

const UPLOADS_PREFIX = "/uploads/";

export const resolveMediaUrl = (value?: string | null) => {
  if (!value) return "";

  if (value.startsWith(UPLOADS_PREFIX)) return value;

  if (/^https?:\/\//i.test(value)) {
    try {
      const parsed = new URL(value);
      if (parsed.pathname.startsWith(UPLOADS_PREFIX)) {
        return parsed.pathname;
      }
    } catch {
      return value;
    }
  }

  if (value.startsWith("uploads/")) return `/${value}`;

  return value;
};

const withRoot = (root: string, path: string) => `${root.replace(/\/$/, "")}${path}`;

export const resolveAbsoluteMediaUrl = (value?: string | null, root = BACKEND_ROOT) => {
  const resolved = resolveMediaUrl(value);
  if (!resolved) return "";
  if (/^https?:\/\//i.test(resolved)) return resolved;
  if (resolved.startsWith("/") && root) return withRoot(root, resolved);
  return resolved;
};

export const resolveAdminMediaUrl = (value?: string | null) =>
  resolveAbsoluteMediaUrl(value, AUTH_BACKEND_ROOT || BACKEND_ROOT);
