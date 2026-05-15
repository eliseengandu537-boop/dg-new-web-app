import DropdownSix from "@/components/search-dropdown/home-dropdown/DropdownSix";

import FooterFour from "@/layouts/footers/FooterFour"
import FancyBanner from "@/components/common/FancyBanner"
import ListingTwelveArea from "./ListingTwelveArea"
import HeaderOne from "@/layouts/headers/HeaderOne"
import PropertyHero from "@/components/common/PropertyHero"

const ListingTwelve = () => {
   return (
      <>
         <HeaderOne style={true} />
         <PropertyHero title="Listing 12" badge="For Sale" subtitle="Explore our curated property listings." />
         <DropdownSix />
         <ListingTwelveArea />
         <FancyBanner />
         <FooterFour />
      </>
   )
}

export default ListingTwelve;
