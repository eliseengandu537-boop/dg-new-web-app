
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderFour from "@/layouts/headers/HeaderFour";
import FancyBanner from "@/components/common/FancyBanner";
import CategoryListingArea from "@/components/inner-listing/CategoryListingArea";
import PropertyHero from "@/components/common/PropertyHero";

const CommercialForLeaseIndex = () => {
  return (
    <>
      <HeaderFour />
      <PropertyHero
        title="Commercial To Let"
        badge="Commercial"
        subtitle="Browse commercial office and mixed-use listings across South Africa from one page."
      />
      <CategoryListingArea filters={{ listingCategory: "commercial" }} detailsLink="/listing_details_06" />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default CommercialForLeaseIndex;
