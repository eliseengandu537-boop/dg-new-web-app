import DropdownSix from "@/components/search-dropdown/home-dropdown/DropdownSix";

import FooterFour from "@/layouts/footers/FooterFour"
import FancyBanner from "@/components/common/FancyBanner"
import ListingFourteenArea from "./ListingFourteenArea"
import HeaderOne from "@/layouts/headers/HeaderOne"
import PropertyHero from "@/components/common/PropertyHero"

const ListingEleven = () => {
   return (
      <>
         <HeaderOne style={true} />
         <PropertyHero title="Listing 14" badge="For Sale" subtitle="Explore our curated property listings." />
         <DropdownSix />
         <ListingFourteenArea />
         <FooterFour />
      </>
   )
}

export default ListingEleven;
