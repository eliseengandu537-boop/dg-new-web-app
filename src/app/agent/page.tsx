import Agent from "@/components/inner-pages/agent/agent";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
   title: "Meet the Team | DG Property",
   description: "Meet the management team and commercial property brokers behind DG Property.",
   path: "/agent",
});
const index = () => {
   return (
      <Wrapper>
         <Agent />
      </Wrapper>
   )
}

export default index
