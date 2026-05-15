import Image from "next/image";

const bioParagraphs = [
   "Michela De Gennaro is a dynamic entrepreneur and visionary leader, recognized for her impact in the property and business sectors. As Director of DG Property, she brings a powerful combination of strategic insight, innovation, and hands-on leadership to every venture she leads.",
   "A passionate founder and mentor, Michela is dedicated to empowering others while driving sustainable business success. Her work reflects a strong commitment to excellence, collaboration, and forward-thinking solutions within a competitive global landscape.",
   "Michela's influence has been widely acknowledged, having been named a Top Woman Entrepreneur finalist in 2024 and recognized among the Global 200 Women Power Leaders for 2025. Based in Johannesburg, she continues to shape industries, inspire emerging leaders, and champion entrepreneurial success both locally and internationally.",
];

const MeetCeo = () => {
   return (
      <section
         className="mt-120 xl-mt-80 mb-120 xl-mb-80"
         style={{
            background:
               "linear-gradient(180deg, rgba(248,246,241,0.9) 0%, #ffffff 42%, #f6f8fb 100%)",
         }}
      >
         <div className="container py-80">
            <div
               className="position-relative overflow-hidden"
               style={{
                  background: "#ffffff",
                  borderRadius: 32,
                  padding: "clamp(28px, 5vw, 56px)",
                  boxShadow: "0 24px 80px rgba(15,31,46,0.08)",
                  border: "1px solid rgba(13,31,45,0.08)",
               }}
            >
               <div
                  style={{
                     position: "absolute",
                     top: -120,
                     right: -100,
                     width: 320,
                     height: 320,
                     borderRadius: "50%",
                     background:
                        "radial-gradient(circle, rgba(136,142,125,0.16) 0%, rgba(136,142,125,0) 72%)",
                     pointerEvents: "none",
                  }}
               />

               <div className="row g-4 g-xl-5 align-items-stretch position-relative">
                  <div className="col-xl-7">
                     <div className="h-100 d-flex flex-column justify-content-center pe-xl-4">
                        <div
                           className="upper-title mb-20"
                           style={{
                              letterSpacing: 2.4,
                              color: "#888e7d",
                              fontSize: 12,
                              fontWeight: 700,
                           }}
                        >
                           Meet Our CEO
                        </div>
                        <h2
                           className="font-garamond"
                           style={{
                              fontSize: "clamp(2.4rem, 5vw, 4.3rem)",
                              lineHeight: 0.98,
                              marginBottom: 18,
                              color: "#0f1f2e",
                           }}
                        >
                           Michela De Gennaro
                        </h2>
                        <div
                           style={{
                              height: 3,
                              width: 72,
                              background: "linear-gradient(90deg, #888e7d, #d5aa63)",
                              borderRadius: 999,
                              marginBottom: 30,
                           }}
                        />
                        <div
                           style={{
                              background: "rgba(248,246,241,0.9)",
                              borderRadius: 24,
                              padding: "clamp(22px, 3vw, 34px)",
                              border: "1px solid rgba(13,31,45,0.08)",
                           }}
                        >
                           {bioParagraphs.map((paragraph, index) => (
                              <p
                                 key={paragraph}
                                 style={{
                                    fontSize: "clamp(1rem, 1.4vw, 1.08rem)",
                                    lineHeight: 1.9,
                                    color: "#44576a",
                                    margin: index === bioParagraphs.length - 1 ? 0 : "0 0 20px",
                                 }}
                              >
                                 {paragraph}
                              </p>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-5">
                     <div
                        className="h-100"
                        style={{
                           background: "linear-gradient(180deg, #152738 0%, #1e3447 100%)",
                           borderRadius: 28,
                           padding: "clamp(22px, 3vw, 34px)",
                           boxShadow: "0 28px 60px rgba(15,31,46,0.18)",
                        }}
                     >
                        <div
                           style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "8px 14px",
                              borderRadius: 999,
                              background: "rgba(255,255,255,0.08)",
                              color: "#f4d28c",
                              fontSize: 12,
                              fontWeight: 700,
                              letterSpacing: 1.6,
                              textTransform: "uppercase",
                              marginBottom: 18,
                           }}
                        >
                           Recognition
                        </div>

                        <h4
                           style={{
                              color: "#ffffff",
                              fontSize: "clamp(1.6rem, 2.8vw, 2.15rem)",
                              lineHeight: 1.2,
                              marginBottom: 12,
                           }}
                        >
                           Leadership recognised across respected platforms.
                        </h4>

                        <p
                           style={{
                              color: "rgba(255,255,255,0.72)",
                              fontSize: 15,
                              lineHeight: 1.8,
                              marginBottom: 24,
                           }}
                        >
                           A curated snapshot of the business and leadership recognition connected to Michela
                           De Gennaro&apos;s work and influence.
                        </p>

                        <div className="d-flex flex-wrap gap-2 mb-25">
                           {["2024 Finalist", "2025 Global Recognition", "Johannesburg Based"].map((item) => (
                              <span
                                 key={item}
                                 style={{
                                    padding: "9px 14px",
                                    borderRadius: 999,
                                    background: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#ffffff",
                                    fontSize: 12,
                                    fontWeight: 600,
                                    letterSpacing: 0.2,
                                 }}
                              >
                                 {item}
                              </span>
                           ))}
                        </div>

                        <div className="row g-3">
                           <div className="col-12">
                              <div
                                 style={{
                                    minHeight: 190,
                                    borderRadius: 24,
                                    background: "linear-gradient(135deg, #102132 0%, #213a52 100%)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "24px 22px",
                                 }}
                              >
                                 <Image
                                    src="/assets/images/logo/mics1.png"
                                    alt="Top Women Awards recognition"
                                    width={520}
                                    height={180}
                                    className="lazy-img"
                                    style={{
                                       width: "100%",
                                       height: "auto",
                                       maxHeight: 120,
                                       objectFit: "contain",
                                    }}
                                 />
                              </div>
                           </div>

                           <div className="col-sm-6">
                              <div
                                 style={{
                                    minHeight: 210,
                                    borderRadius: 24,
                                    background: "linear-gradient(180deg, #fff7ce 0%, #fff0a4 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "18px 16px",
                                 }}
                              >
                                 <Image
                                    src="/assets/images/logo/mics.png"
                                    alt="Call Her Boss recognition artwork"
                                    width={280}
                                    height={280}
                                    className="lazy-img"
                                    style={{
                                       width: "100%",
                                       height: "auto",
                                       maxHeight: 180,
                                       objectFit: "contain",
                                    }}
                                 />
                              </div>
                           </div>

                           <div className="col-sm-6">
                              <div
                                 style={{
                                    minHeight: 210,
                                    borderRadius: 24,
                                    background: "linear-gradient(180deg, #eef6fb 0%, #dbe9f2 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "18px 16px",
                                 }}
                              >
                                 <Image
                                    src="/assets/images/logo/mics2.png"
                                    alt="White Page International logo"
                                    width={260}
                                    height={260}
                                    className="lazy-img"
                                    style={{
                                       width: "100%",
                                       height: "auto",
                                       maxHeight: 145,
                                       objectFit: "contain",
                                    }}
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default MeetCeo;
