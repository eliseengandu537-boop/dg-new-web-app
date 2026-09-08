import PropertyNewsPage from "@/components/inner-pages/property-news/PropertyNewsPage";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Property News & Market Insights | DG Property",
  description:
    "Read DG Property newsletters covering South African commercial property, investment opportunities, retail leasing and development trends.",
  path: "/property-news",
});

export default function Page() {
  return <PropertyNewsPage />;
}
