import SuccessStoryDetailPage from "@/components/inner-pages/success-stories/detail/SuccessStoryDetailPage";
import Wrapper from "@/layouts/Wrapper";
import type { Metadata } from "next";
import { getPublicSuccessStoryBySlug } from "@/utils/publicServerApi";
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
  let story = null;

  try {
    story = await getPublicSuccessStoryBySlug(slug);
  } catch {
    story = null;
  }

  const storyTitle = story?.title || titleFromSlug(slug) || "Commercial Property Success Story";
  return pageMetadata({
    title: `${storyTitle} | DG Property Success Story`,
    description: story?.summary || `Explore the ${storyTitle} commercial property success story from DG Property.`,
    path: `/success-stories/${slug}`,
  });
}

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) => {
  const resolvedParams = await Promise.resolve(params);

  return (
    <Wrapper>
      <SuccessStoryDetailPage slug={resolvedParams.slug} />
    </Wrapper>
  );
};

export default Page;
