import InvestmentListing from "@/components/inner-listing/investment";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Investment Properties | DG Property",
  description: "Discover income-producing commercial property investments and strategic acquisition opportunities across South Africa.",
  path: "/investment",
});

const InvestmentPage = () => {
  return (
    <Wrapper>
      <InvestmentListing />
    </Wrapper>
  );
};

export default InvestmentPage;
