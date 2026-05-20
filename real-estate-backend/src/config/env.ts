import dotenv from "dotenv";

dotenv.config();

/**
 * Reads a required environment variable.
 * Throws at startup if it is missing — a secret must never silently
 * fall back to a hardcoded default.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Set it in the deployment environment (.env / docker-compose).`
    );
  }
  return value;
}

export const JWT_SECRET: string = requireEnv("JWT_SECRET");
