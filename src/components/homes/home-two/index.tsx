import FooterOne from "@/layouts/footers/FooterOne"
import HeroBanner from "./HeroBanner"
import Property from "./Property"
import InstagramFeed from "./InstagramFeed"
import FAQ from "./FAQ"
import FancyBannerTwo from "./FancyBannerTwo"
import HeaderTwo from "@/layouts/headers/HeaderTwo"

const HomeTwo = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={false} />
      <main>
        <HeroBanner />
        <Property />
        <InstagramFeed />
        <FAQ />
        <FancyBannerTwo/>
      </main>
      <FooterOne style={true} />
    </>
  )
}

export default HomeTwo
