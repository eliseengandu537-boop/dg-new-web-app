import OurServices from "@/components/inner-pages/services/our-services";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Commercial Property Services | DG Property",
  description: "Explore DG Property services for commercial leasing, investment sales, retail leasing, tenant representation and development opportunities.",
  path: "/our-services",
});

const index = () => {
  return (
    <Wrapper>
      <OurServices />
    </Wrapper>
  );
};

export default index;
