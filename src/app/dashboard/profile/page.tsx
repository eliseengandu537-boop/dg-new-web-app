import DashboardProfile from "@/components/dashboard/profile";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Dashboard Profile DG Property",
};
const index = () => {
   return (
      <Wrapper>
         <DashboardProfile />
      </Wrapper>
   )
}

export default index