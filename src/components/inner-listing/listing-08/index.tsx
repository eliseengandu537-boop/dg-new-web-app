import DropdownSix from "@/components/search-dropdown/home-dropdown/DropdownSix";

import FooterFour from "@/layouts/footers/FooterFour"
import HeaderFour from "@/layouts/headers/HeaderFour"
import FancyBanner from "@/components/common/FancyBanner"
import ListingEightArea from "./ListingEightArea"
import PropertyHero from "@/components/common/PropertyHero"

const ListingEight = () => {
   return (
      <>
         <HeaderFour />
         <PropertyHero title="Listing 08" badge="For Sale" subtitle="Explore our curated property listings." />
         <DropdownSix />
         <ListingEightArea style={false} />
         <FancyBanner />
         <FooterFour />
      </>
   )
}

export default ListingEight;
