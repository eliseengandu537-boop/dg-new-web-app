"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Slider from "react-slick"
import { fetchPublicFeaturedSlides } from "@/utils/dashboardApi"
import { resolveMediaUrl } from "@/utils/publicMedia"

interface Slide {
   id: number
   title?: string
   subtitle?: string
   status?: string
   imageUrl?: string
   linkUrl?: string
}

const sliderSettings = {
   dots: true,
   arrows: false,
   infinite: true,
   speed: 600,
   slidesToShow: 4,
   slidesToScroll: 1,
   autoplay: true,
   autoplaySpeed: 2000,
   pauseOnHover: true,
   responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
   ],
}

const statusLabel = (status?: string) => {
   if (!status) return ""
   return status.charAt(0).toUpperCase() + status.slice(1)
}

const SlideCard = ({ slide }: { slide: Slide }) => {
   const badge = statusLabel(slide.status)
   const inner = (
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", background: "#0d1f2d" }}>
         <div style={{ position: "relative", width: "100%", paddingTop: "125%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
               src={resolveMediaUrl(slide.imageUrl)}
               alt={slide.title || "Featured property"}
               style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
            />
            {badge && (
               <span
                  style={{
                     position: "absolute", top: 16, left: 16,
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
                     padding: "60px 28px 24px",
                     background: "linear-gradient(to top, rgba(13,31,45,0.85), rgba(13,31,45,0))",
                     color: "#fff",
                  }}
               >
                  {slide.title && <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>{slide.title}</div>}
                  {slide.subtitle && <div style={{ fontSize: 14, color: "#e0e6eb", marginTop: 4 }}>{slide.subtitle}</div>}
               </div>
            )}
         </div>
      </div>
   )

   if (slide.linkUrl) {
      return <Link href={slide.linkUrl} className="d-block tran3s">{inner}</Link>
   }
   return inner
}

const Property = () => {
   const [slides, setSlides] = useState<Slide[]>([])
   const [loading, setLoading] = useState(true)
   const sliderRef = useRef<Slider | null>(null)

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

   // Nothing to show and not loading — hide the whole section.
   if (!loading && slides.length === 0) return null

   return (
      <div style={{ background: "#f8f9fa", paddingTop: 90, paddingBottom: 90, marginTop: 0 }}>
         <div className="container">

            <div className="d-flex align-items-end justify-content-between mb-50 wow fadeInUp" style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: 24 }}>
               <div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#f0b95e", marginBottom: 10 }}>Recent Deals</div>
                  <h2 className="font-garamond m0" style={{ fontSize: "2.4rem", color: "#0d1f2d", lineHeight: 1.15 }}>Featured Properties</h2>
                  <p className="m0 mt-2" style={{ fontSize: 16, color: "#6b7280" }}>
                     Take a look at some of the recent properties successfully sold and leased by the DG Property team.
                  </p>
               </div>
               {slides.length > 1 && (
                  <div className="d-none d-md-flex align-items-center gap-2">
                     <button
                        onClick={() => sliderRef.current?.slickPrev()}
                        aria-label="Previous slide"
                        style={arrowBtn}
                     >
                        <i className="bi bi-arrow-left"></i>
                     </button>
                     <button
                        onClick={() => sliderRef.current?.slickNext()}
                        aria-label="Next slide"
                        style={arrowBtn}
                     >
                        <i className="bi bi-arrow-right"></i>
                     </button>
                  </div>
               )}
            </div>

            {loading ? (
               <div className="text-center py-5">
                  <div className="spinner-border" role="status" />
                  <p className="mt-3" style={{ fontSize: 16, color: "#6b7280" }}>Loading featured properties...</p>
               </div>
            ) : (
               <div className="featured-slides-wrapper" style={{ margin: "0 -10px" }}>
                  <Slider {...sliderSettings} ref={sliderRef}>
                     {slides.map((slide) => (
                        <div key={slide.id} style={{ padding: "0 10px" }}>
                           <SlideCard slide={slide} />
                        </div>
                     ))}
                  </Slider>
               </div>
            )}

         </div>
      </div>
   )
}

const arrowBtn: React.CSSProperties = {
   width: 44, height: 44, borderRadius: "50%",
   border: "1px solid #0d1f2d", background: "#fff", color: "#0d1f2d",
   display: "inline-flex", alignItems: "center", justifyContent: "center",
   fontSize: 16, cursor: "pointer",
}

export default Property
