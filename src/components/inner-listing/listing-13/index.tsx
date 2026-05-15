import DropdownSix from "@/components/search-dropdown/home-dropdown/DropdownSix";

import FooterFour from "@/layouts/footers/FooterFour"
import HeaderFour from "@/layouts/headers/HeaderFour"
import FancyBanner from "@/components/common/FancyBanner"
import ListingThirteenArea from "./ListingThirteenArea"
import PropertyHero from "@/components/common/PropertyHero"

const ListingThirteen = () => {
   return (
      <>
         <HeaderFour />
         <PropertyHero title="Listing 13" badge="For Sale" subtitle="Explore our curated property listings." />
         <DropdownSix />
         <ListingThirteenArea />
         <FancyBanner />
         <FooterFour />
      </>
   )
}

export default ListingThirteen;
