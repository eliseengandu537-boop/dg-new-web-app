import Contact from "@/components/inner-pages/contact";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
   title: "Contact DG Property | Commercial Property Advice",
   description:
      "Speak to the DG Property team about commercial leasing, investment sales, development opportunities or property disposals.",
   path: "/contact",
});
const index = () => {
   return (
      <Wrapper>
         <Contact />
      </Wrapper>
   )
}

export default index
