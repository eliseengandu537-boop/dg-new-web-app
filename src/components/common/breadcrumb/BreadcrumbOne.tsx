import Image from "next/image"
import Link from "next/link"

import breadcrumbImg from "@/assets/images/assets/ils_07.svg"

const BreadcrumbOne = ({ title, sub_title, style, link, link_title, bgImage }: any) => {
   if (bgImage) {
      return (
         <div
            className="inner-banner-one inner-banner text-center z-1 position-relative"
            style={{
               backgroundImage: `url(${bgImage})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
               paddingTop: 180,
               paddingBottom: 120,
               minHeight: 420,
               display: "flex",
               alignItems: "center",
            }}
         >
            {/* Dark gradient overlay */}
            <div style={{
               position: "absolute",
               inset: 0,
               background: "linear-gradient(160deg, rgba(13,31,45,0.82) 0%, rgba(13,31,45,0.65) 60%, rgba(13,31,45,0.50) 100%)",
               zIndex: 0,
            }} />
            <div className="container w-100" style={{ position: "relative", zIndex: 1 }}>
               {/* Gold accent label */}
               <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#f0b95e", marginBottom: 18 }}>DG Property</div>
               <h2
                  className="font-garamond"
                  style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24 }}
               >
                  {title}
               </h2>
               {/* Thin gold divider */}
               <div style={{ width: 60, height: 2, background: "#f0b95e", margin: "0 auto 24px" }} />
               <ul className="theme-breadcrumb style-none d-inline-flex align-items-center justify-content-center position-relative z-1" style={{ gap: 8, listStyle: "none", padding: 0 }}>
                  <li><Link href="/" style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>Home</Link></li>
                  <li style={{ color: "rgba(255,255,255,0.40)", fontSize: 14 }}>/</li>
                  {style && <>
                     <li><Link href={link} style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>{link_title}</Link></li>
                     <li style={{ color: "rgba(255,255,255,0.40)", fontSize: 14 }}>/</li>
                  </>}
                  <li style={{ color: "#f0b95e", fontSize: 14, fontWeight: 600 }}>{sub_title}</li>
               </ul>
            </div>
         </div>
      )
   }
   return (
      <div className="inner-banner-one inner-banner bg-pink text-center z-1 pt-160 lg-pt-130 pb-160 xl-pb-120 md-pb-80 position-relative">
         <div className="container">
            <h3 className="mb-35 xl-mb-20 pt-15">{title}</h3>
            <ul className="theme-breadcrumb style-none d-inline-flex align-items-center justify-content-center position-relative z-1 bottom-line">
               <li><Link href="/">Home</Link></li>
               <li>/</li>
               {style && <>
                  <li><Link href={link}>{link_title}</Link></li>
                  <li>/</li>
               </>}
               <li>{sub_title}</li>
            </ul>
         </div>
         <Image src={breadcrumbImg} alt="" className="lazy-img shapes w-100 illustration" />
      </div>
   )
}

export default BreadcrumbOne;
