"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Fancybox from "@/components/common/Fancybox"
import Link from "next/link"
import { contactInfo } from "@/data/contact-info"
import { fetchPublicProperties } from "@/utils/dashboardApi"

import offcanvasLogo from "@/assets/images/assets/logodg.png"

interface FeaturedProperty {
   id: number
   title: string
   listingType?: string
   price?: number
   featuredImage?: string | null
   gallery?: string[]
   suburb?: string
   city?: string
   province?: string
   address?: string
}

const getListingTag = (listingType?: string) => {
   if (listingType === "lease") return "TO LET"
   if (listingType === "investment") return "INVESTMENT"
   return "FOR SALE"
}

const formatPrice = (price?: number, listingType?: string) => {
   if (!price) return "Price on request"
   const formatted = `R ${Math.round(price).toLocaleString("en-ZA")}`
   return listingType === "lease" ? `${formatted}/m²` : formatted
}

const getLocationLabel = (property: FeaturedProperty) =>
   property.address ||
   [property.suburb, property.city, property.province].filter(Boolean).join(", ") ||
   "South Africa"

const Offcanvas = ({ offCanvas, setOffCanvas }: any) => {
   const [featuredListings, setFeaturedListings] = useState<FeaturedProperty[]>([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      setLoading(true)
      fetchPublicProperties({ featured: true, limit: 4, page: 1 })
         .then((res) => {
            setFeaturedListings(res.data?.properties || [])
         })
         .catch(() => {
            setFeaturedListings([])
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
                     <h4 className="title pb-25">Featured Listing </h4>
                     <div className="row">
                        {loading ? (
                           <div className="col-12">
                              <div className="text-center py-4">
                                 <div className="spinner-border" role="status" />
                                 <p className="pt-15 m0">Loading featured listings...</p>
                              </div>
                           </div>
                        ) : featuredListings.length === 0 ? (
                           <div className="col-12">
                              <div className="text-center py-4 px-3" style={{ background: "#f7f7f7", borderRadius: 16 }}>
                                 <p className="m0 fw-500 color-dark">No featured listings available.</p>
                                 <p className="m0 pt-10">Published properties marked as featured in the admin dashboard will show here.</p>
                              </div>
                           </div>
                        ) : (
                           featuredListings.map((item) => {
                              const galleryImages = [item.featuredImage, ...(item.gallery || [])].filter(Boolean) as string[]

                              return (
                                 <div key={item.id} className="col-12">
                                    <div className="listing-card-one shadow-none style-two mb-40">
                                       <div className="img-gallery">
                                          <div className="position-relative overflow-hidden">
                                             <div className="tag bg-white text-dark fw-500">{getListingTag(item.listingType)}</div>
                                             {item.featuredImage ? (
                                                <Link href={`/listing_details_06?id=${item.id}`} className="d-block">
                                                   {/* eslint-disable-next-line @next/next/no-img-element */}
                                                   <img
                                                      src={item.featuredImage}
                                                      className="w-100"
                                                      alt={item.title}
                                                      style={{ display: "block", aspectRatio: "1.45 / 1", objectFit: "cover" }}
                                                   />
                                                </Link>
                                             ) : (
                                                <Link
                                                   href={`/listing_details_06?id=${item.id}`}
                                                   className="d-flex align-items-center justify-content-center"
                                                   style={{ background: "#e8edf2", aspectRatio: "1.45 / 1" }}
                                                >
                                                   <i className="bi bi-building" style={{ fontSize: 42, color: "#a0aec0" }}></i>
                                                </Link>
                                             )}

                                             {galleryImages.length > 0 && (
                                                <div className="img-slider-btn">
                                                   {String(galleryImages.length).padStart(2, "0")} <i className="fa-regular fa-image"></i>
                                                   <Fancybox
                                                      options={{
                                                         Carousel: {
                                                            infinite: true,
                                                         },
                                                      }}
                                                   >
                                                      {galleryImages.map((image, index) => (
                                                         <a key={index} className="d-block" data-fancybox={`offcanvas-gallery-${item.id}`} href={image}></a>
                                                      ))}
                                                   </Fancybox>
                                                </div>
                                             )}
                                          </div>
                                       </div>
                                       <div className="property-info d-flex justify-content-between align-items-end pt-30">
                                          <div>
                                             <strong className="price fw-500 color-dark fs-3">{formatPrice(item.price, item.listingType)}</strong>
                                             <div className="address pt-5 m0">{getLocationLabel(item)}</div>
                                          </div>
                                          <Link href={`/listing_details_06?id=${item.id}`} className="btn-four mb-5"><i className="bi bi-arrow-up-right"></i></Link>
                                       </div>
                                    </div>
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
