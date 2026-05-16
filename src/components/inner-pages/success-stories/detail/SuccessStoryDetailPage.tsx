import Link from "next/link";
import Image from "next/image";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";
import { resolveMediaUrl } from "@/utils/publicMedia";
import { getPublicSuccessStories, getPublicSuccessStoryBySlug } from "@/utils/publicServerApi";
import type { SuccessStory } from "../types";

const SuccessStoryDetailPage = async ({ slug }: { slug: string }) => {
  let story: SuccessStory | null = null;
  let relatedStories: SuccessStory[] = [];
  let error = "";

  try {
    const [loadedStory, stories] = await Promise.all([
      getPublicSuccessStoryBySlug(slug),
      getPublicSuccessStories(),
    ]);

    story = loadedStory;
    relatedStories = loadedStory
      ? stories.filter((item) => item.slug !== loadedStory.slug).slice(0, 2)
      : [];
  } catch {
    error = "Failed to load this success story.";
  }

  if (!story && !error) {
    error = "This success story could not be found.";
  }

  const bodyParagraphs = (story?.body?.trim() || story?.summary?.trim() || "")
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const brochureUrl = resolveMediaUrl(story?.brochureUrl);
  const mapSrc = story?.googleMapsQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(story.googleMapsQuery)}&output=embed`
    : "";

  const detailItems = story ? [
    { icon: "bi-calendar3", label: "Opening / Completion", value: story.openingDate },
    { icon: "bi-geo-alt", label: "Location", value: story.location },
    { icon: "bi-rulers", label: "GLA", value: story.gla },
    { icon: "bi-car-front", label: "Parking", value: story.parking },
    { icon: "bi-shop", label: "Anchor Tenant", value: story.anchorTenant },
    { icon: "bi-arrow-up-circle", label: "Project Type", value: story.projectType || story.tag },
  ].filter((item) => item.value) : [];

  return (
    <>
      <HeaderOne style={true} />

      {error || !story ? (
        <section style={{ padding: "180px 0 100px", textAlign: "center" }}>
          <div className="container">
            <h1 style={{ fontSize: 34, fontWeight: 800, color: "#0d1f2d", marginBottom: 16 }}>Success Story</h1>
            <p style={{ color: "#718096", marginBottom: 24 }}>{error || "This success story is unavailable."}</p>
            <Link
              href="/success-stories"
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #888e7d 0%, #6b7263 100%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                padding: "13px 26px",
                borderRadius: 50,
                textDecoration: "none",
              }}
            >
              Back to Success Stories
            </Link>
          </div>
        </section>
      ) : (
        <>
          <section
            style={{
              position: "relative",
              minHeight: 480,
              display: "flex",
              alignItems: "flex-end",
              background: "linear-gradient(135deg, #203647 0%, #425b6d 100%)",
              overflow: "hidden",
            }}
          >
            {story.imageUrl && (
              <>
                <Image
                  src={resolveMediaUrl(story.imageUrl)}
                  alt={story.title}
                  fill
                  priority
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,28,46,0.88) 0%, rgba(8,28,46,0.30) 100%)" }} />
              </>
            )}
            <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: 60, paddingTop: 140 }}>
              <Link
                href="/success-stories"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.7)", fontSize: 13, textDecoration: "none", marginBottom: 20 }}
              >
                <i className="bi bi-arrow-left" /> Back to Success Stories
              </Link>
              {(story.projectType || story.tag) && (
                <div
                  style={{
                    display: "inline-block",
                    background: "#888e7d",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    padding: "5px 14px",
                    borderRadius: 20,
                    marginBottom: 16,
                    marginLeft: 12,
                  }}
                >
                  {story.projectType || story.tag}
                </div>
              )}
              <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.15, margin: 0 }}>
                {story.title}
              </h1>
            </div>
          </section>

          <section style={{ background: "#fff", padding: "70px 0" }}>
            <div className="container">
              <div className="row gy-5">
                <div className="col-lg-8 pe-lg-5">
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0d1f2d", marginBottom: 16 }}>Project Overview</h3>
                  {story.summary && (
                    <p style={{ fontSize: 16, lineHeight: 1.9, color: "#4a5568", marginBottom: bodyParagraphs.length ? 20 : 40 }}>
                  {story.summary}
                </p>
              )}
              {bodyParagraphs.map((paragraph, index) => (
                    <p key={index} style={{ fontSize: 15.5, lineHeight: 1.9, color: "#4a5568", marginBottom: index === bodyParagraphs.length - 1 ? 40 : 20 }}>
                      {paragraph}
                    </p>
                  ))}

                  {mapSrc && (
                    <>
                      <h4 style={{ fontSize: 18, fontWeight: 700, color: "#0d1f2d", marginBottom: 16 }}>Location</h4>
                      <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 40, boxShadow: "0 4px 18px rgba(0,0,0,0.10)" }}>
                        <iframe
                          src={mapSrc}
                          width="100%"
                          height="280"
                          style={{ border: 0, display: "block" }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </>
                  )}

                  {story.imageUrl && (
                    <>
                      <h4 style={{ fontSize: 18, fontWeight: 700, color: "#0d1f2d", marginBottom: 20 }}>Featured Project Image</h4>
                      <div
                        style={{
                          position: "relative",
                          borderRadius: 14,
                          overflow: "hidden",
                          height: 360,
                          boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
                        }}
                      >
                        <Image
                          src={resolveMediaUrl(story.imageUrl)}
                          alt={story.title}
                          fill
                          sizes="(max-width: 991px) 100vw, 66vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="col-lg-4">
                  <div style={{ background: "#f8f9fa", borderRadius: 16, padding: 32, position: "sticky", top: 100 }}>
                    <h5 style={{ fontSize: 16, fontWeight: 700, color: "#0d1f2d", marginBottom: 24, borderBottom: "2px solid #888e7d", paddingBottom: 12 }}>
                      Project Details
                    </h5>
                    {detailItems.map((item) => (
                      <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <i className={`bi ${item.icon}`} style={{ color: "#888e7d", fontSize: 16 }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{item.label}</div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#2d3748" }}>{item.value}</div>
                        </div>
                      </div>
                    ))}

                    <Link
                      href="/contact"
                      style={{
                        display: "block",
                        marginTop: 28,
                        background: "linear-gradient(90deg, #888e7d 0%, #6b7263 100%)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 14,
                        padding: "13px 0",
                        borderRadius: 50,
                        textDecoration: "none",
                        textAlign: "center",
                        letterSpacing: 0.4,
                      }}
                    >
                      Enquire About This Project
                    </Link>

                    {brochureUrl && (
                      <a
                        href={brochureUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          marginTop: 12,
                          background: "#fff",
                          color: "#888e7d",
                          fontWeight: 700,
                          fontSize: 14,
                          padding: "13px 0",
                          borderRadius: 50,
                          textDecoration: "none",
                          textAlign: "center",
                          letterSpacing: 0.4,
                          border: "2px solid #888e7d",
                        }}
                      >
                        <i className="bi bi-download" style={{ fontSize: 15 }} />
                        Download Brochure
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {relatedStories.length > 0 && (
            <section style={{ background: "#f8f9fa", padding: "60px 0" }}>
              <div className="container">
                <h4 style={{ fontSize: 20, fontWeight: 700, color: "#0d1f2d", marginBottom: 32 }}>Other Success Stories</h4>
                <div className="row gy-4">
                  {relatedStories.map((item) => (
                    <div className="col-md-6" key={item.id}>
                      <Link href={`/success-stories/${item.slug}`} style={{ textDecoration: "none" }}>
                        <div
                          style={{
                            borderRadius: 12,
                            overflow: "hidden",
                            position: "relative",
                            height: 200,
                            background: "linear-gradient(135deg, #dfe8ee 0%, #edf2f7 100%)",
                          }}
                        >
                          {item.imageUrl && (
                            <Image
                              src={resolveMediaUrl(item.imageUrl)}
                              alt={item.title}
                              fill
                              sizes="(max-width: 767px) 100vw, 50vw"
                              style={{ objectFit: "cover" }}
                            />
                          )}
                          <div style={{ position: "absolute", inset: 0, background: "rgba(8,28,46,0.50)" }} />
                          <div style={{ position: "absolute", bottom: 20, left: 20, color: "#fff" }}>
                            {(item.tag || item.projectType) && (
                              <div style={{ fontSize: 11, color: "#c8d5b0", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>
                                {item.tag || item.projectType}
                              </div>
                            )}
                            <div style={{ fontSize: 18, fontWeight: 800 }}>{item.title}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default SuccessStoryDetailPage;
