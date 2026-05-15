
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchAllReviews } from "@/utils/dashboardApi";

const Review = ({ propertyId, style }: { propertyId?: number, style?: any }) => {
   const [reviews, setReviews] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [showAllReviews, setShowAllReviews] = useState(false);
   const maxReviewsToShow = 2;

   useEffect(() => {
      setLoading(true);
      fetchAllReviews(propertyId ? { propertyId } : undefined)
         .then(res => setReviews(res.data?.reviews || []))
         .finally(() => setLoading(false));
   }, [propertyId]);

   const displayedReviews = showAllReviews ? reviews : reviews.slice(0, maxReviewsToShow);

   if (loading) return <div className="review-wrapper mb-35"><p>Loading reviews...</p></div>;

   if (!reviews.length) return <div className="review-wrapper mb-35"><p>No reviews yet.</p></div>;

   return (
      <>
         <div className="review-wrapper mb-35">
            {displayedReviews.map((item) => (
               <div key={item.id} className="review">
                  <div className="text">
                     <div className="d-sm-flex justify-content-between">
                        <div>
                           <h6 className="name">{item.authorName || "Anonymous"}</h6>
                           <div className="time fs-16">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</div>
                        </div>
                        <ul className="rating style-none d-flex xs-mt-10">
                           <li><span className="fst-italic me-2">{item.rating ? `(Rating: ${item.rating})` : ""}</span></li>
                        </ul>
                     </div>
                     <p className="fs-20 mt-20 mb-30">{item.comment}</p>
                  </div>
               </div>
            ))}
         </div>

         {reviews.length > maxReviewsToShow && (
            <div
               className={`load-more-review text-uppercase w-100 tran3s ${style ? "border-15 tran3s" : "fw-500 inverse rounded-0"}`}
               onClick={() => setShowAllReviews(!showAllReviews)}
            >
               {showAllReviews ? 'SHOW LESS' : 'VIEW ALL REVIEWS'}{' '}
               <i className={`bi bi-arrow-${showAllReviews ? 'down' : 'up'}-right`}></i>
            </div>
         )}
      </>
   )
}

export default Review
