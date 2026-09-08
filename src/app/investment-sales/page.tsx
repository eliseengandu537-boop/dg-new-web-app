import ServiceTwo from "@/components/inner-pages/services/service-two";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Commercial Investment Sales | DG Property",
  description: "Strategic commercial property investment sales, acquisitions and disposal advice from DG Property's specialist team.",
  path: "/investment-sales",
});

export default function InvestmentSalesPage() {
  return <Wrapper><ServiceTwo /></Wrapper>;
}
