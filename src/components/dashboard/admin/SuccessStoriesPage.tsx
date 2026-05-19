"use client";
import { useEffect, useState, useRef } from "react";
import {
  fetchAllSuccessStories,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
} from "@/utils/dashboardApi";
import { BACKEND_ROOT } from "@/utils/publicEnv";
import { getApiErrorMessage } from "@/utils/apiError";

interface Story {
  id: number;
  title: string;
  slug: string;
  tag?: string;
  location?: string;
  gla?: string;
  parking?: string;
  openingDate?: string;
  anchorTenant?: string;
  projectType?: string;
  summary?: string;
  body?: string;
  imageUrl?: string;
  brochureUrl?: string;
  googleMapsQuery?: string;
  sortOrder: number;
  isPublished: boolean;
}

const EMPTY: Partial<Story> = {
  title: "", slug: "", tag: "", location: "", gla: "", parking: "",
  openingDate: "", anchorTenant: "", projectType: "", summary: "", body: "",
  googleMapsQuery: "", sortOrder: 0, isPublished: true,
};

export default function AdminSuccessStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Story> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const brochureRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchAllSuccessStories();
      setStories(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load success stories.");
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

  const openEdit = (s: Story) => {
    setEditing({ ...s });
    setIsNew(false);
    setImagePreview(s.imageUrl ? `${BACKEND_ROOT}${s.imageUrl}` : null);
    setSaveError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!editing?.title?.trim()) { setSaveError("Title is required."); return; }
    setSaving(true);
    setSaveError("");
    try {
      const fd = new FormData();
      Object.entries(editing).forEach(([k, v]) => {
        if (v !== undefined && v !== null && k !== "id") {
          fd.append(k, String(v));
        }
      });
      if (imageRef.current?.files?.[0]) fd.append("image", imageRef.current.files[0]);
      if (brochureRef.current?.files?.[0]) fd.append("brochure", brochureRef.current.files[0]);

      if (isNew) {
        await createSuccessStory(fd);
      } else {
        await updateSuccessStory(editing.id!, fd);
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
      await deleteSuccessStory(id);
      setDeleteId(null);
      load();
    } catch {
      alert("Failed to delete story.");
    }
  };

  const field = (key: keyof Story, label: string, opts?: { type?: string; multiline?: boolean; placeholder?: string }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      {opts?.multiline ? (
        <textarea
          rows={4}
          value={(editing?.[key] as string) ?? ""}
          onChange={e => setEditing(prev => ({ ...prev, [key]: e.target.value }))}
          placeholder={opts?.placeholder}
          style={inputStyle}
        />
      ) : (
        <input
          type={opts?.type || "text"}
          value={(editing?.[key] as string) ?? ""}
          onChange={e => setEditing(prev => ({ ...prev, [key]: e.target.value }))}
          placeholder={opts?.placeholder}
          style={inputStyle}
        />
      )}
    </div>
  );

  return (
    <div style={{ padding: "32px 28px", background: "#f7fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a2332", margin: 0 }}>Success Stories</h2>
          <p style={{ color: "#718096", fontSize: 14, margin: "4px 0 0" }}>Manage public success stories, images and brochures</p>
        </div>
        <button onClick={openNew} style={btnPrimary}>+ New Story</button>
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
                {["Image", "Title", "Tag", "Location", "Published", "Actions"].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stories.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: "#a0aec0" }}>No stories yet. Click + New Story to add one.</td></tr>
              ) : stories.map((s, i) => (
                <tr key={s.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderTop: "1px solid #f0f0f0" }}>
                  <td style={tdStyle}>
                    {s.imageUrl ? (
                      <img src={`${BACKEND_ROOT}${s.imageUrl}`} alt="" style={{ width: 60, height: 44, objectFit: "cover", borderRadius: 6 }} />
                    ) : <span style={{ color: "#cbd5e0" }}>N/A</span>}
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: "#1a2332" }}>
                    {s.title}
                    <div style={{ fontSize: 12, color: "#a0aec0", fontWeight: 400 }}>/{s.slug}</div>
                  </td>
                  <td style={tdStyle}>{s.tag || "N/A"}</td>
                  <td style={tdStyle}>{s.location || "N/A"}</td>
                  <td style={tdStyle}>
                    <span style={{
                      display: "inline-block",
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
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
                      {s.brochureUrl && (
                        <a href={`${BACKEND_ROOT}${s.brochureUrl}`} target="_blank" rel="noreferrer" title="Download Brochure" style={{ ...btnEdit, textDecoration: "none" }}>
                          <i className="bi bi-file-earmark-pdf" />
                        </a>
                      )}
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
                {isNew ? "Add New Story" : "Edit Story"}
              </h3>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#718096" }}>×</button>
            </div>

            <div style={{ overflowY: "auto", maxHeight: "calc(90vh - 160px)", paddingRight: 4 }}>
              {/* Row 1 */}
              <div className="row">
                <div className="col-md-8">{field("title", "Title *", { placeholder: "e.g. The Neighbourhood Square" })}</div>
                <div className="col-md-4">{field("slug", "URL Slug", { placeholder: "auto-generated if empty" })}</div>
              </div>
              <div className="row">
                <div className="col-md-6">{field("tag", "Tag / Category", { placeholder: "e.g. Retail Development" })}</div>
                <div className="col-md-6">{field("projectType", "Project Type", { placeholder: "e.g. Mall Refurbishment" })}</div>
              </div>
              <div className="row">
                <div className="col-md-8">{field("location", "Location", { placeholder: "e.g. Steeledale, Johannesburg South" })}</div>
                <div className="col-md-4">{field("openingDate", "Opening / Completion Date", { placeholder: "e.g. 16 July 2020" })}</div>
              </div>
              <div className="row">
                <div className="col-md-4">{field("gla", "GLA (m²)", { placeholder: "e.g. 7 102 m²" })}</div>
                <div className="col-md-4">{field("parking", "Parking Bays", { placeholder: "e.g. 670" })}</div>
                <div className="col-md-4">{field("anchorTenant", "Anchor Tenant", { placeholder: "e.g. Woolworths Food" })}</div>
              </div>
              {field("summary", "Short Summary", { multiline: true, placeholder: "Brief description shown on the listing card…" })}
              {field("body", "Full Story / Body Text", { multiline: true, placeholder: "Detailed project story shown on the detail page…" })}
              {field("googleMapsQuery", "Google Maps Search Query", { placeholder: "e.g. Corner of Club St Lissalond Road Bedford South Africa" })}

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

              {/* Image upload */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Cover Image</label>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {imagePreview && (
                    <img src={imagePreview} alt="preview" style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 8, border: "1px solid #e2e8f0" }} />
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
                    <div style={{ fontSize: 12, color: "#a0aec0", marginTop: 4 }}>JPG, PNG or WebP, max 10MB</div>
                  </div>
                </div>
              </div>

              {/* Brochure upload */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Brochure (PDF)</label>
                <div>
                  {editing.brochureUrl && !isNew && (
                    <a href={`${BACKEND_ROOT}${editing.brochureUrl}`} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#888e7d", display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                      <i className="bi bi-file-earmark-pdf" /> Current brochure (click to view)
                    </a>
                  )}
                  <input
                    type="file"
                    accept=".pdf"
                    ref={brochureRef}
                    style={{ fontSize: 13, display: "block" }}
                  />
                  <div style={{ fontSize: 12, color: "#a0aec0", marginTop: 4 }}>PDF only, max 20MB. Upload a new file to replace the existing one.</div>
                </div>
              </div>
            </div>

            {saveError && <div style={{ ...errorBox, marginTop: 8 }}>{saveError}</div>}

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20, paddingTop: 16, borderTop: "1px solid #e2e8f0" }}>
              <button onClick={() => setShowForm(false)} style={btnSecondary} disabled={saving}>Cancel</button>
              <button onClick={handleSave} style={btnPrimary} disabled={saving}>
                {saving ? "Saving…" : isNew ? "Create Story" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM ────────────────────────────────────────────── */}
      {deleteId !== null && (
        <div style={overlay}>
          <div style={{ ...modal, maxWidth: 420 }}>
            <h4 style={{ margin: "0 0 12px", color: "#1a2332" }}>Delete Story?</h4>
            <p style={{ color: "#718096", marginBottom: 24 }}>This action cannot be undone. The story and its files will be permanently removed.</p>
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
  maxWidth: 860, maxHeight: "90vh", display: "flex", flexDirection: "column",
  boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
};
