import "server-only";
import type { Metadata } from "next";
import { getServerApiRoot } from "./serverApiTargets";

// The live, canonical domain — used to build absolute URLs for SEO/social tags.
export const SITE_URL = "https://dg-property.co.za";

// Property detail pages are reached at /listing_details_06?id=123 (see PropertyCard).
export const propertyPath = (id: string | number) => `/listing_details_06?id=${id}`;
export const propertyUrl = (id: string | number) => `${SITE_URL}${propertyPath(id)}`;

const CATEGORY_LABELS: Record<string, string> = {
  commercial_office: "Commercial Office",
  retail: "Retail",
  industrial_warehouse: "Industrial / Warehouse",
  development_land: "Development Land",
  mixed_use: "Mixed-Use",
  investment: "Investment",
};

const LISTING_TYPE_LABELS: Record<string, string> = {
  sale: "For Sale",
  lease: "To Let",
  investment: "Investment",
};

// featuredImage etc. are stored as relative "/uploads/..." paths. Social cards and
// JSON-LD need fully-qualified URLs, so prefix anything that isn't already absolute.
export const absoluteImage = (img?: string | null): string | undefined => {
  if (!img) return undefined;
  if (/^https?:\/\//i.test(img)) return img;
  return `${SITE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
};

export const stripHtml = (html?: string | null): string =>
  (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const truncate = (text: string, max = 155): string =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

export const propertyLocation = (p: any): string =>
  [p?.suburb, p?.city, p?.province].filter(Boolean).join(", ");

const formatPrice = (price?: number, listingType?: string): string | null => {
  if (!price) return null;
  const amount = `R ${Math.round(price).toLocaleString("en-ZA")}`;
  return listingType === "lease" ? `${amount}/month` : amount;
};

// ── Server-side data fetching ──────────────────────────────────────────────
// In production getServerApiRoot() resolves to the internal backend (http://backend:5001/api),
// so these run server-side and put real property data into the initial HTML.

export async function getPublicProperty(id: string | number): Promise<any | null> {
  const root = getServerApiRoot();
  if (!root) return null;
  try {
    const res = await fetch(`${root}/properties/public/${id}`, {
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.property ?? data ?? null;
  } catch {
    return null;
  }
}

export async function getAllPublicProperties(): Promise<any[]> {
  const root = getServerApiRoot();
  if (!root) return [];
  try {
    const res = await fetch(`${root}/properties/public?limit=1000`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.properties) ? data.properties : [];
  } catch {
    return [];
  }
}

// ── SEO builders ────────────────────────────────────────────────────────────

export function buildPropertyMetadata(p: any, id: string | number): Metadata {
  const location = propertyLocation(p);
  const typeLabel = LISTING_TYPE_LABELS[p?.listingType] || "";
  const categoryLabel = CATEGORY_LABELS[p?.category] || "Commercial Property";
  const price = formatPrice(p?.price, p?.listingType);

  const title = `${p?.title}${location ? `, ${location}` : ""} | DG Property`;

  const fromBody = truncate(stripHtml(p?.description));
  const fallback = [
    `${categoryLabel}${typeLabel ? ` ${typeLabel.toLowerCase()}` : ""}`,
    location ? `in ${location}` : "",
    price ? `— ${price}.` : ".",
    "Enquire with DG Property.",
  ]
    .filter(Boolean)
    .join(" ");
  const description = fromBody || fallback;

  const image = absoluteImage(p?.featuredImage);
  const url = propertyUrl(id);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "DG Property",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function buildPropertyJsonLd(p: any, id: string | number): Record<string, any> {
  const location = propertyLocation(p);
  const categoryLabel = CATEGORY_LABELS[p?.category] || "Commercial Property";
  const image = absoluteImage(p?.featuredImage);
  const url = propertyUrl(id);
  const description = truncate(stripHtml(p?.description), 300);

  const product: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p?.title,
    category: categoryLabel,
    url,
    ...(p?.referenceNumber ? { sku: p.referenceNumber } : {}),
    ...(description ? { description } : {}),
    ...(image ? { image: [image] } : {}),
  };

  if (location) {
    product.brand = { "@type": "Brand", name: "DG Property" };
  }

  if (p?.price) {
    product.offers = {
      "@type": "Offer",
      price: Math.round(p.price),
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      url,
      ...(location ? { areaServed: location } : {}),
    };
  }

  return product;
}
