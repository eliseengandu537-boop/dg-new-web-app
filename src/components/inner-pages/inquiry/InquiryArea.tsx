"use client";

import Link from "next/link";
import InquiryForm from "@/components/forms/InquiryForm";
import { contactInfo } from "@/data/contact-info";

const InquiryArea = () => {
   return (
      <>
         <section className="dg-inquiry-hero">
            <div className="dg-inquiry-hero__overlay" />
            <div className="container position-relative" style={{ zIndex: 1 }}>
               <div className="row align-items-center g-5">
                  <div className="col-lg-7">
                     <p className="dg-inquiry-hero__eyebrow">Send an inquiry</p>
                     <h1 className="dg-inquiry-hero__title">
                        Tell us what you need.
                        <br />
                        We&apos;ll take it from here.
                     </h1>
                     <p className="dg-inquiry-hero__lead">
                        Leasing commercial space, exploring an investment, selling a property or just
                        scoping out the market? Use the form below and the right person at DG Property
                        will come back to you with clear next steps.
                     </p>
                  </div>

                  <div className="col-lg-5">
                     <div className="dg-inquiry-hero__card">
                        <p className="dg-inquiry-hero__card-eyebrow">Prefer to talk?</p>
                        <h2>Reach the office directly</h2>
                        <div className="dg-inquiry-hero__contacts">
                           <Link href={contactInfo.phoneHref} className="dg-inquiry-hero__contact">
                              <span className="dg-inquiry-hero__contact-icon">
                                 <i className="bi bi-telephone-fill"></i>
                              </span>
                              <span>
                                 <span className="dg-inquiry-hero__contact-eyebrow">Call</span>
                                 <span className="dg-inquiry-hero__contact-value">{contactInfo.phoneDisplay}</span>
                                 <span className="dg-inquiry-hero__contact-note">Mon to Fri, 8am to 5pm</span>
                              </span>
                           </Link>
                           <Link href={contactInfo.emailHref} className="dg-inquiry-hero__contact">
                              <span className="dg-inquiry-hero__contact-icon">
                                 <i className="bi bi-envelope-fill"></i>
                              </span>
                              <span>
                                 <span className="dg-inquiry-hero__contact-eyebrow">Email</span>
                                 <span className="dg-inquiry-hero__contact-value">{contactInfo.emailDisplay}</span>
                                 <span className="dg-inquiry-hero__contact-note">Replies within one business day</span>
                              </span>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="dg-inquiry-body">
            <div className="container">
               <div className="dg-inquiry-shell">
                  <div className="dg-inquiry-shell__main">
                     <InquiryForm />
                  </div>
               </div>
            </div>
         </section>

         <style jsx global>{`
            .dg-inquiry-hero {
               position: relative;
               overflow: hidden;
               background-image: linear-gradient(135deg, rgba(16, 36, 53, 0.92) 0%, rgba(23, 48, 68, 0.88) 55%, rgba(33, 69, 90, 0.88) 100%),
                  url(/assets/images/media/78.jpg);
               background-size: cover;
               background-position: center;
               padding: 170px 0 110px;
            }
            .dg-inquiry-hero__overlay {
               position: absolute;
               inset: 0;
               background:
                  radial-gradient(circle at top left, rgba(232, 184, 109, 0.12), transparent 32%),
                  radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.07), transparent 30%);
            }
            .dg-inquiry-hero__eyebrow {
               margin: 0 0 16px;
               color: #f2bf72;
               font-size: 0.78rem;
               font-weight: 700;
               letter-spacing: 0.18em;
               text-transform: uppercase;
            }
            .dg-inquiry-hero__title {
               margin: 0;
               color: #fff;
               font-size: clamp(2.2rem, 4.5vw, 4rem);
               line-height: 1.08;
               font-family: var(--site-font-family);
               font-weight: 700;
            }
            .dg-inquiry-hero__lead {
               margin: 22px 0 0;
               max-width: 620px;
               color: rgba(255, 255, 255, 0.78);
               font-size: 1rem;
               line-height: 1.85;
            }
            .dg-inquiry-hero__card {
               background: rgba(255, 255, 255, 0.12);
               border: 1px solid rgba(255, 255, 255, 0.16);
               backdrop-filter: blur(12px);
               border-radius: 28px;
               padding: 28px 28px 24px;
               box-shadow: 0 22px 50px rgba(5, 18, 30, 0.18);
            }
            .dg-inquiry-hero__card h2 {
               margin: 0;
               color: #fff;
               font-size: 1.6rem;
               line-height: 1.25;
               font-weight: 700;
            }
            .dg-inquiry-hero__card-eyebrow {
               margin: 0 0 8px;
               color: rgba(255, 255, 255, 0.62);
               font-size: 0.76rem;
               font-weight: 700;
               letter-spacing: 0.16em;
               text-transform: uppercase;
            }
            .dg-inquiry-hero__contacts {
               display: grid;
               gap: 12px;
               margin-top: 22px;
            }
            .dg-inquiry-hero__contact {
               display: flex;
               align-items: flex-start;
               gap: 14px;
               text-decoration: none;
               background: rgba(255, 255, 255, 0.09);
               border: 1px solid rgba(255, 255, 255, 0.12);
               border-radius: 18px;
               padding: 16px 18px;
            }
            .dg-inquiry-hero__contact-icon {
               width: 46px;
               height: 46px;
               border-radius: 50%;
               background: #888e7d;
               color: #fff;
               display: inline-flex;
               align-items: center;
               justify-content: center;
               flex-shrink: 0;
            }
            .dg-inquiry-hero__contact-eyebrow {
               display: block;
               color: rgba(255, 255, 255, 0.58);
               font-size: 0.72rem;
               letter-spacing: 0.14em;
               text-transform: uppercase;
               margin-bottom: 4px;
            }
            .dg-inquiry-hero__contact-value {
               display: block;
               color: #fff;
               font-size: 1rem;
               font-weight: 600;
               margin-bottom: 4px;
            }
            .dg-inquiry-hero__contact-note {
               display: block;
               color: rgba(255, 255, 255, 0.65);
               font-size: 0.84rem;
               line-height: 1.6;
            }

            .dg-inquiry-body {
               background: #f6f8fb;
               padding-bottom: 90px;
            }
            .dg-inquiry-shell {
               margin-top: -48px;
               position: relative;
               z-index: 2;
               background: #fff;
               border-radius: 30px;
               border: 1px solid #e8edf1;
               box-shadow: 0 22px 60px rgba(14, 24, 37, 0.08);
               overflow: hidden;
            }
            .dg-inquiry-shell__main {
               padding: 42px 36px 38px;
            }

            .dg-inquiry-form {
               display: block;
            }
            .dg-inquiry-form__head h3 {
               margin: 0 0 6px;
               color: #152637;
               font-size: 1.45rem;
               font-weight: 700;
               line-height: 1.25;
            }
            .dg-inquiry-form__head--mid {
               margin-top: 32px;
            }
            .dg-inquiry-form__eyebrow {
               margin: 0 0 6px;
               color: #dc7b37;
               font-size: 0.7rem;
               font-weight: 800;
               letter-spacing: 0.16em;
               text-transform: uppercase;
            }
            .dg-inquiry-form__lead {
               margin: 0 0 22px;
               color: #617082;
               font-size: 0.95rem;
               line-height: 1.7;
            }

            .dg-inquiry-types {
               display: grid;
               grid-template-columns: repeat(2, 1fr);
               gap: 12px;
            }
            .dg-inquiry-type {
               position: relative;
               display: flex;
               align-items: flex-start;
               gap: 12px;
               padding: 16px 16px;
               border: 1px solid #dde5ec;
               border-radius: 16px;
               background: #f8fafb;
               cursor: pointer;
               transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
            }
            .dg-inquiry-type input {
               position: absolute;
               opacity: 0;
               pointer-events: none;
            }
            .dg-inquiry-type__icon {
               width: 38px;
               height: 38px;
               border-radius: 50%;
               background: #edf4f7;
               color: #152637;
               display: inline-flex;
               align-items: center;
               justify-content: center;
               flex-shrink: 0;
               font-size: 1.05rem;
            }
            .dg-inquiry-type__label {
               display: block;
               color: #152637;
               font-size: 0.98rem;
               font-weight: 700;
               margin-bottom: 2px;
            }
            .dg-inquiry-type__blurb {
               display: block;
               color: #617082;
               font-size: 0.82rem;
               line-height: 1.5;
            }
            .dg-inquiry-type.is-active {
               background: #fff;
               border-color: #d77d39;
               box-shadow: 0 0 0 3px rgba(215, 125, 57, 0.14);
            }
            .dg-inquiry-type.is-active .dg-inquiry-type__icon {
               background: #d77d39;
               color: #fff;
            }

            .dg-inquiry-grid {
               display: grid;
               grid-template-columns: repeat(2, 1fr);
               gap: 14px 18px;
               margin-top: 8px;
            }
            .dg-field {
               display: flex;
               flex-direction: column;
            }
            .dg-field--full {
               grid-column: 1 / -1;
            }
            .dg-field label {
               margin-bottom: 8px;
               color: #7b8795;
               font-size: 0.78rem;
               font-weight: 700;
               letter-spacing: 0.08em;
               text-transform: uppercase;
            }
            .dg-field input,
            .dg-field select,
            .dg-field textarea {
               width: 100%;
               border: 1px solid #dde5ec;
               background: #f8fafb;
               border-radius: 16px;
               padding: 14px 16px;
               font-size: 0.95rem;
               color: #152637;
               transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
               font-family: inherit;
            }
            .dg-field input {
               min-height: 54px;
            }
            .dg-field textarea {
               min-height: 130px;
               resize: vertical;
            }
            .dg-field input:focus,
            .dg-field select:focus,
            .dg-field textarea:focus {
               outline: none;
               background: #fff;
               border-color: #d77d39;
               box-shadow: 0 0 0 4px rgba(215, 125, 57, 0.12);
            }

            .dg-inquiry-error {
               margin: 6px 0 0;
               color: #c4504d;
               font-size: 0.82rem;
            }

            .dg-inquiry-submit {
               margin-top: 22px;
               width: 100%;
               min-height: 58px;
               border-radius: 999px;
               background: linear-gradient(135deg, #102435 0%, #23445b 100%);
               border: none;
               box-shadow: 0 16px 30px rgba(16, 36, 53, 0.16);
               color: #fff;
               font-size: 0.88rem;
               font-weight: 700;
               letter-spacing: 0.1em;
               text-transform: uppercase;
               cursor: pointer;
               transition: transform 0.15s ease, box-shadow 0.15s ease;
            }
            .dg-inquiry-submit:disabled {
               opacity: 0.7;
               cursor: not-allowed;
            }
            .dg-inquiry-submit:not(:disabled):hover {
               transform: translateY(-1px);
               box-shadow: 0 20px 36px rgba(16, 36, 53, 0.22);
            }

            .dg-inquiry-success {
               text-align: center;
               padding: 36px 12px 24px;
            }
            .dg-inquiry-success__icon {
               width: 80px;
               height: 80px;
               margin: 0 auto 18px;
               border-radius: 50%;
               background: #eaf7ef;
               color: #2f8a4d;
               display: inline-flex;
               align-items: center;
               justify-content: center;
               font-size: 2.4rem;
            }
            .dg-inquiry-success h3 {
               margin: 0 0 10px;
               color: #152637;
               font-size: 1.55rem;
               font-weight: 700;
            }
            .dg-inquiry-success p {
               margin: 0 auto 24px;
               max-width: 460px;
               color: #617082;
               line-height: 1.7;
            }
            .dg-inquiry-success__btn {
               background: #102435;
               color: #fff;
               border: none;
               border-radius: 999px;
               padding: 12px 24px;
               font-size: 0.84rem;
               font-weight: 700;
               letter-spacing: 0.1em;
               text-transform: uppercase;
               cursor: pointer;
            }

            @media (max-width: 767px) {
               .dg-inquiry-types {
                  grid-template-columns: 1fr;
               }
               .dg-inquiry-grid {
                  grid-template-columns: 1fr;
               }
               .dg-inquiry-shell__main {
                  padding: 30px 22px;
               }
               .dg-inquiry-form__head h3 {
                  font-size: 1.25rem;
               }
            }
         `}</style>
      </>
   );
};

export default InquiryArea;
