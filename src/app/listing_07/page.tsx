import ListingSeven from "@/components/inner-listing/listing-07";
import Wrapper from "@/layouts/Wrapper";
import { Suspense } from "react";

export const metadata = {
   title: "Commercial Property Listings | DG Property",
   description:
      "Browse commercial property for sale, to let and for investment across South Africa. Filter by property type, location and price.",
   alternates: { canonical: "/listing_07" },
   openGraph: {
      title: "Commercial Property Listings | DG Property",
      description:
         "Browse commercial property for sale, to let and for investment across South Africa.",
      url: "/listing_07",
   },
};
const index = () => {
   return (
      <Wrapper>
         <Suspense fallback={<main className="container text-center" style={{ paddingTop: 180, paddingBottom: 120 }}><p>Loading properties...</p></main>}>
            <ListingSeven />
         </Suspense>
      </Wrapper>
   )
}

export default index
