import ListingThree from "@/components/inner-listing/listing-03";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Industrial & Warehouse Property | DG Property",
  description: "Find warehouses, logistics facilities and industrial property for sale or to let across South Africa.",
  path: "/industrial-warehouse",
});

export default function IndustrialWarehousePage() {
  return <Wrapper><ListingThree /></Wrapper>;
}
