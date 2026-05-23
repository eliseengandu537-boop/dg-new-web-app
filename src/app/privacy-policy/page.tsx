import LegalHero from "@/components/common/breadcrumb/LegalHero";
import FancyBanner from "@/components/common/FancyBanner";
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Privacy Policy | DG Property",
};

export default function PrivacyPolicyPage() {
  return (
    <Wrapper>
      <HeaderOne style={true} />
      <LegalHero
        title="Privacy Policy"
        description="How De Gennaro Property collects, uses and protects your personal information in accordance with the Protection of Personal Information Act (POPIA)."
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
                  De Gennaro Property respects your privacy and is committed to
                  protecting your personal information in accordance with the
                  Protection of Personal Information Act (POPIA) of South
                  Africa.
                </p>
                <p style={{ color: "rgba(13, 31, 45, 0.78)", lineHeight: 1.8 }}>
                  This Privacy Policy explains how we collect, use, and protect
                  your information when you use DG Property.
                </p>

                <div className="mt-45">
                  <h4 className="mb-20">1. Information We Collect</h4>
                  <p className="mb-15">
                    We may collect personal information including but not
                    limited to:
                  </p>
                  <ul className="mb-0 ps-4" style={{ lineHeight: 1.9 }}>
                    <li>Name and surname</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Company details</li>
                    <li>Property requirements or inquiries</li>
                    <li>Website usage data and analytics</li>
                  </ul>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">2. How We Use Your Information</h4>
                  <p className="mb-15">Your information may be used to:</p>
                  <ul className="mb-0 ps-4" style={{ lineHeight: 1.9 }}>
                    <li>Respond to property inquiries</li>
                    <li>Provide property-related services and updates</li>
                    <li>
                      Communicate regarding listings, leasing, or sales
                      opportunities
                    </li>
                    <li>Improve our website and user experience</li>
                    <li>
                      Send marketing communications where consent has been
                      provided
                    </li>
                  </ul>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">3. Sharing of Information</h4>
                  <p className="mb-15">
                    De Gennaro Property does not sell or rent personal
                    information to third parties.
                  </p>
                  <p className="mb-15">
                    Information may only be shared with:
                  </p>
                  <ul className="mb-0 ps-4" style={{ lineHeight: 1.9 }}>
                    <li>
                      Property owners or landlords where necessary for
                      transactions
                    </li>
                    <li>
                      Service providers assisting with website or business
                      operations
                    </li>
                    <li>Authorities where legally required</li>
                  </ul>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">4. Cookies &amp; Website Analytics</h4>
                  <p className="mb-15" style={{ lineHeight: 1.8 }}>
                    This website may use cookies and analytics tools to improve
                    user experience and monitor website performance.
                  </p>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    Users may disable cookies through their browser settings.
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">5. Data Security</h4>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    We take reasonable technical and organisational measures to
                    protect personal information from loss, misuse,
                    unauthorised access, disclosure, or alteration.
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">6. Your Rights</h4>
                  <p className="mb-15" style={{ lineHeight: 1.8 }}>
                    In accordance with POPIA, users may request:
                  </p>
                  <ul className="mb-20 ps-4" style={{ lineHeight: 1.9 }}>
                    <li>Access to personal information</li>
                    <li>Correction of inaccurate information</li>
                    <li>
                      Deletion of personal information where applicable
                    </li>
                    <li>
                      Withdrawal of consent for marketing communications
                    </li>
                  </ul>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    Requests can be submitted to:{" "}
                    <a href="mailto:hello@dg-property.co.za">
                      hello@dg-property.co.za
                    </a>
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">7. Retention of Information</h4>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    Personal information will only be retained for as long as
                    necessary to fulfil the purpose for which it was collected
                    or as required by law.
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">8. Third-Party Services</h4>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    This website may use third-party tools or integrations
                    including analytics, maps, embedded content, or social
                    media platforms. These services may collect data in
                    accordance with their own privacy policies.
                  </p>
                </div>

                <div className="mt-45">
                  <h4 className="mb-20">9. Updates to this Policy</h4>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    De Gennaro Property reserves the right to update this
                    Privacy Policy at any time. Any changes will be posted on
                    this page.
                  </p>
                </div>

                <div
                  className="mt-45"
                  style={{
                    background: "#f7f3ed",
                    borderRadius: 24,
                    padding: "clamp(20px, 3vw, 32px)",
                  }}
                >
                  <h4 className="mb-20">10. Contact Information</h4>
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
                  <p className="mb-10">
                    Phone: <a href="tel:+27876302532">+27 87 630 2532</a>
                  </p>
                  <p className="mb-0">
                    Website:{" "}
                    <a
                      href="https://www.dg-property.co.za"
                      target="_blank"
                      rel="noreferrer"
                    >
                      www.dg-property.co.za
                    </a>
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
