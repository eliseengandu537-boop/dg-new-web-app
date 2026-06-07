"use client";
import { useEffect, useState } from "react";
import {
  fetchAllNews,
  createNewsPost,
  updateNewsPost,
  deleteNewsPost,
} from "@/utils/dashboardApi";
import { BACKEND_ROOT } from "@/utils/publicEnv";
import { getApiErrorMessage } from "@/utils/apiError";

// ── Types ─────────────────────────────────────────────────────────────────
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
  featuredStories?: string;
  deals?: string;
  gallery?: string;
  leaderboard?: string;
  breakingNewsTitle?: string;
  breakingNewsDesc?: string;
  breakingNewsUrl?: string;
}

interface FeaturedStory {
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  readMoreUrl: string;
  icon: string;
  _preview?: string;
  _file?: File;
}

interface Deal {
  dealType: string;
  property: string;
  location: string;
  icon: string;
}

interface GalleryItem {
  url: string;
  _preview?: string;
  _file?: File;
}

interface LeaderboardEntry {
  name: string;
  amount: string;
}

interface BreakingState {
  title: string;
  desc: string;
  url: string;
}

// ── Constants ─────────────────────────────────────────────────────────────
const EMPTY: Partial<NewsPost> = {
  title: "", slug: "", category: "", author: "", summary: "", body: "", tags: "", isPublished: false,
};
const EMPTY_STORY: FeaturedStory = { type: "", title: "", description: "", imageUrl: "", readMoreUrl: "", icon: "bi-file-text" };
const EMPTY_DEAL: Deal = { dealType: "LOI", property: "", location: "", icon: "bi-building" };
const EMPTY_ENTRY: LeaderboardEntry = { name: "", amount: "" };

const STORY_ICONS = [
  "bi-file-text", "bi-heart", "bi-send", "bi-star", "bi-building",
  "bi-key", "bi-graph-up", "bi-trophy", "bi-handshake", "bi-briefcase",
];
const DEAL_ICONS = [
  "bi-building", "bi-cart", "bi-car-front", "bi-cup-hot", "bi-truck",
  "bi-geo-alt", "bi-shop", "bi-house", "bi-fuel-pump", "bi-lightning-charge",
];
const DEAL_TYPES = ["LOI", "Lease", "Sale", "Mandate", "Renewal", "Expansion", "Offer"];
const CATEGORIES = ["Market Update", "Investment", "Retail", "Development", "Industry News", "Company News", "Other"];

// ── Styles ────────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#4a5568", marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: "#1a2332", background: "#fff", outline: "none", boxSizing: "border-box" };
const btnPrimary: React.CSSProperties = { background: "linear-gradient(90deg,#c8973a,#e8b86d)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" };
const btnEdit: React.CSSProperties = { background: "#ebf8ff", color: "#2b6cb0", border: "none", borderRadius: 6, padding: "5px 12px", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 };
const btnDanger: React.CSSProperties = { background: "#fff5f5", color: "#c53030", border: "none", borderRadius: 6, padding: "5px 10px", fontWeight: 600, fontSize: 13, cursor: "pointer" };
const errorBox: React.CSSProperties = { background: "#fff5f5", color: "#c53030", border: "1px solid #feb2b2", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 14 };
const thStyle: React.CSSProperties = { padding: "12px 16px", textAlign: "left", fontWeight: 700, fontSize: 13, color: "#718096", whiteSpace: "nowrap" };
const tdStyle: React.CSSProperties = { padding: "12px 16px", fontSize: 14, color: "#4a5568", verticalAlign: "middle" };
const overlay: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 40, paddingBottom: 40, overflowY: "auto" };
const modal: React.CSSProperties = { background: "#fff", borderRadius: 16, padding: "32px 28px", width: "100%", maxWidth: 820, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", margin: "auto" };
const sectionCard: React.CSSProperties = { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px", marginBottom: 20 };
const itemCard: React.CSSProperties = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px", marginBottom: 12, position: "relative" };
const smInput: React.CSSProperties = { width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, color: "#1a2332", background: "#fff", outline: "none", boxSizing: "border-box" };

// ── Component ─────────────────────────────────────────────────────────────
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

  // Structured sections
  const [stories, setStories] = useState<FeaturedStory[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [breaking, setBreaking] = useState<BreakingState>({ title: "", desc: "", url: "" });

  const load = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetchAllNews();
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch { setError("Failed to load news posts."); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const resetStructured = () => {
    setStories([]); setDeals([]); setGalleryItems([]); setLeaderboard([]);
    setBreaking({ title: "", desc: "", url: "" });
  };

  const openNew = () => {
    setEditing({ ...EMPTY }); setIsNew(true); setSaveError("");
    resetStructured(); setShowForm(true);
  };

  const openEdit = (p: NewsPost) => {
    setEditing({ ...p }); setIsNew(false); setSaveError("");
    try { setStories(p.featuredStories ? JSON.parse(p.featuredStories) : []); } catch { setStories([]); }
    try { setDeals(p.deals ? JSON.parse(p.deals) : []); } catch { setDeals([]); }
    try { setGalleryItems(p.gallery ? JSON.parse(p.gallery) : []); } catch { setGalleryItems([]); }
    try { setLeaderboard(p.leaderboard ? JSON.parse(p.leaderboard) : []); } catch { setLeaderboard([]); }
    setBreaking({ title: p.breakingNewsTitle || "", desc: p.breakingNewsDesc || "", url: p.breakingNewsUrl || "" });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!editing?.title?.trim()) { setSaveError("Title is required."); return; }
    setSaving(true); setSaveError("");
    try {
      const fd = new FormData();
      const skipKeys = ["id", "featuredStories", "deals", "gallery", "leaderboard", "breakingNewsTitle", "breakingNewsDesc", "breakingNewsUrl"];
      Object.entries(editing).forEach(([k, v]) => {
        if (!skipKeys.includes(k) && v !== undefined && v !== null) fd.append(k, String(v));
      });
      const storiesClean = stories.map(({ _file: _f, _preview: _p, ...s }) => s);
      fd.append("featuredStories", JSON.stringify(storiesClean));
      stories.forEach((s, i) => { if (s._file) fd.append(`storyImage_${i}`, s._file); });

      fd.append("deals", JSON.stringify(deals));

      const galleryClean = galleryItems.map(({ _file: _f, _preview: _p, ...g }) => g);
      fd.append("gallery", JSON.stringify(galleryClean));
      galleryItems.forEach((g, i) => { if (g._file) fd.append(`galleryImage_${i}`, g._file); });

      fd.append("leaderboard", JSON.stringify(leaderboard));
      fd.append("breakingNewsTitle", breaking.title);
      fd.append("breakingNewsDesc", breaking.desc);
      fd.append("breakingNewsUrl", breaking.url);

      if (isNew) { await createNewsPost(fd); } else { await updateNewsPost(editing.id!, fd); }
      setShowForm(false); load();
    } catch (e: unknown) {
      setSaveError(getApiErrorMessage(e, "Failed to save. Check backend is running."));
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    try { await deleteNewsPost(id); setDeleteId(null); load(); } catch { alert("Failed to delete post."); }
  };

  const field = (key: keyof NewsPost, label: string, opts?: { multiline?: boolean; rows?: number; placeholder?: string }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      {opts?.multiline
        ? <textarea rows={opts.rows ?? 5} value={(editing?.[key] as string) ?? ""} onChange={e => setEditing(prev => ({ ...prev, [key]: e.target.value }))} placeholder={opts?.placeholder} style={{ ...inputStyle, resize: "vertical" }} />
        : <input type="text" value={(editing?.[key] as string) ?? ""} onChange={e => setEditing(prev => ({ ...prev, [key]: e.target.value }))} placeholder={opts?.placeholder} style={inputStyle} />
      }
    </div>
  );

  const SectionHeader = ({ icon, title, count, onAdd, addLabel }: { icon: string; title: string; count: number; onAdd: () => void; addLabel: string }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <i className={`bi ${icon}`} style={{ color: "#c8973a", fontSize: 16 }} />
        <span style={{ fontWeight: 700, fontSize: 14, color: "#1a2332" }}>{title}</span>
        {count > 0 && <span style={{ background: "#c8973a", color: "#fff", borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "1px 8px" }}>{count}</span>}
      </div>
      <button type="button" onClick={onAdd} style={{ background: "linear-gradient(90deg,#c8973a,#e8b86d)", color: "#fff", border: "none", borderRadius: 7, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
        + {addLabel}
      </button>
    </div>
  );

  const XBtn = ({ onClick }: { onClick: () => void }) => (
    <button type="button" onClick={onClick} style={{ position: "absolute", top: 10, right: 10, background: "#fff5f5", color: "#c53030", border: "none", borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
  );

  return (
    <div style={{ padding: "32px 28px", background: "#f7fafc", minHeight: "100vh" }}>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a2332", margin: 0 }}>Property News</h2>
          <p style={{ color: "#718096", fontSize: 14, margin: "4px 0 0" }}>Publish newsletters with featured stories, deals, gallery and more</p>
        </div>
        <button onClick={openNew} style={btnPrimary}>+ New Article</button>
      </div>

      {error && <div style={errorBox}>{error}</div>}
      {loading && <p style={{ color: "#718096" }}>Loading…</p>}

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
                <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#a0aec0" }}>No articles yet. Click + New Article to begin.</td></tr>
              ) : posts.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderTop: "1px solid #f0f0f0" }}>
                  <td style={tdStyle}>
                    {p.imageUrl
                      ? <img src={`${BACKEND_ROOT}${p.imageUrl}`} alt="" style={{ width: 64, height: 46, objectFit: "cover", borderRadius: 6 }} />
                      : <div style={{ width: 64, height: 46, borderRadius: 6, background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="bi bi-image" style={{ color: "#a0aec0", fontSize: 18 }} /></div>
                    }
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: "#1a2332", maxWidth: 260 }}>
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: "#a0aec0", fontWeight: 400 }}>/{p.slug}</div>
                  </td>
                  <td style={tdStyle}>{p.category || <span style={{ color: "#cbd5e0" }}>—</span>}</td>
                  <td style={tdStyle}>{p.author || <span style={{ color: "#cbd5e0" }}>—</span>}</td>
                  <td style={tdStyle}>
                    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: p.isPublished ? "#c6f6d5" : "#fefcbf", color: p.isPublished ? "#276749" : "#744210" }}>
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, fontSize: 12, whiteSpace: "nowrap", color: "#718096" }}>
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : "—"}
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

      {/* Delete confirm */}
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

      {/* Edit / New modal */}
      {showForm && editing && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #e2e8f0" }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a2332" }}>{isNew ? "Write New Article" : "Edit Article"}</h3>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#718096" }}>×</button>
            </div>

            <div style={{ overflowY: "auto", maxHeight: "calc(90vh - 160px)", paddingRight: 4 }}>

              {/* Core fields */}
              <div className="row">
                <div className="col-md-8">{field("title", "Title *", { placeholder: "e.g. DG Property Newsletter — May 2026" })}</div>
                <div className="col-md-4">{field("slug", "URL Slug", { placeholder: "auto-generated" })}</div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Category</label>
                    <select value={editing.category ?? ""} onChange={e => setEditing(prev => ({ ...prev, category: e.target.value }))} style={inputStyle}>
                      <option value="">— Select category —</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">{field("author", "Author / By", { placeholder: "e.g. DG Property Team" })}</div>
              </div>
              {field("tags", "Tags (comma-separated)", { placeholder: "e.g. retail, Issue 05 — add 'Issue 05' for badge, paste a .pdf URL for download button" })}
              {field("summary", "Short Summary", { multiline: true, rows: 3, placeholder: "Brief teaser shown on the newsletter card (1–2 sentences)…" })}
              {field("body", "Full Article Body", { multiline: true, rows: 6, placeholder: "Write the full article here…\n\nTips: ## Heading  |  > Quote  |  !HL Highlight  |  !BREAK Breaking news  |  - List item" })}

              {/* Section divider */}
              <div style={{ borderTop: "2px dashed #e2e8f0", margin: "24px 0 20px", display: "flex", alignItems: "center", gap: 10 }}>
                <i className="bi bi-layout-text-sidebar-reverse" style={{ color: "#c8973a", fontSize: 15 }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#a0aec0", letterSpacing: 1.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>Magazine Sections</span>
                <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
              </div>

              {/* ── FEATURED STORIES ── */}
              <div style={sectionCard}>
                <SectionHeader icon="bi-star-fill" title="Featured Stories" count={stories.length} onAdd={() => setStories(prev => [...prev, { ...EMPTY_STORY }])} addLabel="Add Story" />
                {stories.map((story, i) => (
                  <div key={i} style={itemCard}>
                    <XBtn onClick={() => setStories(prev => prev.filter((_, j) => j !== i))} />
                    <div className="row g-2" style={{ marginBottom: 8 }}>
                      <div className="col-md-4">
                        <label style={{ ...labelStyle, fontSize: 12 }}>Type Label</label>
                        <input type="text" value={story.type} onChange={e => setStories(prev => prev.map((s, j) => j === i ? { ...s, type: e.target.value } : s))} placeholder="e.g. LOI SUBMITTED" style={smInput} />
                      </div>
                      <div className="col-md-5">
                        <label style={{ ...labelStyle, fontSize: 12 }}>Title</label>
                        <input type="text" value={story.title} onChange={e => setStories(prev => prev.map((s, j) => j === i ? { ...s, title: e.target.value } : s))} placeholder="e.g. Comaro Crossing" style={smInput} />
                      </div>
                      <div className="col-md-3">
                        <label style={{ ...labelStyle, fontSize: 12 }}>Icon</label>
                        <select value={story.icon} onChange={e => setStories(prev => prev.map((s, j) => j === i ? { ...s, icon: e.target.value } : s))} style={smInput}>
                          {STORY_ICONS.map(ic => <option key={ic} value={ic}>{ic.replace("bi-", "")}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <label style={{ ...labelStyle, fontSize: 12 }}>Description</label>
                      <textarea rows={2} value={story.description} onChange={e => setStories(prev => prev.map((s, j) => j === i ? { ...s, description: e.target.value } : s))} placeholder="Short description of this achievement…" style={{ ...smInput, resize: "vertical" } as React.CSSProperties} />
                    </div>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <label style={{ ...labelStyle, fontSize: 12 }}>Story Image</label>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {(story._preview || story.imageUrl) && (
                            <img src={story._preview || `${BACKEND_ROOT}${story.imageUrl}`} alt="" style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 6, border: "1px solid #e2e8f0", flexShrink: 0 }} />
                          )}
                          <input type="file" accept="image/*" style={{ fontSize: 12, flex: 1, minWidth: 0 }}
                            onChange={e => { const f = e.target.files?.[0]; if (!f) return; setStories(prev => prev.map((s, j) => j === i ? { ...s, _file: f, _preview: URL.createObjectURL(f) } : s)); }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label style={{ ...labelStyle, fontSize: 12 }}>Read More URL (optional)</label>
                        <input type="text" value={story.readMoreUrl} onChange={e => setStories(prev => prev.map((s, j) => j === i ? { ...s, readMoreUrl: e.target.value } : s))} placeholder="https://…" style={smInput} />
                      </div>
                    </div>
                  </div>
                ))}
                {stories.length === 0 && <p style={{ fontSize: 13, color: "#a0aec0", textAlign: "center", padding: "8px 0 0" }}>No featured stories yet. Click + Add Story.</p>}
              </div>

              {/* ── MORE DEALS ON THE MOVE ── */}
              <div style={sectionCard}>
                <SectionHeader icon="bi-lightning-charge-fill" title="More Deals on the Move" count={deals.length} onAdd={() => setDeals(prev => [...prev, { ...EMPTY_DEAL }])} addLabel="Add Deal" />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {deals.map((deal, i) => (
                    <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px", width: "calc(50% - 5px)", boxSizing: "border-box", position: "relative" }}>
                      <XBtn onClick={() => setDeals(prev => prev.filter((_, j) => j !== i))} />
                      <div className="row g-1">
                        <div className="col-4">
                          <label style={{ ...labelStyle, fontSize: 11 }}>Type</label>
                          <select value={deal.dealType} onChange={e => setDeals(prev => prev.map((d, j) => j === i ? { ...d, dealType: e.target.value } : d))} style={{ ...smInput, fontSize: 12, padding: "6px 8px" }}>
                            {DEAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div className="col-5">
                          <label style={{ ...labelStyle, fontSize: 11 }}>Property</label>
                          <input type="text" value={deal.property} onChange={e => setDeals(prev => prev.map((d, j) => j === i ? { ...d, property: e.target.value } : d))} placeholder="e.g. Comaro Crossing" style={{ ...smInput, fontSize: 12, padding: "6px 8px" }} />
                        </div>
                        <div className="col-3">
                          <label style={{ ...labelStyle, fontSize: 11 }}>Icon</label>
                          <select value={deal.icon} onChange={e => setDeals(prev => prev.map((d, j) => j === i ? { ...d, icon: e.target.value } : d))} style={{ ...smInput, fontSize: 12, padding: "6px 8px" }}>
                            {DEAL_ICONS.map(ic => <option key={ic} value={ic}>{ic.replace("bi-", "")}</option>)}
                          </select>
                        </div>
                        <div className="col-12">
                          <label style={{ ...labelStyle, fontSize: 11, marginTop: 4 }}>Location</label>
                          <input type="text" value={deal.location} onChange={e => setDeals(prev => prev.map((d, j) => j === i ? { ...d, location: e.target.value } : d))} placeholder="e.g. Erasmia" style={{ ...smInput, fontSize: 12, padding: "6px 8px" }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {deals.length === 0 && <p style={{ fontSize: 13, color: "#a0aec0", textAlign: "center", padding: "8px 0 0" }}>No deals yet. Click + Add Deal.</p>}
              </div>

              {/* ── MOMENTS THAT MATTER ── */}
              <div style={sectionCard}>
                <SectionHeader icon="bi-images" title="Moments That Matter" count={galleryItems.length} onAdd={() => setGalleryItems(prev => [...prev, { url: "" }])} addLabel="Add Photo" />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {galleryItems.map((item, i) => (
                    <div key={i} style={{ position: "relative", background: "#f1f5f9", borderRadius: 10, overflow: "hidden", width: "calc(33.333% - 7px)", aspectRatio: "4/3", border: "2px dashed #cbd5e0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {(item._preview || item.url) && (
                        <img src={item._preview || `${BACKEND_ROOT}${item.url}`} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                      )}
                      <button type="button" onClick={() => setGalleryItems(prev => prev.filter((_, j) => j !== i))}
                        style={{ position: "absolute", top: 4, right: 4, zIndex: 2, background: "rgba(197,48,48,0.9)", color: "#fff", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                      <label style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 1 }}>
                        {!item._preview && !item.url && <i className="bi bi-cloud-upload" style={{ fontSize: 22, color: "#a0aec0" }} />}
                        <input type="file" accept="image/*" style={{ display: "none" }}
                          onChange={e => { const f = e.target.files?.[0]; if (!f) return; setGalleryItems(prev => prev.map((g, j) => j === i ? { ...g, _file: f, _preview: URL.createObjectURL(f) } : g)); }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
                {galleryItems.length === 0 && <p style={{ fontSize: 13, color: "#a0aec0", textAlign: "center", padding: "8px 0 0" }}>No photos yet. Click + Add Photo.</p>}
              </div>

              {/* ── BILLING LEADERBOARD ── */}
              <div style={sectionCard}>
                <SectionHeader icon="bi-trophy-fill" title="Billing Leaderboard" count={leaderboard.length} onAdd={() => setLeaderboard(prev => [...prev, { ...EMPTY_ENTRY }])} addLabel="Add Entry" />
                {leaderboard.map((entry, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === 0 ? "#F6C700" : i === 1 ? "#C0C0C0" : i === 2 ? "#CD7F32" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: i < 3 ? "#fff" : "#718096", flexShrink: 0 }}>{i + 1}</div>
                    <input type="text" value={entry.name} onChange={e => setLeaderboard(prev => prev.map((l, j) => j === i ? { ...l, name: e.target.value } : l))} placeholder="Broker name" style={{ ...smInput, flex: 2 }} />
                    <input type="text" value={entry.amount} onChange={e => setLeaderboard(prev => prev.map((l, j) => j === i ? { ...l, amount: e.target.value } : l))} placeholder="e.g. R617,122.97" style={{ ...smInput, flex: 1 }} />
                    <button type="button" onClick={() => setLeaderboard(prev => prev.filter((_, j) => j !== i))} style={{ background: "#fff5f5", color: "#c53030", border: "none", borderRadius: 6, padding: "8px 10px", cursor: "pointer", fontSize: 13 }}>×</button>
                  </div>
                ))}
                {leaderboard.length === 0 && <p style={{ fontSize: 13, color: "#a0aec0", textAlign: "center", padding: "8px 0 0" }}>No leaderboard entries yet. Click + Add Entry.</p>}
              </div>

              {/* ── BREAKING NEWS ── */}
              <div style={sectionCard}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <i className="bi bi-megaphone-fill" style={{ color: "#c8973a", fontSize: 16 }} />
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#1a2332" }}>Breaking News</span>
                  <span style={{ fontSize: 12, color: "#a0aec0" }}>(optional — leave blank to hide)</span>
                </div>
                <div className="row g-2">
                  <div className="col-12">
                    <label style={{ ...labelStyle, fontSize: 12 }}>Headline</label>
                    <input type="text" value={breaking.title} onChange={e => setBreaking(prev => ({ ...prev, title: e.target.value }))} placeholder="e.g. Redefines Broker Incentive!" style={smInput} />
                  </div>
                  <div className="col-md-8">
                    <label style={{ ...labelStyle, fontSize: 12 }}>Description</label>
                    <input type="text" value={breaking.desc} onChange={e => setBreaking(prev => ({ ...prev, desc: e.target.value }))} placeholder="Short description…" style={smInput} />
                  </div>
                  <div className="col-md-4">
                    <label style={{ ...labelStyle, fontSize: 12 }}>Link URL (optional)</label>
                    <input type="text" value={breaking.url} onChange={e => setBreaking(prev => ({ ...prev, url: e.target.value }))} placeholder="https://…" style={smInput} />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Publication Status</label>
                <select value={editing.isPublished ? "true" : "false"} onChange={e => setEditing(prev => ({ ...prev, isPublished: e.target.value === "true" }))} style={inputStyle}>
                  <option value="false">Draft — not visible on website</option>
                  <option value="true">Published — live on website</option>
                </select>
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
