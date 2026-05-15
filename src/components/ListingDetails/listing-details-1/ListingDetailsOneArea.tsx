"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import NiceSelect from "@/ui/NiceSelect"
import MediaGallery from "./MediaGallery"
import Review from "@/components/inner-pages/agency/agency-details/Review"
import Sidebar from "./Sidebar"
import CommonBanner from "../listing-details-common/CommonBanner"
import CommonPropertyOverview from "../listing-details-common/CommonPropertyOverview"
import CommonPropertyFeatureList from "../listing-details-common/CommonPropertyFeatureList"
import CommonAmenities from "../listing-details-common/CommonAmenities"
import CommonPropertyVideoTour from "../listing-details-common/CommonPropertyVideoTour"
import CommonPropertyFloorPlan from "../listing-details-common/CommonPropertyFloorPlan"
import CommonNearbyList from "../listing-details-common/CommonNearbyList"
import CommonSimilarProperty from "../listing-details-common/CommonSimilarProperty"
import CommonProPertyScore from "../listing-details-common/CommonProPertyScore"
import CommonLocation from "../listing-details-common/CommonLocation"
import CommonReviewForm from "../listing-details-common/CommonReviewForm"
import { fetchPublicPropertyById } from "@/utils/dashboardApi"

/** Extract YouTube video ID from any YouTube URL format */
const getYouTubeId = (url?: string | null): string | null => {
   if (!url) return null;
   const m = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
   return m?.[1] ?? null;
};

const ListingDetailsOneArea = () => {
   const searchParams = useSearchParams();
   const [property, setProperty] = useState<any>(null);

   useEffect(() => {
      const id = searchParams.get("id");
      if (!id) return;
      fetchPublicPropertyById(parseInt(id))
         .then((res) => setProperty(res.data))
         .catch(() => {});
   }, [searchParams]);

   const selectHandler = (e: any) => {};

   const hasVideo = !!(property?.virtualTourLink);
   const hasFloorPlans = property?.floorPlans?.length > 0;
   const hasNearby = property?.nearby?.length > 0;

   return (
      <div className="listing-details-one theme-details-one bg-pink pt-180 lg-pt-150 pb-150 xl-pb-120">
         <div className="container">
            <CommonBanner property={property} />
            <MediaGallery images={property?.gallery} featuredImage={property?.featuredImage} />
            <div className="property-feature-list bg-white shadow4 border-20 p-40 mt-50 mb-60">
               <h4 className="sub-title-one mb-40 lg-mb-20">Property Overview</h4>
               <CommonPropertyOverview categoryDetails={property?.categoryDetails} category={property?.category} listingType={property?.listingType} />
            </div>
            <div className="row">
               <div className="col-xl-8">
                  <div className="property-overview mb-50 bg-white shadow4 border-20 p-40">
                     <h4 className="mb-20">Overview</h4>
                     <p className="fs-20 lh-lg">{property?.description || "No description available for this property."}</p>
                  </div>
                  <div className="property-feature-accordion bg-white shadow4 border-20 p-40 mb-50">
                     <h4 className="mb-20">Property Features</h4>
                     <p className="fs-20 lh-lg">{property?.category ? "" : "Risk management and compliance, when approached strategically, have the potential to go beyond mitigating threats."}</p>
                     <div className="accordion-style-two mt-45">
                        <CommonPropertyFeatureList categoryDetails={property?.categoryDetails} category={property?.category} />
                     </div>
                  </div>
                  {(property?.amenities?.length > 0 || !property) && (
                     <div className="property-amenities bg-white shadow4 border-20 p-40 mb-50">
                        <CommonAmenities amenities={property?.amenities} />
                     </div>
                  )}
                  {hasVideo && (
                     <div className="property-video-tour mb-50">
                        <CommonPropertyVideoTour videoUrl={property?.virtualTourLink} featuredImage={property?.featuredImage} />
                     </div>
                  )}
                  {hasFloorPlans && (
                     <CommonPropertyFloorPlan style={false} floorPlans={property?.floorPlans} />
                  )}
                  {(hasNearby || !property) && (
                     <div className="property-nearby bg-white shadow4 border-20 p-40 mb-50">
                        <CommonNearbyList nearby={property?.nearby} />
                     </div>
                  )}
                  <CommonSimilarProperty />
                  <div className="property-score bg-white shadow4 border-20 p-40 mb-50">
                     <CommonProPertyScore />
                  </div>
                  <div className="property-location mb-50">
                     <CommonLocation
                        address={property?.address}
                        suburb={property?.suburb}
                        city={property?.city}
                        province={property?.province}
                        gpsLat={property?.gpsLat}
                        gpsLng={property?.gpsLng}
                     />
                  </div>

                  <div className="review-panel-one bg-white shadow4 border-20 p-40 mb-50">
                     <div className="position-relative z-1">
                        <div className="d-sm-flex justify-content-between align-items-center mb-10">
                           <h4 className="m0 xs-pb-30">Reviews</h4>
                           <NiceSelect className="nice-select"
                              options={[
                                 { value: "01", text: "Newest" },
                                 { value: "02", text: "Best Seller" },
                                 { value: "03", text: "Best Match" },
                              ]}
                              defaultCurrent={0}
                              onChange={selectHandler}
                              name=""
                              placeholder="" />
                        </div>
                        <Review style={true} />
                     </div>
                  </div>
                  <div className="review-form bg-white shadow4 border-20 p-40">
                     <CommonReviewForm />
                  </div>
               </div>
               <Sidebar agentInfo={property?.agentInfo} propertyTitle={property?.title} />
            </div>
         </div>
      </div>
   )
}

export default ListingDetailsOneArea
