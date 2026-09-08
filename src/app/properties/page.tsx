import ListingSeven from "@/components/inner-listing/listing-07";
import Wrapper from "@/layouts/Wrapper";
import { Suspense } from "react";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Commercial Property Listings | DG Property",
  description:
    "Browse commercial property for sale, to let and for investment across South Africa. Filter by property type, location and price.",
  path: "/properties",
});

export default function PropertiesPage() {
  return (
    <Wrapper>
      <Suspense fallback={<main className="container text-center" style={{ paddingTop: 180, paddingBottom: 120 }}><h1>Commercial Property Listings</h1><p>Loading properties...</p></main>}>
        <ListingSeven />
      </Suspense>
    </Wrapper>
  );
}
