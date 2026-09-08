import ListingDetailsOne from "@/components/ListingDetails/listing-details-1";
import Wrapper from "@/layouts/Wrapper";
import { Suspense } from "react";

export const metadata = {
   title: "Listing Details One DG Property ",
};
const index = () => {
   return (
      <Wrapper>
         <Suspense fallback={<main className="container text-center" style={{ paddingTop: 180, paddingBottom: 120 }}><p>Loading property details...</p></main>}>
            <ListingDetailsOne />
         </Suspense>
      </Wrapper>
   )
}

export default index
