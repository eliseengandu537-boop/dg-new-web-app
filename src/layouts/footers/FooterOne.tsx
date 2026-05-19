import Image from "next/image"
import Link from "next/link"
import footer_data from "@/data/home-data/FooterData"
import { contactInfo } from "@/data/contact-info";

import footerLogo from "@/assets/images/assets/logodg.png"
import footerShape_1 from "@/assets/images/shape/shape_32.svg"
import footerShape_2 from "@/assets/images/shape/shape_33.svg"

const icon_1: [string, string][] = [
   ["fa-brands fa-facebook-f", "https://www.facebook.com/share/1Cfzm1Fy4t/?mibextid=wwXIfr"],
   ["fa-brands fa-linkedin-in", "https://www.linkedin.com/company/degennaro-property/"],
   ["fa-brands fa-instagram", "https://www.instagram.com/dg_property_/"],
]

const FooterOne = ({ style }: any) => {
   return (
      <div className={`footer-one ${style ? "dark-bg" : ""}`}>
         <div className="position-relative z-1">
            <div className="container">
               <div className="row justify-content-between">
                  <div className="col-lg-4">
                     <div className={`footer-intro ${style ? "position-relative z-1" : ""}`}>
                        <div className="bg-wrapper">
                           <div className="logo mb-20">
                              <Link href="/">
                                 <Image src={footerLogo} alt="DG logo" width={120} height={50} style={{ filter: "brightness(0) invert(1)" }} />
                              </Link>
                           </div>
                           <p className="mb-60 lg-mb-40 md-mb-20">{contactInfo.locationName}<br />{contactInfo.fullAddress}</p>
                           <h6>CONTACT</h6>
                           <Link href={contactInfo.emailHref} className={`email tran3s mb-70 lg-mb-50 ${style ? "font-garamond" : "fs-24 text-decoration-underline"}`} style={{ whiteSpace: "nowrap" }}>{contactInfo.emailDisplay}</Link>
                           <ul className="style-none d-flex align-items-center social-icon">
                              {icon_1.map((icon, i) => (
                                 <li key={i}><Link href={icon[1]} target="_blank" rel="noopener noreferrer"><i className={icon[0]}></i></Link></li>
                              ))}
                           </ul>
                        </div>
                        {style && <Image src={footerShape_1} alt="" className="lazy-img shapes shape_01" />}
                     </div>
                  </div>

                  <div className="col-lg-8">
                     <div className={`d-flex flex-wrap ${style ? "h-100" : ""}`}>
                        {footer_data.filter((items) => items.page === "home_1").map((item) => (
                           <div key={item.id} className={`footer-nav mt-100 lg-mt-80 ${item.widget_class}`}>
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
            </div>
            {style && <Image src={footerShape_2} alt="" className="lazy-img shapes shape_02" />}
         </div>
      </div>
   )
}

export default FooterOne
