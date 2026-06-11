"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPublicProperties } from "@/utils/dashboardApi";

// Re-fetch the broker's listings on this interval so the profile stays current
// as properties are added, edited or sold — no page reload needed.
const REFRESH_MS = 60000;
// Small page size so a broker with many listings is browsed via next/previous.
const PER_PAGE = 6;

const formatPrice = (price?: number, priceText?: string): string => {
  if (!price) return "Price on Request";
  const amount = `R ${Math.round(price).toLocaleString("en-ZA")}`;
  return priceText ? `${amount}/m²` : amount;
};

const CompactCard = ({ item }: { item: any }) => {
  const link = `/listing_details_06?id=${item.id}`;
  const img: string | null = item.featuredImage ?? null;
  const address: string =
    item.address ||
    [item.suburb, item.city, item.province].filter(Boolean).join(", ") ||
    "South Africa";
  const tag: string =
    item.tag ||
    (item.listingType === "lease"
      ? "To Let"
      : item.listingType === "investment"
        ? "Investment"
        : "For Sale");

  return (
    <Link
      href={link}
      style={{
        display: "block",
        textDecoration: "none",
        background: "#fff",
        border: "1px solid #eef0f2",
        borderRadius: 12,
        overflow: "hidden",
        height: "100%",
        boxShadow: "0 2px 10px rgba(13,31,45,0.05)",
      }}
    >
      <div style={{ position: "relative", height: 120, background: "#e8edf2" }}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={item.title || ""}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="bi bi-building" style={{ fontSize: 28, color: "#a0aec0" }} />
          </div>
        )}
        <span
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            background: "rgba(13,31,45,0.85)",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 4,
          }}
        >
          {tag}
        </span>
      </div>
      <div style={{ padding: "10px 12px 12px" }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#0d1f2d",
            margin: "0 0 4px",
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.title}
        </p>
        <p
          style={{
            fontSize: 11,
            color: "#3d8c6f",
            margin: "0 0 6px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <i className="bi bi-geo-alt-fill" style={{ marginRight: 4 }} />
          {address}
        </p>
        <p style={{ fontSize: 14, fontWeight: 800, color: "#0d1f2d", margin: 0 }}>
          {formatPrice(item.price, item.price_text)}
        </p>
      </div>
    </Link>
  );
};

const BrokerListings = ({
  brokerId,
  brokerName,
}: {
  brokerId: number | string;
  brokerName?: string;
}) => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedOnce, setLoadedOnce] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetchPublicProperties({ brokerId, limit: 100 });
        if (!active) return;
        setProperties(Array.isArray(res.data?.properties) ? res.data.properties : []);
      } catch {
        if (active) setProperties([]);
      } finally {
        if (active) {
          setLoading(false);
          setLoadedOnce(true);
        }
      }
    };

    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [brokerId]);

  const totalPages = Math.max(1, Math.ceil(properties.length / PER_PAGE));
  // Keep the current page valid if a refresh changes how many listings there are.
  const safePage = Math.min(page, totalPages - 1);
  const pageItems = properties.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);

  useEffect(() => {
    if (page > totalPages - 1) setPage(0);
  }, [totalPages, page]);

  const navBtn = (disabled: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid #d7dde3",
    background: disabled ? "#f1f3f5" : "#0d1f2d",
    color: disabled ? "#aab2b9" : "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: disabled ? "default" : "pointer",
  });

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "32px 40px 40px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        border: "1px solid #f0f0f0",
        marginBottom: 32,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 4, height: 28, background: "#e8b86d", borderRadius: 2 }} />
        <h5 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0d1f2d", margin: 0 }}>
          Current Listings
          {loadedOnce && properties.length > 0 ? ` (${properties.length})` : ""}
        </h5>
      </div>

      {loading && !loadedOnce ? (
        <p style={{ fontSize: "0.95rem", color: "#aaa", margin: 0 }}>Loading listings…</p>
      ) : properties.length === 0 ? (
        <p style={{ fontSize: "0.95rem", color: "#888", margin: 0 }}>
          {brokerName ? `${brokerName} has` : "This broker has"} no active listings right now.
        </p>
      ) : (
        <>
          <div className="row g-3">
            {pageItems.map((item) => (
              <div className="col-sm-6" key={item.id}>
                <CompactCard item={item} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginTop: 24,
              }}
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={safePage === 0}
                style={navBtn(safePage === 0)}
              >
                <i className="bi bi-arrow-left" />
                Previous
              </button>

              <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>
                Page {safePage + 1} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={safePage >= totalPages - 1}
                style={navBtn(safePage >= totalPages - 1)}
              >
                Next
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrokerListings;
