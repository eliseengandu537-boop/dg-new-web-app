import path from "path";

const DEFAULT_UPLOADS_DIR = path.join(process.cwd(), "uploads");

const trimTrailingSlashes = (value: string) =>
  value.replace(/[\\/]+$/, "");

const normalizeSegment = (value: string) =>
  value.replace(/^[/\\]+|[/\\]+$/g, "");

export const UPLOADS_DIR = trimTrailingSlashes(
  process.env.UPLOADS_DIR?.trim() || DEFAULT_UPLOADS_DIR,
);

export const getUploadSubdirPath = (subfolder: string) =>
  path.join(UPLOADS_DIR, normalizeSegment(subfolder));

export const getUploadFilePath = (subfolder: string, filename: string) =>
  path.join(getUploadSubdirPath(subfolder), path.basename(filename));

export const toUploadUrl = (subfolder: string, filename: string) =>
  `/uploads/${normalizeSegment(subfolder)}/${path.basename(filename)}`;

export const extractUploadFilename = (value?: string | null) => {
  const input = value?.trim();
  if (!input) return "";

  if (/^https?:\/\//i.test(input)) {
    try {
      return path.posix.basename(new URL(input).pathname);
    } catch {
      return path.posix.basename(input);
    }
  }

  return path.posix.basename(input.replace(/\\/g, "/"));
};
