"use client";
import { useEffect, useState } from "react";
import ClientHeader from "@/components/dashboard/client/ClientHeader";
import { fetchSavedProperties, removePropertyFromFavorites } from "@/utils/dashboardApi";
import Link from "next/link";

export default function SavedPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedProperties().then((r) => setProperties(r.data)).finally(() => setLoading(false));
  }, []);

  const handleRemove = async (savedId: number, propertyId: number) => {
    try {
      await removePropertyFromFavorites(propertyId);
      setProperties((p) => p.filter((x) => x.id !== savedId));
    } catch { alert("Failed to remove."); }
  };

  return (
    <>
      <ClientHeader title="Saved Properties" onMenuToggle={() => {}} />
      <main style={{ padding: "24px 28px", flex: 1 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", margin: "0 0 20px" }}>Saved Properties ({properties.length})</h2>
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#a0aec0" }}>Loading...</div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <i className="bi bi-heart" style={{ fontSize: 48, color: "#e2e8f0" }} />
            <p style={{ color: "#a0aec0", marginTop: 12 }}>No saved properties yet.</p>
            <Link href="/listing_01" style={{ color: "#6dbf8b", textDecoration: "none", fontWeight: 500 }}>Browse Listings →</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {properties.map((saved: any) => {
              const p = saved.property || saved;
              return (
                <div key={saved.id} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                  <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                    {p.featuredImage ? (
                      <img src={p.featuredImage} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ height: "100%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className="bi bi-building" style={{ fontSize: 32, color: "#a0aec0" }} />
                      </div>
                    )}
                    {p.isFeatured && (
                      <span style={{ position: "absolute", top: 10, left: 10, background: "#6dbf8b", color: "#fff", padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>Featured</span>
                    )}
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 4 }}>{p.referenceNumber}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#1a2332", marginBottom: 6 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: "#718096", marginBottom: 8 }}>
                      <i className="bi bi-geo-alt" style={{ marginRight: 4 }} />
                      {[p.suburb, p.city].filter(Boolean).join(", ") || "N/A"}
                    </div>
                    {p.price && (
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#276749", marginBottom: 12 }}>
                        R {Number(p.price).toLocaleString()}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link href={`/listing_details_01?id=${p.id}`} style={{ flex: 1, textAlign: "center", padding: "8px 0", background: "#f0fff4", color: "#276749", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
                        View
                      </Link>
                      <button
                        onClick={() => handleRemove(saved.id, p.id)}
                        style={{ flex: 1, padding: "8px 0", background: "#fff5f5", color: "#c53030", border: "1px solid #fed7d7", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
