import "server-only";

import type { Broker } from "@/components/inner-pages/agent/types";
import type { SuccessStory } from "@/components/inner-pages/success-stories/types";
import { getServerApiRoot } from "./serverApiTargets";

export class PublicApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "PublicApiError";
    this.status = status;
  }
}

const fetchPublicJson = async <T>(path: string): Promise<T> => {
  const apiRoot = getServerApiRoot();

  if (!apiRoot) {
    throw new PublicApiError("Public API is not configured.", 503);
  }

  // Always fetch fresh: admin-managed content (brokers, success stories)
  // must appear on the public site immediately, and this keeps the
  // consuming pages dynamic so they are never frozen at build time.
  const response = await fetch(`${apiRoot}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new PublicApiError(`Request failed for ${path}`, response.status);
  }

  return response.json() as Promise<T>;
};

export const getPublicBrokers = async () =>
  fetchPublicJson<Broker[]>("/brokers/public");

export const getPublicBrokerById = async (id: string | number) => {
  try {
    return await fetchPublicJson<Broker>(`/brokers/${id}`);
  } catch (error) {
    if (error instanceof PublicApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
};

export const getPublicSuccessStories = async () =>
  fetchPublicJson<SuccessStory[]>("/success-stories/public");

export const getPublicSuccessStoryBySlug = async (slug: string) => {
  try {
    return await fetchPublicJson<SuccessStory>(`/success-stories/public/${slug}`);
  } catch (error) {
    if (error instanceof PublicApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
};
