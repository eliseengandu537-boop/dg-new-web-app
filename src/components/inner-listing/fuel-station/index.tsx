
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderFour from "@/layouts/headers/HeaderFour";
import FancyBanner from "@/components/common/FancyBanner";
import CategoryListingArea from "@/components/inner-listing/CategoryListingArea";
import PropertyHero from "@/components/common/PropertyHero";

const FuelStationIndex = () => {
  return (
    <>
      <HeaderFour />
      <PropertyHero
        title="Fuel Station"
        badge="For Sale / Lease"
        subtitle="Specialist fuel station listings, for sale, lease or investment opportunity."
      />
      <CategoryListingArea category="fuel_station" detailsLink="/listing_details_06" />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default FuelStationIndex;
