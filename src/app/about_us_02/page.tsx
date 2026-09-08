import AboutUsTwo from "@/components/inner-pages/about-us/about-us-two";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
   title: "About DG Property | Commercial Property Specialists",
   description: "Meet DG Property, a Johannesburg-based team specialising in commercial, industrial, retail and investment property across South Africa.",
   path: "/about_us_02",
});
const index = () => {
   return (
      <Wrapper>
         <AboutUsTwo />
      </Wrapper>
   )
}

export default index
