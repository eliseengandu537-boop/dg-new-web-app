
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderFour from "@/layouts/headers/HeaderFour";
import FancyBanner from "@/components/common/FancyBanner";
import CategoryListingArea from "@/components/inner-listing/CategoryListingArea";
import PropertyHero from "@/components/common/PropertyHero";

const InvestmentIndex = () => {
  return (
    <>
      <HeaderFour />
      <PropertyHero
        title="Investment"
        badge="Investment"
        subtitle="High-yield investment properties across South Africa."
      />
      <CategoryListingArea category="investment" detailsLink="/listing_details_06" />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default InvestmentIndex;
