import CommercialForLease from "@/components/inner-listing/commercial-for-lease";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Commercial Property To Let | DG Property",
  description: "Find commercial offices and business premises to let across South Africa with specialist guidance from DG Property.",
  path: "/commercial-for-lease",
});

const CommercialForLeasePage = () => {
  return (
    <Wrapper>
      <CommercialForLease />
    </Wrapper>
  );
};

export default CommercialForLeasePage;
