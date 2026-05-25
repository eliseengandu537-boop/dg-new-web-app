import Image from "next/image"
import Link from "next/link";

import featureImg_3 from "@/assets/images/shape/shape_40.svg";
import featureImg_5 from "@/assets/images/shape/title_shape_05.svg";

const BlockFeatureOne = () => {
   return (
      <div className="block-feature-eight position-relative z-1 mt-170 xl-mt-120">
         <div className="container">
            <div className="position-relative">
               <div className="row">
                  <div className="col-lg-6">
                     <div className="pe-xl-5 wow fadeInLeft">
                        <div className="row align-items-end">
                           <div className="col-6">
                              <div className="media-block position-relative z-1">
                                 <Image src="/assets/images/media/332.jpg" alt="" className="lazy-img main-img w-100" width={600} height={900} style={{ objectFit: "cover", height: "520px" }} />
                                 <Image src={featureImg_3} alt="" className="lazy-img shapes shape_01" />
                              </div>
                           </div>
                           <div className="col-6">
                              <div className="media-block position-relative z-1">
                                 <Image src="/assets/images/media/33.jpg" alt="" className="lazy-img main-img w-100" width={600} height={900} style={{ objectFit: "cover", height: "520px" }} />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-6">
                     <div className="block-two ms-xxl-5 wow fadeInRight">
                        <div className="bg-wrapper md-mt-60">
                           <div className="title-one m0">
                              <h3>18+  <span>Commercial<Image src={featureImg_5} alt="" className="lazy-img" /></span> Specialists. One Focused Team.</h3>
                           </div>
                           <p className="fs-22 mt-45 mb-60 xl-mb-40 pe-xxl-5">DG Property is a specialist commercial property brokerage headquartered in Johannesburg.</p>
                           <ul className="list-style-one fs-22 color-dark style-none">
                              <li>R250M+ in completed transactions</li>
                              <li>Commercial, industrial and investment expertise</li>
                              <li>Active in all major SA property markets</li>
                           </ul>
                           <div className="mt-60 lg-mt-40">
                              <Link href="/inquiry" className="btn-two">Send Inquiry</Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BlockFeatureOne
