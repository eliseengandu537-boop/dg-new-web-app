import BlogDetails from "@/components/blogs/blog-details";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Blog Details DG Property",
};
const index = () => {
   return (
      <Wrapper>
         <BlogDetails />
      </Wrapper>
   )
}

export default index