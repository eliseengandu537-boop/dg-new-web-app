import Image from "next/image"
import Link from "next/link"
import featureImg from "@/assets/images/shape/title_shape_10.svg"

const BLockFeatureOne = () => {
   return (
      <div className="block-feature-eleven mt-150 xl-mt-100">
         <div className="container container-large">
            <div className="row justify-content-center">
               <div className="col-xl-9 col-lg-10">
                  <div className="title-one text-center mb-35">
                     <h3 style={{ fontSize: "clamp(2.2rem, 4.8vw, 4rem)", lineHeight: 1.1 }}>
                        Our <span>Investment <Image src={featureImg} alt="" className="lazy-img" /></span> Strategy
                     </h3>
                  </div>
                  <p className="fs-24 lh-lg mb-30 color-dark text-center" style={{ maxWidth: 920, marginLeft: "auto", marginRight: "auto" }}>
                     At DG Property, our investment strategy is built on trust, discretion, and long-term partnerships. We take a personalised, relationship-driven approach with every client, focusing on understanding your goals and aligning with your broader wealth-creation journey.
                  </p>
                  <div className="d-flex flex-wrap align-items-center justify-content-center">
                     <Link href="/contact" className="btn-five md rounded-0 mt-20 me-5"><span>Get in Touch</span></Link>
                     <Link href="/contact" className="btn-three mt-20"><span>Request a Callback</span> <i className="fa-light fa-arrow-right-long"></i></Link>
                  </div>
                  <div className="mt-25 text-center">
                     <Link href="/listing_05" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(90deg, #c8973a, #e8b86d)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 34px", borderRadius: 50, textDecoration: "none", letterSpacing: 0.4 }}>
                        View Investment Properties <i className="bi bi-arrow-up-right"></i>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BLockFeatureOne
