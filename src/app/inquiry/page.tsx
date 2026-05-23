import Inquiry from "@/components/inner-pages/inquiry";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Send an Inquiry | DG Property",
   description:
      "Tell us what you're looking for: leasing, investment, development, sales or general questions. We'll route your inquiry to the right person at DG Property.",
};

const InquiryPage = () => {
   return (
      <Wrapper>
         <Inquiry />
      </Wrapper>
   );
};

export default InquiryPage;
