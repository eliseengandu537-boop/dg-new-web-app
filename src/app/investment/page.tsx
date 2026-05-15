import InvestmentListing from "@/components/inner-listing/investment";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Investment Properties | DG Property",
};

const InvestmentPage = () => {
  return (
    <Wrapper>
      <InvestmentListing />
    </Wrapper>
  );
};

export default InvestmentPage;
