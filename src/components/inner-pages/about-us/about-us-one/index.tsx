import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import BLockFeatureOne from "./BLockFeatureOne"
import VideoBanner from "@/components/homes/home-seven/VideoBanner"
import BLockFeatureFive from "@/components/homes/home-one/BLockFeatureFive"
import Feedback from "@/components/homes/home-five/Feedback"
import FooterFour from "@/layouts/footers/FooterFour"
import FancyBanner from "@/components/common/FancyBanner"

const AboutUsOne = () => {
   return (
      <>
         <HeaderOne style={true} />
         <BreadcrumbOne title="About DG Property" sub_title="Commercial + investment property" style={false} bgImage="/assets/images/media/ll.jpg" />
         <BLockFeatureOne />
         <VideoBanner />
         <BLockFeatureFive style={true} />
         <Feedback style={true} />
         <FancyBanner style={false} />
         <FooterFour />
      </>
   )
}

export default AboutUsOne
