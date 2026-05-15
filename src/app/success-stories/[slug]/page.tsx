import SuccessStoryDetailPage from "@/components/inner-pages/success-stories/detail/SuccessStoryDetailPage";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Success Story - DG Property",
};

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <Wrapper>
      <SuccessStoryDetailPage slug={params.slug} />
    </Wrapper>
  );
};

export default Page;
