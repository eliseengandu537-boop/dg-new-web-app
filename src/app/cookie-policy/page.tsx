import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";
import { contactInfo } from "@/data/contact-info";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy | DG Property",
  description: "The essential browser storage and optional anonymous analytics used by the DG Property website.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPageShell title="Cookie Policy" description="What this site stores in your browser and how to change your choice.">
      <p style={{ color: "#0d1f2d", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 8 }}>This site uses browser local storage for essential preferences and secure account functionality. Optional, first-party analytics is disabled unless you select “Allow anonymous analytics”.</p>
      <p style={{ color: "#566575", marginBottom: 0 }}>Last updated: 7 September 2026</p>

      <LegalSection title="1. Storage used on this site">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
            <thead><tr><th scope="col" style={{ textAlign: "left", padding: 12, borderBottom: "2px solid #cbd3da" }}>Item</th><th scope="col" style={{ textAlign: "left", padding: 12, borderBottom: "2px solid #cbd3da" }}>Purpose</th><th scope="col" style={{ textAlign: "left", padding: 12, borderBottom: "2px solid #cbd3da" }}>Duration</th></tr></thead>
            <tbody>
              <tr><th scope="row" style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #dfe5ea" }}>dg_cookie_consent</th><td style={{ padding: 12, borderBottom: "1px solid #dfe5ea" }}>Remembers essential-only or anonymous-analytics choice.</td><td style={{ padding: 12, borderBottom: "1px solid #dfe5ea" }}>180 days</td></tr>
              <tr><th scope="row" style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #dfe5ea" }}>_dg_sid</th><td style={{ padding: 12, borderBottom: "1px solid #dfe5ea" }}>Short-lived random ID used with the page path for first-party visit counts. Created only after analytics consent.</td><td style={{ padding: 12, borderBottom: "1px solid #dfe5ea" }}>24 hours</td></tr>
              <tr><th scope="row" style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #dfe5ea" }}>dg_token / dg_user</th><td style={{ padding: 12, borderBottom: "1px solid #dfe5ea" }}>Keeps an authenticated client or administrator signed in and displays account details.</td><td style={{ padding: 12, borderBottom: "1px solid #dfe5ea" }}>Until logout or browser storage is cleared</td></tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="2. No advertising trackers">
        <p>The current public site contains no Google Analytics, Google Tag Manager, Meta Pixel, Hotjar or similar advertising and behavioural-tracking code. Basic page counts are sent only to DG Property&apos;s own backend after permission.</p>
      </LegalSection>

      <LegalSection title="3. Third-party media">
        <p>YouTube is contacted only if you choose to open an available property video. The privacy-enhanced youtube-nocookie.com embed domain is used. The homepage automatically retrieves DG Property&apos;s Instagram feed through Behold and loads its media. These providers may process technical data under their own privacy terms.</p>
      </LegalSection>

      <LegalSection title="4. Change or withdraw your choice">
        <p>Use the “Cookie settings” button at the bottom-left of any page to choose again. Selecting essential-only removes the analytics browser ID. You can also clear this site&apos;s storage in your browser settings. Withdrawing permission does not affect processing that occurred while your earlier choice was active.</p>
      </LegalSection>

      <LegalSection title="5. Contact">
        <p>Questions about browser storage or privacy can be sent to <a href={contactInfo.emailHref}>{contactInfo.emailDisplay}</a>.</p>
      </LegalSection>
    </LegalPageShell>
  );
}
