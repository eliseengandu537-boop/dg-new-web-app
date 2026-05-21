import Agent from "@/components/inner-pages/agent/agent";
import Wrapper from "@/layouts/Wrapper";

export const dynamic = "force-dynamic";

export const metadata = {
   title: "Agent DG Property",
};
const index = () => {
   return (
      <Wrapper>
         <Agent />
      </Wrapper>
   )
}

export default index