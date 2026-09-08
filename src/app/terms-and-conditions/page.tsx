import Link from "next/link";
import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";
import { contactInfo } from "@/data/contact-info";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions | DG Property",
  description: "Terms governing the DG Property website and enquiries about commercial property services in South Africa.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms & Conditions" description="Terms for using the DG Property website and submitting property enquiries.">
      <p style={{ color: "#0d1f2d", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 8 }}>By using this website you agree to these terms. Separate written mandates, quotations, leases, sale agreements, course terms or other service agreements apply to an actual transaction and prevail if they conflict with these website terms.</p>
      <p style={{ color: "#566575", marginBottom: 0 }}>Last updated: 7 September 2026</p>

      <LegalSection title="1. Provider information">
        <address style={{ fontStyle: "normal" }}><strong>{contactInfo.legalName}</strong>, trading as {contactInfo.tradingName}<br />Registration number: {contactInfo.registrationNumber}<br />PPRA number: {contactInfo.ppraNumber}<br />{contactInfo.fullAddress}<br /><a href={contactInfo.emailHref}>{contactInfo.emailDisplay}</a> · <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a><br /><a href={contactInfo.websiteUrl}>{contactInfo.websiteUrl}</a></address>
      </LegalSection>

      <LegalSection title="2. Website purpose and acceptable use">
        <p>This site provides information about commercial property listings, leasing, sales, investments, development services, training and related enquiries. You may use it only for lawful purposes and may not interfere with its security, availability or another person&apos;s rights.</p>
      </LegalSection>

      <LegalSection title="3. Listings and enquiries">
        <p>Property prices, rentals, sizes, availability, images, yields and descriptions can change and should be independently verified before a decision is made. Submitting a form is a request for contact; it is not an offer, acceptance, reservation, mandate, lease, sale or investment agreement.</p>
      </LegalSection>

      <LegalSection title="4. Consumer rights, cancellations and refunds">
        <p>Nothing in these terms limits a right that cannot lawfully be excluded under the Consumer Protection Act, the Electronic Communications and Transactions Act or another applicable law. The site does not currently take online payment. The process for a later paid service, course or booking is explained in our <Link href="/refund-policy">Refund and Cancellation Policy</Link> and in the written agreement for that service.</p>
      </LegalSection>

      <LegalSection title="5. Privacy and storage">
        <p>Personal information is handled under our <Link href="/privacy-policy">Privacy Policy</Link>. Browser storage and optional analytics are explained in our <Link href="/cookie-policy">Cookie Policy</Link>.</p>
      </LegalSection>

      <LegalSection title="6. Intellectual property and image rights">
        <p>Website content is owned by, commissioned by or licensed to its respective rights holder. DG Property branding may not be used without permission. Property photographs and third-party names or marks remain subject to their owners&apos; rights; their appearance does not transfer ownership to a site visitor.</p>
      </LegalSection>

      <LegalSection title="7. External services">
        <p>External links and user-requested embedded media are governed by the third party&apos;s terms and privacy practices. DG Property does not control an external site, but will take reasonable steps to remove a link or item after receiving a substantiated rights or safety concern.</p>
      </LegalSection>

      <LegalSection title="8. Liability and availability">
        <p>We take reasonable steps to keep the website useful and accurate but do not promise uninterrupted availability or that every listing remains current. To the extent permitted by law, DG Property is not responsible for loss caused solely by relying on unverified website information. This does not exclude liability or remedies that applicable law does not allow us to exclude.</p>
      </LegalSection>

      <LegalSection title="9. Governing law and contact">
        <p>South African law governs these website terms. Please send a question, complaint or rights notice to <a href={contactInfo.emailHref}>{contactInfo.emailDisplay}</a> or call <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a> so it can be investigated.</p>
      </LegalSection>
    </LegalPageShell>
  );
}
