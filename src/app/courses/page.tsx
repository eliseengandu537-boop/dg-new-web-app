import CoursesPage from "@/components/courses/CoursesPage";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Courses | DG Property",
  description: "Online property courses by CEO Michela De Gennaro, Candidate Practitioner Course for aspiring brokers.",
};

const Courses = () => {
  return (
    <Wrapper>
      <CoursesPage />
    </Wrapper>
  );
};

export default Courses;
