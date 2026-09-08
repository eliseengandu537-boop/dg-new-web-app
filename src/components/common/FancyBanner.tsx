"use client"
import Image from "next/image"
import Link from "next/link"
import titleShape from "@/assets/images/shape/title_shape_06.svg"

const FancyBanner = ({ style }: any) => {
   return (
      <div className="fancy-banner-two position-relative z-1 pt-90 lg-pt-50 pb-90 lg-pb-50">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="title-one text-center text-lg-start md-mb-40 pe-xl-5">
                     <h3 className="text-white m0">Stay connected to <span>DG Property{style ? "" : <Image src={titleShape} alt="" aria-hidden="true" className="lazy-img" />}</span>.</h3>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="form-wrapper me-auto ms-auto me-lg-0 d-flex justify-content-center justify-content-lg-end">
                     <Link
                        href="/property-news"
                        style={{
                           display: "inline-flex",
                           alignItems: "center",
                           justifyContent: "center",
                           gap: 10,
                           minHeight: 58,
                           padding: "0 30px",
                           borderRadius: style ? 0 : 999,
                           background: "#888e7d",
                           color: "#ffffff",
                           fontWeight: 700,
                           textDecoration: "none",
                        }}
                     >
                        Read Property News <i className="bi bi-arrow-up-right" aria-hidden="true" />
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FancyBanner
