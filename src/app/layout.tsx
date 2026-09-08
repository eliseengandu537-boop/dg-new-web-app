import "../styles/index.scss";
import type { Metadata, Viewport } from "next";
import Providers from "./providers";
import { contactInfo } from "@/data/contact-info";
import { SOCIAL_IMAGE_PATH } from "@/utils/seo";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "De Gennaro Property",
  alternateName: "DG Property",
  url: "https://dg-property.co.za",
  logo: "https://dg-property.co.za/dgicon.png",
  image: `https://dg-property.co.za${SOCIAL_IMAGE_PATH}`,
  email: contactInfo.emailDisplay,
  telephone: contactInfo.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: "59 Van Buuren Road",
    addressLocality: "Bedfordview",
    addressRegion: "Gauteng",
    postalCode: "2007",
    addressCountry: "ZA",
  },
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
  priceRange: "$$$",
  sameAs: [
    "https://www.facebook.com/share/1Cfzm1Fy4t/?mibextid=wwXIfr",
    "https://www.instagram.com/dg_property_/",
    "https://www.linkedin.com/company/degennaro-property/",
  ],
};

// Site-wide defaults. Individual pages (e.g. property details) export their own
// metadata, which Next.js merges over these — so per-property titles/descriptions
// and social tags cleanly replace the defaults instead of duplicating them.
export const metadata: Metadata = {
  metadataBase: new URL("https://dg-property.co.za"),
  title:
    "DG Property — Commercial, Industrial & Retail Property Specialists in South Africa",
  description:
    "DG Property — commercial, industrial and retail property specialists across South Africa.",
  keywords: [
    "Real estate",
    "Property sale",
    "Property buy",
    "Commercial property",
    "South Africa",
  ],
  openGraph: {
    type: "website",
    siteName: "DG Property",
    url: "https://dg-property.co.za",
    title: "DG Property",
    description:
      "Commercial, industrial and retail property specialists across South Africa.",
    images: [
      {
        url: SOCIAL_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "DG Property commercial property specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DG Property",
    description:
      "Commercial, industrial and retail property specialists across South Africa.",
    images: [SOCIAL_IMAGE_PATH],
  },
  icons: {
    icon: "/assets/images/fav-icon/dgicon.png",
    apple: "/assets/images/fav-icon/dgicon.png",
  },
  verification: {
    google: "n-dobwuDD5g5R_5axXOWyxvXMZy_3mKTEpE-HleZ2a0",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1A1C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* For IE */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Window tab colour — Windows Phone & iOS Safari */}
        <meta name="msapplication-navbutton-color" content="#0D1A1C" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <div className="main-page-wrapper">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
