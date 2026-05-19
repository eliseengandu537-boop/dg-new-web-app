"use client";
import { useEffect, useState, useRef } from "react";
import {
  fetchAllNews,
  createNewsPost,
  updateNewsPost,
  deleteNewsPost,
} from "@/utils/dashboardApi";
import { BACKEND_ROOT } from "@/utils/publicEnv";
import { getApiErrorMessage } from "@/utils/apiError";

interface NewsPost {
  id: number;
  title: string;
  slug: string;
  category?: string;
  author?: string;
  summary?: string;
  body?: string;
  imageUrl?: string;
  tags?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt?: string;
}

const EMPTY: Partial<NewsPost> = {
  title: "", slug: "", category: "", author: "", summary: "", body: "", tags: "", isPublished: false,
};

const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#4a5568", marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: "#1a2332", background: "#fff", outline: "none", boxSizing: "border-box" };
const btnPrimary: React.CSSProperties = { background: "linear-gradient(90deg,#c8973a,#e8b86d)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" };
const btnEdit: React.CSSProperties = { background: "#ebf8ff", color: "#2b6cb0", border: "none", borderRadius: 6, padding: "5px 12px", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 };
const btnDanger: React.CSSProperties = { background: "#fff5f5", color: "#c53030", border: "none", borderRadius: 6, padding: "5px 10px", fontWeight: 600, fontSize: 13, cursor: "pointer" };
const errorBox: React.CSSProperties = { background: "#fff5f5", color: "#c53030", border: "1px solid #feb2b2", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 14 };
const thStyle: React.CSSProperties = { padding: "12px 16px", textAlign: "left", fontWeight: 700, fontSize: 13, color: "#718096", whiteSpace: "nowrap" };
const tdStyle: React.CSSProperties = { padding: "12px 16px", fontSize: 14, color: "#4a5568", verticalAlign: "middle" };
const overlay: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 40, paddingBottom: 40, overflowY: "auto" };
const modal: React.CSSProperties = { background: "#fff", borderRadius: 16, padding: "32px 28px", width: "100%", maxWidth: 760, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", margin: "auto" };

const CATEGORIES = ["Market Update", "Investment", "Retail", "Development", "Industry News", "Company News", "Other"];

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<NewsPost> | null>(null);
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
      const res = await fetchAllNews();
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load news posts.");
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

  const openEdit = (p: NewsPost) => {
    setEditing({ ...p });
    setIsNew(false);
    setImagePreview(p.imageUrl ? `${BACKEND_ROOT}${p.imageUrl}` : null);
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
        if (v !== undefined && v !== null && k !== "id") fd.append(k, String(v));
      });
      if (imageRef.current?.files?.[0]) fd.append("image", imageRef.current.files[0]);

      if (isNew) {
        await createNewsPost(fd);
      } else {
        await updateNewsPost(editing.id!, fd);
      }
      setShowForm(false);
      load();
    } catch (e: unknown) {
      setSaveError(getApiErrorMessage(e, "Failed to save. Check backend is running."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNewsPost(id);
      setDeleteId(null);
      load();
    } catch {
      alert("Failed to delete post.");
    }
  };

  const field = (key: keyof NewsPost, label: string, opts?: { multiline?: boolean; placeholder?: string }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      {opts?.multiline ? (
        <textarea
          rows={5}
          value={(editing?.[key] as string) ?? ""}
          onChange={e => setEditing(prev => ({ ...prev, [key]: e.target.value }))}
          placeholder={opts?.placeholder}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      ) : (
        <input
          type="text"
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
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a2332", margin: 0 }}>Property News</h2>
          <p style={{ color: "#718096", fontSize: 14, margin: "4px 0 0" }}>Write and publish news articles — they appear live on the website under Insights → Property News</p>
        </div>
        <button onClick={openNew} style={btnPrimary}>+ New Article</button>
      </div>

      {error && <div style={errorBox}>{error}</div>}
      {loading && <p style={{ color: "#718096" }}>Loading…</p>}

      {/* Table */}
      {!loading && !error && (
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                {["Image", "Title", "Category", "Author", "Status", "Date", "Actions"].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#a0aec0" }}>No articles yet. Click + New Article to publish your first news post.</td></tr>
              ) : posts.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderTop: "1px solid #f0f0f0" }}>
                  <td style={tdStyle}>
                    {p.imageUrl
                      ? <img src={`${BACKEND_ROOT}${p.imageUrl}`} alt="" style={{ width: 64, height: 46, objectFit: "cover", borderRadius: 6 }} />
                      : <div style={{ width: 64, height: 46, borderRadius: 6, background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <i className="bi bi-image" style={{ color: "#a0aec0", fontSize: 18 }} />
                        </div>
                    }
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: "#1a2332", maxWidth: 260 }}>
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: "#a0aec0", fontWeight: 400 }}>/{p.slug}</div>
                  </td>
                  <td style={tdStyle}>{p.category || <span style={{ color: "#cbd5e0" }}>—</span>}</td>
                  <td style={tdStyle}>{p.author || <span style={{ color: "#cbd5e0" }}>—</span>}</td>
                  <td style={tdStyle}>
                    <span style={{
                      display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                      background: p.isPublished ? "#c6f6d5" : "#fefcbf",
                      color: p.isPublished ? "#276749" : "#744210",
                    }}>
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, fontSize: 12, whiteSpace: "nowrap", color: "#718096" }}>
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : (p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : "—")}
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => openEdit(p)} style={btnEdit}><i className="bi bi-pencil" /> Edit</button>
                      <button onClick={() => setDeleteId(p.id)} style={btnDanger}><i className="bi bi-trash" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── DELETE CONFIRM ── */}
      {deleteId !== null && (
        <div style={overlay}>
          <div style={{ ...modal, maxWidth: 420, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>Delete Article?</h3>
            <p style={{ color: "#718096", marginBottom: 24 }}>This action cannot be undone.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setDeleteId(null)} style={{ ...btnEdit, background: "#f7fafc", color: "#4a5568" }}>Cancel</button>
              <button onClick={() => handleDelete(deleteId)} style={{ ...btnPrimary, background: "#e53e3e" }}>Yes, delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD / EDIT MODAL ── */}
      {showForm && editing && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #e2e8f0" }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a2332" }}>
                {isNew ? "Write New Article" : "Edit Article"}
              </h3>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#718096" }}>×</button>
            </div>

            <div style={{ overflowY: "auto", maxHeight: "calc(90vh - 160px)", paddingRight: 4 }}>
              {/* Title + Slug */}
              <div className="row">
                <div className="col-md-8">{field("title", "Title *", { placeholder: "e.g. DG Property secures new retail anchor tenant" })}</div>
                <div className="col-md-4">{field("slug", "URL Slug", { placeholder: "auto-generated if empty" })}</div>
              </div>

              {/* Category + Author */}
              <div className="row">
                <div className="col-md-6">
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Category</label>
                    <select
                      value={editing.category ?? ""}
                      onChange={e => setEditing(prev => ({ ...prev, category: e.target.value }))}
                      style={inputStyle}
                    >
                      <option value="">— Select category —</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">{field("author", "Author / By", { placeholder: "e.g. DG Property Team" })}</div>
              </div>

              {/* Tags */}
              {field("tags", "Tags (comma-separated)", { placeholder: "e.g. retail, Johannesburg, leasing" })}

              {/* Summary */}
              {field("summary", "Short Summary", { multiline: true, placeholder: "Brief teaser shown on the news card (1–2 sentences)…" })}

              {/* Body */}
              {field("body", "Full Article Body", { multiline: true, placeholder: "Write the full article here. Paragraphs will be displayed as-is…" })}

              {/* Status */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Publication Status</label>
                <select
                  value={editing.isPublished ? "true" : "false"}
                  onChange={e => setEditing(prev => ({ ...prev, isPublished: e.target.value === "true" }))}
                  style={inputStyle}
                >
                  <option value="false">Draft — not visible on website</option>
                  <option value="true">Published — live on website</option>
                </select>
              </div>

              {/* Image */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Cover Image</label>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" style={{ width: 110, height: 76, objectFit: "cover", borderRadius: 8, border: "1px solid #e2e8f0" }} />
                  ) : (
                    <div style={{ width: 110, height: 76, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #cbd5e0" }}>
                      <i className="bi bi-image" style={{ color: "#a0aec0", fontSize: 22 }} />
                    </div>
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
                    <p style={{ fontSize: 12, color: "#a0aec0", margin: "4px 0 0" }}>JPG, PNG, WebP — max 10 MB</p>
                  </div>
                </div>
              </div>

              {saveError && <div style={errorBox}>{saveError}</div>}

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingTop: 12, borderTop: "1px solid #e2e8f0" }}>
                <button onClick={() => setShowForm(false)} style={{ ...btnEdit, background: "#f7fafc", color: "#4a5568", padding: "10px 20px" }}>Cancel</button>
                <button onClick={handleSave} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.7 : 1 }}>
                  {saving ? "Saving…" : isNew ? "Publish Article" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
