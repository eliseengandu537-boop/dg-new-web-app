import type { MetadataRoute } from "next";
import { getAllPublicProperties, propertyPath } from "@/utils/serverProperties";

// Tells Google which pages on the current site are the real, live pages.
const BASE_URL = "https://dg-property.co.za";

// Regenerate hourly so newly published properties enter the sitemap automatically.
export const revalidate = 3600;

const PATHS = [
  "",
  "/about_us_02",
  "/our-services",
  "/agent",
  "/commercial-for-lease",
  "/development-land",
  "/investment",
  "/fuel-station",
  "/success-stories",
  "/property-news",
  "/courses",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = PATHS.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  // Add every published property so search engines can discover and index them.
  // If the backend is unreachable we still return the static pages (never throw).
  let propertyEntries: MetadataRoute.Sitemap = [];
  try {
    const properties = await getAllPublicProperties();
    propertyEntries = properties
      .filter((p) => p?.id)
      .map((p) => ({
        url: `${BASE_URL}${propertyPath(p.id)}`,
        lastModified: p?.updatedAt ? new Date(p.updatedAt) : lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch {
    propertyEntries = [];
  }

  return [...staticEntries, ...propertyEntries];
}
