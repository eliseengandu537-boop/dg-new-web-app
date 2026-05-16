import AgentDetails from "@/components/inner-pages/agent/agent-details";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Agent Details HOZN - Real Estate React Next js",
};
const index = async ({
   searchParams,
}: {
   searchParams?: Promise<{ id?: string }> | { id?: string };
}) => {
   const resolvedSearchParams = await Promise.resolve(searchParams);

   return (
      <Wrapper>
         <AgentDetails id={resolvedSearchParams?.id} />
      </Wrapper>
   )
}

export default index
