"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchClientListings, updateClientListing } from "@/utils/dashboardApi";

const CATEGORIES = [
  { value: "office", label: "Office / Commercial" },
  { value: "retail", label: "Retail / Shop" },
  { value: "industrial", label: "Industrial / Warehouse" },
  { value: "development_land", label: "Development Land" },
  { value: "mixed_use", label: "Mixed Use" },
  { value: "investment", label: "Investment Property" },
];

const LISTING_TYPES = [
  { value: "sale", label: "For Sale" },
  { value: "lease", label: "To Let" },
  { value: "investment", label: "Investment Opportunity" },
];

const PROVINCES = [
  "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape",
  "Free State", "Limpopo", "Mpumalanga", "North West", "Northern Cape",
];

export default function EditClientListingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = Number(params.id);

  const [form, setForm] = useState({
    title: "", category: "", listingType: "sale",
    price: "", province: "", city: "", suburb: "", address: "",
    description: "", virtualTourLink: "", featuredImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchClientListings()
      .then((res) => {
        const all = Array.isArray(res.data) ? res.data : [];
        const listing = all.find((l: any) => l.id === id);
        if (!listing) { setNotFound(true); return; }
        if (!["draft", "pending"].includes(listing.status)) { setReadOnly(true); }
        setForm({
          title: listing.title || "",
          category: listing.category || "",
          listingType: listing.listingType || "sale",
          price: listing.price != null ? String(listing.price) : "",
          province: listing.province || "",
          city: listing.city || "",
          suburb: listing.suburb || "",
          address: listing.address || "",
          description: listing.description || "",
          virtualTourLink: listing.virtualTourLink || "",
          featuredImage: listing.featuredImage || "",
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.category) { setError("Title and category are required."); return; }
    setSubmitting(true);
    try {
      await updateClientListing(id, { ...form, price: form.price ? Number(form.price) : undefined });
      router.push("/dashboard/client/listings?updated=1");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to update listing.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ textAlign: "center", padding: 80, color: "#666" }}>Loading...</div>;
  if (notFound) return (
    <div style={{ textAlign: "center", padding: 80 }}>
      <div style={{ fontSize: 32, marginBottom: 16 }}>404</div>
      <div style={{ color: "#666" }}>Listing not found.</div>
      <Link href="/dashboard/client/listings" style={{ color: "#3498db", marginTop: 12, display: "inline-block" }}>Back to listings</Link>
    </div>
  );

  if (readOnly) return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", padding: 60 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <h3 style={{ color: "#1a2332" }}>This listing cannot be edited</h3>
      <p style={{ color: "#666", lineHeight: 1.7 }}>
        Only listings with <strong>Draft</strong> or <strong>Pending Review</strong> status can be edited.<br />
        To make changes to a published or sold listing, please contact our admin team.
      </p>
      <Link href="/dashboard/client/listings" style={{ padding: "10px 24px", background: "#6dbf8b", color: "#fff", borderRadius: 8, textDecoration: "none", fontWeight: 700, display: "inline-block", marginTop: 16 }}>Back to My Listings</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <Link href="/dashboard/client/listings" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#666", textDecoration: "none", fontSize: 13, marginBottom: 24 }}>
        <i className="bi bi-arrow-left" /> Back to My Listings
      </Link>

      <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: "#1a2332" }}>Edit Listing</h2>
      <p style={{ margin: "0 0 28px", color: "#666", fontSize: 13 }}>
        Changes will be reviewed by our admin team before going live.
      </p>

      {error && <div style={{ background: "#fde", padding: 12, borderRadius: 8, color: "#c00", marginBottom: 20, fontSize: 13 }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Property Title *</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} style={inputStyle} required />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div>
            <label style={labelStyle}>Category *</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} style={inputStyle} required>
              <option value="">Select...</option>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Listing Type *</label>
            <select value={form.listingType} onChange={(e) => set("listingType", e.target.value)} style={inputStyle} required>
              {LISTING_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Asking Price (ZAR)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#888", fontWeight: 600, fontSize: 14 }}>R</span>
            <input type="number" min="0" value={form.price} onChange={(e) => set("price", e.target.value)} style={{ ...inputStyle, paddingLeft: 28 }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <select value={form.province} onChange={(e) => set("province", e.target.value)} style={inputStyle}>
            <option value="">Province</option>
            {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="City" style={inputStyle} />
          <input value={form.suburb} onChange={(e) => set("suburb", e.target.value)} placeholder="Suburb" style={inputStyle} />
          <input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Street address" style={inputStyle} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Description</label>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={5} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Featured Image URL</label>
          <input value={form.featuredImage} onChange={(e) => set("featuredImage", e.target.value)} placeholder="https://..." style={inputStyle} />
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>Virtual Tour / Video Link</label>
          <input value={form.virtualTourLink} onChange={(e) => set("virtualTourLink", e.target.value)} placeholder="https://..." style={inputStyle} />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/dashboard/client/listings" style={{ flex: 1, textAlign: "center", padding: "14px 0", background: "#f0f0f0", color: "#555", borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            Cancel
          </Link>
          <button type="submit" disabled={submitting} style={{ flex: 2, padding: "14px 0", background: "#6dbf8b", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: submitting ? "not-allowed" : "pointer" }}>
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13, boxSizing: "border-box" };
