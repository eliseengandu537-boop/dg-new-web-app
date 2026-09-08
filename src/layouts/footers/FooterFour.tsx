import Image from "next/image"
import footerLogo from "@/assets/images/assets/logodg.png"
import Link from "next/link"
import { contactInfo } from "@/data/contact-info";

const FooterFour = () => {
   return (
      <footer style={{ background: "#0d1f2d", color: "#fff", paddingTop: 72, paddingBottom: 0 }}>
         <div className="container">
            <div className="row gx-xl-5 gy-5">

               {/* Brand col */}
               <div className="col-lg-4 col-md-6">
                  <Link href="/">
                     <Image src={footerLogo} alt="DG Property" width={130} height={54} style={{ filter: "brightness(0) invert(1)", marginBottom: 24 }} />
                  </Link>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 20 }}>
                     Specialist commercial property brokerage headquartered in Johannesburg.
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.82rem", marginBottom: 4 }}>{contactInfo.fullAddress}</p>
                  <div><Link href={contactInfo.emailHref} style={{ color: "#e8b86d", fontSize: "0.9rem", textDecoration: "none" }}>{contactInfo.emailDisplay}</Link></div>
                  <div style={{ marginTop: 6 }}><Link href={contactInfo.phoneHref} style={{ color: "#e8b86d", fontSize: "0.9rem", textDecoration: "none" }}>{contactInfo.phoneDisplay}</Link></div>
                  <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                     {[["fa-brands fa-facebook-f","https://www.facebook.com/share/1Cfzm1Fy4t/?mibextid=wwXIfr","Facebook"],["fa-brands fa-instagram","https://www.instagram.com/dg_property_/","Instagram"],["fa-brands fa-linkedin-in","https://www.linkedin.com/company/degennaro-property/","LinkedIn"]].map(([icon, href, label], i) => (
                        <Link key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit DG Property on ${label}`} style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, transition: "all 0.2s" }}>
                           <i className={icon} aria-hidden="true" />
                        </Link>
                     ))}
                  </div>
               </div>

               {/* Quick Links */}
               <div className="col-lg-2 col-md-3 col-6">
                  <h6 style={{ color: "#e8b86d", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>Company</h6>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                     {[["Home","/"],["About DG Property","/about_us_02"],["Meet the Team","/agent"],["FAQ","/faq"],["Contact","/contact"]].map(([title, href], i) => (
                        <li key={i} style={{ marginBottom: 10 }}>
                           <Link href={href} style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", textDecoration: "none" }}>{title}</Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Services */}
               <div className="col-lg-2 col-md-3 col-6">
                  <h6 style={{ color: "#e8b86d", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>Services</h6>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                     {[["Investment Sales","/investment-sales"],["Retail Leasing","/retail-leasing"],["Development Leasing","/development-leasing"]].map(([title, href], i) => (
                        <li key={i} style={{ marginBottom: 10 }}>
                           <Link href={href} style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", textDecoration: "none" }}>{title}</Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Listings */}
               <div className="col-lg-2 col-md-3 col-6">
                  <h6 style={{ color: "#e8b86d", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>Listings</h6>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                     {[["Office Space","/commercial-for-lease"],["Retail Space","/retail-properties"],["Industrial","/industrial-warehouse"],["Warehouses","/industrial-warehouse"],["Development Land","/development-land"],["Investment","/investment"]].map(([title, href], i) => (
                        <li key={i} style={{ marginBottom: 10 }}>
                           <Link href={href} style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", textDecoration: "none" }}>{title}</Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Legal */}
               <div className="col-lg-2 col-md-3 col-6">
                  <h6 style={{ color: "#e8b86d", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>Legal</h6>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                     {[["Privacy Policy","/privacy-policy"],["Terms & Conditions","/terms-and-conditions"],["Cookie Policy","/cookie-policy"],["Refund Policy","/refund-policy"],["FAQ","/faq"]].map(([title, href], i) => (
                        <li key={i} style={{ marginBottom: 10 }}>
                           <Link href={href} style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", textDecoration: "none" }}>{title}</Link>
                        </li>
                     ))}
                  </ul>
               </div>

            </div>

            {/* Divider + bottom bar */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)", marginTop: 56, padding: "24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
               <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.8rem", margin: 0 }}>
                     © {new Date().getFullYear()} De Gennaro Property. All rights reserved.
                     <span className="dg-footer-separator" aria-hidden="true">•</span>
                     <span data-cookie-settings-slot />
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.75rem", margin: 0, letterSpacing: "0.02em" }}>
                     Registration Number: 2022/651308/07
                     <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.78)", margin: "0 10px" }}>•</span>
                     PPRA Number: F152984
                  </p>
               </div>
               <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.75rem", margin: 0 }}>Johannesburg, South Africa</p>
            </div>
         </div>
      </footer>
   )
}

export default FooterFour
