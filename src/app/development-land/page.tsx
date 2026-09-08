import DevelopmentLand from "@/components/inner-listing/development-land";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Development Land | DG Property",
  description: "Explore development land and commercial development opportunities across South Africa with DG Property.",
  path: "/development-land",
});

const DevelopmentLandPage = () => {
  return (
    <Wrapper>
      <DevelopmentLand />
    </Wrapper>
  );
};

export default DevelopmentLandPage;
