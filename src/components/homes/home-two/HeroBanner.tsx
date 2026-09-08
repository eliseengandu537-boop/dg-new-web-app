"use client"
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import DropdownTwo from "@/components/search-dropdown/home-dropdown/DropdownTwo";

const HERO_SLIDES = [
   "/assets/images/assets/back1.jpg",
   "/assets/images/assets/p1.jpeg",
   "/assets/images/assets/p2.jpeg",
   "/assets/images/assets/ba3.jpg",
   "/assets/images/assets/back3.jpg",
];

const SLIDE_DURATION_MS = 4000;
const FADE_DURATION_MS = 1800;

const HeroBanner = () => {
   const [activeSlide, setActiveSlide] = useState(0);
   const [previousSlide, setPreviousSlide] = useState<number | null>(null);
   const [readySlides, setReadySlides] = useState(() => HERO_SLIDES.map(() => false));
   const imageRefs = useRef<Array<HTMLImageElement | null>>([]);
   const [isPaused, setIsPaused] = useState(false);
   const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

   const markReady = useCallback((index: number) => {
      setReadySlides(current => current[index]
         ? current
         : current.map((ready, slideIndex) => slideIndex === index || ready));
   }, []);

   // Cached images may have completed before React attaches the load handler.
   useEffect(() => {
      let cancelled = false;
      imageRefs.current.forEach((image, index) => {
         if (!image?.complete || !image.naturalWidth) return;
         void image.decode().then(() => {
            if (!cancelled) markReady(index);
         }).catch(() => {});
      });
      return () => { cancelled = true; };
   }, [markReady]);

   const showSlide = useCallback((index: number) => {
      if (index === activeSlide || previousSlide !== null || !readySlides[index]) return;
      // Keep the outgoing photo fully opaque beneath the incoming photo.
      setPreviousSlide(prefersReducedMotion ? null : activeSlide);
      setActiveSlide(index);
   }, [activeSlide, previousSlide, readySlides, prefersReducedMotion]);

   useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

      updatePreference();
      mediaQuery.addEventListener?.("change", updatePreference);
      return () => mediaQuery.removeEventListener?.("change", updatePreference);
   }, []);

   useEffect(() => {
      if (previousSlide === null) return;
      const timeoutId = window.setTimeout(() => setPreviousSlide(null), FADE_DURATION_MS);
      return () => window.clearTimeout(timeoutId);
   }, [previousSlide]);

   useEffect(() => {
      if (isPaused || prefersReducedMotion || previousSlide !== null) return;
      const intervalId = window.setInterval(() => {
         // A slow or failed image must neither blank the hero nor stop ready slides.
         for (let offset = 1; offset < HERO_SLIDES.length; offset += 1) {
            const nextSlide = (activeSlide + offset) % HERO_SLIDES.length;
            if (readySlides[nextSlide]) {
               showSlide(nextSlide);
               break;
            }
         }
      }, SLIDE_DURATION_MS);
      return () => window.clearInterval(intervalId);
   }, [activeSlide, isPaused, prefersReducedMotion, previousSlide, readySlides, showSlide]);

   return (
      <>
         {/* ── HERO ──────────────────────────────────────────────────── */}
         <div className="dg-home-hero" style={{ position: "relative", minHeight: "min(88vh, 820px)", display: "flex", flexDirection: "column" }}>

            {/* Background slideshow */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, background: "#0d1f2d" }}>
               {HERO_SLIDES.map((slide, index) => (
                  <div
                     key={slide}
                     className={`dg-home-hero-slide ${activeSlide === index ? "is-active" : previousSlide === index ? "is-previous" : ""}`}
                     style={{
                        // Inline layer styles also apply before client hydration.
                        position: "absolute",
                        inset: 0,
                        zIndex: activeSlide === index ? 2 : previousSlide === index ? 1 : 0,
                        opacity: activeSlide === index || previousSlide === index ? 1 : 0,
                        transitionProperty: "opacity",
                        transitionTimingFunction: "ease-in-out",
                        transitionDuration: activeSlide === index && !prefersReducedMotion ? `${FADE_DURATION_MS}ms` : "0ms",
                     }}
                     aria-hidden="true"
                  >
                     <Image
                        ref={image => { imageRefs.current[index] = image; }}
                        src={slide}
                        alt=""
                        fill
                        priority={index === 0}
                        loading={index === 0 ? undefined : "eager"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        sizes="100vw"
                        quality={76}
                        onLoad={event => {
                           if (event.currentTarget.naturalWidth > 0) markReady(index);
                        }}
                        className="dg-home-hero-image"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                     />
                  </div>
               ))}
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
                  paddingTop: 140,
                  paddingBottom: 32,
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
                           fontSize: 10,
                           fontWeight: 700,
                           letterSpacing: 2.6,
                           textTransform: "uppercase",
                           padding: "6px 15px",
                           borderRadius: 4,
                           marginBottom: 20,
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
                           fontSize: "clamp(2.8rem, 7vw, 6rem)",
                           fontWeight: 800,
                           lineHeight: 1.02,
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
                           width: 60,
                           height: 2,
                           background: "linear-gradient(90deg, #f0b95e, #888e7d)",
                           borderRadius: 2,
                           margin: "20px 0",
                        }}
                     />

                     {/* Subtitle */}
                     <p
                        style={{
                           color: "rgba(255,255,255,0.85)",
                           fontSize: "clamp(14px, 1.5vw, 17px)",
                           lineHeight: 1.65,
                           maxWidth: 500,
                           marginBottom: 30,
                        }}
                     >
                        Discover premium commercial property opportunities across South Africa, with expert services in leasing, investment sales, and development all under one roof.
                     </p>

                     {/* CTAs */}
                     <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 42 }}>
                        <Link
                           href="/properties"
                           style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              background: "linear-gradient(90deg, #888e7d 0%, #6b7263 100%)",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: 14,
                              padding: "13px 26px",
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

            {/* Slide controls are hidden; automatic background rotation stays active. */}
            <div
               hidden
               style={{
                  position: "absolute",
                  bottom: 24,
                  right: 28,
                  zIndex: 3,
                  display: "none",
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
                     onClick={() => showSlide(i)}
                     disabled={!readySlides[i] || previousSlide !== null}
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
            @media (max-width: 767px) {
               .dg-home-hero {
                  min-height: auto !important;
               }

               .dg-home-hero-content {
                  padding-top: 118px !important;
                  padding-bottom: 38px !important;
               }
            }
         `}</style>

      </>
   )
}

export default HeroBanner
