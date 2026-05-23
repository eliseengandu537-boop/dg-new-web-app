import Link from "next/link";

interface Props {
   title: string;
   eyebrow?: string;
   description?: string;
   lastUpdated?: string;
}

const LegalHero = ({ title, eyebrow = "Legal", description, lastUpdated }: Props) => {
   return (
      <section
         style={{
            position: "relative",
            overflow: "hidden",
            backgroundImage:
               "linear-gradient(135deg, rgba(13,31,45,0.96) 0%, rgba(22,44,62,0.92) 55%, rgba(33,69,90,0.90) 100%)",
            paddingTop: 170,
            paddingBottom: 100,
         }}
      >
         <div
            style={{
               position: "absolute",
               inset: 0,
               background:
                  "radial-gradient(circle at 12% 18%, rgba(232,184,109,0.16), transparent 32%), radial-gradient(circle at 88% 82%, rgba(255,255,255,0.06), transparent 35%)",
            }}
         />
         <div
            style={{
               position: "absolute",
               top: 36,
               left: "6%",
               width: 200,
               height: 200,
               borderRadius: "50%",
               border: "1px solid rgba(232,184,109,0.12)",
            }}
         />
         <div
            style={{
               position: "absolute",
               right: "-5%",
               bottom: -40,
               width: 280,
               height: 280,
               borderRadius: "50%",
               background: "rgba(255,255,255,0.03)",
            }}
         />

         <div className="container position-relative" style={{ zIndex: 1 }}>
            <div className="row justify-content-center text-center">
               <div className="col-lg-10">
                  <span
                     style={{
                        display: "inline-block",
                        padding: "8px 18px",
                        borderRadius: 999,
                        background: "rgba(232,184,109,0.12)",
                        border: "1px solid rgba(232,184,109,0.35)",
                        color: "#f0b95e",
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        marginBottom: 28,
                     }}
                  >
                     {eyebrow}
                  </span>

                  <h1
                     className="font-garamond"
                     style={{
                        margin: 0,
                        color: "#ffffff",
                        fontSize: "clamp(2.4rem, 5.2vw, 4.2rem)",
                        lineHeight: 1.08,
                        fontWeight: 500,
                     }}
                  >
                     {title}
                  </h1>

                  <div
                     style={{
                        width: 80,
                        height: 2,
                        background: "linear-gradient(90deg, transparent, #e8b86d, transparent)",
                        margin: "26px auto 0",
                     }}
                  />

                  {description && (
                     <p
                        style={{
                           margin: "26px auto 0",
                           maxWidth: 640,
                           color: "rgba(255,255,255,0.74)",
                           fontSize: "1.02rem",
                           lineHeight: 1.85,
                        }}
                     >
                        {description}
                     </p>
                  )}

                  {lastUpdated && (
                     <p
                        style={{
                           margin: "20px 0 0",
                           color: "rgba(232,184,109,0.80)",
                           fontSize: "0.78rem",
                           fontWeight: 600,
                           letterSpacing: "0.14em",
                           textTransform: "uppercase",
                        }}
                     >
                        Last updated: {lastUpdated}
                     </p>
                  )}

                  <ul
                     className="d-inline-flex align-items-center justify-content-center"
                     style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "34px 0 0",
                        gap: 10,
                     }}
                  >
                     <li>
                        <Link
                           href="/"
                           style={{
                              color: "rgba(255,255,255,0.62)",
                              fontSize: "0.85rem",
                              textDecoration: "none",
                           }}
                        >
                           Home
                        </Link>
                     </li>
                     <li style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.85rem" }}>/</li>
                     <li style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.85rem" }}>{eyebrow}</li>
                     <li style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.85rem" }}>/</li>
                     <li style={{ color: "#f0b95e", fontSize: "0.85rem", fontWeight: 600 }}>{title}</li>
                  </ul>
               </div>
            </div>
         </div>
      </section>
   );
};

export default LegalHero;
