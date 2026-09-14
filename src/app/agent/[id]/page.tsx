import AgentDetails from "@/components/inner-pages/agent/agent-details";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Team Member Profile | DG Property",
  description: "View a DG Property team member's profile and current property listings.",
  path: "/agent",
});

const AgentProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) => {
  const { id } = await Promise.resolve(params);

  return (
    <Wrapper>
      <AgentDetails id={id} />
    </Wrapper>
  );
};

export default AgentProfilePage;
