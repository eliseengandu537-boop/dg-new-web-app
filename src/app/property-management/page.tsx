import PropertyManagement from "@/components/inner-pages/services/property-management";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Commercial Property Management | DG Property",
  description:
    "Commercial property management for owners, including tenant and lease administration, rentals, arrears, maintenance, operations and owner reporting.",
  path: "/property-management",
});

export default function PropertyManagementPage() {
  return <Wrapper><PropertyManagement /></Wrapper>;
}
