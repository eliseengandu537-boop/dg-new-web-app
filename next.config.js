/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets local verification use an isolated build folder while a developer
  // server is already running. Normal builds continue to use `.next`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
  // Old pages from the previous website that Google still has indexed.
  // A permanent (301) redirect tells Google to replace those stale
  // records with the matching page on the current site.
  async redirects() {
    return [
      { source: "/home-two", destination: "/", permanent: true },
      { source: "/listing_07", destination: "/properties", permanent: true },
      { source: "/home-2-2", destination: "/", permanent: true },
      { source: "/contact-2", destination: "/contact", permanent: true },
      { source: "/about", destination: "/about_us_02", permanent: true },
      { source: "/about/our-mission-2-2", destination: "/investment", permanent: true },
      { source: "/about_us_01", destination: "/about_us_02", permanent: true },
      { source: "/agency", destination: "/agent", permanent: true },
      { source: "/agency_details", destination: "/agent", permanent: true },
      { source: "/blog_01", destination: "/property-news", permanent: true },
      { source: "/blog_02", destination: "/property-news", permanent: true },
      { source: "/blog_03", destination: "/property-news", permanent: true },
      { source: "/blog_details", destination: "/property-news", permanent: true },
      { source: "/compare", destination: "/properties", permanent: true },
      { source: "/listing_01", destination: "/commercial-for-lease", permanent: true },
      { source: "/listing_02", destination: "/retail-properties", permanent: true },
      { source: "/listing_03", destination: "/industrial-warehouse", permanent: true },
      { source: "/listing_04", destination: "/industrial-warehouse", permanent: true },
      { source: "/listing_05", destination: "/commercial-for-lease", permanent: true },
      { source: "/listing_06", destination: "/investment", permanent: true },
      { source: "/listing_08", destination: "/properties", permanent: true },
      { source: "/listing_09", destination: "/retail-properties", permanent: true },
      { source: "/listing_10", destination: "/properties", permanent: true },
      { source: "/listing_11", destination: "/properties", permanent: true },
      { source: "/listing_12", destination: "/properties", permanent: true },
      { source: "/listing_13", destination: "/properties", permanent: true },
      { source: "/listing_14", destination: "/properties", permanent: true },
      { source: "/listing_15", destination: "/properties", permanent: true },
      { source: "/listing_16", destination: "/properties", permanent: true },
      { source: "/listing_17", destination: "/properties", permanent: true },
      { source: "/listing_details_01", destination: "/properties", permanent: true },
      { source: "/listing_details_02", destination: "/properties", permanent: true },
      { source: "/listing_details_03", destination: "/properties", permanent: true },
      { source: "/listing_details_04", destination: "/properties", permanent: true },
      { source: "/listing_details_05", destination: "/properties", permanent: true },
      { source: "/pricing_01", destination: "/courses", permanent: true },
      { source: "/pricing_02", destination: "/courses", permanent: true },
      { source: "/project_01", destination: "/success-stories", permanent: true },
      { source: "/project_02", destination: "/success-stories", permanent: true },
      { source: "/project_03", destination: "/success-stories", permanent: true },
      { source: "/project_04", destination: "/success-stories", permanent: true },
      { source: "/project_details_01", destination: "/success-stories", permanent: true },
      { source: "/service_01", destination: "/our-services", permanent: true },
      { source: "/service_02", destination: "/investment-sales", permanent: true },
      { source: "/service_03", destination: "/development-leasing", permanent: true },
      { source: "/service_details", destination: "/retail-leasing", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
}

module.exports = nextConfig
