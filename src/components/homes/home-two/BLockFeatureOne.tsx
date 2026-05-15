import feature_data from "@/data/home-data/FeatureData"
import Link from "next/link"

const BLockFeatureOne = () => {
   return (
      <div style={{ background: "#0d1f2d", paddingTop: 90, paddingBottom: 90 }}>
         <div className="container">

            {/* Section header */}
            <div className="row mb-50 wow fadeInUp">
               <div className="col-lg-7">
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#f0b95e", marginBottom: 12 }}>Where We Operate</div>
                  <h2 className="font-garamond m0" style={{ color: "#fff", fontSize: "2.4rem", lineHeight: 1.15 }}>South Africa&apos;s Key Commercial Nodes</h2>
               </div>
               <div className="col-lg-5 d-flex align-items-end justify-content-lg-end mt-3 mt-lg-0">
                  <p className="m0" style={{ color: "rgba(255,255,255,0.60)", fontSize: 16, lineHeight: 1.7 }}>
                     Retail, industrial, office and investment properties across the metros that matter.
                  </p>
               </div>
            </div>

            {/* Location grid */}
            <div className="row gx-3 gy-3">
               {feature_data.filter((items) => items.page === "home_2_feature_1").map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={item.data_delay_time}>
                     <div
                        className={`location-card-two position-relative z-1 d-flex align-items-end justify-content-start ${item.item_bg}`}
                        style={{ borderRadius: 12, height: 280, padding: "20px 24px" }}
                     >
                        <div style={{ position: "relative", zIndex: 2 }}>
                           <h5 className="font-garamond text-white m0" style={{ fontSize: 32, fontWeight: 500 }}>{item.title}</h5>
                           <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                              <i className="bi bi-geo-alt-fill" style={{ color: "#f0b95e", fontSize: 12 }}></i>
                              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.70)", textTransform: "uppercase", letterSpacing: 1.5 }}>Gauteng · SA</span>
                           </div>
                        </div>
                        <Link href="/listing_05" className="stretched-link"></Link>
                     </div>
                  </div>
               ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-50 wow fadeInUp">
               <Link href="/listing_05"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 36px", border: "1px solid rgba(240,185,94,0.5)", borderRadius: 50, color: "#f0b95e", fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", transition: "all 0.3s" }}
                  className="tran3s"
               >
                  Explore All Listings <i className="bi bi-arrow-up-right"></i>
               </Link>
            </div>

         </div>
      </div>
   )
}

export default BLockFeatureOne
