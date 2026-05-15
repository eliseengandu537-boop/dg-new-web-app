"use client"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface PropertyCardProps {
  item: any;
  detailsLink?: string;
}

function formatPrice(price: number, priceText?: string): string {
  if (!price) return "Price on Request";
  const formatted = Math.round(price).toLocaleString("en-ZA");
  return priceText ? `R ${formatted}/m²` : `R ${formatted}`;
}

function getBadgeColors(tag: string): { bg: string; color: string } {
  const t = (tag || "").toUpperCase();
  if (t.includes("SALE")) return { bg: "#1a9e4a", color: "#fff" };
  if (t.includes("LET") || t.includes("LEASE")) return { bg: "#5a7a6a", color: "#fff" };
  if (t.includes("INVEST")) return { bg: "#2563eb", color: "#fff" };
  return { bg: "#2d3748", color: "#fff" };
}

const PropertyCard = ({ item, detailsLink = "/listing_details_06" }: PropertyCardProps) => {
  // Build the full link — API properties have a numeric id, append it as a query param
  const itemLink = item.id && !item.carousel_thumb
    ? `${detailsLink}?id=${item.id}`
    : detailsLink;

  // Resolve image
  const staticImg: StaticImageData | null = item.carousel_thumb?.[0]?.img ?? null;
  const apiImg: string | null = item.featuredImage ?? null;

  // Badge
  const tag: string =
    item.tag ||
    (item.listingType === "lease" ? "FOR LEASE" :
     item.listingType === "investment" ? "INVESTMENT" : "FOR SALE");
  const { bg: badgeBg, color: badgeColor } = getBadgeColors(tag);

  // Address
  const address: string =
    item.address ||
    [item.suburb, item.city, item.province].filter(Boolean).join(", ") ||
    "South Africa";

  // Stats
  const sqft: number = item.property_info?.sqft || item.categoryDetails?.size || 0;
  const sqm: number =
    item.property_info?.sqm ??
    item.categoryDetails?.gla ??
    item.categoryDetails?.sqm ??
    Math.round(sqft * 0.0929);
  const units: number = item.property_info?.units ?? item.categoryDetails?.units ?? 0;

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

        {staticImg ? (
          <Link href={itemLink} className="d-block" style={{ display: "block", height: "100%" }}>
            <Image src={staticImg} alt={item.title || ""} fill style={{ objectFit: "cover" }} />
          </Link>
        ) : apiImg ? (
          <Link href={itemLink} className="d-block" style={{ display: "block", height: "100%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={apiImg} alt={item.title || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </Link>
        ) : (
          <Link href={itemLink} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", background: "#e8edf2" }}>
            <i className="bi bi-building" style={{ fontSize: 48, color: "#a0aec0" }}></i>
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
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6, color: "#3d8c6f", marginBottom: 16, fontSize: 14 }}>
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
            <span>{sqft.toLocaleString("en-ZA")} sqft</span>
          </div>
          <span style={{ color: "#ccc", margin: "0 8px" }}>|</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#555" }}>
            <i className="bi bi-rulers" style={{ fontSize: 13 }}></i>
            <span>{sqm.toLocaleString("en-ZA")} sqm</span>
          </div>
          <span style={{ color: "#ccc", margin: "0 8px" }}>|</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#555" }}>
            <i className="bi bi-building" style={{ fontSize: 13 }}></i>
            <span>{units} units</span>
          </div>
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "auto" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#aaa", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 3 }}>
              Asking Price
            </div>
            <strong style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e" }}>
              {formatPrice(item.price, item.price_text)}
            </strong>
          </div>
          <Link href={itemLink} style={{
            width: 44, height: 44, background: "#1a1a2e", color: "#fff",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none", flexShrink: 0,
          }}>
            <i className="bi bi-arrow-up-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
