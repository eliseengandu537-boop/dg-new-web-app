"use client";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { submitClientListing } from "@/utils/dashboardApi";

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
  { value: "lease", label: "To Let / Lease" },
  { value: "investment", label: "Investment Opportunity" },
];

const PROVINCES = [
  "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape",
  "Free State", "Limpopo", "Mpumalanga", "North West", "Northern Cape",
];

export default function AddClientListingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    category: "",
    listingType: "sale",
    price: "",
    province: "",
    city: "",
    suburb: "",
    address: "",
    description: "",
    virtualTourLink: "",
    featuredImage: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Live map
  const [mapSrc, setMapSrc] = useState("");
  const mapDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateMap = useCallback((f: typeof form) => {
    const q = [f.address, f.suburb, f.city, f.province, "South Africa"].filter(Boolean).join(", ");
    if (!q.trim() || q === "South Africa") return;
    if (mapDebounce.current) clearTimeout(mapDebounce.current);
    mapDebounce.current = setTimeout(() => {
      setMapSrc(`https://maps.google.com/maps?width=600&height=350&hl=en&q=${encodeURIComponent(q)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`);
    }, 800);
  }, []);

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.category || !form.listingType) {
      setError("Title, category and listing type are required.");
      return;
    }
    setSubmitting(true);
    try {
      await submitClientListing({
        ...form,
        price: form.price ? Number(form.price) : undefined,
      });
      router.push("/dashboard/client/listings?submitted=1");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to submit listing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {/* Back */}
      <Link href="/dashboard/client/listings" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#666", textDecoration: "none", fontSize: 13, marginBottom: 24 }}>
        <i className="bi bi-arrow-left" /> Back to My Listings
      </Link>

      <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: "#1a2332" }}>Add New Listing</h2>
      <p style={{ margin: "0 0 28px", color: "#666", fontSize: 13 }}>
        Your listing will be reviewed by our admin team before going live. This usually takes 1 to 2 business days.
      </p>

      {/* Info banner */}
      <div style={{ background: "#f0f7ff", border: "1px solid #3498db30", borderRadius: 10, padding: "14px 18px", marginBottom: 28, display: "flex", gap: 12 }}>
        <i className="bi bi-info-circle" style={{ color: "#3498db", fontSize: 18, flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>
          Once approved, your listing will appear on the DG Property portal. Buyers will be able to inquire, and our team will manage contact sharing based on your membership plan. <Link href="/dashboard/client/membership" style={{ color: "#3498db" }}>Upgrade your plan</Link> for faster approvals and direct buyer contact.
        </div>
      </div>

      {error && <div style={{ background: "#fde", padding: 12, borderRadius: 8, color: "#c00", marginBottom: 20, fontSize: 13 }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Property Title *</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Modern Office Suite in Sandton CBD" style={inputStyle} required />
        </div>

        {/* Category + Type */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div>
            <label style={labelStyle}>Property Category *</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} style={inputStyle} required>
              <option value="">Select category...</option>
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

        {/* Price */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Asking Price (ZAR) <span style={{ color: "#aaa", fontWeight: 400 }}>(leave blank for &quot;Price on Application&quot;)</span></label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#888", fontSize: 14, fontWeight: 600 }}>R</span>
            <input
              type="number" min="0" value={form.price}
              onChange={(e) => set("price", e.target.value)}
              placeholder="5 000 000"
              style={{ ...inputStyle, paddingLeft: 28 }}
            />
          </div>
        </div>

        {/* Location */}
        <div style={{ marginBottom: 6 }}>
          <label style={labelStyle}>Location</label>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <select value={form.province} onChange={(e) => { set("province", e.target.value); updateMap({ ...form, province: e.target.value }); }} style={inputStyle}>
              <option value="">Province</option>
              {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <input value={form.city} onChange={(e) => { set("city", e.target.value); updateMap({ ...form, city: e.target.value }); }} placeholder="City" style={inputStyle} />
          </div>
          <div>
            <input value={form.suburb} onChange={(e) => { set("suburb", e.target.value); updateMap({ ...form, suburb: e.target.value }); }} placeholder="Suburb" style={inputStyle} />
          </div>
          <div>
            <input value={form.address} onChange={(e) => { set("address", e.target.value); updateMap({ ...form, address: e.target.value }); }} placeholder="Street address" style={inputStyle} />
          </div>
        </div>

        {/* Live Map */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Map Preview</label>
          {mapSrc ? (
            <div style={{ width: "100%", height: 300, borderRadius: 10, overflow: "hidden", border: "1px solid #e0e0e0" }}>
              <iframe
                src={mapSrc}
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div style={{ width: "100%", height: 160, borderRadius: 10, background: "#f7f8fa", border: "2px dashed #e0e0e0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#bbb", gap: 8 }}>
              <i className="bi bi-geo-alt" style={{ fontSize: 28 }} />
              <span style={{ fontSize: 12 }}>Enter an address above to see the map</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Property Description</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={5}
            placeholder="Describe the property: size, features, access, nearby amenities..."
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        {/* Featured image URL */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Featured Image URL <span style={{ color: "#aaa", fontWeight: 400 }}>(link to an image, Dropbox, Google Drive, etc.)</span></label>
          <input value={form.featuredImage} onChange={(e) => set("featuredImage", e.target.value)} placeholder="https://..." style={inputStyle} />
        </div>

        {/* Virtual tour */}
        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>Virtual Tour / Video Link <span style={{ color: "#aaa", fontWeight: 400 }}>(optional)</span></label>
          <input value={form.virtualTourLink} onChange={(e) => set("virtualTourLink", e.target.value)} placeholder="https://..." style={inputStyle} />
        </div>

        {/* What happens next */}
        <div style={{ background: "#f8f9fa", borderRadius: 10, padding: 18, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#1a2332", marginBottom: 10 }}>What happens after you submit?</div>
          <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#555", lineHeight: 2 }}>
            <li>Your listing is sent to our admin team for review</li>
            <li>Once approved, it goes live on the DG Property portal</li>
            <li>When a buyer inquires, admin reviews and approves contact sharing based on your plan</li>
            <li>You receive the buyer contact details and can reach out directly</li>
          </ol>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/dashboard/client/listings" style={{ flex: 1, textAlign: "center", padding: "14px 0", background: "#f0f0f0", color: "#555", borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            Cancel
          </Link>
          <button type="submit" disabled={submitting} style={{
            flex: 2, padding: "14px 0", background: "#6dbf8b", color: "#fff",
            border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: submitting ? "not-allowed" : "pointer",
          }}>
            {submitting ? "Submitting..." : "Submit Listing for Review"}
          </button>
        </div>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13, boxSizing: "border-box", outline: "none" };
