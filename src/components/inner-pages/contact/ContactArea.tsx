"use client";

import Link from "next/link";
import Image from "next/image";
import { contactInfo } from "@/data/contact-info";
import ContactForm from "@/components/forms/ContactForm";

const quickContact = [
   {
      icon: "bi-envelope-fill",
      eyebrow: "Email",
      title: contactInfo.emailDisplay,
      note: "A good fit if you want to share a requirement in detail.",
      href: contactInfo.emailHref,
   },
   {
      icon: "bi-telephone-fill",
      eyebrow: "Call",
      title: contactInfo.phoneDisplay,
      note: "Available Monday to Friday, 8:00am to 5:00pm.",
      href: contactInfo.phoneHref,
   },
   {
      icon: "bi-geo-alt-fill",
      eyebrow: "Visit",
      title: contactInfo.locationName,
      note: contactInfo.fullAddress,
      href: "https://maps.google.com/?q=Bedford+Arcade,+59+Van+Buuren+Rd,+Bedfordview,+Johannesburg,+2007",
   },
];

const ContactArea = () => {
   return (
      <>
         <section
            style={{
               position: "relative",
               overflow: "hidden",
               background: "#102435",
               paddingTop: 170,
               paddingBottom: 110,
            }}
         >
            <Image
               src="/assets/images/media/78.jpg"
               alt=""
               fill
               priority
               sizes="100vw"
               quality={72}
               aria-hidden="true"
               style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div
               style={{
                  position: "absolute",
                  inset: 0,
                  background:
                     "linear-gradient(135deg, rgba(16,36,53,0.92) 0%, rgba(23,48,68,0.88) 55%, rgba(33,69,90,0.88) 100%)",
               }}
            />
            <div
               style={{
                  position: "absolute",
                  inset: 0,
                  background:
                     "radial-gradient(circle at top left, rgba(232,184,109,0.12), transparent 32%), radial-gradient(circle at bottom right, rgba(255,255,255,0.07), transparent 30%)",
               }}
            />
            <div
               style={{
                  position: "absolute",
                  top: 28,
                  left: "6%",
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
               }}
            />
            <div
               style={{
                  position: "absolute",
                  right: "-4%",
                  bottom: -30,
                  width: 260,
                  height: 260,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.04)",
               }}
            />

            <div className="container position-relative" style={{ zIndex: 1 }}>
               <div className="row align-items-center g-5">
                  <div className="col-lg-7">
                     <nav aria-label="Breadcrumb" style={{ marginBottom: 18 }}>
                        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: 8, flexWrap: "wrap", fontSize: 14 }}>
                           <li><Link href="/" style={{ color: "rgba(255,255,255,0.68)", textDecoration: "none" }}>Home</Link></li>
                           <li aria-hidden="true" style={{ color: "rgba(255,255,255,0.75)" }}>/</li>
                           <li aria-current="page" style={{ color: "#fff" }}>Contact</li>
                        </ol>
                     </nav>
                     <p
                        style={{
                           margin: "0 0 16px",
                           color: "#f2bf72",
                           fontSize: "0.78rem",
                           fontWeight: 700,
                           letterSpacing: "0.18em",
                           textTransform: "uppercase",
                        }}
                     >
                        Contact DG Property
                     </p>
                     <h1
                        style={{
                           margin: 0,
                           color: "#ffffff",
                           fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                           lineHeight: 1.08,
                           fontFamily: "var(--site-font-family)",
                           fontWeight: 700,
                        }}
                     >
                        Friendly property advice,
                        <br />
                        clear next steps.
                     </h1>
                     <p
                        style={{
                           margin: "22px 0 0",
                           maxWidth: 600,
                           color: "rgba(255,255,255,0.78)",
                           fontSize: "1rem",
                           lineHeight: 1.85,
                        }}
                     >
                        Whether you are leasing, investing, selling, or just exploring your options,
                        our team is here to make the conversation easy and helpful.
                     </p>
                  </div>

                  <div className="col-lg-5">
                     <div
                        style={{
                           background: "rgba(255,255,255,0.12)",
                           border: "1px solid rgba(255,255,255,0.16)",
                           backdropFilter: "blur(12px)",
                           borderRadius: 28,
                           padding: "28px 28px 24px",
                           boxShadow: "0 22px 50px rgba(5, 18, 30, 0.18)",
                        }}
                     >
                        <p
                           style={{
                              margin: "0 0 8px",
                              color: "rgba(255,255,255,0.62)",
                              fontSize: "0.76rem",
                              fontWeight: 700,
                              letterSpacing: "0.16em",
                              textTransform: "uppercase",
                           }}
                        >
                           Quick help
                        </p>
                        <h2
                           style={{
                              margin: 0,
                              color: "#ffffff",
                              fontSize: "1.6rem",
                              lineHeight: 1.25,
                              fontWeight: 700,
                           }}
                        >
                           Connect With Us
                        </h2>
                        <div style={{ display: "grid", gap: 12, marginTop: 22 }}>
                           {quickContact.slice(0, 2).map((item) => (
                              <Link
                                 key={item.eyebrow}
                                 href={item.href}
                                 style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 14,
                                    textDecoration: "none",
                                    background: "rgba(255,255,255,0.09)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: 18,
                                    padding: "16px 18px",
                                 }}
                              >
                                 <span
                                    style={{
                                       width: 46,
                                       height: 46,
                                       borderRadius: "50%",
                                       background: "#888e7d",
                                       color: "#fff",
                                       display: "inline-flex",
                                       alignItems: "center",
                                       justifyContent: "center",
                                       flexShrink: 0,
                                    }}
                                 >
                                    <i className={`bi ${item.icon}`}></i>
                                 </span>
                                 <span style={{ display: "block" }}>
                                    <span
                                       style={{
                                          display: "block",
                                          color: "rgba(255,255,255,0.75)",
                                          fontSize: "0.72rem",
                                          letterSpacing: "0.14em",
                                          textTransform: "uppercase",
                                          marginBottom: 4,
                                       }}
                                    >
                                       {item.eyebrow}
                                    </span>
                                    <span
                                       style={{
                                          display: "block",
                                          color: "#ffffff",
                                          fontSize: "1rem",
                                          fontWeight: 600,
                                          marginBottom: 4,
                                       }}
                                    >
                                       {item.title}
                                    </span>
                                    <span
                                       style={{
                                          display: "block",
                                          color: "rgba(255,255,255,0.65)",
                                          fontSize: "0.84rem",
                                          lineHeight: 1.6,
                                       }}
                                    >
                                       {item.note}
                                    </span>
                                 </span>
                              </Link>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section style={{ background: "#f6f8fb", paddingBottom: 90 }}>
            <div className="container" style={{ marginTop: -48, position: "relative", zIndex: 2 }}>
               <div style={{ marginTop: 34 }}>
                  <div
                     style={{
                        background: "#ffffff",
                        borderRadius: 30,
                        border: "1px solid #e8edf1",
                        boxShadow: "0 22px 60px rgba(14, 24, 37, 0.08)",
                        overflow: "hidden",
                     }}
                  >
                     <div className="row g-0">
                        <div className="col-lg-7">
                           <div style={{ padding: "38px 34px 34px" }} className="friendly-contact-shell">
                              <ContactForm />
                           </div>
                        </div>

                        <div className="col-lg-5" style={{ background: "#f9fbfc", borderLeft: "1px solid #e8edf1" }}>
                           <div style={{ padding: "38px 34px 34px", height: "100%", display: "flex", flexDirection: "column" }}>
                              <p
                                 style={{
                                    margin: "0 0 10px",
                                    color: "#9b4618",
                                    fontSize: "0.74rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.16em",
                                    textTransform: "uppercase",
                                 }}
                              >
                                 Visit the office
                              </p>
                              <h3
                                 style={{
                                    margin: 0,
                                    color: "#152637",
                                    fontSize: "1.6rem",
                                    lineHeight: 1.25,
                                    fontWeight: 700,
                                 }}
                              >
                                 Prefer to meet in person?
                              </h3>
                              <p
                                 style={{
                                    margin: "14px 0 22px",
                                    color: "#617082",
                                    fontSize: "0.95rem",
                                    lineHeight: 1.8,
                                    maxWidth: 420,
                                 }}
                              >
                                 We are based in Bedfordview and happy to guide you through your next
                                 commercial property step in a calm, straightforward conversation.
                              </p>

                              <div
                                 style={{
                                    background: "#ffffff",
                                    border: "1px solid #e7edf2",
                                    borderRadius: 20,
                                    padding: "18px 18px 16px",
                                    marginBottom: 20,
                                 }}
                              >
                                 <p style={{ margin: "0 0 8px", color: "#152637", fontWeight: 700 }}>
                                    {contactInfo.locationName}
                                 </p>
                                 <p style={{ margin: "0 0 14px", color: "#617082", fontSize: "0.92rem", lineHeight: 1.7 }}>
                                    {contactInfo.fullAddress}
                                 </p>
                                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                    <Link
                                       href={quickContact[2].href}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: 8,
                                          textDecoration: "none",
                                          background: "#102435",
                                          color: "#ffffff",
                                          borderRadius: 999,
                                          padding: "10px 16px",
                                          fontSize: "0.86rem",
                                          fontWeight: 600,
                                       }}
                                    >
                                       <i className="bi bi-map"></i>
                                       <span>Open directions</span>
                                    </Link>
                                    <Link
                                       href={contactInfo.phoneHref}
                                       style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: 8,
                                          textDecoration: "none",
                                          background: "#edf4f7",
                                          color: "#152637",
                                          borderRadius: 999,
                                          padding: "10px 16px",
                                          fontSize: "0.86rem",
                                          fontWeight: 600,
                                       }}
                                    >
                                       <i className="bi bi-telephone"></i>
                                       <span>Call now</span>
                                    </Link>
                                 </div>
                              </div>

                              <div className="contact-map-frame" style={{ borderRadius: 22, minHeight: 320, boxShadow: "0 10px 30px rgba(14,24,37,.08)", marginTop: "auto", background: "linear-gradient(135deg,#e9eff2,#dbe6eb)", padding: 28, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                                 <i className="bi bi-geo-alt-fill" aria-hidden="true" style={{ color: "#62695a", fontSize: 42, marginBottom: 14 }} />
                                 <h3 style={{ color: "#152637", fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>Visit DG Property</h3>
                                 <address style={{ color: "#425160", fontStyle: "normal", lineHeight: 1.7, maxWidth: 360 }}>{contactInfo.fullAddress}</address>
                                 <Link href={quickContact[2].href} target="_blank" rel="noopener noreferrer" style={{ background: "#62695a", color: "#fff", padding: "12px 22px", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
                                    Open in Google Maps
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <div className="text-center" style={{ padding: "0 0 40px", background: "#f6f8fb" }}>
            <Link
               href="/login"
               style={{
                  fontSize: "0.75rem",
                  color: "#596675",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                  borderBottom: "1px solid #d7dee5",
                  paddingBottom: 2,
               }}
            >
               Admin Login
            </Link>
         </div>

         <style jsx global>{`
            .friendly-contact-shell .friendly-contact-form h3 {
               margin: 0 0 8px;
               color: #152637;
               font-size: 1.7rem;
               font-weight: 700;
               line-height: 1.2;
            }

            .friendly-contact-shell .friendly-contact-form .form-intro {
               margin: 0 0 28px;
               color: #617082;
               font-size: 0.95rem;
               line-height: 1.8;
               max-width: 520px;
            }

            .friendly-contact-shell .friendly-contact-form .input-group-meta label {
               display: block;
               margin-bottom: 8px;
                  color: #556270;
               font-size: 0.8rem;
               font-weight: 700;
               letter-spacing: 0.08em;
               text-transform: uppercase;
            }

            .friendly-contact-shell .friendly-contact-form input,
            .friendly-contact-shell .friendly-contact-form textarea {
               width: 100%;
               border: 1px solid #dde5ec;
               background: #f8fafb;
               border-radius: 18px;
               padding: 16px 18px;
               font-size: 0.95rem;
               color: #152637;
               transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
            }

            .friendly-contact-shell .friendly-contact-form input {
               min-height: 58px;
            }

            .friendly-contact-shell .friendly-contact-form textarea {
               min-height: 148px;
               resize: vertical;
            }

            .friendly-contact-shell .friendly-contact-form input:focus,
            .friendly-contact-shell .friendly-contact-form textarea:focus {
               outline: none;
               background: #ffffff;
               border-color: #d77d39;
               box-shadow: 0 0 0 4px rgba(215, 125, 57, 0.12);
            }

            .friendly-contact-shell .friendly-contact-form .form_error {
               margin: 8px 0 0;
               color: #c4504d;
               font-size: 0.82rem;
            }

            .friendly-contact-shell .friendly-contact-form .btn-nine {
               min-height: 58px;
               border-radius: 999px !important;
               background: linear-gradient(135deg, #102435 0%, #23445b 100%);
               border: none;
               box-shadow: 0 16px 30px rgba(16, 36, 53, 0.16);
               font-size: 0.86rem;
               font-weight: 700 !important;
               letter-spacing: 0.08em;
            }

            .friendly-contact-shell .friendly-contact-form .btn-nine span {
               color: #ffffff;
            }

            .contact-map-frame iframe {
               border: 0;
               min-height: 320px;
            }

            @media (max-width: 991px) {
               .friendly-contact-shell .friendly-contact-form h3 {
                  font-size: 1.5rem;
               }

               .friendly-contact-shell .friendly-contact-form .form-intro {
                  margin-bottom: 24px;
               }
            }

            @media (max-width: 767px) {
               .friendly-contact-shell .friendly-contact-form h3 {
                  font-size: 1.35rem;
               }

               .contact-map-frame iframe {
                  min-height: 280px;
               }
            }
         `}</style>
      </>
   );
};

export default ContactArea;
