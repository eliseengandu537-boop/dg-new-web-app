import Agent from "@/components/inner-pages/agent/agent";
import Wrapper from "@/layouts/Wrapper";

export const dynamic = "force-dynamic";

export const metadata = {
   title: "Meet the Team | DG Property",
   description: "Meet the management team and commercial property brokers behind DG Property.",
};
const index = () => {
   return (
      <Wrapper>
         <Agent />
      </Wrapper>
   )
}

export default index