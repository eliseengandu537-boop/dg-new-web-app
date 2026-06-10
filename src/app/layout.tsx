import "../styles/index.scss";
import type { Metadata, Viewport } from "next";
import Providers from "./providers";

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
    images: [{ url: "/dgicon.png" }],
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
        {/* Speed up Google Fonts so text doesn't flash on slow mobile connections */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Window tab colour — Windows Phone & iOS Safari */}
        <meta name="msapplication-navbutton-color" content="#0D1A1C" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C" />
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
