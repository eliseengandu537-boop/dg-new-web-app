import Image from "next/image"
import Link from "next/link"

import titleShape from "@/assets/images/shape/title_shape_06.svg";
import Count from "@/components/common/Count";

interface ContentType {
   sub_title: string;
   desc_1: JSX.Element;
   title_1: string;
   title_2: string;
   desc_2: JSX.Element;
   desc_3: JSX.Element;
}

const feature_content: ContentType = {
   sub_title: "About DG Property",
   desc_1: (<>DG Property is a Johannesburg brokerage specialising in commercial sales, leasing, valuations and investment properties across South Africa.</>),
   title_1: "Who we are",
   title_2: "Our approach",
   desc_2: (<>We are a relationship-led brokerage that connects landlords, occupiers and investors with properties that fit long-term commercial goals.</>),
   desc_3: (<>From leasing and investment sales to valuation-led decision making, our focus is practical advice, discreet execution and deals structured to last.</>),
}

const { sub_title, desc_1, title_1, title_2, desc_2, desc_3 } = feature_content;

const BLockFeatureOne = () => {
   return (
      <div className="block-feature-two mt-150 xl-mt-100">
         <div className="container">
            <div className="row gx-xl-5">
               <div className="col-lg-6 wow fadeInLeft">
                  <div className="me-xxl-4">
                     <div className="title-one mb-60 lg-mb-40">
                        <div className="upper-title">{sub_title}</div>
                        <h3>Commercial property, brokered with <span>purpose<Image src={titleShape} alt="" className="lazy-img" /></span>.</h3>
                        <p className="fs-22">{desc_1}</p>
                     </div>
                     <Link href="/inquiry" className="btn-two">Speak To Our Team</Link>
                     <div className="counter-wrapper border-top pt-40 md-pt-10 mt-65 md-mt-40">
                        <div className="row">
                           <div className="col-xxl-6 col-sm-5">
                              <div className="counter-block-one mt-20">
                                 <div className="main-count fw-500 color-dark"><span className="counter"><Count number={18} /></span></div>
                                 <span>Team members</span>
                              </div>
                           </div>
                           <div className="col-xxl-6 col-sm-7">
                              <div className="counter-block-one mt-20">
                                 <div className="main-count fw-500 color-dark"><span className="counter"><Count number={152} /></span>+</div>
                                 <span>Retail leases</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-lg-6 wow fadeInRight">
                  <div className="block-two md-mt-40">
                     <div className="bg-wrapper">
                        <h5>{title_1}</h5>
                        <p className="fs-22 lh-lg mt-20">{desc_2}</p>
                        <h5 className="top-line">{title_2} </h5>
                        <p className="fs-22 lh-lg mt-20">{desc_3}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BLockFeatureOne
