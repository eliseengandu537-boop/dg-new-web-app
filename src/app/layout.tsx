'use client'
import "../styles/index.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";
import PageViewTracker from "@/components/common/PageViewTracker";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
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
          <Provider store={store}>
            <PageViewTracker />
            {children}
          </Provider>
        </div>
      </body>
    </html>
  )
}
