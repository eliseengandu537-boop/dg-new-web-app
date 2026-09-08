import SuccessStories from "@/components/inner-pages/success-stories";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Commercial Property Success Stories | DG Property",
  description: "See how DG Property has delivered successful retail, commercial and development property projects across South Africa.",
  path: "/success-stories",
});

const index = () => {
  return (
    <Wrapper>
      <SuccessStories />
    </Wrapper>
  );
};

export default index;
