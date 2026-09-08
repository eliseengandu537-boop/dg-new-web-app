import Link from "next/link";
import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";
import { contactInfo } from "@/data/contact-info";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy | DG Property",
  description: "How De Gennaro Property collects, uses, stores and protects personal information under South Africa's POPIA.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy" description="A clear account of the personal information we collect and the choices available to you.">
      <p style={{ color: "#0d1f2d", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 8 }}>
        {contactInfo.legalName}, trading as {contactInfo.tradingName}, is the responsible party for the personal information described in this policy. This notice supports the conditions for lawful processing in the Protection of Personal Information Act 4 of 2013 (POPIA).
      </p>
      <p style={{ color: "#566575", marginBottom: 0 }}>Last updated: 7 September 2026</p>

      <LegalSection title="1. Information we collect">
        <p>We collect information that you choose to provide through an enquiry, contact, viewing or account form. Depending on the form, this can include your name, email address, phone number, property requirement, preferred area, budget range, listing reference and message.</p>
        <p>When you allow optional analytics, we record the page visited with a randomly generated browser identifier that expires after 24 hours. We do not use advertising pixels or third-party analytics tags.</p>
      </LegalSection>

      <LegalSection title="2. Why we process it">
        <ul className="ps-4 mb-0">
          <li>To respond to the request you submitted and provide relevant property information.</li>
          <li>To arrange viewings and support leasing, sale, investment or advisory discussions.</li>
          <li>To administer an account where you create one.</li>
          <li>To meet legal, regulatory, fraud-prevention and record-keeping obligations.</li>
          <li>To measure basic site usage only where you allow optional analytics.</li>
        </ul>
        <p className="mt-3 mb-0">We do not add enquiry details to electronic direct-marketing lists unless separate permission has been obtained or another lawful basis applies.</p>
      </LegalSection>

      <LegalSection title="3. Who may receive it">
        <p>Authorised DG Property staff and service providers that host or operate the website may process information where needed for these purposes. Relevant details may be shared with a property owner, landlord, developer, broker or professional adviser when necessary to respond to your property request. We may also disclose information where required by law.</p>
        <p className="mb-0">We do not sell personal information. If a service provider processes information outside South Africa, we require an appropriate POPIA-compatible safeguard.</p>
      </LegalSection>

      <LegalSection title="4. Retention and security">
        <p>We keep personal information only for as long as it is needed for the stated purpose, an active business relationship, dispute handling or a legal record-keeping requirement. It is then deleted, securely destroyed or de-identified.</p>
        <p className="mb-0">Reasonable technical and organisational safeguards are used to reduce the risk of loss, misuse, unauthorised access, alteration or disclosure. No internet service can promise absolute security.</p>
      </LegalSection>

      <LegalSection title="5. Your rights">
        <p>You may ask whether we hold your information, request access or correction, request deletion where applicable, object to certain processing, or withdraw consent without affecting earlier lawful processing. You may also complain to South Africa&apos;s Information Regulator.</p>
        <p className="mb-0">Send a privacy request to <a href={contactInfo.emailHref}>{contactInfo.emailDisplay}</a>. The Information Regulator publishes rights, forms and contact routes at <a href="https://inforegulator.org.za/" target="_blank" rel="noopener noreferrer">inforegulator.org.za</a>.</p>
      </LegalSection>

      <LegalSection title="6. Cookies, storage and embedded content">
        <p>Our storage and analytics choices are explained in the <Link href="/cookie-policy">Cookie Policy</Link>. A property video is not loaded from YouTube until you choose to open it; the privacy-enhanced YouTube domain is used.</p>
      </LegalSection>

      <LegalSection title="7. Children and policy changes">
        <p>This public property website is not directed at children and its forms are not intended to collect children&apos;s personal information. We may update this notice when our practices or legal obligations change and will show the revision date here.</p>
      </LegalSection>

      <LegalSection title="8. Responsible party details">
        <address style={{ fontStyle: "normal", marginBottom: 0 }}>
          <strong>{contactInfo.legalName}</strong><br />
          Registration number: {contactInfo.registrationNumber}<br />
          PPRA number: {contactInfo.ppraNumber}<br />
          {contactInfo.fullAddress}<br />
          <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a><br />
          <a href={contactInfo.emailHref}>{contactInfo.emailDisplay}</a>
        </address>
      </LegalSection>
    </LegalPageShell>
  );
}
