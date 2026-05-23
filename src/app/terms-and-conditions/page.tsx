import LegalHero from "@/components/common/breadcrumb/LegalHero";
import FancyBanner from "@/components/common/FancyBanner";
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | DG Property",
};

export default function TermsAndConditionsPage() {
  return (
    <Wrapper>
      <HeaderOne style={true} />
      <LegalHero
        title="Terms & Conditions"
        description="The terms that govern your use of the De Gennaro Property website and our commercial property services."
      />

      <section
        className="pt-130 xl-pt-100 md-pt-80 pb-130 xl-pb-100 md-pb-80"
        style={{ background: "#f7f3ed" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(13, 31, 45, 0.08)",
                  borderRadius: 28,
                  boxShadow: "0 20px 60px rgba(13, 31, 45, 0.08)",
                  padding: "clamp(24px, 4vw, 48px)",
                }}
              >
                <p style={{ color: "#0d1f2d", fontSize: "1.05rem", lineHeight: 1.8 }}>
                  Welcome to DG Property. By accessing or using this website,
                  you agree to comply with and be bound by the following Terms
                  and Conditions. If you do not agree with these terms, please
                  do not use this website.
                </p>

                <div
                  className="mt-45"
                  style={{
                    background: "#f7f3ed",
                    borderRadius: 24,
                    padding: "clamp(20px, 3vw, 32px)",
                  }}
                >
                  <h4 className="mb-20">1. Company Information</h4>
                  <p className="mb-10 fw-500">De Gennaro Property</p>
                  <p className="mb-10">
                    Registration Number: 2022/651308/07
                  </p>
                  <p className="mb-10">PPRA Number: F152984</p>
                  <p className="mb-10">
                    Email:{" "}
                    <a href="mailto:hello@dg-property.co.za">
                      hello@dg-property.co.za
                    </a>
                  </p>
                  <p className="mb-0">
                    Phone: <a href="tel:+27876302532">+27 87 630 2532</a>
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">2. Website Use</h4>
                  <p className="mb-15" style={{ lineHeight: 1.8 }}>
                    This website is intended to provide information regarding
                    commercial property sales, leasing, investment
                    opportunities, and related property services.
                  </p>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    You agree to use this website only for lawful purposes and
                    in a manner that does not infringe the rights of, restrict,
                    or inhibit the use of this website by any third party.
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">3. Property Listings &amp; Information</h4>
                  <p className="mb-15" style={{ lineHeight: 1.8 }}>
                    All property information, pricing, availability, sizes,
                    rentals, images, and related content displayed on this
                    website are provided for informational purposes only and may
                    change without notice.
                  </p>
                  <p className="mb-15" style={{ lineHeight: 1.8 }}>
                    While De Gennaro Property aims to keep all information
                    accurate and up to date, we do not guarantee the accuracy,
                    completeness, or reliability of any information displayed
                    on the website.
                  </p>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    Properties may be withdrawn, leased, sold, or amended at
                    any time without prior notice.
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">4. Intellectual Property</h4>
                  <p className="mb-15" style={{ lineHeight: 1.8 }}>
                    All content on this website, including text, branding,
                    logos, graphics, images, videos, brochures, and design
                    elements, are the property of De Gennaro Property unless
                    otherwise stated.
                  </p>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    No content may be copied, reproduced, distributed, or used
                    without prior written permission.
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">5. Third-Party Links</h4>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    This website may contain links to third-party websites for
                    convenience or additional information. De Gennaro Property
                    is not responsible for the content, privacy practices, or
                    reliability of any external websites.
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">6. Limitation of Liability</h4>
                  <p className="mb-15" style={{ lineHeight: 1.8 }}>
                    De Gennaro Property shall not be held liable for any
                    direct, indirect, incidental, or consequential damages
                    arising from the use of this website or reliance on any
                    information contained within it.
                  </p>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    Users access and use this website at their own risk.
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">7. Privacy</h4>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    Use of this website is also governed by our{" "}
                    <Link href="/privacy-policy">Privacy Policy</Link>.
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">8. Changes to Terms</h4>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    De Gennaro Property reserves the right to amend or update
                    these Terms and Conditions at any time without prior
                    notice. Continued use of the website constitutes acceptance
                    of any revised terms.
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">9. Governing Law</h4>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    These Terms and Conditions are governed by the laws of the
                    Republic of South Africa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FancyBanner style={false} />
      <FooterFour />
    </Wrapper>
  );
}
