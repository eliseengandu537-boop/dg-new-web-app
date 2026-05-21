import DashboardAddProperty from "@/components/dashboard/add-property";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Dashboard Add Property DG Property",
};
const index = () => {
   return (
      <Wrapper>
         <DashboardAddProperty />
      </Wrapper>
   )
}

export default index