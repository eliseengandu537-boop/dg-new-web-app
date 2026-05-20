import Image from "next/image";

const bioParagraphs = [
   "Michela De Gennaro is a dynamic entrepreneur and visionary leader, recognized for her impact in the property and business sectors. As Director of DG Property, she brings a powerful combination of strategic insight, innovation, and hands-on leadership to every venture she leads.",
   "A passionate founder and mentor, Michela is dedicated to empowering others while driving sustainable business success. Her work reflects a strong commitment to excellence, collaboration, and forward-thinking solutions within a competitive global landscape.",
   "Michela's influence has been widely acknowledged, having been named a Top Woman Entrepreneur finalist in 2024 and recognized among the Global 200 Women Power Leaders for 2025. Based in Johannesburg, she continues to shape industries, inspire emerging leaders, and champion entrepreneurial success both locally and internationally.",
];

const highlights = [
   { icon: "fa-light fa-user", title: "Strategic Leader", text: "Driving growth through vision and execution." },
   { icon: "fa-light fa-handshake", title: "Mentor & Advocate", text: "Empowering people and building lasting impact." },
   { icon: "fa-light fa-globe", title: "Global Recognition", text: "Honoured among the world's top women leaders." },
];

const logos = [
   { src: "/assets/images/logo/mics1.png", alt: "Standard Bank Top Women Awards", width: 1440, height: 671, dark: true },
   { src: "/assets/images/logo/mics2.png", alt: "White Page International", width: 1080, height: 1080, dark: false },
   { src: "/assets/images/logo/mics.png", alt: "Call Her Boss", width: 1080, height: 1080, dark: false },
];

const MeetCeo = () => {
   return (
      <section
         className="mt-120 xl-mt-80 mb-120 xl-mb-80"
         style={{ background: "linear-gradient(180deg, rgba(248,246,241,0.9) 0%, #ffffff 45%, #f6f8fb 100%)" }}
      >
         <div className="container py-80">
            <div
               className="position-relative overflow-hidden"
               style={{
                  background: "#ffffff",
                  borderRadius: 32,
                  padding: "clamp(26px, 4vw, 54px)",
                  boxShadow: "0 24px 80px rgba(15,31,46,0.08)",
                  border: "1px solid rgba(13,31,45,0.08)",
               }}
            >
               <div className="row g-4 g-xl-5 align-items-center">
                  {/* LEFT — bio + highlights */}
                  <div className="col-lg-7">
                     <div className="upper-title" style={{ letterSpacing: 2.4, color: "#c79a4b", fontSize: 12, fontWeight: 700 }}>
                        MEET OUR CEO
                     </div>
                     <div style={{ height: 3, width: 64, background: "linear-gradient(90deg, #c79a4b, #e7c98d)", borderRadius: 999, margin: "14px 0 22px" }} />
                     <h2 className="font-garamond" style={{ fontSize: "clamp(2.3rem, 4.2vw, 3.7rem)", lineHeight: 1.02, marginBottom: 8, color: "#0f1f2e" }}>
                        Michela De Gennaro
                     </h2>
                     <div style={{ color: "#7b8794", fontSize: 16, marginBottom: 20 }}>{"Founder & Director, DG Property"}</div>
                     <p style={{ color: "#0f1f2e", fontWeight: 700, fontSize: "1.05rem", marginBottom: 18 }}>
                        A leader driven by vision. A partner in your success.
                     </p>
                     {bioParagraphs.map((paragraph) => (
                        <p key={paragraph} style={{ fontSize: "0.97rem", lineHeight: 1.85, color: "#52606d", marginBottom: 16 }}>
                           {paragraph}
                        </p>
                     ))}
                     <div
                        style={{
                           background: "rgba(248,246,241,0.85)",
                           border: "1px solid rgba(13,31,45,0.07)",
                           borderRadius: 18,
                           padding: "22px 14px",
                           marginTop: 26,
                        }}
                     >
                        <div className="row">
                           {highlights.map((item) => (
                              <div key={item.title} className="col-12 col-sm-4 mb-3 mb-sm-0" style={{ padding: "0 16px" }}>
                                 <i className={item.icon} style={{ fontSize: 22, color: "#c79a4b" }} />
                                 <div style={{ fontWeight: 700, color: "#0f1f2e", fontSize: 14, margin: "10px 0 4px" }}>{item.title}</div>
                                 <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "#7b8794" }}>{item.text}</div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* RIGHT — CEO photo, shown in full */}
                  <div className="col-lg-5">
                     <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 60px rgba(15,31,46,0.18)" }}>
                        <Image
                           src="/assets/images/media/mics.jpeg"
                           alt="Michela De Gennaro"
                           width={720}
                           height={1280}
                           className="lazy-img"
                           style={{ width: "100%", height: "auto", display: "block" }}
                        />
                     </div>
                  </div>
               </div>

               {/* FEATURED IN — 3 logos shown in full */}
               <div style={{ borderTop: "1px solid rgba(13,31,45,0.1)", marginTop: 48, paddingTop: 34 }}>
                  <div
                     className="text-center"
                     style={{ letterSpacing: 2.4, color: "#888e7d", fontSize: 12, fontWeight: 700, textTransform: "uppercase", marginBottom: 26 }}
                  >
                     Featured In
                  </div>
                  <div className="row g-3 g-md-4 justify-content-center">
                     {logos.map((logo) => (
                        <div key={logo.src} className="col-sm-6 col-md-4">
                           <div
                              style={{
                                 height: 180,
                                 borderRadius: 18,
                                 background: logo.dark ? "#0e1c2b" : "#ffffff",
                                 border: logo.dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(13,31,45,0.1)",
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 padding: "26px 28px",
                              }}
                           >
                              <Image
                                 src={logo.src}
                                 alt={logo.alt}
                                 width={logo.width}
                                 height={logo.height}
                                 className="lazy-img"
                                 style={{ width: "100%", height: "auto", maxHeight: 128, objectFit: "contain" }}
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default MeetCeo;
