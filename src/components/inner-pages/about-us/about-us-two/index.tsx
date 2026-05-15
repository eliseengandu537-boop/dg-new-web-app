import BreadcrumbTwo from "@/components/common/breadcrumb/BreadcrumbTwo";
import HeaderOne from "@/layouts/headers/HeaderOne";
import BLockFeatureOne from "./BLockFeatureOne";
import BLockFeatureTwo from "./BLockFeatureTwo";
import MeetCeo from "./MeetCeo";
import FancyBanner from "./FancyBanner";
import FooterTwo from "@/layouts/footers/FooterTwo";

const AboutUsTwo = () => {
   return (
      <>
         <HeaderOne style={true} />
         <BreadcrumbTwo title="About DG Property" sub_title="Commercial + investment property" bgImage="/assets/images/media/ll.jpg" />
         <BLockFeatureOne />
         <MeetCeo />
         <BLockFeatureTwo />
         <FancyBanner />
         <FooterTwo />
      </>
   )
}

export default AboutUsTwo;
