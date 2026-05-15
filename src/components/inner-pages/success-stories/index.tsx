"use client";
import Link from "next/link";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";

const stories = [
  {
    slug: "neighbourhood-square",
    title: "The Neighbourhood Square",
    tag: "Retail Development",
    location: "Corner of Club St and Lissalond Road, Bedford",
    size: "7 102 m²",
    parking: "670",
    openingDate: "16 July 2020",
    summary:
      "The Neighbourhood Square is the unique, social, retail, and leisure hub of The Neighbourhood. Not only does it provide convenient shopping amenities, but it also offers quaint restaurants, buzzing coffee shops and boutique stores.",
    image: "/assets/images/media/img_45.jpg",
    highlight: "Anchor: Woolworths Food",
  },
  {
    slug: "steeledale-mall",
    title: "Steeledale Mall",
    tag: "Mall Refurbishment",
    location: "Steeledale, Johannesburg South",
    size: "8 000 m²",
    parking: "N/A",
    openingDate: "2023",
    summary:
      "The newly refurbished shopping centre has become the talk of the area with a Pick n Pay Hyper anchoring 8 000m².",
    image: "/assets/images/media/img_46.jpg",
    highlight: "Anchor: Pick n Pay Hyper",
  },
  {
    slug: "umphakathi-mall",
    title: "Umphakathi Mall",
    tag: "Development Transformation",
    location: "KwaZulu-Natal",
    size: "14 000 m²",
    parking: "N/A",
    openingDate: "2024",
    summary:
      "What was earmarked to become a fuel station turned into 14 000m\u00b2 of shopping space, a landmark transformation for the local community.",
    image: "/assets/images/media/img_47.jpg",
    highlight: "14 000m² of retail space",
  },
];

const SuccessStories = () => {
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
          <div className="row gy-5">
            {stories.map((story) => (
              <div className="col-lg-4 col-md-6" key={story.slug}>
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
                  {/* image */}
                  <div style={{ position: "relative", height: 230, overflow: "hidden" }}>
                    <img
                      src={story.image}
                      alt={story.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(8,28,46,0.55) 0%, transparent 60%)",
                      }}
                    />
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
                  </div>

                  {/* body */}
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
                      {story.summary}
                    </p>

                    {/* meta row */}
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
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <i className="bi bi-geo-alt" style={{ color: "#888e7d", fontSize: 14 }} />
                        <span style={{ fontSize: 12, color: "#718096" }}>{story.location}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <i className="bi bi-rulers" style={{ color: "#888e7d", fontSize: 14 }} />
                        <span style={{ fontSize: 12, color: "#718096" }}>{story.size}</span>
                      </div>
                    </div>

                    <Link
                      href={`/success-stories/${story.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#888e7d",
                        fontWeight: 700,
                        fontSize: 14,
                        textDecoration: "none",
                        letterSpacing: 0.3,
                      }}
                    >
                      Learn more
                      <i className="bi bi-arrow-right" style={{ fontSize: 16 }} />
                    </Link>
                  </div>
                </div>
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
