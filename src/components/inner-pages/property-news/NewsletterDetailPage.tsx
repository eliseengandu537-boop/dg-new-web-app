"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
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
  featuredStories?: string;
  deals?: string;
  gallery?: string;
  leaderboard?: string;
  breakingNewsTitle?: string;
  breakingNewsDesc?: string;
  breakingNewsUrl?: string;
}

interface FeaturedStory {
  type: string; title: string; description: string;
  imageUrl?: string; readMoreUrl?: string; icon?: string;
}
interface Deal { dealType: string; property: string; location?: string; icon?: string; }
interface GalleryItem { url: string; }
interface LeaderboardEntry { name: string; amount: string; }

// ─── Brand tokens ───────────────────────────────────────────────────────────
const PAPER = "#e9e7dc";
const INK = "#2c2c2c";
const SAGE = "#cfe0b6";
const SAGE_INK = "#3c4a2a";
const FRAME = "#2f5233";
const BRAND_LINE = "WWW.DG-PROPERTY.CO.ZA | BROKERING IN EXCELLENCE";

const ANTON = "'Anton', 'Arial Black', sans-serif";
const OSWALD = "'Oswald', 'Arial Narrow', sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

const PAGE = 1320;
const READ = 820;

const PAPER_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")";

function formatDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}
function monthUpper(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-ZA", { month: "long", year: "numeric" }).toUpperCase();
}

// Leaderboard row colour: green → blue → grey down the ranks (matches print)
function hexLerp(a: number[], b: number[], t: number) {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
function rankColor(i: number, total: number) {
  const t = total <= 1 ? 0 : i / (total - 1);
  const green = [123, 168, 77], blue = [86, 136, 166], grey = [141, 143, 131];
  return t < 0.5 ? hexLerp(green, blue, t / 0.5) : hexLerp(blue, grey, (t - 0.5) / 0.5);
}

// ─── Content parser (markdown-lite, same syntax as before) ──────────────────
interface ContentSection {
  type: "heading" | "subheading" | "paragraph" | "quote" | "list" | "image" | "highlight" | "breaking";
  text: string;
  items?: string[];
}
function parseBody(body: string): ContentSection[] {
  const sections: ContentSection[] = [];
  for (const block of body.split(/\n{2,}/)) {
    const t = block.trim();
    if (!t) continue;
    if (t.startsWith("## ")) sections.push({ type: "heading", text: t.slice(3) });
    else if (t.startsWith("### ")) sections.push({ type: "subheading", text: t.slice(4) });
    else if (t.startsWith("> ")) sections.push({ type: "quote", text: t.slice(2) });
    else if (t.startsWith("!BREAK ") || t.startsWith("[BREAK]")) sections.push({ type: "breaking", text: t.replace(/^!BREAK |^\[BREAK\]\s*/, "").trim() });
    else if (t.startsWith("!HL ") || t.startsWith("[HL]")) sections.push({ type: "highlight", text: t.replace(/^!HL |^\[HL\]\s*/, "").trim() });
    else if (/^https?:\/\/\S+\.(jpg|jpeg|png|webp|gif)/i.test(t)) sections.push({ type: "image", text: t });
    else if (t.split("\n").every(l => /^[-•]\s/.test(l))) sections.push({ type: "list", text: t, items: t.split("\n").map(l => l.replace(/^[-•]\s/, "")) });
    else sections.push({ type: "paragraph", text: t });
  }
  return sections;
}

// ─── Small shared bits ──────────────────────────────────────────────────────
function DoubleRule({ thin = false }: { thin?: boolean }) {
  return (
    <div style={{ margin: thin ? "10px 0" : "16px 0" }}>
      <div style={{ height: thin ? 2 : 3, background: INK }} />
      <div style={{ height: 1, background: INK, marginTop: 3 }} />
    </div>
  );
}

function Band({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: SAGE, padding: "11px 18px", textAlign: "center" }}>
      <span style={{ fontFamily: OSWALD, fontWeight: 600, letterSpacing: 1.6, color: SAGE_INK, fontSize: "clamp(11px,1.5vw,15px)", textTransform: "uppercase" }}>
        {children}
      </span>
    </div>
  );
}

function NewsHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: OSWALD, fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(20px,3vw,31px)", color: INK, letterSpacing: 0.4, margin: "0 0 22px", lineHeight: 1.12 }}>
      {children}
    </h2>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function NewsletterDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<NewsPost | null>(null);
  const [allPosts, setAllPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => { if (typeof window !== "undefined") setShareUrl(window.location.href); }, []);

  useEffect(() => {
    if (!slug) return;
    Promise.all([
      axios.get(`${API_ROOT}/news/public/${slug}`),
      axios.get(`${API_ROOT}/news/public`),
    ])
      .then(([postRes, allRes]) => {
        setPost(postRes.data);
        setAllPosts(Array.isArray(allRes.data) ? allRes.data : []);
      })
      .catch(() => setError("Newsletter not found."))
      .finally(() => setLoading(false));
  }, [slug]);

  const copyLink = () => {
    if (!shareUrl || typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(shareUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };

  const fonts = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&display=swap');
      @keyframes spin { to { transform: rotate(360deg); } }
    `}</style>
  );

  if (loading) {
    return (
      <>
        {fonts}
        <HeaderOne style={true} />
        <div style={{ minHeight: "70vh", background: PAPER, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 120 }}>
          <div style={{ width: 30, height: 30, border: "3px solid rgba(0,0,0,0.12)", borderTopColor: INK, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        {fonts}
        <HeaderOne style={true} />
        <div style={{ minHeight: "70vh", background: PAPER, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 120 }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: OSWALD, color: INK, marginBottom: 14, fontWeight: 700, textTransform: "uppercase" }}>Newsletter not found</h2>
            <Link href="/property-news" style={{ color: FRAME, fontWeight: 700, textDecoration: "none" }}>← Back to newsletters</Link>
          </div>
        </div>
      </>
    );
  }

  const postIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? allPosts[postIndex - 1] : null;

  const sections = post.body ? parseBody(post.body) : [];
  const dateStr = formatDate(post.publishedAt || post.createdAt);
  const monthStr = monthUpper(post.publishedAt || post.createdAt);

  const issueMatch = post.tags?.match(/issue\s*(\d+)/i);
  const issueNum = issueMatch ? issueMatch[1].padStart(2, "0") : null;
  const issueLine = issueNum ? `ISSUE ${issueNum} / ${monthStr}` : monthStr;

  const pdfMatch = post.tags?.match(/https?:\/\/\S+\.pdf/i);
  const pdfUrl = pdfMatch ? pdfMatch[0] : null;

  let featuredStories: FeaturedStory[] = [];
  let deals: Deal[] = [];
  let galleryItems: GalleryItem[] = [];
  let leaderboardEntries: LeaderboardEntry[] = [];
  try { featuredStories = post.featuredStories ? JSON.parse(post.featuredStories) : []; } catch { /* noop */ }
  try { deals = post.deals ? JSON.parse(post.deals) : []; } catch { /* noop */ }
  try { galleryItems = post.gallery ? JSON.parse(post.gallery) : []; } catch { /* noop */ }
  try { leaderboardEntries = post.leaderboard ? JSON.parse(post.leaderboard) : []; } catch { /* noop */ }

  const shareLinks = [
    { icon: "bi-linkedin", label: "Share on LinkedIn", href: shareUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` : "#", external: true },
    { icon: "bi-whatsapp", label: "Share on WhatsApp", href: shareUrl ? `https://wa.me/?text=${encodeURIComponent(post.title + " " + shareUrl)}` : "#", external: true },
    { icon: "bi-envelope", label: "Share by email", href: shareUrl ? `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}` : "#", external: false },
  ];

  const page = (extra?: React.CSSProperties): React.CSSProperties => ({ maxWidth: PAGE, margin: "0 auto", padding: "0 24px", ...extra });

  return (
    <>
      {fonts}
      <HeaderOne style={true} />
      <article style={{ background: PAPER, backgroundImage: PAPER_TEXTURE, minHeight: "100vh", color: INK }}>

        {/* ── MASTHEAD ─────────────────────────────────────────────── */}
        <header style={page({ paddingTop: 116 })}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <img src="/assets/images/assets/logodg.png" alt="De Gennaro Property" style={{ height: 46, width: "auto" }} />
            <div style={{ fontFamily: OSWALD, fontWeight: 700, fontSize: "clamp(13px,1.8vw,18px)", letterSpacing: 1, color: INK }}>{issueLine}</div>
          </div>

          <DoubleRule />

          <h1 style={{ fontFamily: ANTON, fontSize: "clamp(48px,11vw,118px)", letterSpacing: "0.02em", textAlign: "center", margin: "10px 0 18px", lineHeight: 0.9, color: INK, textShadow: "3px 4px 0 rgba(0,0,0,0.10)" }}>
            NEWSLETTER
          </h1>

          <Band>{BRAND_LINE}</Band>

          <DoubleRule />

          {/* Headline = the post title */}
          <h2 style={{ fontFamily: ANTON, fontSize: "clamp(28px,6vw,60px)", textAlign: "center", margin: "20px 0 16px", lineHeight: 0.98, color: INK, textShadow: "2px 3px 0 rgba(0,0,0,0.08)", textTransform: "uppercase" }}>
            {post.title}
          </h2>

          {/* meta line */}
          <div style={{ textAlign: "center", fontFamily: OSWALD, fontWeight: 500, letterSpacing: 1, color: "#5a5a52", fontSize: 14, marginBottom: post.summary ? 24 : 40 }}>
            {post.author ? `${post.author.toUpperCase()}  ·  ` : ""}{dateStr.toUpperCase()}
          </div>

          {post.summary && (
            <p style={{ fontFamily: SERIF, fontSize: "clamp(17px,2.2vw,21px)", lineHeight: 1.7, color: "#3f3f38", textAlign: "center", maxWidth: READ, margin: "0 auto 8px", fontStyle: "italic" }}>
              {post.summary}
            </p>
          )}
        </header>

        {/* ── ARTICLE BODY ─────────────────────────────────────────── */}
        {sections.length > 0 && (
          <div style={{ maxWidth: READ, margin: "0 auto", padding: "40px 24px 0" }}>
            {sections.map((s, i) => {
              if (s.type === "heading") return <NewsHeading key={i}>{s.text}</NewsHeading>;
              if (s.type === "subheading")
                return <h3 key={i} style={{ fontFamily: OSWALD, fontWeight: 600, textTransform: "uppercase", fontSize: "clamp(16px,2.4vw,21px)", color: INK, margin: "30px 0 12px", letterSpacing: 0.4 }}>{s.text}</h3>;
              if (s.type === "quote")
                return (
                  <blockquote key={i} style={{ margin: "30px 0", padding: "6px 0 6px 24px", borderLeft: `4px solid ${FRAME}` }}>
                    <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(19px,2.6vw,24px)", lineHeight: 1.5, color: "#33332d", margin: 0 }}>{s.text}</p>
                  </blockquote>
                );
              if (s.type === "highlight")
                return (
                  <div key={i} style={{ background: SAGE, borderRadius: 4, padding: "18px 22px", margin: "28px 0", display: "flex", gap: 13, alignItems: "flex-start" }}>
                    <i className="bi bi-star-fill" style={{ color: FRAME, fontSize: 16, marginTop: 3 }} />
                    <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.7, margin: 0, color: SAGE_INK, fontWeight: 500 }}>{s.text}</p>
                  </div>
                );
              if (s.type === "breaking")
                return (
                  <div key={i} style={{ background: INK, borderRadius: 4, padding: "20px 24px", margin: "28px 0" }}>
                    <div style={{ fontFamily: OSWALD, fontWeight: 700, letterSpacing: 2, color: SAGE, textTransform: "uppercase", fontSize: 12, marginBottom: 8 }}>Breaking</div>
                    <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.7, margin: 0, color: "#fff" }}>{s.text}</p>
                  </div>
                );
              if (s.type === "image")
                return <figure key={i} style={{ margin: "30px 0" }}><img src={s.text} alt="" style={{ width: "100%", borderRadius: 8, border: `2px solid ${FRAME}`, display: "block" }} /></figure>;
              if (s.type === "list")
                return (
                  <ul key={i} style={{ listStyle: "none", padding: 0, margin: "10px 0 26px" }}>
                    {(s.items || []).map((it, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                        <span style={{ width: 8, height: 8, background: FRAME, borderRadius: "50%", flexShrink: 0, marginTop: 9 }} />
                        <span style={{ fontFamily: SERIF, fontSize: 17.5, lineHeight: 1.75, color: "#3f3f38" }}>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              return <p key={i} style={{ fontFamily: SERIF, fontSize: 17.5, lineHeight: 1.85, color: "#3f3f38", margin: "0 0 22px" }}>{s.text}</p>;
            })}

            {pdfUrl && (
              <a href={pdfUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 16, padding: "12px 22px", borderRadius: 4, background: INK, color: "#fff", textDecoration: "none", fontFamily: OSWALD, fontWeight: 600, letterSpacing: 0.5, fontSize: 14, textTransform: "uppercase" }}>
                <i className="bi bi-file-earmark-arrow-down" /> Download full issue (PDF)
              </a>
            )}
          </div>
        )}

        {/* ── FEATURED STORIES ─────────────────────────────────────── */}
        {featuredStories.length > 0 && (
          <section style={page({ paddingTop: 64 })}>
            {/* header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 26 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 5, height: 26, background: FRAME, borderRadius: 3 }} />
                <h2 style={{ fontFamily: OSWALD, fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(18px,2.4vw,26px)", color: INK, letterSpacing: 0.5, margin: 0 }}>Featured Stories</h2>
              </div>
              <Link href="/property-news" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${FRAME}`, color: FRAME, borderRadius: 8, padding: "8px 16px", fontFamily: OSWALD, fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, textDecoration: "none", background: "rgba(255,255,255,0.5)" }}>
                View all stories <i className="bi bi-arrow-right" />
              </Link>
            </div>

            {/* cards */}
            <div className="row g-4">
              {featuredStories.map((story, i) => (
                <div className="col-lg-3 col-md-6" key={i}>
                  <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 6px 22px rgba(0,0,0,0.08)", height: "100%", display: "flex", flexDirection: "column" }}>
                    {/* image + badge */}
                    <div style={{ position: "relative" }}>
                      {story.imageUrl ? (
                        <img src={`${BACKEND_ROOT}${story.imageUrl}`} alt={story.title} style={{ width: "100%", height: 158, objectFit: "cover", borderTopLeftRadius: 14, borderTopRightRadius: 14, display: "block" }} />
                      ) : (
                        <div style={{ width: "100%", height: 158, borderTopLeftRadius: 14, borderTopRightRadius: 14, background: "#e6e8dd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <i className={`bi ${story.icon || "bi-person"}`} style={{ fontSize: 34, color: FRAME }} />
                        </div>
                      )}
                      <div style={{ position: "absolute", left: 16, bottom: -16, width: 34, height: 34, borderRadius: "50%", background: FRAME, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 9px rgba(0,0,0,0.22)" }}>
                        <i className={`bi ${story.icon || "bi-file-text"}`} style={{ color: "#fff", fontSize: 14 }} />
                      </div>
                    </div>
                    {/* content */}
                    <div style={{ padding: "26px 18px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                      {story.type && (
                        <div style={{ fontFamily: OSWALD, fontWeight: 700, textTransform: "uppercase", fontSize: 13, color: INK, letterSpacing: 0.4, lineHeight: 1.2 }}>{story.type}</div>
                      )}
                      <div style={{ fontFamily: OSWALD, fontWeight: 700, fontSize: 18, color: INK, lineHeight: 1.2, marginBottom: 9 }}>{story.title}</div>
                      {story.description && (
                        <p style={{ fontFamily: SERIF, fontSize: 13.5, lineHeight: 1.6, color: "#5a5a52", margin: "0 0 14px" }}>{story.description}</p>
                      )}
                      {story.readMoreUrl ? (
                        <a href={story.readMoreUrl} target="_blank" rel="noreferrer" style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, color: FRAME, fontFamily: OSWALD, fontWeight: 600, fontSize: 13, textDecoration: "none", textTransform: "uppercase", letterSpacing: 0.5 }}>
                          Read more <i className="bi bi-arrow-right" />
                        </a>
                      ) : (
                        <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, color: FRAME, fontFamily: OSWALD, fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5 }}>
                          Read more <i className="bi bi-arrow-right" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── DEALS ON THE MOVE ────────────────────────────────────── */}
        {deals.length > 0 && (
          <section style={page({ paddingTop: 48 })}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <i className="bi bi-lightning-charge-fill" style={{ color: FRAME, fontSize: 18 }} />
              <h2 style={{ fontFamily: OSWALD, fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(16px,2.2vw,23px)", color: INK, letterSpacing: 0.5, margin: 0 }}>More Deals on the Move!</h2>
            </div>
            <div className="row g-3">
              {deals.map((deal, i) => (
                <div className="col-lg-2 col-md-4 col-6" key={i}>
                  <div style={{ display: "flex", gap: 11, alignItems: "center", padding: "12px 14px", background: "#fff", borderRadius: 12, boxShadow: "0 3px 12px rgba(0,0,0,0.06)", height: "100%" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: SAGE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <i className={`bi ${deal.icon || "bi-building"}`} style={{ fontSize: 16, color: FRAME }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: OSWALD, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, fontSize: 12, color: INK, lineHeight: 1.1 }}>{deal.dealType}</div>
                      <div style={{ fontFamily: OSWALD, fontWeight: 600, fontSize: 13.5, color: INK, lineHeight: 1.2 }}>{deal.property}</div>
                      {deal.location && <div style={{ fontFamily: SERIF, fontSize: 12, color: "#8a8a80" }}>{deal.location}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── MOMENTS THAT MATTER ──────────────────────────────────── */}
        {galleryItems.length > 0 && (
          <section style={page({ paddingTop: 64 })}>
            <DoubleRule thin />
            <NewsHeading>Moments That Matter</NewsHeading>
            <div style={{ columns: "260px", columnGap: 14 }}>
              {galleryItems.map((item, i) => item.url && (
                <div key={i} style={{ breakInside: "avoid", marginBottom: 14, borderRadius: 10, overflow: "hidden", border: `3px solid ${FRAME}` }}>
                  <img src={`${BACKEND_ROOT}${item.url}`} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── BILLING LEADERBOARD ──────────────────────────────────── */}
        {leaderboardEntries.length > 0 && (
          <section style={page({ paddingTop: 70 })}>
            <DoubleRule thin />
            <h2 style={{ textAlign: "center", margin: "8px 0 26px", lineHeight: 0.92 }}>
              <span style={{ display: "block", fontFamily: OSWALD, fontWeight: 400, textTransform: "uppercase", letterSpacing: 4, fontSize: "clamp(22px,4vw,40px)", color: "#5a5a52" }}>{monthStr.split(" ")[0]} Billing</span>
              <span style={{ display: "block", fontFamily: ANTON, fontSize: "clamp(34px,7vw,68px)", letterSpacing: 1, color: INK, textShadow: "2px 3px 0 rgba(0,0,0,0.08)" }}>LEADERBOARDS</span>
            </h2>
            <div style={{ borderRadius: 4, overflow: "hidden", boxShadow: "0 4px 18px rgba(0,0,0,0.12)" }}>
              {/* header */}
              <div style={{ display: "grid", gridTemplateColumns: "0.8fr 2fr 1.4fr", background: "linear-gradient(180deg,#3a3a3a,#1f1f1f)" }}>
                {["Rank", "Broker Name", "Amount Billed"].map(h => (
                  <div key={h} style={{ padding: "16px 18px", textAlign: "center", fontFamily: OSWALD, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#fff", fontSize: 13 }}>{h}</div>
                ))}
              </div>
              {/* rows */}
              {leaderboardEntries.map((e, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "0.8fr 2fr 1.4fr", background: rankColor(i, leaderboardEntries.length), borderTop: "2px solid rgba(255,255,255,0.35)" }}>
                  <div style={{ padding: "15px 18px", textAlign: "center", fontFamily: OSWALD, fontWeight: 700, color: "#fff", fontSize: 14 }}>{i + 1}</div>
                  <div style={{ padding: "15px 18px", textAlign: "center", fontFamily: OSWALD, fontWeight: 600, color: "#fff", fontSize: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>{e.name}</div>
                  <div style={{ padding: "15px 18px", textAlign: "center", fontFamily: OSWALD, fontWeight: 700, color: "#fff", fontSize: 14 }}>{e.amount}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── BREAKING NEWS ────────────────────────────────────────── */}
        {post.breakingNewsTitle && (
          <section style={page({ paddingTop: 72 })}>
            <DoubleRule />
            <h2 style={{ fontFamily: ANTON, fontSize: "clamp(38px,9vw,90px)", textAlign: "center", margin: "10px 0 18px", lineHeight: 0.92, color: INK, textShadow: "3px 4px 0 rgba(0,0,0,0.10)" }}>
              BREAKING NEWS
            </h2>
            <Band>{BRAND_LINE}</Band>
            <div style={{ maxWidth: READ, margin: "40px auto 0" }}>
              <h3 style={{ fontFamily: OSWALD, fontWeight: 700, fontSize: "clamp(26px,5vw,44px)", color: INK, lineHeight: 1.1, margin: "0 0 16px" }}>{post.breakingNewsTitle}</h3>
              {post.breakingNewsDesc && (
                <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.75, color: "#3f3f38", margin: "0 0 22px" }}>{post.breakingNewsDesc}</p>
              )}
              {post.breakingNewsUrl && (
                <a href={post.breakingNewsUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: FRAME, color: "#fff", padding: "13px 26px", borderRadius: 4, textDecoration: "none", fontFamily: OSWALD, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, fontSize: 14 }}>
                  Take a look <i className="bi bi-arrow-right" />
                </a>
              )}
            </div>
          </section>
        )}

        {/* ── SHARE ────────────────────────────────────────────────── */}
        <div style={page({ paddingTop: 64 })}>
          <DoubleRule thin />
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", padding: "8px 0" }}>
            <span style={{ fontFamily: OSWALD, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, color: INK, fontSize: 14 }}>
              {copied ? "Link copied!" : "Share this issue"}
            </span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 9 }}>
              {shareLinks.map(s => (
                <a key={s.icon} href={s.href} aria-label={s.label} {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  style={{ width: 42, height: 42, borderRadius: "50%", background: INK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                  <i className={`bi ${s.icon}`} style={{ fontSize: 17 }} />
                </a>
              ))}
              <button type="button" onClick={copyLink} aria-label="Copy link"
                style={{ width: 42, height: 42, borderRadius: "50%", background: copied ? FRAME : INK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
                <i className={`bi ${copied ? "bi-check2" : "bi-link-45deg"}`} style={{ fontSize: 19 }} />
              </button>
            </div>
          </div>
        </div>

        {/* ── PREV / NEXT ──────────────────────────────────────────── */}
        {(prevPost || nextPost) && (
          <nav style={page({ paddingTop: 36 })}>
            <div className="row g-3">
              <div className="col-6">
                {prevPost && (
                  <Link href={`/property-news/${prevPost.slug}`} style={{ textDecoration: "none", display: "block", padding: "18px 20px", border: `1px solid ${INK}`, height: "100%" }}>
                    <div style={{ fontFamily: OSWALD, fontSize: 11, color: "#6a6a60", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>← Previous Issue</div>
                    <div style={{ fontFamily: OSWALD, fontSize: 15, color: INK, fontWeight: 600, lineHeight: 1.3, textTransform: "uppercase" }}>{prevPost.title}</div>
                  </Link>
                )}
              </div>
              <div className="col-6">
                {nextPost && (
                  <Link href={`/property-news/${nextPost.slug}`} style={{ textDecoration: "none", display: "block", padding: "18px 20px", border: `1px solid ${INK}`, height: "100%", textAlign: "right" }}>
                    <div style={{ fontFamily: OSWALD, fontSize: 11, color: "#6a6a60", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Next Issue →</div>
                    <div style={{ fontFamily: OSWALD, fontSize: 15, color: INK, fontWeight: 600, lineHeight: 1.3, textTransform: "uppercase" }}>{nextPost.title}</div>
                  </Link>
                )}
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 26 }}>
              <Link href="/property-news" style={{ fontFamily: OSWALD, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: FRAME, textDecoration: "none", fontSize: 14 }}>
                <i className="bi bi-grid" /> Browse all issues
              </Link>
            </div>
          </nav>
        )}

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer style={{ marginTop: 56 }}>
          <div style={page()}><DoubleRule /></div>
          <Band>{BRAND_LINE}</Band>
          <div style={page()}><DoubleRule /></div>
          <div style={{ height: 30 }} />
        </footer>

      </article>
    </>
  );
}
