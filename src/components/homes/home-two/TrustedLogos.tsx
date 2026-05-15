import BrandTwo from "@/components/common/brand/BrandTwo"

const TrustedLogos = () => {
   return (
      <div style={{ background: "#0d1f2d", paddingTop: 90, paddingBottom: 90 }}>
         <div className="container">
            <div className="text-center mb-50 wow fadeInUp">
               <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#f0b95e", marginBottom: 12 }}>Trusted By</div>
               <h2 className="font-garamond m0" style={{ color: "#fff", fontSize: "2.4rem", lineHeight: 1.15 }}>Brands That Trust Us</h2>
            </div>
         </div>
         <div className="container-fluid px-0">
            <BrandTwo />
         </div>
      </div>
   )
}

export default TrustedLogos
