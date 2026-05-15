import FuelStation from "@/components/inner-listing/fuel-station";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Fuel Station Listings | DG Property",
};

const FuelStationPage = () => {
  return (
    <Wrapper>
      <FuelStation />
    </Wrapper>
  );
};

export default FuelStationPage;
