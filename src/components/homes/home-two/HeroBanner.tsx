"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import DropdownTwo from "@/components/search-dropdown/home-dropdown/DropdownTwo";

const stats = [
   { value: 250, prefix: "R", suffix: "M+", label: "Transactions Completed" },
   { value: 18, suffix: "+", label: "Commercial Specialists" },
   { value: 7, suffix: "+", label: "Years Experience" },
   { value: 3, label: "Asset Classes" },
];

const HeroBanner = () => {
   const heroSlides = [
      "/assets/images/assets/back1.jpg",
      "/assets/images/assets/p1.jpeg",
      "/assets/images/assets/p2.jpeg",
      "/assets/images/assets/ba3.jpg",
      "/assets/images/assets/back3.jpg",
   ];
   const [activeSlide, setActiveSlide] = useState(0);

   useEffect(() => {
      const intervalId = window.setInterval(() => {
         setActiveSlide((prev) => (prev + 1) % heroSlides.length);
      }, 4000);
      return () => window.clearInterval(intervalId);
   }, [heroSlides.length]);

   return (
      <>
         {/* ── HERO ──────────────────────────────────────────────────── */}
         <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

            {/* Background slideshow */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
               {heroSlides.map((slide, i) => (
                  <div
                     key={i}
                     style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${slide})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: activeSlide === i ? 1 : 0,
                        transition: "opacity 1.2s ease-in-out",
                     }}
                  />
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
               className="container"
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
                           href="/listing_07"
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
                  gap: 8,
               }}
            >
               {heroSlides.map((_, i) => (
                  <button
                     key={i}
                     onClick={() => setActiveSlide(i)}
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

         {/* ── STATS STRIP ───────────────────────────────────────────── */}
         <div
            style={{
               background: "#0d1f2d",
               padding: "30px 0",
            }}
         >
            <div className="container">
               <div className="row gy-4">
                  {stats.map((stat, i) => (
                     <div className="col-6 col-md-3" key={i}>
                        <div
                           style={{
                              textAlign: "center",
                              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
                              padding: "4px 0",
                           }}
                        >
                           <div style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
                              <CountUp
                                 start={0}
                                 end={stat.value}
                                 duration={2.2}
                                 separator=","
                                 prefix={stat.prefix || ""}
                                 suffix={stat.suffix || ""}
                              />
                           </div>
                           <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: 1.2, textTransform: "uppercase", marginTop: 4 }}>
                              {stat.label}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

      </>
   )
}

export default HeroBanner
