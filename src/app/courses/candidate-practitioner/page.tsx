import CourseDetailPage from "@/components/courses/CourseDetailPage";
import Wrapper from "@/layouts/Wrapper";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  title: "Candidate Practitioner Course: Beginner | DG Property",
  description: "Break into commercial property brokerage. Learn cold calling, networking, asset types, valuations and legal documentation with CEO Michela De Gennaro.",
  path: "/courses/candidate-practitioner",
});

const CandidatePractitionerCourse = () => {
  return (
    <Wrapper>
      <CourseDetailPage />
    </Wrapper>
  );
};

export default CandidatePractitionerCourse;
