import DashboardMessage from "@/components/dashboard/message";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Dashboard Message DG Property",
};
const index = () => {
   return (
      <Wrapper>
         <DashboardMessage />
      </Wrapper>
   )
}

export default index