import CoursesPage from "@/components/courses/CoursesPage";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Courses | DG Property",
  description: "Online property courses by CEO Michela De Gennaro, Candidate Practitioner Course for aspiring brokers.",
  path: "/courses",
});

const Courses = () => {
  return (
    <Wrapper>
      <CoursesPage />
    </Wrapper>
  );
};

export default Courses;
