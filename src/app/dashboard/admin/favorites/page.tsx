"use client";
import { useEffect, useState } from "react";
import { fetchMostSavedProperties } from "@/utils/dashboardApi";
import { BACKEND_ROOT } from "@/utils/publicEnv";

interface MostSaved {
  propertyId: number;
  saveCount: number;
  property?: {
    id: number;
    title: string;
    referenceNumber: string;
    city?: string;
    category?: string;
    price?: number;
    featuredImage?: string;
    status?: string;
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  office: "Office",
  retail: "Retail",
  industrial: "Industrial",
  warehouse: "Warehouse",
  mixed_use: "Mixed Use",
  development_land: "Development Land",
  investment: "Investment",
  fuel_station: "Fuel Station",
  residential: "Residential",
};

export default function AdminFavoritesPage() {
  const [items, setItems] = useState<MostSaved[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchMostSavedProperties();
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load most saved properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#1a2332" }}>Favorites & Most Saved</h2>
        <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>Properties saved most often by clients, ranked by save count</p>
      </div>

      {error && <div style={{ background: "#fde", padding: 12, borderRadius: 8, color: "#c00", marginBottom: 16 }}>{error}</div>}
      {loading && <div style={{ textAlign: "center", padding: 60, color: "#666" }}>Loading...</div>}

      {!loading && items.length === 0 && (
        <div style={{ textAlign: "center", padding: 80, color: "#aaa" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>♡</div>
          <div style={{ fontSize: 16 }}>No saved properties yet.</div>
          <div style={{ fontSize: 13, marginTop: 8 }}>As clients save properties to their favorites, they will appear here.</div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {items.map((item, index) => {
          const prop = item.property;
          const imageUrl = prop?.featuredImage
            ? prop.featuredImage.startsWith("http")
              ? prop.featuredImage
              : `${BACKEND_ROOT}/uploads/properties/${prop.featuredImage.replace(/^\/+/, "")}`
            : null;

          return (
            <div key={item.propertyId} style={{
              background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14,
              overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              position: "relative",
            }}>
              {/* Rank badge */}
              <div style={{
                position: "absolute", top: 12, left: 12, zIndex: 2,
                background: index < 3 ? "#f1c40f" : "#1a2332",
                color: "#fff", fontWeight: 700, fontSize: 12,
                padding: "4px 10px", borderRadius: 20,
              }}>#{index + 1}</div>

              {/* Save count badge */}
              <div style={{
                position: "absolute", top: 12, right: 12, zIndex: 2,
                background: "#e74c3c", color: "#fff", fontWeight: 700, fontSize: 12,
                padding: "4px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4,
              }}>
                ♥ {item.saveCount}
              </div>

              {/* Image */}
              <div style={{ height: 160, background: "#f0f0f0", overflow: "hidden", position: "relative" }}>
                {imageUrl ? (
                  <img src={imageUrl} alt={prop?.title || "Property"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#bbb", fontSize: 36 }}>🏢</div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "16px 16px 18px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a2332", marginBottom: 4, lineHeight: 1.4 }}>
                  {prop?.title || `Property #${item.propertyId}`}
                </div>

                {prop?.referenceNumber && (
                  <div style={{ color: "#aaa", fontSize: 11, marginBottom: 8 }}>Ref: {prop.referenceNumber}</div>
                )}

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                  {prop?.city && (
                    <span style={{ fontSize: 12, color: "#666" }}>📍 {prop.city}</span>
                  )}
                  {prop?.category && (
                    <span style={{ fontSize: 11, background: "#f0f7ff", color: "#3498db", padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>
                      {CATEGORY_LABELS[prop.category] || prop.category}
                    </span>
                  )}
                  {prop?.status && (
                    <span style={{
                      fontSize: 11,
                      background: prop.status === "published" ? "#f6fdf9" : "#fafafa",
                      color: prop.status === "published" ? "#27ae60" : "#999",
                      padding: "2px 8px", borderRadius: 20, fontWeight: 600, textTransform: "capitalize"
                    }}>{prop.status}</span>
                  )}
                </div>

                {prop?.price != null && (
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#6dbf8b" }}>
                    R {prop.price.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
