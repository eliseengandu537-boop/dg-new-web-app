import Link from "next/link"

const FancyBannerTwo = () => {
   return (
      <div
         style={{
            background: "linear-gradient(135deg, #0d1f2d 0%, #1a3248 100%)",
            paddingTop: 90,
            paddingBottom: 90,
            position: "relative",
            overflow: "hidden",
         }}
      >
         {/* Subtle geometric accent */}
         <div style={{
            position: "absolute", top: -60, right: -60, width: 300, height: 300,
            borderRadius: "50%", border: "1px solid rgba(240,185,94,0.12)", pointerEvents: "none"
         }} />
         <div style={{
            position: "absolute", bottom: -80, left: -40, width: 220, height: 220,
            borderRadius: "50%", border: "1px solid rgba(240,185,94,0.08)", pointerEvents: "none"
         }} />

         <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div className="row align-items-center">
               <div className="col-lg-8 wow fadeInLeft">
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#f0b95e", marginBottom: 16 }}>
                     Work With Us
                  </div>
                  <h2 className="font-garamond" style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2, marginBottom: 16 }}>
                     Need a commercial property partner?
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, lineHeight: 1.75, maxWidth: 520 }}>
                     Whether you&apos;re a landlord, occupier or investor, DG Property provides discreet, expert-led support from mandate to close.
                  </p>
               </div>
               <div className="col-lg-4 d-flex flex-column align-items-lg-end mt-40 mt-lg-0 gap-3 wow fadeInRight">
                  <Link href="/contact"
                     style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 40px", background: "#f0b95e", borderRadius: 50, color: "#0d1f2d", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}
                     className="tran3s">
                     Contact DG Property <i className="bi bi-arrow-up-right"></i>
                  </Link>
                  <Link href="/listing_05"
                     style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.65)", fontSize: 14, fontWeight: 500 }}
                     className="tran3s">
                     <i className="bi bi-buildings"></i> Browse All Listings
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FancyBannerTwo
