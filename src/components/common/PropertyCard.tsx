"use client"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import Fancybox from "@/components/common/Fancybox"
import { getPriceDisplay } from "@/utils/pricing"
import { resolveMediaUrl } from "@/utils/publicMedia"

interface PropertyCardProps {
  item: any;
  detailsLink?: string;
}

function getBadgeColors(tag: string): { bg: string; color: string } {
  const t = (tag || "").toUpperCase();
  if (t.includes("SALE")) return { bg: "#1a9e4a", color: "#fff" };
  if (t.includes("LET") || t.includes("LEASE")) return { bg: "#5a7a6a", color: "#fff" };
  if (t.includes("INVEST")) return { bg: "#2563eb", color: "#fff" };
  return { bg: "#2d3748", color: "#fff" };
}

const getGallery = (item: any, staticImage: StaticImageData | null) => {
  let gallery: unknown[] = [];

  if (Array.isArray(item.gallery)) {
    gallery = item.gallery;
  } else if (typeof item.gallery === "string") {
    try {
      const parsed = JSON.parse(item.gallery);
      gallery = Array.isArray(parsed) ? parsed : [];
    } catch {
      gallery = [];
    }
  }

  const staticGallery = Array.isArray(item.carousel_thumb)
    ? item.carousel_thumb.map((entry: any) => entry?.img)
    : [];

  return [staticImage, item.featuredImage, ...staticGallery, ...gallery]
    .map((image) => {
      if (!image) return "";
      if (typeof image === "string") return resolveMediaUrl(image);
      if (typeof image === "object" && "src" in image) return String((image as StaticImageData).src);
      return "";
    })
    .filter((image, index, images) => Boolean(image) && images.indexOf(image) === index);
};

const PropertyCard = ({ item, detailsLink = "/listing_details_06" }: PropertyCardProps) => {
  // Build the full link — API properties have a numeric id, append it as a query param
  const itemLink = item.id && !item.carousel_thumb
    ? `${detailsLink}?id=${item.id}`
    : detailsLink;

  // Resolve image
  const staticImg: StaticImageData | null = item.carousel_thumb?.[0]?.img ?? null;
  const galleryImages = getGallery(item, staticImg);
  const primaryImage = galleryImages[0] || null;
  const galleryName = `listing-card-${item.id || "property"}`;

  // Badge
  const tag: string =
    item.tag ||
    (item.listingType === "lease" ? "TO LET" :
     item.listingType === "investment" ? "INVESTMENT" : "FOR SALE");
  const { bg: badgeBg, color: badgeColor } = getBadgeColors(tag);

  // Address
  const address: string =
    item.address ||
    [item.suburb, item.city, item.province].filter(Boolean).join(", ") ||
    "South Africa";

  // Stats — admin saves size in m² (categoryDetails.size); static mock data uses sqft.
  const cd = item.categoryDetails || {};
  const sqm: number = Number(
    cd.size ?? cd.gla ?? cd.sqm ?? item.property_info?.sqm ??
    (item.property_info?.sqft ? Math.round(item.property_info.sqft * 0.0929) : 0)
  ) || 0;
  // Prefer the rich units array (shops/units); fall back to legacy numeric fields.
  const units: number = Array.isArray(item.units)
    ? item.units.length
    : Number(item.property_info?.units ?? cd.units ?? cd.residentialUnits ?? 0) || 0;

  // Retail leasing and commercial listings offer multiple units of varying
  // sizes, so show the span (smallest–largest) of the individual unit sizes
  // rather than a single GLA/size figure.
  const showsUnitRange =
    (item.category === "retail" && item.listingType === "lease") ||
    item.category === "commercial_office" ||
    item.listingCategory === "commercial";
  const unitSizes: number[] = Array.isArray(item.units)
    ? item.units
        .map((u: any) => Number(String(u?.size ?? "").replace(/[^\d.]/g, "")))
        .filter((n: number) => n > 0)
    : [];
  const sizeLabel: string =
    showsUnitRange && unitSizes.length > 0
      ? (() => {
          const min = Math.round(Math.min(...unitSizes));
          const max = Math.round(Math.max(...unitSizes));
          return min === max
            ? `${min.toLocaleString("en-ZA")} m²`
            : `${min.toLocaleString("en-ZA")}–${max.toLocaleString("en-ZA")} m²`;
        })()
      : `${sqm.toLocaleString("en-ZA")} m²`;

  // Price label + value. "To Let" listings show "Rental" with an indicative
  // figure (never "Price on Request").
  const pricing = getPriceDisplay(item);

  return (
    <div style={{
      background: "#fff",
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
    }}>
      {/* Image */}
      <div style={{ position: "relative", height: 220, overflow: "hidden", flexShrink: 0 }}>
        {/* Badge */}
        <div style={{
          position: "absolute", top: 14, left: 14, zIndex: 2,
          background: badgeBg, color: badgeColor,
          borderRadius: 6, padding: "5px 13px",
          fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase",
        }}>
          {tag}
        </div>

        {primaryImage ? (
          <Fancybox options={{ Carousel: { infinite: true } }}>
            <a
              href={primaryImage}
              data-fancybox={galleryName}
              data-caption={item.title || "Property listing"}
              aria-label={`Open photos for ${item.title || "this property"}`}
              style={{ position: "relative", display: "block", height: 220, cursor: "zoom-in" }}
            >
              {staticImg ? (
                <Image src={staticImg} alt={item.title || ""} fill style={{ objectFit: "cover" }} />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={primaryImage} alt={item.title || "Property listing"} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              )}
            </a>

            {galleryImages.slice(1).map((image, index) => (
              <a
                key={`${image}-${index}`}
                href={image}
                data-fancybox={galleryName}
                data-caption={`${item.title || "Property listing"} — photo ${index + 2}`}
                style={{ display: "none" }}
              >
                {`Photo ${index + 2}`}
              </a>
            ))}

            <span style={{
              position: "absolute", right: 12, bottom: 12, zIndex: 2,
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 11px", borderRadius: 999,
              background: "rgba(26,26,46,0.88)", color: "#fff",
              boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
              fontSize: 11, fontWeight: 700, pointerEvents: "none",
            }}>
              <i className="bi bi-images" aria-hidden="true" />
              View {galleryImages.length} photo{galleryImages.length === 1 ? "" : "s"}
            </span>
          </Fancybox>
        ) : (
          <Link href={itemLink} aria-label={`View ${item.title || "property"}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", background: "#e8edf2" }}>
            <i className="bi bi-building" aria-hidden="true" style={{ fontSize: 48, color: "#a0aec0" }}></i>
          </Link>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "22px 24px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Title */}
        <Link href={itemLink} style={{
          fontSize: 18, fontWeight: 700, color: "#1a1a2e",
          marginBottom: 8, textDecoration: "none", display: "block", lineHeight: 1.3,
        }}>
          {item.title}
        </Link>

        {/* Address */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6, color: "#2f6f57", marginBottom: 16, fontSize: 14 }}>
          <i className="bi bi-geo-alt-fill" style={{ marginTop: 2, flexShrink: 0 }}></i>
          <span>{address}</span>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px 0",
          marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #f0f0f0",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#555" }}>
            <i className="bi bi-rulers" style={{ fontSize: 13 }}></i>
            <span>{sizeLabel}</span>
          </div>
          {units > 0 && (
            <>
              <span aria-hidden="true" style={{ color: "#666", margin: "0 8px" }}>|</span>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#555" }}>
                <i className="bi bi-building" style={{ fontSize: 13 }}></i>
                <span>{units} units</span>
              </div>
            </>
          )}
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "auto" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#595959", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 3 }}>
              {pricing.label}
            </div>
            <strong style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e" }}>
              {pricing.value}
            </strong>
          </div>
          <Link href={itemLink} aria-label={`View details for ${item.title || "this property"}`} style={{
            width: 44, height: 44, background: "#1a1a2e", color: "#fff",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none", flexShrink: 0,
          }}>
            <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
