"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchClientListings, deleteClientListing, fetchMySubscription } from "@/utils/dashboardApi";
import { resolveAbsoluteMediaUrl } from "@/utils/publicMedia";

interface Listing {
  id: number;
  title: string;
  referenceNumber: string;
  category: string;
  listingType: string;
  status: string;
  city?: string;
  price?: number;
  featuredImage?: string;
  createdAt: string;
}

const STATUS_BADGE: Record<string, { bg: string; color: string; label: string }> = {
  draft:      { bg: "#f0f0f0", color: "#888",    label: "Draft" },
  pending:    { bg: "#fff3cd", color: "#856404",  label: "Pending Review" },
  published:  { bg: "#d4edda", color: "#155724",  label: "Published" },
  under_offer:{ bg: "#d1ecf1", color: "#0c5460",  label: "Under Offer" },
  sold:       { bg: "#f8d7da", color: "#721c24",  label: "Sold" },
  leased:     { bg: "#e2e3e5", color: "#383d41",  label: "Leased" },
  archived:   { bg: "#e9ecef", color: "#6c757d",  label: "Archived" },
};

export default function ClientListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [planName, setPlanName] = useState("Free");
  const [maxListings, setMaxListings] = useState(1);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      fetchClientListings(),
      fetchMySubscription().catch(() => ({ data: null })),
    ]).then(([listRes, subRes]) => {
      setListings(Array.isArray(listRes.data) ? listRes.data : []);
      const plan = subRes.data?.membershipPlan;
      if (plan) {
        setPlanName(plan.name);
        setMaxListings(plan.maxListings ?? 1);
      }
    }).catch(() => setError("Failed to load listings."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await deleteClientListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (e: any) {
      alert(e?.response?.data?.error || "Failed to delete listing.");
    } finally {
      setDeleting(null);
    }
  };

  const atLimit = listings.length >= maxListings;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#1a2332" }}>My Listings</h2>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>
            {listings.length} of {maxListings === 9999 ? "Unlimited" : maxListings} listings used
            <span style={{ marginLeft: 10, background: "#f0f7ff", color: "#3498db", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{planName} Plan</span>
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {atLimit && maxListings !== 9999 && (
            <Link href="/dashboard/client/membership" style={{
              padding: "10px 18px", background: "#fff3cd", color: "#856404",
              borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: "none",
              border: "1px solid #ffc107",
            }}>
              Upgrade for more listings
            </Link>
          )}
          <Link
            href="/dashboard/client/listings/add"
            style={{
              padding: "10px 22px",
              background: atLimit && maxListings !== 9999 ? "#e9ecef" : "#6dbf8b",
              color: atLimit && maxListings !== 9999 ? "#aaa" : "#fff",
              borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none",
              pointerEvents: atLimit && maxListings !== 9999 ? "none" : "auto",
            } as any}
          >
            + Add Listing
          </Link>
        </div>
      </div>

      {error && <div style={{ background: "#fde", padding: 12, borderRadius: 8, color: "#c00", marginBottom: 16 }}>{error}</div>}
      {loading && <div style={{ textAlign: "center", padding: 60, color: "#666" }}>Loading...</div>}

      {!loading && listings.length === 0 && (
        <div style={{ textAlign: "center", padding: 80, background: "#f8f9fa", borderRadius: 14 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏢</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1a2332", marginBottom: 8 }}>No listings yet</div>
          <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>
            Submit your first property listing and reach thousands of buyers and tenants.
          </p>
          <Link href="/dashboard/client/listings/add" style={{ padding: "12px 32px", background: "#6dbf8b", color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            Add Your First Listing
          </Link>
        </div>
      )}

      {/* Listings grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {listings.map((listing) => {
          const badge = STATUS_BADGE[listing.status] || STATUS_BADGE.draft;
          const imgUrl = listing.featuredImage
            ? resolveAbsoluteMediaUrl(listing.featuredImage)
            : null;
          const canEdit = ["draft", "pending"].includes(listing.status);

          return (
            <div key={listing.id} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              {/* Image */}
              <div style={{ height: 150, background: "#f0f0f0", position: "relative" }}>
                {imgUrl
                  ? <img src={imgUrl} alt={listing.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#ccc", fontSize: 32 }}>🏢</div>
                }
                <span style={{
                  position: "absolute", top: 10, right: 10,
                  background: badge.bg, color: badge.color,
                  padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                }}>{badge.label}</span>
              </div>

              <div style={{ padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a2332", marginBottom: 4, lineHeight: 1.4 }}>{listing.title}</div>
                <div style={{ color: "#aaa", fontSize: 11, marginBottom: 8 }}>Ref: {listing.referenceNumber}</div>
                {listing.city && <div style={{ color: "#666", fontSize: 12, marginBottom: 4 }}>📍 {listing.city}</div>}
                {listing.price != null && <div style={{ fontWeight: 700, color: "#6dbf8b", fontSize: 14, marginBottom: 12 }}>R {listing.price.toLocaleString()}</div>}

                {listing.status === "published" && (
                  <div style={{ background: "#f0fff4", border: "1px solid #6dbf8b", borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 12, color: "#27ae60" }}>
                    ✓ Live: buyers can find and inquire about this listing
                  </div>
                )}

                {listing.status === "pending" && (
                  <div style={{ background: "#fff8e1", border: "1px solid #ffc107", borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 12, color: "#795548" }}>
                    ⏳ Awaiting admin approval before going live
                  </div>
                )}

                <div style={{ display: "flex", gap: 8 }}>
                  {canEdit && (
                    <Link href={`/dashboard/client/listings/edit/${listing.id}`} style={{
                      flex: 1, textAlign: "center", padding: "8px 0",
                      background: "#f0f7ff", color: "#3498db",
                      borderRadius: 8, fontWeight: 600, fontSize: 12, textDecoration: "none",
                    }}>Edit</Link>
                  )}
                  {canEdit && (
                    <button onClick={() => handleDelete(listing.id)} disabled={deleting === listing.id} style={{
                      padding: "8px 14px", background: "#fde", color: "#e74c3c",
                      border: "none", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer",
                    }}>{deleting === listing.id ? "..." : "Delete"}</button>
                  )}
                  {!canEdit && (
                    <div style={{ flex: 1, textAlign: "center", padding: "8px 0", background: "#f8f9fa", color: "#aaa", borderRadius: 8, fontSize: 12 }}>
                      Contact admin to edit
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
