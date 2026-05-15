import AgencyFormOne from "@/components/forms/AgencyFormOne";
import Link from "next/link";

const CommonReviewForm = () => {

   return (
      <>
         <h4 className="mb-20">Leave A Reply</h4>
         <p className="fs-20 lh-lg pb-15">
         <Link href="/login"
				className="color-dark fw-500 text-decoration-underline">Sign in</Link> to post your comment or
            signup if you don&apos;t have any account.</p>

         <AgencyFormOne style={true} />
      </>
   )
}

export default CommonReviewForm;
