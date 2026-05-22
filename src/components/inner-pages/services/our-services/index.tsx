"use client";
import Link from "next/link";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";

const serviceCards = [
  {
    icon: "bi-shop",
    title: "Retail Strategy",
    desc: "Strategic planning and positioning for retail assets to maximise occupancy and performance.",
  },
  {
    icon: "bi-building",
    title: "Leasing Services",
    desc: "End-to-end leasing solutions for commercial, retail and mixed-use developments.",
  },
  {
    icon: "bi-buildings",
    title: "Development & Project Management",
    desc: "Full-cycle project management from concept to close-out, tailored to every development.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Sales & Acquisitions",
    desc: "Assisting landlords and developers with the disposal and acquisition of commercial assets.",
  },
  {
    icon: "bi-lightbulb",
    title: "Alternative Income Solutions",
    desc: "Unlocking non-traditional revenue streams from your existing property portfolio.",
  },
  {
    icon: "bi-megaphone",
    title: "Marketing",
    desc: "Targeted property marketing strategies that attract quality tenants and investors.",
  },
];

const devProjectChecklist = [
  ["Project Conceptualisation", "Project Preparation & Management"],
  ["SLA Management", "Marketing Strategy Management"],
  ["Financial Viability", "Council Approvals"],
  ["Development Master Plan", "Appointment of Consultants & Contractors"],
  ["Health & Safety Policy Management", "Project Close-Out & Handover"],
];

const OurServices = () => {
  return (
    <>
      <HeaderOne style={true} />

      {/* ── HERO BANNER ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: 520, display: "flex", alignItems: "center", backgroundImage: "url(/assets/images/media/qw.jpeg)", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
        {/* gold top line */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: "linear-gradient(90deg, #c8973a, #e8b86d, #c8973a)", zIndex: 3 }} />
        {/* dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,22,35,0.82) 0%, rgba(10,22,35,0.60) 60%, rgba(10,22,35,0.45) 100%)", zIndex: 1 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 150, paddingBottom: 90 }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "#f0b95e", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: 20, border: "1px solid rgba(240,185,94,0.35)" }}>DG Property Services</div>
              <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.18, marginBottom: 10 }}>Our Services</h1>
              <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, #c8973a, #e8b86d)", borderRadius: 2, marginBottom: 22 }} />
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <li><Link href="/" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 14 }}>Home</Link></li>
                <li style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>/</li>
                <li style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>About</li>
                <li style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>/</li>
                <li style={{ color: "#fff", fontSize: 14 }}>Our Services</li>
              </ul>
            </div>
            <div className="col-lg-5 mt-4 mt-lg-0 text-lg-end">
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 17, lineHeight: 1.7, marginBottom: 28 }}>Retail · Leasing · Development · Sales · Marketing</p>
              <Link href="/contact" style={{ display: "inline-block", background: "linear-gradient(90deg, #c8973a, #e8b86d)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 34px", borderRadius: 50, textDecoration: "none", letterSpacing: 0.5 }}>Contact Us</Link>
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

      {/* ── YOUR PARTNER ────────────────────────────────────────────── */}
      <section style={{ background: "#f8f9fa", padding: "80px 0 60px" }}>
        <div className="container">
          <div className="row gy-5 align-items-start">
            <div className="col-lg-5">
              <div style={{ color: "#888e7d", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 18 }}>Your Partner</div>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#0d1f2d", lineHeight: 1.3, marginBottom: 0 }}>
                Building robust, equitable relationships is core to how we operate at DG Property.
              </h2>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "#4a5568", marginBottom: 0 }}>
                We work extensively with landlords and tenants across the country. Our priority is to
                build strong relationships with retailers and landlords, thereby creating and developing
                properties that support and ensure success for all parties involved. We represent all
                our client&apos;s interests with an unmatched level of professionalism and efficiency
                within the industry.
              </p>
            </div>
          </div>

          {/* service cards grid */}
          <div className="row gy-4 mt-50">
            {serviceCards.map((card, i) => (
              <div className="col-sm-6 col-lg-3" key={i}>
                <div
                  style={{ background: "#ffffff", borderRadius: 12, padding: "32px 24px", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                  }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: "linear-gradient(135deg, #888e7d18 0%, #888e7d0a 100%)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <i className={`bi ${card.icon}`} style={{ fontSize: 24, color: "#888e7d" }} />
                  </div>
                  <h6 style={{ fontSize: 15, fontWeight: 700, color: "#0d1f2d", marginBottom: 10, lineHeight: 1.35 }}>{card.title}</h6>
                  <p style={{ fontSize: 13.5, color: "#718096", lineHeight: 1.7, marginBottom: 14, flexGrow: 1 }}>{card.desc}</p>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#888e7d", cursor: "pointer", letterSpacing: 0.2, textDecoration: "underline", textUnderlineOffset: 3 }}>View more</span>
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

export default OurServices;
