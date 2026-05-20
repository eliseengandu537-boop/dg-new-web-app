
import FooterFour from "@/layouts/footers/FooterFour"
import FancyBanner from "@/components/common/FancyBanner"
import ListingThreeArea from "./ListingThreeArea"
import HeaderOne from "@/layouts/headers/HeaderOne"
import PropertyHero from "@/components/common/PropertyHero"

const ListingSix = () => {
   return (
      <>
             <HeaderOne style={true} />
             <PropertyHero
                title="Industrial Warehouse"
                badge="To Let"
                subtitle="Warehouses, logistics parks and industrial units available to lease nationwide."
             />
             <ListingThreeArea style={false} />
         <FancyBanner />
         <FooterFour />
      </>
   )
}

export default ListingSix;
