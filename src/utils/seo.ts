import type { Metadata } from "next";

export const SITE_URL = "https://dg-property.co.za";
export const SOCIAL_IMAGE_PATH = "/assets/images/social/dg-property-share.webp";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
};

export const pageMetadata = ({
  title,
  description,
  path,
  index = true,
}: PageMetadataOptions): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    siteName: "DG Property",
    url: path,
    title,
    description,
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
    title,
    description,
    images: [SOCIAL_IMAGE_PATH],
  },
  robots: index
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
});
