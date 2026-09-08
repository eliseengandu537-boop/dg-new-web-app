import Image from "next/image"
import Link from "next/link"
import footer_data from "@/data/home-data/FooterData"
import { contactInfo } from "@/data/contact-info";

import footerLogo from "@/assets/images/assets/logodg.png"
import footerShape_1 from "@/assets/images/shape/shape_32.svg"
import footerShape_2 from "@/assets/images/shape/shape_33.svg"

const icon_1: [string, string, string][] = [
   ["fa-brands fa-facebook-f", "https://www.facebook.com/share/1Cfzm1Fy4t/?mibextid=wwXIfr", "Facebook"],
   ["fa-brands fa-linkedin-in", "https://www.linkedin.com/company/degennaro-property/", "LinkedIn"],
   ["fa-brands fa-instagram", "https://www.instagram.com/dg_property_/", "Instagram"],
]

const FooterOne = ({ style }: any) => {
   return (
      <footer className={`footer-one dg-footer-compact ${style ? "dark-bg" : ""}`}>
         <div className="position-relative z-1">
            <div className="container">
               <div className="row justify-content-between">
                  <div className="col-lg-4">
                     <div className={`footer-intro ${style ? "position-relative z-1" : ""}`}>
                        <div className="bg-wrapper">
                           <div className="logo mb-15">
                              <Link href="/">
                                 <Image src={footerLogo} alt="DG logo" width={100} height={42} style={{ filter: "brightness(0) invert(1)" }} />
                              </Link>
                           </div>
                           <p className="mb-30 md-mb-20">{contactInfo.locationName}<br />{contactInfo.fullAddress}</p>
                           <h6>CONTACT</h6>
                           <Link href={contactInfo.emailHref} className={`email tran3s mb-10 ${style ? "font-garamond" : "fs-24 text-decoration-underline"}`} style={{ whiteSpace: "nowrap" }}>{contactInfo.emailDisplay}</Link>
                           <Link href={contactInfo.phoneHref} className={`email tran3s mb-20 ${style ? "font-garamond" : "fs-24 text-decoration-underline"}`} style={{ whiteSpace: "nowrap" }}>{contactInfo.phoneDisplay}</Link>
                           <ul className="style-none d-flex align-items-center social-icon">
                              {icon_1.map((icon, i) => (
                                 <li key={i}><Link href={icon[1]} target="_blank" rel="noopener noreferrer" aria-label={`Visit DG Property on ${icon[2]}`}><i className={icon[0]} aria-hidden="true"></i></Link></li>
                              ))}
                           </ul>
                        </div>
                        {style && <Image src={footerShape_1} alt="" aria-hidden="true" className="lazy-img shapes shape_01" />}
                     </div>
                  </div>

                  <div className="col-lg-8">
                     <div className={`d-flex flex-wrap ${style ? "h-100" : ""}`}>
                        {footer_data.filter((items) => items.page === "home_1").map((item) => (
                           <div key={item.id} className={`footer-nav mt-50 lg-mt-40 ${item.widget_class}`}>
                              <h5 className={`footer-title ${style ? "text-white" : ''}`}>{item.widget_title}</h5>
                              <ul className="footer-nav-link style-none">
                                 {item.footer_link.map((li, i) => (
                                    <li key={i}><Link href={li.link}>{li.link_title}</Link></li>
                                 ))}
                              </ul>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", marginTop: 24, padding: "16px 0" }}>
                  <p className="m0 text-center fs-16">
                     Copyright © {new Date().getFullYear()} De Gennaro Property. All rights reserved.
                     <span className="dg-footer-separator" aria-hidden="true">•</span>
                     <span data-cookie-settings-slot />
                  </p>
               </div>
            </div>
            {style && <Image src={footerShape_2} alt="" aria-hidden="true" className="lazy-img shapes shape_02" />}
         </div>
      </footer>
   )
}

export default FooterOne
