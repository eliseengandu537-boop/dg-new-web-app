import DropdownSix from "@/components/search-dropdown/home-dropdown/DropdownSix";

import HeaderFour from "@/layouts/headers/HeaderFour"
import ListingSixteenArea from "./ListingSixteenArea"
import PropertyHero from "@/components/common/PropertyHero"

const ListingSix = () => {
   return (
      <>
         <HeaderFour />
         <PropertyHero title="Listing 16" badge="For Sale" subtitle="Explore our curated property listings." />
         <DropdownSix />
         <ListingSixteenArea />
      </>
   )
}

export default ListingSix;
