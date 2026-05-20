
import FooterFour from "@/layouts/footers/FooterFour"
import HeaderFour from "@/layouts/headers/HeaderFour"
import FancyBanner from "@/components/common/FancyBanner"
import ListingNineArea from "./ListingNineArea"
import PropertyHero from "@/components/common/PropertyHero"

const ListingNine = () => {
   return (
      <>
             <HeaderFour />
             <PropertyHero
                title="Retail Leasing"
                badge="To Let"
                subtitle="Retail spaces available to let in top locations."
             />
             <ListingNineArea />
         <FancyBanner />
         <FooterFour />
      </>
   )
}

export default ListingNine;
