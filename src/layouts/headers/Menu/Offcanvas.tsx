"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { contactInfo } from "@/data/contact-info"
import { fetchPublicFeaturedSlides } from "@/utils/dashboardApi"
import { resolveMediaUrl } from "@/utils/publicMedia"

import offcanvasLogo from "@/assets/images/assets/logodg.png"

interface Slide {
   id: number
   title?: string
   subtitle?: string
   status?: string
   imageUrl?: string
   linkUrl?: string
}

const statusLabel = (status?: string) => {
   if (!status) return ""
   return status.charAt(0).toUpperCase() + status.slice(1)
}

const Offcanvas = ({ offCanvas, setOffCanvas }: any) => {
   const [slides, setSlides] = useState<Slide[]>([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      setLoading(true)
      fetchPublicFeaturedSlides()
         .then((res) => {
            setSlides(Array.isArray(res.data) ? res.data.filter((s: Slide) => s.imageUrl) : [])
         })
         .catch(() => {
            setSlides([])
         })
         .finally(() => {
            setLoading(false)
         })
   }, [])

   return (
      <>
         <div className={`offcanvas offcanvas-end sidebar-nav ${offCanvas ? "show" : ""}`} id="sideNav">
            <div className="offcanvas-header">
               <div className="logo order-lg-0">
                  <Link href="/" className="d-flex align-items-center">
                     <Image src={offcanvasLogo} alt="DG logo" width={111} height={46} />
                  </Link>
               </div>
               <button onClick={() => setOffCanvas(false)} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="wrapper mt-60">
               <div className="d-flex flex-column h-100">
                  <div className="property-block">
                     <h4 className="title pb-25">Recent Deals</h4>
                     <div className="row">
                        {loading ? (
                           <div className="col-12">
                              <div className="text-center py-4">
                                 <div className="spinner-border" role="status" />
                                 <p className="pt-15 m0">Loading recent deals...</p>
                              </div>
                           </div>
                        ) : slides.length === 0 ? (
                           <div className="col-12">
                              <div className="text-center py-4 px-3" style={{ background: "#f7f7f7", borderRadius: 16 }}>
                                 <p className="m0 fw-500 color-dark">No recent deals available.</p>
                                 <p className="m0 pt-10">Featured slides added in the admin dashboard will show here.</p>
                              </div>
                           </div>
                        ) : (
                           slides.map((slide) => {
                              const badge = statusLabel(slide.status)
                              const card = (
                                 <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", background: "#0d1f2d", boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}>
                                    <div style={{ position: "relative", width: "100%", paddingTop: "125%" }}>
                                       {/* eslint-disable-next-line @next/next/no-img-element */}
                                       <img
                                          src={resolveMediaUrl(slide.imageUrl)}
                                          alt={slide.title || "Recent deal"}
                                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
                                       />
                                       {badge && (
                                          <span
                                             style={{
                                                position: "absolute", top: 14, left: 14,
                                                padding: "5px 14px", borderRadius: 6,
                                                fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
                                                color: "#fff",
                                                background: slide.status === "leased" ? "#6b46c1" : "#2f855a",
                                             }}
                                          >
                                             {badge}
                                          </span>
                                       )}
                                       {(slide.title || slide.subtitle) && (
                                          <div
                                             style={{
                                                position: "absolute", left: 0, right: 0, bottom: 0,
                                                padding: "50px 18px 16px",
                                                background: "linear-gradient(to top, rgba(13,31,45,0.85), rgba(13,31,45,0))",
                                                color: "#fff",
                                             }}
                                          >
                                             {slide.title && <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>{slide.title}</div>}
                                             {slide.subtitle && <div style={{ fontSize: 13, color: "#e0e6eb", marginTop: 4 }}>{slide.subtitle}</div>}
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              )

                              return (
                                 <div key={slide.id} className="col-12 mb-40">
                                    {slide.linkUrl ? (
                                       <Link href={slide.linkUrl} className="d-block" onClick={() => setOffCanvas(false)}>{card}</Link>
                                    ) : card}
                                 </div>
                              )
                           })
                        )}
                     </div>
                  </div>

                  <div className="address-block mt-50">
                     <h4 className="title pb-15">Our Address</h4>
                     <p>{contactInfo.locationName}<br />{contactInfo.fullAddress}</p>
                     <p>Urgent issue? call us at <br /><Link href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</Link></p>
                  </div>
                  <ul
                     className="style-none d-flex flex-wrap w-100 justify-content-between align-items-center social-icon pt-25 mt-auto">
                     <li><Link href="https://www.facebook.com/share/1Cfzm1Fy4t/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></Link></li>
                     <li><Link href="https://www.linkedin.com/company/degennaro-property/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                     <li><Link href="https://www.instagram.com/dg_property_/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></Link></li>
                  </ul>
               </div>
            </div>
         </div>
         <div onClick={() => setOffCanvas(false)} className={`offcanvas-backdrop fade ${offCanvas ? "show" : ""}`}></div>
      </>
   )
}

export default Offcanvas
