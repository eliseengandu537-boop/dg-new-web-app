import DropdownSix from "@/components/search-dropdown/home-dropdown/DropdownSix";

import HeaderFour from "@/layouts/headers/HeaderFour"
import ListingSeventeenArea from "./ListingSeventeenArea"
import PropertyHero from "@/components/common/PropertyHero"

const ListingSix = () => {
   return (
      <>
         <HeaderFour />
         <PropertyHero title="Listing 17" badge="For Sale" subtitle="Explore our curated property listings." />
         <DropdownSix />
         <ListingSeventeenArea />
      </>
   )
}

export default ListingSix;
