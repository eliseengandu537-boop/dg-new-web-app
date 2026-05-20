import Image from "next/image"
import Link from "next/link"
import Count from "@/components/common/Count"

import titleShape from "@/assets/images/shape/shape_37.svg"

const BLockFeatureOne = () => {
   return (
      <div className="block-feature-fifteen mt-150 xl-mt-100 mb-140 xl-mb-80">
         <div className="container">
            <div className="row gx-xl-5">
               <div className="col-xl-6 col-lg-7 wow fadeInLeft">
                  <div className="me-xxl-4 md-mb-50">
                     <div className="title-one mb-30 lg-mb-20">
                        <div className="upper-title">WHO WE ARE</div>
                        <h2 className="font-garamond">Trusted Commercial Property Specialists. <span className="star-shape"><Image src={titleShape} alt="" className="lazy-img" /></span></h2>
                     </div>
                     <p className="fs-20 mb-20">We are a specialist property company focused on delivering tailored solutions across the commercial, industrial and retail sectors. With a deep understanding of market dynamics and client needs, we connect businesses with spaces that support growth, efficiency and long-term success.</p>
                     <p className="fs-20 mb-35">Our approach is built on strong relationships, strategic insight and a commitment to delivering value at every stage of the property journey.</p>
                     <div className="accordion-style-three">
                        <div className="accordion" id="accordionThree">
                           <div className="accordion-item">
                              <h2 className="accordion-header">
                                 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseVision" aria-expanded="false" aria-controls="collapseVision">
                                    Our vision
                                 </button>
                              </h2>
                              <div id="collapseVision" className="accordion-collapse collapse" data-bs-parent="#accordionThree">
                                 <div className="accordion-body">
                                    <p>To be the most trusted commercial property partner in South Africa — the first call for landlords, occupiers and investors who value sound advice and lasting relationships over quick transactions.</p>
                                 </div>
                              </div>
                           </div>
                           <div className="accordion-item">
                              <h2 className="accordion-header">
                                 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseValues" aria-expanded="false" aria-controls="collapseValues">
                                    Our values
                                 </button>
                              </h2>
                              <div id="collapseValues" className="accordion-collapse collapse" data-bs-parent="#accordionThree">
                                 <div className="accordion-body">
                                    <p>Integrity, deep market knowledge and a genuine client-first approach guide every mandate we take on — whether it is a lease, an investment sale or a valuation.</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <Link href="contact" className="btn-five mt-50 lg-mt-30">Contact us</Link>
                  </div>
               </div>
               <div className="col-xl-6 col-lg-5 d-lg-flex wow fadeInRight">
                  <div className="media-block h-100 w-100 ps-xl-5">
                     <div className="bg-img position-relative" style={{ backgroundImage: `url(/assets/images/media/ll.jpg)` }}>
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
