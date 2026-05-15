"use client"
import { useEffect, useState } from "react"
import { savePropertyToFavorites, removePropertyFromFavorites, fetchSavedProperties } from "@/utils/dashboardApi"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { API_ROOT } from "@/utils/api"
import AgencyFormOne from "@/components/forms/AgencyFormOne"
import MediaGallery from "./MediaGallery"
import Sidebar from "../listing-details-1/Sidebar"
import Review from "@/components/inner-pages/agency/agency-details/Review"
import NiceSelect from "@/ui/NiceSelect"
import { COMMERCIAL_FIELD_LABELS } from "@/data/commercialPropertyConfig"

const CATEGORY_LABELS: Record<string, string> = {
   commercial_office: "Commercial Office",
   retail: "Retail Property",
   industrial_warehouse: "Industrial Warehouse",
   development_land: "Development Land",
   mixed_use: "Mixed-Use Development",
   investment: "Investment Property",
   fuel_station: "Fuel Station",
}

const LISTING_TYPE_LABELS: Record<string, string> = {
   sale: "FOR SALE",
   lease: "FOR LEASE",
   investment: "INVESTMENT",
}

const ListingDetailsSixArea = () => {
   const params = useSearchParams()
   const id = params.get("id")

   const [property, setProperty] = useState<any>(null)
   const [loading, setLoading] = useState(true)
   const [notFound, setNotFound] = useState(false)
   const [isFavorite, setIsFavorite] = useState(false)
   const [favoriteLoading, setFavoriteLoading] = useState(false)

   useEffect(() => {
      if (!id) { setNotFound(true); setLoading(false); return }
      axios.get(`${API_ROOT}/properties/public/${id}`)
         .then(res => setProperty(res.data.property || res.data))
         .catch(() => setNotFound(true))
         .finally(() => setLoading(false))
   }, [id])

   // Fetch favorite status
   useEffect(() => {
      if (!id) return;
      fetchSavedProperties()
         .then(res => {
            const favs = res.data?.properties || [];
            setIsFavorite(favs.some((p: any) => String(p.id) === String(id)));
         })
         .catch(() => setIsFavorite(false));
   }, [id])

   const handleFavorite = async () => {
      if (!id || favoriteLoading) return;
      setFavoriteLoading(true);
      try {
         if (isFavorite) {
            await removePropertyFromFavorites(Number(id));
            setIsFavorite(false);
         } else {
            await savePropertyToFavorites(Number(id));
            setIsFavorite(true);
         }
      } catch {}
      setFavoriteLoading(false);
   }

   if (loading) return (
      <div className="listing-details-one theme-details-one mt-200 xl-mt-150 pb-150">
         <div className="container text-center pt-80"><p className="fs-20">Loading property...</p></div>
      </div>
   )

   if (notFound || !property) return (
      <div className="listing-details-one theme-details-one mt-200 xl-mt-150 pb-150">
         <div className="container text-center pt-80">
            <h4>Property not found</h4>
            <Link href="/listing_07" className="btn-nine mt-20">Browse All Listings</Link>
         </div>
      </div>
   )

   const cd = property.categoryDetails || {}
   const filledFields = Object.entries(cd)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => ({
         key,
         value,
         label:
            COMMERCIAL_FIELD_LABELS[key] ||
            key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
      }))
   const address = [property.suburb, property.city, property.province].filter(Boolean).join(", ") || "South Africa"
   const fullAddress = [property.address, property.suburb, property.city, property.province, "South Africa"].filter(Boolean).join(", ")
   const mapSrc = `https://maps.google.com/maps?width=600&height=450&hl=en&q=${encodeURIComponent(fullAddress)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`

   const broker = property.brokers?.[0]
   const agentInfo = broker ? { type: "broker" as const, planName: "", data: broker } : null

   const videoLink: string = property.virtualTourLink || ""
   const ytMatch = videoLink.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
   const videoId = ytMatch ? ytMatch[1] : null

   return (
      <>
         <div className="listing-details-one theme-details-one mt-200 xl-mt-150 pb-150 xl-mb-120">
            <div className="container">
               {/* Modern Details Header */}
               <div className="row align-items-center mb-4 pb-2" style={{ borderBottom: "1.5px solid #f0f0f0" }}>
                  <div className="col-lg-8 col-md-7 mb-3 mb-lg-0">
                     <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                           <span style={{ fontWeight: 700, fontSize: 36, color: "#1a1a2e", lineHeight: 1 }}>{property.title}</span>
                           <span style={{ background: "#f5f5f5", color: "#2563eb", fontWeight: 700, fontSize: 13, borderRadius: 6, padding: "4px 14px", letterSpacing: 1, textTransform: "uppercase" }}>
                              {LISTING_TYPE_LABELS[property.listingType] || property.listingType?.toUpperCase()}
                           </span>
                           <span style={{ background: "#fff", color: "#222", border: "1px solid #eee", fontWeight: 500, fontSize: 13, borderRadius: 6, padding: "4px 14px", letterSpacing: 1, textTransform: "uppercase" }}>
                              {CATEGORY_LABELS[property.category] || property.category}
                           </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginTop: 6 }}>
                           <span style={{ color: "#3d8c6f", fontWeight: 500, fontSize: 16 }}><i className="bi bi-geo-alt-fill me-1"></i> {address}</span>
                           <span style={{ color: "#aaa", fontSize: 15 }}>Ref: <span style={{ color: "#222", fontWeight: 600 }}>{property.referenceNumber}</span></span>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-5 text-lg-end text-md-end">
                     <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                        <span style={{ fontSize: 32, fontWeight: 800, color: "#1a1a2e" }}>
                           {property.price ? `R ${Number(property.price).toLocaleString()}` : "Price on Request"}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                           <button
                              onClick={handleFavorite}
                              disabled={favoriteLoading}
                              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                              style={{
                                 background: isFavorite ? "#f0b95e" : "#fff",
                                 color: isFavorite ? "#fff" : "#222",
                                 border: isFavorite ? "none" : "1.5px solid #eee",
                                 borderRadius: 50,
                                 width: 44,
                                 height: 44,
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 fontSize: 22,
                                 boxShadow: isFavorite ? "0 2px 8px rgba(240,185,94,0.12)" : "none",
                                 transition: "all 0.2s",
                                 cursor: favoriteLoading ? "not-allowed" : "pointer"
                              }}
                           >
                              <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                           </button>
                           <button
                              style={{ background: "#fff", border: "1.5px solid #eee", borderRadius: 50, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}
                              title="Share"
                           >
                              <i className="fa-sharp fa-regular fa-share-nodes"></i>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

               <MediaGallery
                  featuredImage={property.featuredImage}
                  gallery={property.gallery || []}
                  title={property.title}
               />

               <div className="row pt-80 lg-pt-50">
                  <div className="col-xl-8">

                     <div className="property-overview bottom-line-dark pb-40 mb-60">
                        <h4 className="mb-20">Overview</h4>
                        {property.description
                           ? <p className="fs-20 lh-lg">{property.description}</p>
                           : <p className="fs-20 lh-lg text-muted">No description provided.</p>}
                     </div>

                     {filledFields.length > 0 && (
                        <div className="property-feature-accordion bottom-line-dark pb-40 mb-60">
                           <h4 className="mb-20">Property Features</h4>
                           <p className="fs-20 lh-lg">{CATEGORY_LABELS[property.category]}: key specifications.</p>
                           <div className="accordion-style-two grey-bg mt-45">
                              <div className="accordion" id="accordionPropDetails">
                                 <div className="accordion-item">
                                    <h2 className="accordion-header">
                                       <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                          data-bs-target="#collapseDetails" aria-expanded="true">
                                          {CATEGORY_LABELS[property.category]} Details
                                       </button>
                                    </h2>
                                    <div id="collapseDetails" className="accordion-collapse collapse show" data-bs-parent="#accordionPropDetails">
                                       <div className="accordion-body">
                                          <div className="feature-list-two">
                                             <ul className="style-none d-flex flex-wrap justify-content-between">
                                                {filledFields.map((f, i) => {
                                                   const display = typeof f.value === "boolean" ? (f.value ? "Yes" : "No") : String(f.value)
                                                   return (
                                                      <li key={i}>
                                                         <span>{f.label} </span>
                                                         <span className="fw-500 color-dark">{display}</span>
                                                      </li>
                                                   )
                                                })}
                                             </ul>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}

                     {property.amenities?.length > 0 && (
                        <div className="property-amenities bottom-line-dark pb-40 mb-60">
                           <h4 className="mb-20">Amenities</h4>
                           <ul className="style-none d-flex flex-wrap justify-content-between list-style-two">
                              {property.amenities.map((a: string, i: number) => (
                                 <li key={i}>{a}</li>
                              ))}
                           </ul>
                        </div>
                     )}

                     {videoLink && (
                        <div className="property-video-tour bottom-line-dark pb-40 mb-60">
                           <h4 className="mb-40">Video Tour</h4>
                           <div className="bg-white shadow4 border-20 p-15">
                              {videoId ? (
                                 <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                                    <iframe
                                       src={`https://www.youtube.com/embed/${videoId}`}
                                       style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                                       allowFullScreen
                                    />
                                 </div>
                              ) : (
                                 <a href={videoLink} target="_blank" rel="noopener noreferrer" className="btn-nine text-uppercase">
                                    <i className="fa-thin fa-play me-2"></i>Watch Video Tour
                                 </a>
                              )}
                           </div>
                        </div>
                     )}

                     {property.floorPlans?.length > 0 && (
                        <div className="property-floor-plan bottom-line-dark pb-40 mb-60">
                           <h4 className="mb-40">Floor Plans</h4>
                           <div className="bg-dot p-30">
                              <div id="floor-plan-6" className="carousel slide">
                                 <div className="carousel-indicators">
                                    {property.floorPlans.map((_: any, i: number) => (
                                       <button key={i} type="button" data-bs-target="#floor-plan-6"
                                          data-bs-slide-to={String(i)} className={i === 0 ? "active" : ""}
                                          aria-label={`Slide ${i + 1}`} />
                                    ))}
                                 </div>
                                 <div className="carousel-inner">
                                    {property.floorPlans.map((fp: string, i: number) => (
                                       <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                                          <img src={fp} alt={`Floor Plan ${i + 1}`} className="w-100"
                                             style={{ maxHeight: 500, objectFit: "contain" }} />
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}

                     {property.nearby?.length > 0 && (
                        <div className="property-nearby bottom-line-dark pb-40 mb-60">
                           <h4 className="mb-20">What&apos;s Nearby</h4>
                           <ul className="style-none d-flex flex-wrap justify-content-between nearby-list-item">
                              {property.nearby.map((place: { name: string; distance: string }, i: number) => (
                                 <li key={i}>{place.name}:<span className="fw-500 color-dark">{place.distance}</span></li>
                              ))}
                           </ul>
                        </div>
                     )}

                     <div className="property-location bottom-line-dark pb-60 mb-60">
                        <h4 className="mb-40">Location</h4>
                        <p className="fs-18 mb-20">{fullAddress}</p>                        <div className="wrapper">
                           <div className="map-banner overflow-hidden">
                              <div className="gmap_canvas h-100 w-100">
                                 <iframe src={mapSrc} width="600" height="450"
                                    style={{ border: 0 }} allowFullScreen loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade" className="w-100 h-100" />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="review-panel-one bottom-line-dark pb-40 mb-60">
                        <div className="position-relative z-1">
                           <div className="d-sm-flex justify-content-between align-items-center mb-10">
                              <h4 className="m0 xs-pb-30">Reviews</h4>
                              <NiceSelect className="nice-select rounded-0"
                                 options={[
                                    { value: "01", text: "Newest" },
                                    { value: "02", text: "Best Seller" },
                                    { value: "03", text: "Best Match" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={() => {}}
                                 name=""
                                 placeholder="" />
                           </div>
                           <Review propertyId={property.id} />
                        </div>
                     </div>

                     <div className="review-form">
                        <h4 className="mb-20">Leave A Reply</h4>
                        <p className="fs-20 lh-lg pb-15">
                           <a href="/login"
                              className="color-dark fw-500 text-decoration-underline">Sign in</a>
                           {" "}to post your comment or signup if you don&apos;t have any account.
                        </p>
                        <div className="bg-dot p-30">
                           <AgencyFormOne />
                        </div>
                     </div>

                  </div>
                  <Sidebar agentInfo={agentInfo} propertyTitle={property?.title} />
               </div>
            </div>
         </div>
      </>
   )
}

export default ListingDetailsSixArea
