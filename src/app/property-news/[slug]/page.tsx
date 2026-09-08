import NewsletterDetailPage from "@/components/inner-pages/property-news/NewsletterDetailPage";
import type { Metadata } from "next";
import { getPublicNewsBySlug } from "@/utils/publicServerApi";
import { pageMetadata } from "@/utils/seo";

const titleFromSlug = (slug: string) =>
  decodeURIComponent(slug)
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  let post = null;

  try {
    post = await getPublicNewsBySlug(slug);
  } catch {
    post = null;
  }

  const articleTitle = post?.title || titleFromSlug(slug) || "Property Newsletter";
  return pageMetadata({
    title: `${articleTitle} | DG Property`,
    description: post?.summary || `Read ${articleTitle}, a commercial property market update from DG Property.`,
    path: `/property-news/${slug}`,
  });
}

export default function Page() {
  return <NewsletterDetailPage />;
}
