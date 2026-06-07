import "../styles/index.scss";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="keywords" content="Real estate, Property sale, Property buy" />
        <meta name="description" content="DG Property — commercial, industrial and retail property specialists across South Africa." />
        <meta property="og:site_name" content="DG Property" />
        <meta property="og:url" content="https://dg-property.co.za" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DG Property" />
        <meta name='og:image' content='images/assets/ogg.png' />
        {/* For IE  */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* For Resposive Device */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Speed up Google Fonts so text doesn't flash on slow mobile connections */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* For Window Tab Color */}
        {/* Chrome, Firefox OS and Opera */}
        <meta name="theme-color" content="#0D1A1C" />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#0D1A1C" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C" />
        <link rel="icon" href="/assets/images/fav-icon/dgicon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/images/fav-icon/dgicon.png" />
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
