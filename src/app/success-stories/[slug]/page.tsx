import SuccessStoryDetailPage from "@/components/inner-pages/success-stories/detail/SuccessStoryDetailPage";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Success Story - DG Property",
};

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
