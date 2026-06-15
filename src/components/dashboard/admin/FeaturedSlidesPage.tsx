"use client";
import { useEffect, useState, useRef } from "react";
import {
  fetchAllFeaturedSlides,
  createFeaturedSlide,
  updateFeaturedSlide,
  deleteFeaturedSlide,
} from "@/utils/dashboardApi";
import { BACKEND_ROOT } from "@/utils/publicEnv";
import { getApiErrorMessage } from "@/utils/apiError";

interface Slide {
  id: number;
  title?: string;
  subtitle?: string;
  status?: string;
  imageUrl?: string;
  linkUrl?: string;
  sortOrder: number;
  isPublished: boolean;
}

const EMPTY: Partial<Slide> = {
  title: "", subtitle: "", status: "sold", linkUrl: "", sortOrder: 0, isPublished: true,
};

export default function AdminFeaturedSlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Slide> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchAllFeaturedSlides();
      setSlides(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load featured slides.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ ...EMPTY });
    setIsNew(true);
    setImagePreview(null);
    setSaveError("");
    setShowForm(true);
  };

  const openEdit = (s: Slide) => {
    setEditing({ ...s });
    setIsNew(false);
    setImagePreview(s.imageUrl ? `${BACKEND_ROOT}${s.imageUrl}` : null);
    setSaveError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (isNew && !imageRef.current?.files?.[0]) { setSaveError("A slide image is required."); return; }
    setSaving(true);
    setSaveError("");
    try {
      const fd = new FormData();
      Object.entries(editing || {}).forEach(([k, v]) => {
        if (v !== undefined && v !== null && k !== "id" && k !== "imageUrl") {
          fd.append(k, String(v));
        }
      });
      if (imageRef.current?.files?.[0]) fd.append("image", imageRef.current.files[0]);

      if (isNew) {
        await createFeaturedSlide(fd);
      } else {
        await updateFeaturedSlide(editing!.id!, fd);
      }
      setShowForm(false);
      load();
    } catch (e: unknown) {
      setSaveError(getApiErrorMessage(e, "Failed to save."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFeaturedSlide(id);
      setDeleteId(null);
      load();
    } catch {
      alert("Failed to delete slide.");
    }
  };

  const field = (key: keyof Slide, label: string, opts?: { placeholder?: string }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      <input
        type="text"
        value={(editing?.[key] as string) ?? ""}
        onChange={e => setEditing(prev => ({ ...prev, [key]: e.target.value }))}
        placeholder={opts?.placeholder}
        style={inputStyle}
      />
    </div>
  );

  return (
    <div style={{ padding: "32px 28px", background: "#f7fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a2332", margin: 0 }}>Featured Slides</h2>
          <p style={{ color: "#718096", fontSize: 14, margin: "4px 0 0" }}>Slideshow of sold &amp; leased properties shown on the home page</p>
        </div>
        <button onClick={openNew} style={btnPrimary}>+ New Slide</button>
      </div>

      {/* Error / Loading */}
      {error && <div style={errorBox}>{error}</div>}
      {loading && <p style={{ color: "#718096" }}>Loading…</p>}

      {/* Table */}
      {!loading && !error && (
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                {["Image", "Title", "Status", "Order", "Published", "Actions"].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slides.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: "#a0aec0" }}>No slides yet. Click + New Slide to add one.</td></tr>
              ) : slides.map((s, i) => (
                <tr key={s.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderTop: "1px solid #f0f0f0" }}>
                  <td style={tdStyle}>
                    {s.imageUrl ? (
                      <img src={`${BACKEND_ROOT}${s.imageUrl}`} alt="" style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 6 }} />
                    ) : <span style={{ color: "#cbd5e0" }}>N/A</span>}
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: "#1a2332" }}>
                    {s.title || <span style={{ color: "#a0aec0", fontWeight: 400 }}>Untitled</span>}
                    {s.subtitle && <div style={{ fontSize: 12, color: "#a0aec0", fontWeight: 400 }}>{s.subtitle}</div>}
                  </td>
                  <td style={tdStyle}>
                    {s.status ? (
                      <span style={{
                        display: "inline-block", padding: "3px 10px", borderRadius: 20,
                        fontSize: 12, fontWeight: 600, textTransform: "uppercase",
                        background: s.status === "leased" ? "#e9d8fd" : "#c6f6d5",
                        color: s.status === "leased" ? "#553c9a" : "#276749",
                      }}>
                        {s.status}
                      </span>
                    ) : "N/A"}
                  </td>
                  <td style={tdStyle}>{s.sortOrder}</td>
                  <td style={tdStyle}>
                    <span style={{
                      display: "inline-block", padding: "3px 10px", borderRadius: 20,
                      fontSize: 12, fontWeight: 600,
                      background: s.isPublished ? "#c6f6d5" : "#fed7d7",
                      color: s.isPublished ? "#276749" : "#9b2c2c",
                    }}>
                      {s.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => openEdit(s)} style={btnEdit}>
                        <i className="bi bi-pencil" /> Edit
                      </button>
                      <button onClick={() => setDeleteId(s.id)} style={btnDanger}>
                        <i className="bi bi-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── ADD / EDIT MODAL ─────────────────────────────────────────── */}
      {showForm && editing && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #e2e8f0" }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a2332" }}>
                {isNew ? "Add New Slide" : "Edit Slide"}
              </h3>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#718096" }}>×</button>
            </div>

            <div style={{ overflowY: "auto", maxHeight: "calc(90vh - 160px)", paddingRight: 4 }}>
              {/* Image upload */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Slide Image {isNew && "*"}</label>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {imagePreview && (
                    <img src={imagePreview} alt="preview" style={{ width: 160, height: 100, objectFit: "cover", borderRadius: 8, border: "1px solid #e2e8f0" }} />
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={imageRef}
                      onChange={e => {
                        const f = e.target.files?.[0];
                        if (f) setImagePreview(URL.createObjectURL(f));
                      }}
                      style={{ fontSize: 13 }}
                    />
                    <div style={{ fontSize: 12, color: "#a0aec0", marginTop: 4 }}>JPG, PNG or WebP, max 10MB. Landscape works best.</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8">{field("title", "Title / Caption", { placeholder: "e.g. Prime Sandton Office" })}</div>
                <div className="col-md-4">
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Status Badge</label>
                    <select
                      value={editing.status ?? ""}
                      onChange={e => setEditing(prev => ({ ...prev, status: e.target.value }))}
                      style={inputStyle}
                    >
                      <option value="sold">Sold</option>
                      <option value="leased">Leased</option>
                      <option value="">No badge</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">{field("subtitle", "Subtitle", { placeholder: "e.g. Sandton, Johannesburg" })}</div>
                <div className="col-md-4">{field("linkUrl", "Link (optional)", { placeholder: "/listing_details_06?id=12" })}</div>
              </div>

              {/* Sort & Published */}
              <div className="row">
                <div className="col-md-4">
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Sort Order</label>
                    <input
                      type="number"
                      value={editing.sortOrder ?? 0}
                      onChange={e => setEditing(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Status</label>
                    <select
                      value={editing.isPublished ? "true" : "false"}
                      onChange={e => setEditing(prev => ({ ...prev, isPublished: e.target.value === "true" }))}
                      style={inputStyle}
                    >
                      <option value="true">Published (visible on website)</option>
                      <option value="false">Draft (hidden)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {saveError && <div style={{ ...errorBox, marginTop: 8 }}>{saveError}</div>}

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20, paddingTop: 16, borderTop: "1px solid #e2e8f0" }}>
              <button onClick={() => setShowForm(false)} style={btnSecondary} disabled={saving}>Cancel</button>
              <button onClick={handleSave} style={btnPrimary} disabled={saving}>
                {saving ? "Saving…" : isNew ? "Create Slide" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM ────────────────────────────────────────────── */}
      {deleteId !== null && (
        <div style={overlay}>
          <div style={{ ...modal, maxWidth: 420 }}>
            <h4 style={{ margin: "0 0 12px", color: "#1a2332" }}>Delete Slide?</h4>
            <p style={{ color: "#718096", marginBottom: 24 }}>This action cannot be undone. The slide will be permanently removed from the home page.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button onClick={() => setDeleteId(null)} style={btnSecondary}>Cancel</button>
              <button onClick={() => handleDelete(deleteId!)} style={{ ...btnPrimary, background: "#e53e3e" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px", fontSize: 14, border: "1px solid #e2e8f0",
  borderRadius: 8, outline: "none", boxSizing: "border-box", background: "#fff",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 600, color: "#4a5568",
  textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6,
};
const thStyle: React.CSSProperties = {
  padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 600,
  color: "#718096", textTransform: "uppercase", letterSpacing: 0.8,
};
const tdStyle: React.CSSProperties = { padding: "12px 16px", verticalAlign: "middle" };
const btnPrimary: React.CSSProperties = {
  background: "linear-gradient(90deg, #1a2332, #2d4a63)", color: "#fff",
  border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600,
  fontSize: 14, cursor: "pointer",
};
const btnSecondary: React.CSSProperties = {
  background: "#edf2f7", color: "#4a5568", border: "none", borderRadius: 8,
  padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer",
};
const btnEdit: React.CSSProperties = {
  background: "#ebf8ff", color: "#2b6cb0", border: "none", borderRadius: 6,
  padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer",
};
const btnDanger: React.CSSProperties = {
  background: "#fff5f5", color: "#c53030", border: "none", borderRadius: 6,
  padding: "5px 10px", fontSize: 12, cursor: "pointer",
};
const errorBox: React.CSSProperties = {
  background: "#fff5f5", border: "1px solid #fed7d7", color: "#c53030",
  borderRadius: 8, padding: "10px 14px", fontSize: 14, marginBottom: 16,
};
const overlay: React.CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
  zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
};
const modal: React.CSSProperties = {
  background: "#fff", borderRadius: 16, padding: 28, width: "100%",
  maxWidth: 720, maxHeight: "90vh", display: "flex", flexDirection: "column",
  boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
};
