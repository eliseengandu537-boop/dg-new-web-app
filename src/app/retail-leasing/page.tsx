import ServiceDetails from "@/components/inner-pages/services/service-details";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Retail Leasing Services | DG Property",
  description: "Retail leasing strategy, tenant sourcing, lease negotiation and tenant-mix advice for landlords, developers and retail brands.",
  path: "/retail-leasing",
});

export default function RetailLeasingPage() {
  return <Wrapper><ServiceDetails /></Wrapper>;
}
