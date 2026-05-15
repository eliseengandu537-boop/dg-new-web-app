import Image from "next/image"
import Count from "@/components/common/Count";

import feedbackAvatar from "@/assets/images/media/img_01.jpg";
import feedbackShape_1 from "@/assets/images/shape/shape_14.svg";
import feedbackShape_2 from "@/assets/images/shape/shape_15.svg";

const Feedback = () => {
   return (
      <div className="feedback-section-two md-pb-40 position-relative z-1">
         <div className="container">
            <div className="row feedback-row">
               <div className="col-lg-8 order-lg-last">
                  <div className="main-content position-relative z-1">
                     <div className="feedback-block-two">
                        <blockquote className="font-garamond text-white">&quot;Relationship-led brokerage, sharp market insight and <span>attention to detail</span> are what keep commercial deals moving.&quot;</blockquote>
                        <div className="feedback-author d-flex align-items-center mt-60 md-mt-40">
                           <Image src={feedbackAvatar} alt="" className="rounded-circle avatar" />
                           <div className="ps-4">
                              <h6 className="fs-22 text-white fw-normal mb-5">DG Property</h6>
                              <span className="text-white opacity-50 fw-light">Johannesburg commercial brokerage</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-lg-4 d-flex order-lg-first">
                  <div className="bg-wrapper h-100 w-100 d-flex flex-column justify-content-start">
                     <div className="feedback-stats">
                        <div className="counter-block-two">
                           <div className="main-count font-garamond fw-500"><span className="counter"><Count number={18} /></span></div>
                           <p className="fs-20 fw-light m0">Team members</p>
                        </div>
                        <div className="counter-block-two">
                           <div className="main-count font-garamond fw-500"><span className="counter"><Count number={152} /></span>+</div>
                           <p className="fs-20 fw-light m0">Retail leases</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Image src={feedbackShape_1} alt="" className="lazy-img shapes shape_01" />
         <Image src={feedbackShape_2} alt="" className="lazy-img shapes shape_02" />
      </div>
   )
}

export default Feedback
