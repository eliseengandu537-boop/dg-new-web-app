import FooterOne from "@/layouts/footers/FooterOne"
import HeroBanner from "./HeroBanner"
import Property from "./Property"
import TrustedLogos from "./TrustedLogos"
import InstagramFeed from "./InstagramFeed"
import FAQ from "./FAQ"
import FancyBannerTwo from "./FancyBannerTwo"
import HeaderTwo from "@/layouts/headers/HeaderTwo"

const HomeTwo = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={false} />
      <HeroBanner />
      <Property />
      <TrustedLogos />
      <InstagramFeed />
      <FAQ />
      <FancyBannerTwo/>
      <FooterOne style={true} />
    </>
  )
}

export default HomeTwo
