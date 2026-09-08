
import Wrapper from "@/layouts/Wrapper";
import HomeTwo from "@/components/homes/home-two";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "DG Property | Commercial Property Specialists",
  description:
    "Find commercial, industrial, retail and investment property opportunities across South Africa with DG Property.",
  path: "/",
});
const index = () => {
  return (
    <Wrapper>
      <HomeTwo />
    </Wrapper>
  )
}

export default index
