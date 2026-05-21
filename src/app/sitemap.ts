import type { MetadataRoute } from "next";

// Tells Google which pages on the current site are the real, live pages.
const BASE_URL = "https://dg-property.co.za";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
