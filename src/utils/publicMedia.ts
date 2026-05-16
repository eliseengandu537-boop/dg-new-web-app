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
