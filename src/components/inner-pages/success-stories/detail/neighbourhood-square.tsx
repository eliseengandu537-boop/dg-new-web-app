"use client";
import Image from "next/image";
import Link from "next/link";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";

const NeighbourhoodSquareDetail = () => {
  return (
    <>
      <HeaderOne style={true} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: 480,
          display: "flex",
          alignItems: "flex-end",
          backgroundImage: "url(/assets/images/media/img_45.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,28,46,0.88) 0%, rgba(8,28,46,0.30) 100%)", zIndex: 1 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: 60, paddingTop: 140 }}>
          <Link
            href="/success-stories"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.7)", fontSize: 13, textDecoration: "none", marginBottom: 20 }}
          >
            <i className="bi bi-arrow-left" /> Back to Success Stories
          </Link>
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
            Retail Development
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.15, margin: 0 }}>
            The Neighbourhood Square
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "70px 0" }}>
        <div className="container">
          <div className="row gy-5">
            {/* left – story */}
            <div className="col-lg-8 pe-lg-5">
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0d1f2d", marginBottom: 16 }}>Project Overview</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.9, color: "#4a5568", marginBottom: 20 }}>
                The Neighbourhood Square is the unique, social, retail, and leisure hub of The Neighbourhood. Not only does it provide convenient shopping amenities, but it also offers quaint restaurants, buzzing coffee shops and boutique stores. It is intended as a place to meet with friends and family, to enjoy a relaxing meal in a unique setting and to make special memories.
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.9, color: "#4a5568", marginBottom: 20 }}>
                DG Property played an integral role in the leasing strategy and tenant curation for this development, ensuring the right mix of retailers to serve the local community while driving consistent foot traffic and long-term sustainability.
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.9, color: "#4a5568", marginBottom: 40 }}>
                With Woolworths Food as the anchor, the centre was designed to attract a premium, convenience-driven shopper base. The result is a thriving neighbourhood destination that continues to grow in popularity and value.
              </p>

              {/* map */}
              <h4 style={{ fontSize: 18, fontWeight: 700, color: "#0d1f2d", marginBottom: 16 }}>Location</h4>
              <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 40, boxShadow: "0 4px 18px rgba(0,0,0,0.10)" }}>
                <iframe
                  src="https://www.google.com/maps?q=Corner+of+Club+St+and+Lissalond+Road+Bedford+South+Africa&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* gallery */}
              <h4 style={{ fontSize: 18, fontWeight: 700, color: "#0d1f2d", marginBottom: 20 }}>Gallery</h4>
              <div className="row gy-3">
                {["/assets/images/media/img_45.jpg", "/assets/images/media/lk.jpg", "/assets/images/media/lk1.jpg"].map((src, i) => (
                  <div className="col-4" key={i}>
                    <div style={{ borderRadius: 10, overflow: "hidden", height: 160, position: "relative" }}>
                      <Image
                        src={src}
                        alt={`The Neighbourhood Square gallery image ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 33vw, 160px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right – details card */}
            <div className="col-lg-4">
              <div style={{ background: "#f8f9fa", borderRadius: 16, padding: 32, position: "sticky", top: 100 }}>
                <h5 style={{ fontSize: 16, fontWeight: 700, color: "#0d1f2d", marginBottom: 24, borderBottom: "2px solid #888e7d", paddingBottom: 12 }}>
                  Project Details
                </h5>
                {[
                  { icon: "bi-calendar3", label: "Opening Date", value: "16 July 2020" },
                  { icon: "bi-geo-alt", label: "Location", value: "Corner of Club St & Lissalond Road, Bedford" },
                  { icon: "bi-rulers", label: "GLA", value: "7 102 m²" },
                  { icon: "bi-car-front", label: "Parking Bays", value: "670" },
                  { icon: "bi-shop", label: "Anchor Tenant", value: "Woolworths Food" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
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

                <a
                  href="#"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER STORIES ─────────────────────────────────────────── */}
      <section style={{ background: "#f8f9fa", padding: "60px 0" }}>
        <div className="container">
          <h4 style={{ fontSize: 20, fontWeight: 700, color: "#0d1f2d", marginBottom: 32 }}>Other Success Stories</h4>
          <div className="row gy-4">
            {[
              { slug: "steeledale-mall", title: "Steeledale Mall", tag: "Mall Refurbishment", img: "/assets/images/media/img_46.jpg" },
              { slug: "umphakathi-mall", title: "Umphakathi Mall", tag: "Development Transformation", img: "/assets/images/media/img_47.jpg" },
            ].map((s) => (
              <div className="col-md-6" key={s.slug}>
                <Link href={`/success-stories/${s.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ borderRadius: 12, overflow: "hidden", position: "relative", height: 200 }}>
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(8,28,46,0.50)" }} />
                    <div style={{ position: "absolute", bottom: 20, left: 20, color: "#fff" }}>
                      <div style={{ fontSize: 11, color: "#c8d5b0", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{s.tag}</div>
                      <div style={{ fontSize: 18, fontWeight: 800 }}>{s.title}</div>
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

export default NeighbourhoodSquareDetail;
