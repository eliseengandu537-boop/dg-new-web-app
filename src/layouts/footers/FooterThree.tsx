"use client"
import Image from "next/image"
import Link from "next/link"
import footer_data from "@/data/home-data/FooterData"
import { contactInfo } from "@/data/contact-info";

import footerLogo from "@/assets/images/assets/logodg.png"
import footerShape_1 from "@/assets/images/shape/shape_52.svg"

const FooterThree = () => {
   return (
      <div className="footer-three">
         <div className="container container-large">
            <div className="bg-wrapper position-relative z-1">
               <div className="row">
                  <div className="col-xl-3 mb-40 lg-mb-60">
                     <div className="footer-intro pe-xxl-5 pe-xl-3">
                        <div className="logo mb-15">
                           <Link href="/">
                              <Image src={footerLogo} alt="DG logo" width={120} height={50} />
                           </Link>
                        </div>
                        <p className="mb-45 lg-mb-30">Located in: {contactInfo.locationName}<br />Address: {contactInfo.fullAddress}</p>
                        <ul className="style-none d-flex align-items-center social-icon">
                           <li><Link href="https://www.facebook.com/share/1Cfzm1Fy4t/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></Link></li>
                           <li><Link href="https://www.linkedin.com/company/degennaro-property/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                           <li><Link href="https://www.instagram.com/dg_property_/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></Link></li>
                        </ul>
                        <Image src={footerShape_1} alt="" className="lazy-img ms-auto d-none d-xl-block" />
                     </div>
                  </div>

                  {footer_data.filter((items) => items.page == "home_4").map((item) => (
                     <div key={item.id} className="col-lg-2 col-md-6 mb-30">
                        <div className="footer-nav">
                           <h5 className="footer-title">{item.widget_title}</h5>
                           <ul className="footer-nav-link style-none">
                              {item.footer_link.map((li, i) => (
                                 <li key={i}><Link href={li.link}>{li.link_title}</Link></li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  ))}

                  <div className="col-xl-3 col-lg-4 col-md-6 mb-30">
                     <h5 className="footer-title">Newsletters</h5>
                     <p className="pt-5">Join & get important new regularly</p>
                     <form onSubmit={(e) => e.preventDefault()} className="newsletter-form position-relative">
                        <input type="email" placeholder="Enter your email" />
                        <button className="fw-500 fs-16 text-white tran3s">Send</button>
                     </form>
                     <span className="fs-14 opacity-75">We only send interesting and relevant emails.</span>
                  </div>
               </div>
            </div>

            <div className="bottom-footer">
               <div className="d-md-flex justify-content-center justify-content-md-between align-items-center">
                  <ul className="style-none bottom-nav d-flex justify-content-center">
                     <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                     <li><Link href="/contact">Contact Us</Link></li>
                  </ul>
                  <p className="mb-15 text-center text-lg-start fs-16 order-md-first">Copyright @2025 HOZN.</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FooterThree
