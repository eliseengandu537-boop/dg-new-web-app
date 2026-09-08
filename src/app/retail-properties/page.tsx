import ListingNine from "@/components/inner-listing/listing-09";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Retail Properties | DG Property",
  description: "Browse retail property and leasing opportunities in shopping centres, mixed-use precincts and high-traffic locations across South Africa.",
  path: "/retail-properties",
});

export default function RetailPropertiesPage() {
  return <Wrapper><ListingNine /></Wrapper>;
}
