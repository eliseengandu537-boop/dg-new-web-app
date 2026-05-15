import CourseDetailPage from "@/components/courses/CourseDetailPage";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Candidate Practitioner Course: Beginner | DG Property",
  description: "Break into commercial property brokerage. Learn cold calling, networking, asset types, valuations and legal documentation with CEO Michela De Gennaro.",
};

const CandidatePractitionerCourse = () => {
  return (
    <Wrapper>
      <CourseDetailPage />
    </Wrapper>
  );
};

export default CandidatePractitionerCourse;
