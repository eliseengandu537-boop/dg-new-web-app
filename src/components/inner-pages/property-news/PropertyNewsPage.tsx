"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import HeaderOne from "@/layouts/headers/HeaderOne";
import { API_ROOT, BACKEND_ROOT } from "@/utils/publicEnv";

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
  publishedAt?: string;
  createdAt?: string;
}

export default function PropertyNewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<NewsPost | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    axios.get(`${API_ROOT}/news/public`)
      .then(r => setPosts(Array.isArray(r.data) ? r.data : []))
      .catch(() => setError("Failed to load news. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean))) as string[]];

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || (p.summary || "").toLowerCase().includes(q) || (p.tags || "").toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const formatDate = (d?: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <>
      <HeaderOne style={true} />

      {/* ── Hero ── */}
      <section style={{
        position: "relative",
        backgroundImage: "url('/assets/images/media/jk.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 35%",
        minHeight: 420,
        display: "flex",
        alignItems: "center",
        paddingTop: 160,
        paddingBottom: 80,
        overflow: "hidden",
      }}>
        {/* dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(10,20,35,0.52) 45%, rgba(10,20,35,0.28) 100%)" }} />
        {/* gold top line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #c8973a, #e8b86d, #c8973a)", zIndex: 2 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span style={{ display: "inline-block", background: "rgba(200,151,58,0.15)", color: "#e8b86d", border: "1px solid rgba(200,151,58,0.4)", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: "5px 14px", marginBottom: 18, textTransform: "uppercase" }}>
                DG PROPERTY Newsletter
              </span>
              <h1 style={{ fontFamily: "var(--site-font-family)", fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: "0 0 18px", letterSpacing: -0.5 }}>
                Property News
              </h1>
              <div style={{ width: 50, height: 3, background: "linear-gradient(90deg,#c8973a,#e8b86d)", borderRadius: 2, marginBottom: 20 }} />
              <nav style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
                <span style={{ margin: "0 8px" }}>/</span>
                <span style={{ color: "#e8b86d", fontWeight: 600 }}>Property News</span>
              </nav>
            </div>
            <div className="col-lg-5 d-none d-lg-flex justify-content-end align-items-center">
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, textAlign: "right", lineHeight: 2.2, fontStyle: "italic" }}>
                Market Updates · Investment Insights<br />Retail &amp; Development · Industry News
              </div>
            </div>
          </div>
        </div>
        {/* wave */}
        <svg style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: 50, zIndex: 1 }} viewBox="0 0 1440 50" preserveAspectRatio="none" fill="none">
          <path d="M0,50 C360,0 1080,0 1440,50 L1440,50 L0,50 Z" fill="#f7fafc" />
        </svg>
      </section>

      {/* ── Filters ── */}
      <section style={{ background: "#f7fafc", padding: "36px 0 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            {/* Category pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  style={{
                    padding: "7px 18px", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.2s",
                    background: activeCategory === c ? "linear-gradient(90deg,#c8973a,#e8b86d)" : "#fff",
                    color: activeCategory === c ? "#fff" : "#4a5568",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            {/* Search */}
            <div style={{ position: "relative", minWidth: 240 }}>
              <i className="bi bi-search" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#a0aec0", fontSize: 14 }} />
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 36, padding: "9px 14px 9px 36px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, width: "100%", outline: "none", background: "#fff" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Posts grid ── */}
      <section style={{ background: "#f7fafc", paddingBottom: 80, paddingTop: 12 }}>
        <div className="container">
          {loading && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#718096" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📰</div>
              <p>Loading news…</p>
            </div>
          )}
          {error && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#c53030" }}>{error}</div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#a0aec0" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
              <p style={{ fontSize: 16 }}>No articles found{search ? ` for "${search}"` : ""}.</p>
            </div>
          )}
          <div className="row gy-4">
            {filtered.map(post => (
              <div className="col-lg-4 col-md-6" key={post.id}>
                <article
                  onClick={() => setSelected(post)}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.13)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 18px rgba(0,0,0,0.07)"; }}
                >
                  {/* Image */}
                  <div style={{ height: 200, overflow: "hidden", background: "#e2e8f0", flexShrink: 0, position: "relative" }}>
                    {post.imageUrl ? (
                      <img src={`${BACKEND_ROOT}${post.imageUrl}`} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className="bi bi-newspaper" style={{ fontSize: 44, color: "#cbd5e0" }} />
                      </div>
                    )}
                    {post.category && (
                      <span style={{ position: "absolute", top: 12, left: 12, background: "rgba(200,151,58,0.9)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 1, textTransform: "uppercase" }}>
                        {post.category}
                      </span>
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                      {post.author && <span><i className="bi bi-person" style={{ marginRight: 4 }} />{post.author}</span>}
                      <span><i className="bi bi-calendar3" style={{ marginRight: 4 }} />{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2332", margin: "0 0 10px", lineHeight: 1.4 }}>{post.title}</h3>
                    {post.summary && <p style={{ fontSize: 13.5, color: "#718096", lineHeight: 1.6, margin: "0 0 16px", flex: 1 }}>{post.summary}</p>}
                    <span style={{ color: "#c8973a", fontWeight: 600, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 5, marginTop: "auto" }}>
                      Read more <i className="bi bi-arrow-right" />
                    </span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Article Detail Modal ── */}
      {selected && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 2000, overflowY: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px 60px" }}
          onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 780, boxShadow: "0 24px 80px rgba(0,0,0,0.3)", overflow: "hidden" }}>
            {/* Cover image */}
            {selected.imageUrl && (
              <div style={{ height: 320, overflow: "hidden" }}>
                <img src={`${BACKEND_ROOT}${selected.imageUrl}`} alt={selected.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}
            <div style={{ padding: "32px 36px" }}>
              <button onClick={() => setSelected(null)} style={{ float: "right", background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#718096", marginTop: -4 }}>×</button>
              {selected.category && (
                <span style={{ background: "rgba(200,151,58,0.12)", color: "#c8973a", fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 20, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14, display: "inline-block" }}>
                  {selected.category}
                </span>
              )}
              <h2 style={{ fontFamily: "var(--site-font-family)", fontSize: "clamp(22px,4vw,32px)", fontWeight: 700, color: "#1a2332", margin: "12px 0 8px", lineHeight: 1.25 }}>{selected.title}</h2>
              <div style={{ fontSize: 13, color: "#a0aec0", marginBottom: 20, display: "flex", gap: 14, flexWrap: "wrap" }}>
                {selected.author && <span><i className="bi bi-person" style={{ marginRight: 4 }} />{selected.author}</span>}
                <span><i className="bi bi-calendar3" style={{ marginRight: 4 }} />{formatDate(selected.publishedAt || selected.createdAt)}</span>
                {selected.tags && <span><i className="bi bi-tag" style={{ marginRight: 4 }} />{selected.tags}</span>}
              </div>
              <div style={{ width: 40, height: 3, background: "linear-gradient(90deg,#c8973a,#e8b86d)", borderRadius: 2, marginBottom: 20 }} />
              {selected.summary && (
                <p style={{ fontSize: 16, color: "#4a5568", lineHeight: 1.7, fontWeight: 500, borderLeft: "3px solid #e8b86d", paddingLeft: 16, marginBottom: 22 }}>{selected.summary}</p>
              )}
              {selected.body && selected.body.split("\n\n").map((para, i) => (
                para.trim() ? <p key={i} style={{ fontSize: 15, color: "#4a5568", lineHeight: 1.8, marginBottom: 18 }}>{para}</p> : null
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
