import DropdownSix from "@/components/search-dropdown/home-dropdown/DropdownSix";

import FooterFour from "@/layouts/footers/FooterFour"
import ListingFifteenArea from "./ListingFifteenArea"
import HeaderOne from "@/layouts/headers/HeaderOne"
import PropertyHero from "@/components/common/PropertyHero"

const ListingEleven = () => {
   return (
      <>
         <HeaderOne style={true} />
         <PropertyHero title="Listing 15" badge="For Sale" subtitle="Explore our curated property listings." />
         <DropdownSix />
         <ListingFifteenArea />
         <FooterFour />
      </>
   )
}

export default ListingEleven;
