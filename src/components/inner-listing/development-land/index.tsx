
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderFour from "@/layouts/headers/HeaderFour";
import FancyBanner from "@/components/common/FancyBanner";
import CategoryListingArea from "@/components/inner-listing/CategoryListingArea";
import PropertyHero from "@/components/common/PropertyHero";

const DevelopmentLandIndex = () => {
  return (
    <>
      <HeaderFour />
      <PropertyHero
        title="Development Land"
        badge="Development"
        subtitle="Development land opportunities for commercial, retail, and mixed-use projects."
      />
      <CategoryListingArea category="development_land" detailsLink="/listing_details_06" />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default DevelopmentLandIndex;
