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
    icon: "bi-fuel-pump",
    title: "Filling Station Services",
    desc: "Specialist services for petroleum and convenience-retail site development and leasing.",
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

const fillingStationServices = [
  {
    icon: "bi-search",
    title: "Providing due diligence",
    desc: "Specific risk analysis with consideration to local planning limitations and environmental factors.",
  },
  {
    icon: "bi-bar-chart-line",
    title: "Site feasibility study",
    desc: "Complete detailed site-specific forecasting and estimating for the entire project process from inception to completion.",
  },
  {
    icon: "bi-puzzle",
    title: "Procurement",
    desc: "Procure all the required service providers, vendors, suppliers, and contractors needed to complete the project via an extensive network.",
  },
  {
    icon: "bi-file-earmark-text",
    title: "Documentation management",
    desc: "Manage all documentation from permits to working drawings, energy reports, computations, and engineering.",
  },
  {
    icon: "bi-hard-hat",
    title: "Construction management",
    desc: "Assume responsibility for every aspect of the construction process from abolishments and demolition, to the budget, progress, and quality control.",
  },
  {
    icon: "bi-gear",
    title: "Service management",
    desc: "Management of all service requirements and bulk works including electricity, water, gas, NBN, and telecommunications.",
  },
  {
    icon: "bi-megaphone",
    title: "Sales and marketing",
    desc: "Consult with a chosen specialist to design and execute an innovative and effective sales and marketing strategy.",
  },
  {
    icon: "bi-calculator",
    title: "Budgets",
    desc: "Provide input and management of budgets.",
  },
  {
    icon: "bi-calendar-check",
    title: "Timelines",
    desc: "Provide accurate and ongoing reporting on the project timelines.",
  },
];

const ServiceThree = () => {
  return (
    <>
      <HeaderOne style={true} />

      {/* ── HERO BANNER ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: 520, display: "flex", alignItems: "center", backgroundImage: "url(/assets/images/media/mo.jpg)", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
        {/* gold top line */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: "linear-gradient(90deg, #c8973a, #e8b86d, #c8973a)", zIndex: 3 }} />
        {/* dark glow overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,22,35,0.82) 0%, rgba(10,22,35,0.60) 60%, rgba(10,22,35,0.45) 100%)", zIndex: 1 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 150, paddingBottom: 90 }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "#f0b95e", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: 20, border: "1px solid rgba(240,185,94,0.35)" }}>Landlords / Developers</div>
              <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.18, marginBottom: 10 }}>Seeing the dots and<br />connecting them</h1>
              <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, #c8973a, #e8b86d)", borderRadius: 2, marginBottom: 22 }} />
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <li><Link href="/" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 14 }}>Home</Link></li>
                <li style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>/</li>
                <li style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>Services</li>
                <li style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>/</li>
                <li style={{ color: "#fff", fontSize: 14 }}>For Landlords</li>
              </ul>
            </div>
            <div className="col-lg-5 mt-4 mt-lg-0 text-lg-end">
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 17, lineHeight: 1.7, marginBottom: 28 }}>Strategic asset management and development solutions for landlords and developers.</p>
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

      {/* ── DEVELOPMENT & PROJECT MANAGEMENT ────────────────────────── */}
      <section style={{ background: "#ffffff", padding: "90px 0" }}>
        <div className="container">
          <div className="row gy-5 align-items-center">
            {/* left text */}
            <div className="col-lg-6 pe-lg-5">
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                  fontWeight: 800,
                  color: "#0d1f2d",
                  lineHeight: 1.2,
                  marginBottom: 12,
                }}
              >
                Development &amp; Project Management
              </h2>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#888e7d",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  marginBottom: 28,
                }}
              >
                Connecting the seen with the un-seen
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.85, color: "#4a5568", marginBottom: 22 }}>
                We understand the complete development cycle and offer customised services tailored for
                every point of the project lifespan. Our in-depth understanding of the market and its
                evolving needs informs our input on shopping centre designs and strategy.
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.85, color: "#4a5568", marginBottom: 36 }}>
                We live by our B.R.A.V.E. value system, choosing to partner on developments we believe
                will flip things forward for all. Our portfolio includes a wide spectrum of developments
                from high-end malls to rural, local, and convenience-driven spaces. There is no
                development too big and never one too small when you connect the right dots. We ensure
                that every development we work on is sustainable and successful, creating properties,
                building relationships, and changing lives for the better.
              </p>

              {/* checklist */}
              <div className="row gy-1" style={{ marginBottom: 36 }}>
                {devProjectChecklist.map((row, ri) =>
                  row.map((item, ci) => (
                    <div className="col-6" key={`${ri}-${ci}`}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                        <span style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #888e7d, #6b7263)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <i className="bi bi-check" style={{ color: "#fff", fontSize: 13, fontWeight: 700 }} />
                        </span>
                        <span style={{ fontSize: 13.5, color: "#2d3748", lineHeight: 1.5, fontWeight: 500 }}>{item}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
                <Link href="/success-stories" style={{ display: "inline-block", background: "linear-gradient(90deg, #888e7d 0%, #6b7263 100%)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 34px", borderRadius: 50, textDecoration: "none", letterSpacing: 0.4 }}>
                  View our success stories
                </Link>
                <Link href="/listing_07" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(90deg, #c8973a, #e8b86d)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 34px", borderRadius: 50, textDecoration: "none", letterSpacing: 0.4 }}>
                  View Development Properties <i className="bi bi-arrow-up-right" />
                </Link>
              </div>
            </div>

            {/* right image */}
            <div className="col-lg-6">
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                  position: "relative",
                }}
              >
                <img
                  src="/assets/images/media/invest.jpg"
                  alt="Development & Project Management"
                  style={{ width: "100%", height: 480, objectFit: "cover", objectPosition: "center", display: "block" }}
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIPE ──────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0d1f2d 0%, #1a3a52 100%)",
          padding: "70px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: 14 }}>
            Ready to develop your next landmark?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginBottom: 32, maxWidth: 560, margin: "0 auto 32px" }}>
            Partner with DG Property to unlock the full potential of your land and development portfolio.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              background: "linear-gradient(90deg, #888e7d 0%, #6b7263 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              padding: "15px 40px",
              borderRadius: 50,
              textDecoration: "none",
              letterSpacing: 0.5,
              boxShadow: "0 8px 24px rgba(224,90,90,0.35)",
            }}
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ServiceThree;
