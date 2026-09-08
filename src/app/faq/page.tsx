import Faq from "@/components/inner-pages/faq";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
   title: "Commercial Property FAQs | DG Property",
   description: "Answers to common questions about commercial leasing, investment sales, industrial property, development land and tenant representation.",
   path: "/faq",
});
const index = () => {
   return (
      <Wrapper>
         <Faq />
      </Wrapper>
   )
}

export default index
