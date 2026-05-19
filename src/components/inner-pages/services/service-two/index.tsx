import Link from "next/link"
import FooterFour from "@/layouts/footers/FooterFour"
import HeaderOne from "@/layouts/headers/HeaderOne"
import BLockFeatureOne from "./BLockFeatureOne"
import BLockFeatureTwo from "./BLockFeatureTwo"
import FancyBanner from "@/components/common/FancyBanner"
import BLockFeatureThree from "./BLockFeatureThree"

const ServiceTwo = () => {
   return (
      <>
         <HeaderOne style={true} />

         {/* ── HERO BANNER ────────────────────────────────────────── */}
         <section style={{ position: "relative", minHeight: 520, display: "flex", alignItems: "center", backgroundImage: "url(/assets/images/media/in.jpeg)", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
            {/* gold top line */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: "linear-gradient(90deg, #c8973a, #e8b86d, #c8973a)", zIndex: 3 }} />
            {/* dark glow overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,22,35,0.82) 0%, rgba(10,22,35,0.60) 60%, rgba(10,22,35,0.45) 100%)", zIndex: 1 }} />
            <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 150, paddingBottom: 90 }}>
               <div className="row align-items-center">
                  <div className="col-lg-7">
                     <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "#f0b95e", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: 20, border: "1px solid rgba(240,185,94,0.35)" }}>Investment Sales</div>
                     <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.18, marginBottom: 10 }}>Unlocking Value Through<br />Strategic Investment</h1>
                     <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, #c8973a, #e8b86d)", borderRadius: 2, marginBottom: 22 }} />
                     <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <li><Link href="/" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 14 }}>Home</Link></li>
                        <li style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>/</li>
                        <li style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>Services</li>
                        <li style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>/</li>
                        <li style={{ color: "#fff", fontSize: 14 }}>Investment Sales</li>
                     </ul>
                  </div>
                  <div className="col-lg-5 mt-4 mt-lg-0 text-lg-end">
                     <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 17, lineHeight: 1.7, marginBottom: 28 }}>Private · Discreet · Professional</p>
                     <Link href="/contact" style={{ display: "inline-block", background: "linear-gradient(90deg, #c8973a, #e8b86d)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 34px", borderRadius: 50, textDecoration: "none", letterSpacing: 0.5 }}>Discuss Your Investment</Link>
                  </div>
               </div>
            </div>
            <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 70, zIndex: 3 }}>
               <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                  <path d="M0,70 Q720,0 1440,70 L1440,70 L0,70 Z" fill="#ffffff" />
               </svg>
            </div>
         </section>

         <BLockFeatureOne />
         <BLockFeatureThree />
         <BLockFeatureTwo />
         <FancyBanner />
         <FooterFour />
      </>
   )
}

export default ServiceTwo
