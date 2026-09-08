import ServiceThree from "@/components/inner-pages/services/service-three";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Development Leasing Services | DG Property",
  description: "Commercial development leasing guidance that connects sites, market demand and the right tenants from planning through launch.",
  path: "/development-leasing",
});

export default function DevelopmentLeasingPage() {
  return <Wrapper><ServiceThree /></Wrapper>;
}
