"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropdownTwo from "@/components/search-dropdown/home-dropdown/DropdownTwo";

const HERO_SLIDES = [
   "/assets/images/assets/back1.jpg",
   "/assets/images/assets/p1.jpeg",
   "/assets/images/assets/p2.jpeg",
   "/assets/images/assets/ba3.jpg",
   "/assets/images/assets/back3.jpg",
];

const HeroBanner = () => {
   const [activeSlide, setActiveSlide] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
   const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

   useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

      updatePreference();
      mediaQuery.addEventListener?.("change", updatePreference);
      return () => mediaQuery.removeEventListener?.("change", updatePreference);
   }, []);

   useEffect(() => {
      if (isPaused || prefersReducedMotion) return;

      const intervalId = window.setInterval(() => {
         setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 4000);
      return () => window.clearInterval(intervalId);
   }, [isPaused, prefersReducedMotion]);

   return (
      <>
         {/* ── HERO ──────────────────────────────────────────────────── */}
         <div className="dg-home-hero" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

            {/* Background slideshow */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
               <Image
                  key={HERO_SLIDES[activeSlide]}
                  src={HERO_SLIDES[activeSlide]}
                  alt=""
                  fill
                  priority={activeSlide === 0}
                  sizes="100vw"
                  quality={76}
                  aria-hidden="true"
                  className="dg-home-hero-image"
                  style={{ objectFit: "cover", objectPosition: "center" }}
               />
            </div>

            {/* Deep gradient overlay */}
            <div
               style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(120deg, rgba(8,22,40,0.78) 0%, rgba(8,22,40,0.55) 60%, rgba(8,22,40,0.30) 100%)",
                  zIndex: 1,
               }}
            />

            {/* Content */}
            <div
               className="container dg-home-hero-content"
               style={{
                  position: "relative",
                  zIndex: 2,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingTop: 160,
                  paddingBottom: 40,
               }}
            >
               <div className="row">
                  <div className="col-xxl-9 col-xl-9 col-lg-10">

                     {/* Gold badge */}
                     <div
                        style={{
                           display: "inline-block",
                           background: "rgba(255,255,255,0.10)",
                           color: "#f0b95e",
                           fontSize: 11,
                           fontWeight: 700,
                           letterSpacing: 3,
                           textTransform: "uppercase",
                           padding: "7px 18px",
                           borderRadius: 4,
                           marginBottom: 28,
                           border: "1px solid rgba(240,185,94,0.40)",
                        }}
                     >
                        Brokering In Excellence
                     </div>

                     {/* Main heading */}
                     <h1
                        className="font-garamond"
                        style={{
                           color: "#ffffff",
                           fontSize: "clamp(2.8rem, 6vw, 5rem)",
                           fontWeight: 800,
                           lineHeight: 1.05,
                           letterSpacing: "-0.5px",
                           marginBottom: 0,
                        }}
                     >
                        DE GENNARO{" "}
                        <span style={{ color: "#f0b95e" }}>*</span>
                        <br />
                        PROPERTY
                     </h1>

                     {/* Divider */}
                     <div
                        style={{
                           width: 70,
                           height: 3,
                           background: "linear-gradient(90deg, #f0b95e, #888e7d)",
                           borderRadius: 2,
                           margin: "28px 0",
                        }}
                     />

                     {/* Subtitle */}
                     <p
                        style={{
                           color: "rgba(255,255,255,0.85)",
                           fontSize: "clamp(15px, 2vw, 18px)",
                           lineHeight: 1.75,
                           maxWidth: 520,
                           marginBottom: 42,
                        }}
                     >
                        Discover premium commercial property opportunities across South Africa, with expert services in leasing, investment sales, and development all under one roof.
                     </p>

                     {/* CTAs */}
                     <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, marginBottom: 60 }}>
                        <Link
                           href="/properties"
                           style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              background: "linear-gradient(90deg, #888e7d 0%, #6b7263 100%)",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: 15,
                              padding: "15px 32px",
                              borderRadius: 50,
                              textDecoration: "none",
                              letterSpacing: 0.4,
                              boxShadow: "0 8px 24px rgba(136,142,125,0.45)",
                           }}
                        >
                           View Properties
                           <i className="bi bi-arrow-up-right" style={{ fontSize: 17 }} />
                        </Link>

                     </div>

                     {/* Search bar */}
                     <DropdownTwo />
                  </div>
               </div>
            </div>

            {/* Slide indicators */}
            <div
               style={{
                  position: "absolute",
                  bottom: 32,
                  right: 40,
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
               }}
            >
               <button
                  type="button"
                  onClick={() => setIsPaused((paused) => !paused)}
                  aria-label={isPaused ? "Play background slideshow" : "Pause background slideshow"}
                  title={isPaused ? "Play slideshow" : "Pause slideshow"}
                  style={{
                     width: 32,
                     height: 32,
                     marginRight: 4,
                     borderRadius: "50%",
                     border: "1px solid rgba(255,255,255,0.45)",
                     background: "rgba(13,31,45,0.55)",
                     color: "#fff",
                     display: "inline-flex",
                     alignItems: "center",
                     justifyContent: "center",
                     cursor: "pointer",
                  }}
               >
                  <i className={`bi ${isPaused ? "bi-play-fill" : "bi-pause-fill"}`} aria-hidden="true" />
               </button>
               {HERO_SLIDES.map((_, i) => (
                  <button
                     key={i}
                     type="button"
                     onClick={() => setActiveSlide(i)}
                     aria-label={`Show background image ${i + 1} of ${HERO_SLIDES.length}`}
                     aria-current={activeSlide === i ? "true" : undefined}
                     style={{
                        width: activeSlide === i ? 28 : 8,
                        height: 8,
                        borderRadius: 4,
                        border: "none",
                        background: activeSlide === i ? "#f0b95e" : "rgba(255,255,255,0.40)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        padding: 0,
                     }}
                  />
               ))}
            </div>
         </div>

         <style jsx>{`
            .dg-home-hero-image {
               animation: hero-image-fade 0.75s ease-out both;
            }

            @keyframes hero-image-fade {
               from { opacity: 0.35; transform: scale(1.01); }
               to { opacity: 1; transform: scale(1); }
            }

            @media (max-width: 767px) {
               .dg-home-hero {
                  min-height: auto !important;
               }

               .dg-home-hero-content {
                  padding-top: 138px !important;
                  padding-bottom: 48px !important;
               }
            }

            @media (prefers-reduced-motion: reduce) {
               .dg-home-hero-image {
                  animation: none;
               }
            }
         `}</style>

      </>
   )
}

export default HeroBanner
