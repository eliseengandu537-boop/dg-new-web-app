import FaqTwo from "@/components/common/faq/FaqTwo"
import Link from "next/link"

const FAQ = () => {
   return (
      <div style={{ background: "#f8f9fa", paddingTop: 90, paddingBottom: 90 }}>
         <div className="container">
            <div className="row g-0" style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.10)" }}>

               {/* Left panel — dark navy */}
               <div className="col-lg-4 wow fadeInLeft" style={{ background: "#0d1f2d", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                     <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#f0b95e", marginBottom: 18 }}>Have Questions?</div>
                     <h2 className="font-garamond" style={{ color: "#fff", fontSize: "2.1rem", lineHeight: 1.25, marginBottom: 20 }}>Commercial Property FAQs</h2>
                     <p style={{ color: "rgba(255,255,255,0.60)", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
                        If you&apos;re considering a lease, acquisition or disposal, we&apos;re happy to guide the process.
                     </p>
                  </div>
                  <Link href="/contact"
                     style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px", background: "linear-gradient(135deg, #888e7d, #6b7263)", borderRadius: 50, color: "#fff", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, width: "fit-content" }}
                     className="tran3s">
                     Send a Query <i className="bi bi-arrow-up-right"></i>
                  </Link>
               </div>

               {/* Right panel — white accordion */}
               <div className="col-lg-8 wow fadeInRight" style={{ background: "#fff", padding: "56px 48px" }}>
                  <div className="accordion accordion-style-two" id="accordionTwo" style={{ background: "none", backgroundImage: "none", padding: 0 }}>
                     <FaqTwo />
                  </div>
               </div>

            </div>
         </div>
      </div>
   )
}

export default FAQ
