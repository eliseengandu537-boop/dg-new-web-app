import ListingOne from "@/components/inner-listing/listing-01";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Commercial Property",
};
const index = () => {
   return (
      <Wrapper>
         <ListingOne />
      </Wrapper>
   )
}

export default index
