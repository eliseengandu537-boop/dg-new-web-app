import AgentDetails from "@/components/inner-pages/agent/agent-details";
import Wrapper from "@/layouts/Wrapper";

export const dynamic = "force-dynamic";

export const metadata = {
   title: "Agent Details DG Property",
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
