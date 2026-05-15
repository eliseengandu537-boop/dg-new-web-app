import FaqThree from "@/components/common/faq/FaqThree"
import Image from "next/image"
import Link from "next/link"
import Count from "@/components/common/Count"

import titleShape from "@/assets/images/shape/shape_37.svg"

const BLockFeatureOne = () => {
   return (
      <div className="block-feature-fifteen mt-150 xl-mt-100 mb-140 xl-mb-80">
         <div className="container">
            <div className="row gx-xl-5">
               <div className="col-xl-6 col-lg-7 order-lg-last wow fadeInRight">
                  <div className="ms-xxl-5 ps-xl-4 ps-lg-5 md-mb-50">
                     <div className="title-one mb-45 lg-mb-20">
                        <h2 className="font-garamond star-shape">Trusted Commercial Property Specialists. <span className="star-shape"><Image src={titleShape} alt="" className="lazy-img" /></span></h2>
                     </div>
                     <div className="accordion-style-three">
                        <div className="accordion" id="accordionThree">
                           <FaqThree />
                        </div>
                     </div>
                     <Link href="contact" className="btn-five mt-75 lg-mt-50">Contact us</Link>
                  </div>
               </div>
               <div className="col-xl-6 col-lg-5 d-lg-flex wow fadeInLeft">
                  <div className="media-block h-100 w-100 pe-xl-5">
                     <div className="bg-img position-relative" style={{ backgroundImage: `url(/assets/images/media/mics.jpeg)` }}>
                     </div>
                  </div>
               </div>
            </div>

            <div className="wrapper mt-90 lg-mt-40">
               <div className="row justify-content-center">
               <div className="col-md-3 col-sm-6">
                     <div className="counter-block-two text-center dark mt-30">
                        <div className="main-count sm font-garamond fw-500"><span className="counter"><Count number={18} /></span>+</div>
                        <p className="fs-20 mt-15 md-mt-10">Team Members</p>
                     </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                     <div className="counter-block-two text-center dark mt-30">
                        <div className="main-count sm font-garamond fw-500"><span className="counter"><Count number={152} /></span>+</div>
                        <p className="fs-20 mt-15 md-mt-10">Successful Retail Leases</p>
                     </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                     <div className="counter-block-two text-center dark mt-30">
                        <div className="main-count sm font-garamond fw-500"><span className="counter"><Count number={21} /></span>+</div>
                        <p className="fs-20 mt-15 md-mt-10">Successful Investment Sales</p>
                     </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                     <div className="counter-block-two text-center dark mt-30">
                        <div className="main-count sm font-garamond fw-500"><span className="counter"><Count number={152} /></span>+</div>
                        <p className="fs-20 mt-15 md-mt-10">Retail Leases Completed</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BLockFeatureOne
