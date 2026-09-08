import FuelStation from "@/components/inner-listing/fuel-station";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Fuel Station Properties | DG Property",
  description: "Browse fuel-station property and investment opportunities with commercial property specialists at DG Property.",
  path: "/fuel-station",
});

const FuelStationPage = () => {
  return (
    <Wrapper>
      <FuelStation />
    </Wrapper>
  );
};

export default FuelStationPage;
