import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";
import { contactInfo } from "@/data/contact-info";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Refund & Cancellation Policy | DG Property",
  description: "Refund and cancellation information for DG Property services, bookings and courses in South Africa.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <LegalPageShell title="Refund & Cancellation Policy" description="How cancellations and refund requests are handled for services agreed with DG Property.">
      <p style={{ color: "#0d1f2d", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 8 }}>This website does not process card payments in the browser. A course page may display EFT instructions, but browsing a listing or submitting an enquiry creates no charge to refund.</p>
      <p style={{ color: "#566575", marginBottom: 0 }}>Last updated: 7 September 2026</p>

      <LegalSection title="1. Paid services, courses and bookings">
        <p>If DG Property later confirms a paid advisory service, course place, reservation or other booking, the price, scope, start date, cancellation terms and any non-refundable work will be disclosed in writing before payment is due. Those agreed terms apply together with this policy.</p>
      </LegalSection>

      <LegalSection title="2. Cancellation requests">
        <p>Send a cancellation request as soon as possible using the contact details below, including if you have paid by EFT but have not received course access. Any cancellation fee must be reasonable and will take account of the notice provided, access or work already supplied, costs already incurred, the ability to fill the place, the nature of the service and applicable consumer law.</p>
      </LegalSection>

      <LegalSection title="3. Refund eligibility">
        <p>A refund, price reduction, re-performance or other remedy will be provided where required by the Consumer Protection Act 68 of 2008, the Electronic Communications and Transactions Act 25 of 2002 or the written service agreement. If DG Property cancels a paid course or service before supplying it and you do not accept a suitable alternative, the amount paid for that item will be refunded.</p>
        <p className="mb-0">Property deposits, rental, purchase funds and third-party charges are governed by the relevant mandate, lease, sale or provider agreement and are not paid through this website.</p>
      </LegalSection>

      <LegalSection title="4. How to request a refund">
        <p>Contact <a href={contactInfo.emailHref}>{contactInfo.emailDisplay}</a> with your name, the service or course, payment date, proof of payment and reason for the request. Only information necessary to verify and resolve the request will be collected. Approved refunds are returned through an appropriate traceable method, subject to the original agreement and law.</p>
      </LegalSection>

      <LegalSection title="5. Statutory rights">
        <p>This policy does not remove or reduce any remedy that cannot legally be excluded. Questions can be sent to <a href={contactInfo.emailHref}>{contactInfo.emailDisplay}</a> or discussed on <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a>.</p>
      </LegalSection>
    </LegalPageShell>
  );
}
