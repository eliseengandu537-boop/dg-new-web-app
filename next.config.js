/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
  },
  // Old pages from the previous website that Google still has indexed.
  // A permanent (301) redirect tells Google to replace those stale
  // records with the matching page on the current site.
  async redirects() {
    return [
      { source: "/home-2-2", destination: "/", permanent: true },
      { source: "/contact-2", destination: "/contact", permanent: true },
      { source: "/about", destination: "/about_us_02", permanent: true },
      { source: "/about/our-mission-2-2", destination: "/investment", permanent: true },
    ];
  },
}

module.exports = nextConfig
