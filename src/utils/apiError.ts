const FILE_LABELS: Record<string, string> = {
  photo: "broker photo",
  image: "image",
  featuredImage: "featured image",
  gallery: "gallery image",
  brochure: "brochure",
  brochurePdf: "brochure PDF",
  floorPlans: "floor plan",
};

const toMessage = (value: unknown): string => {
  if (typeof value === "string") return value.trim();
  if (value instanceof Error) return value.message.trim();
  return "";
};

const getUploadMessage = (field: string) => {
  const label = FILE_LABELS[field] || "file";
  return `The ${label} is too large. Please choose a smaller file.`;
};

const extractMessage = (value: unknown): string => {
  if (!value) return "";
  if (typeof value === "string") return value.trim();

  if (Array.isArray(value)) {
    return value.map(extractMessage).filter(Boolean).join(" ").trim();
  }

  if (typeof value !== "object") return "";

  const record = value as Record<string, unknown>;
  const code = toMessage(record.code);
  const field = toMessage(record.field);

  if (code === "LIMIT_FILE_SIZE") {
    return getUploadMessage(field);
  }

  const error = extractMessage(record.error);
  const message = extractMessage(record.message);
  const details = extractMessage(record.details);

  if (error && details && details !== error) {
    return `${error} ${details}`.trim();
  }

  return error || message || details;
};

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  const response = (error as { response?: { status?: number; data?: unknown } } | undefined)?.response;
  const status = response?.status;

  if (status === 413) {
    return "The upload is too large for the live site right now. Please use a smaller file, or switch admin uploads to the direct backend URL.";
  }

  const responseMessage = extractMessage(response?.data);
  if (responseMessage) return responseMessage;

  const errorMessage = toMessage((error as { message?: unknown } | undefined)?.message);
  if (errorMessage === "Network Error") {
    return "Cannot reach the server right now. Please wait a moment and try again.";
  }
  if (errorMessage) return errorMessage;

  return fallback;
};
