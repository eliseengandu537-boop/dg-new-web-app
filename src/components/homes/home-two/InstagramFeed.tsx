"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

interface BeholdPost {
  id: string
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  mediaUrl: string
  thumbnailUrl?: string
  permalink: string
  caption?: string
  timestamp: string
}

const FEED_URL = "https://feeds.behold.so/LN5D1KxkHdkhiexMuaPn"

const InstagramFeed = () => {
  const [posts, setPosts] = useState<BeholdPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(FEED_URL)
      .then((r) => r.json())
      .then((data) => {
        const items: BeholdPost[] = Array.isArray(data) ? data : data.posts || []
        setPosts(items.slice(0, 12))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section style={{ background: "#0d1f2d", paddingTop: 80, paddingBottom: 80 }}>
      <div className="container">

        {/* Header */}
        <div className="d-flex align-items-end justify-content-between mb-40 wow fadeInUp"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3.5, textTransform: "uppercase",
              color: "#f0b95e", marginBottom: 10 }}>
              Timely Insights
            </div>
            <h2 className="font-garamond m0" style={{ fontSize: "2.4rem", color: "#fff", lineHeight: 1.15 }}>
              Follow Our Journey
            </h2>
            <p className="m0 mt-2" style={{ fontSize: 15, color: "rgba(255,255,255,0.55)" }}>
              Stay connected with DG Property on Instagram.
            </p>
          </div>
          <a href="https://www.instagram.com/dg_property_" target="_blank" rel="noopener noreferrer"
            className="d-none d-md-inline-flex align-items-center gap-2 tran3s"
            style={{ fontSize: 14, fontWeight: 600, color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.5)",
              paddingBottom: 2, whiteSpace: "nowrap" }}>
            <i className="bi bi-instagram me-1"></i>@dg_property_ <i className="bi bi-arrow-up-right ms-1"></i>
          </a>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "60px 0", fontSize: 15 }}>
            Loading feed…
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "60px 0", fontSize: 15 }}>
            No posts to display.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}
            className="ig-grid">
            {posts.map((post) => {
              const thumb = post.mediaType === "VIDEO" ? post.thumbnailUrl || post.mediaUrl : post.mediaUrl
              return (
                <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", position: "relative", overflow: "hidden",
                    background: "#1a2f42", aspectRatio: "4 / 7" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb} alt={post.caption?.slice(0, 60) || "DG Property Instagram post"}
                    style={{ width: "100%", height: "100%", display: "block", objectFit: "cover",
                      transition: "transform 0.35s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
                  {post.mediaType === "VIDEO" && (
                    <div style={{ position: "absolute", top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)", pointerEvents: "none" }}>
                      <div style={{ width: 36, height: 36, background: "rgba(0,0,0,0.55)", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className="bi bi-play-fill" style={{ color: "#fff", fontSize: 16 }} />
                      </div>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="ig-overlay" style={{ position: "absolute", top: 0, left: 0,
                    width: "100%", height: "100%",
                    background: "rgba(13,31,45,0.55)", opacity: 0,
                    transition: "opacity 0.3s ease", display: "flex", alignItems: "center",
                    justifyContent: "center" }}>
                    <i className="bi bi-instagram" style={{ color: "#fff", fontSize: 22 }} />
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {/* Mobile follow link */}
        <div className="text-center mt-30 d-md-none">
          <a href="https://www.instagram.com/dg_property_" target="_blank" rel="noopener noreferrer"
            className="btn-eight">
            <i className="bi bi-instagram me-2"></i>Follow on Instagram
          </a>
        </div>

      </div>

      <style>{`
        @media (max-width: 991px) { .ig-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 575px) { .ig-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        .ig-grid a:hover .ig-overlay { opacity: 1 !important; }
      `}</style>
    </section>
  )
}

export default InstagramFeed
