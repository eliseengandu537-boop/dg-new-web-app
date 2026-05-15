"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";
import { fetchPublicSuccessStories } from "@/utils/dashboardApi";
import type { SuccessStory } from "./types";

const API_ROOT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const BACKEND = API_ROOT.replace("/api", "");

const SuccessStories = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublicSuccessStories()
      .then((res) => setStories(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Failed to load success stories. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const getImageUrl = (imageUrl?: string) => imageUrl ? `${BACKEND}${imageUrl}` : "";

  return (
    <>
      <HeaderOne style={true} />

      {/* ── HERO BANNER ─────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: 520,
          display: "flex",
          alignItems: "center",
          backgroundImage: "url(/assets/images/media/m12.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          overflow: "hidden",
        }}
      >
        {/* dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(8,28,46,0.62) 0%, rgba(8,28,46,0.40) 100%)",
            zIndex: 1,
          }}
        />
        <div
          className="container"
          style={{ position: "relative", zIndex: 2, paddingTop: 140, paddingBottom: 80, textAlign: "center" }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.12)",
                  color: "#f0b95e",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  padding: "6px 16px",
                  borderRadius: 4,
                  marginBottom: 22,
                  border: "1px solid rgba(240,185,94,0.35)",
                }}
              >
                Development Leasing
              </div>
              <h1
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.18,
                  marginBottom: 16,
                }}
              >
                Our Success Stories
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.82)",
                  fontSize: 17,
                  lineHeight: 1.7,
                  maxWidth: 560,
                  margin: "0 auto 32px",
                }}
              >
                Landmark projects. Real results. Lasting impact.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(90deg, #888e7d 0%, #6b7263 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "14px 34px",
                  borderRadius: 50,
                  textDecoration: "none",
                  letterSpacing: 0.5,
                }}
              >
                Work With Us
              </Link>
            </div>
          </div>
        </div>
        {/* curved bottom */}
        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 70, zIndex: 3 }}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,70 Q720,0 1440,70 L1440,70 L0,70 Z" fill="#f8f9fa" />
          </svg>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────── */}
      <section style={{ background: "#f8f9fa", padding: "70px 0 50px" }}>
        <div className="container text-center">
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#0d1f2d", marginBottom: 16 }}>
            Success Stories
          </h2>
          <div style={{ width: 60, height: 4, background: "linear-gradient(90deg, #888e7d, #b5a98a)", borderRadius: 2, margin: "0 auto 24px" }} />
          <p style={{ maxWidth: 640, margin: "0 auto", fontSize: 16, color: "#718096", lineHeight: 1.85 }}>
            Explore a selection of landmark projects we&apos;ve helped bring to life, from neighbourhood retail hubs to large-scale mall transformations.
          </p>
        </div>
      </section>

      {/* ── STORIES GRID ──────────────────────────────────────────── */}
      <section style={{ background: "#f8f9fa", paddingBottom: 90 }}>
        <div className="container">
          {loading && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#718096" }}>
              Loading success stories...
            </div>
          )}
          {error && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#c53030" }}>
              {error}
            </div>
          )}
          {!loading && !error && stories.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#718096" }}>
              No published success stories are available yet.
            </div>
          )}
          <div className="row gy-5">
            {stories.map((story) => (
              <div className="col-lg-4 col-md-6" key={story.id}>
                <Link href={`/success-stories/${story.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow: "0 6px 28px rgba(0,0,0,0.08)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.25s, box-shadow 0.25s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 18px 48px rgba(0,0,0,0.13)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 28px rgba(0,0,0,0.08)";
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        height: 230,
                        overflow: "hidden",
                        background: story.imageUrl
                          ? `linear-gradient(to top, rgba(8,28,46,0.55) 0%, rgba(8,28,46,0.08) 60%), url(${getImageUrl(story.imageUrl)}) center/cover`
                          : "linear-gradient(135deg, #dfe8ee 0%, #edf2f7 100%)",
                      }}
                    >
                      {!story.imageUrl && (
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 38 }}>
                          <i className="bi bi-trophy" />
                        </div>
                      )}
                      {story.tag && (
                        <span
                          style={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            background: "#888e7d",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: 1.5,
                            textTransform: "uppercase",
                            padding: "5px 12px",
                            borderRadius: 20,
                          }}
                        >
                          {story.tag}
                        </span>
                      )}
                    </div>

                    <div style={{ padding: "28px 28px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h4
                        style={{
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#0d1f2d",
                          marginBottom: 10,
                          lineHeight: 1.3,
                        }}
                      >
                        {story.title}
                      </h4>
                      <div style={{ width: 40, height: 3, background: "#888e7d", borderRadius: 2, marginBottom: 16 }} />
                      <p style={{ fontSize: 14, color: "#718096", lineHeight: 1.75, marginBottom: 20, flexGrow: 1 }}>
                        {story.summary || "Explore how DG Property helped deliver this project."}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          gap: 16,
                          flexWrap: "wrap",
                          marginBottom: 22,
                          paddingBottom: 18,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        {story.location && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <i className="bi bi-geo-alt" style={{ color: "#888e7d", fontSize: 14 }} />
                            <span style={{ fontSize: 12, color: "#718096" }}>{story.location}</span>
                          </div>
                        )}
                        {story.gla && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <i className="bi bi-rulers" style={{ color: "#888e7d", fontSize: 14 }} />
                            <span style={{ fontSize: 12, color: "#718096" }}>{story.gla}</span>
                          </div>
                        )}
                      </div>

                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          color: "#888e7d",
                          fontWeight: 700,
                          fontSize: 14,
                          letterSpacing: 0.3,
                        }}
                      >
                        Learn more
                        <i className="bi bi-arrow-right" style={{ fontSize: 16 }} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default SuccessStories;
