import Image from "next/image"
import feature_data from "@/data/home-data/FeatureData"
import service_data from "@/data/inner-data/ServiceData";
import Link from "next/link"

import featureShape_3 from "@/assets/images/shape/shape_37.svg"
import serviceShape_1 from "@/assets/images/shape/title_shape_07.svg";
import serviceShape_2 from "@/assets/images/shape/shape_73.svg";
import serviceShape_3 from "@/assets/images/shape/shape_74.svg";

const serviceLinks: Record<string, string> = {
   "Commercial Leasing": "/service_01",
   "Investment Sales": "/service_02",
   "Retail Leasing": "/service_details",
   "Tenant Representation": "/contact",
   "Development Land": "/development-land",
   "Portfolio Advisory": "/contact",
};

const BLockFeatureTwo = () => {
   return (
      <div className="block-feature-sixteen" style={{ margin: 0, borderRadius: 0 }}>
         <div className="block-feature-seventeen bg-pink-three position-relative z-1 pt-120 xl-pt-80 pb-140 xl-pb-80">
            <div className="container">
               <div className="row">
                  <div className="col-xl-8 m-auto">
                     <div className="title-one text-center wow fadeInUp mb-40 lg-mb-20">
                        <h3>
                           Core <span>Services<Image src={serviceShape_1} alt="" className="lazy-img" /></span>
                        </h3>
                        <p className="fs-22 color-dark">
                           Commercial, industrial, investment and development services across South Africa.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="row gx-xxl-5">
                  {service_data.filter((items) => items.page === "service_1").map((item) => (
                     <div key={item.id} className="col-lg-4 col-md-6 d-flex mt-40 wow fadeInUp" data-wow-delay={item.data_delay_time}>
                        <div className="card-style-ten d-flex align-items-start flex-column w-100 h-100">
                           <div className="icon d-flex align-items-center justify-content-center rounded-circle tran3s">
                              <Image src={item.icon} alt="" className="lazy-img" />
                           </div>
                           <h6>{item.title}</h6>
                           <p>{item.desc}</p>
                           <Link href={serviceLinks[item.title] ?? "/our-services"} className="btn-twelve sm mt-auto">
                              {item.btn}
                           </Link>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <Image src={serviceShape_2} alt="" className="lazy-img shapes shape_01" />
            <Image src={serviceShape_3} alt="" className="lazy-img shapes shape_02" />
         </div>

         <div className="block-feature-fourteen pt-150 xl-pt-120 lg-pt-100 pb-150 xl-pb-120 lg-pb-80">
            <div className="container">
               <div className="row">
                  <div className="col-lg-6">
                     <div className="title-one md-mb-30 pe-xxl-4 wow fadeInLeft">
                        <h2 className="font-garamond text-white star-shape">Your dedicated commercial property partner. <span className="star-shape"><Image src={featureShape_3} alt="" className="lazy-img" /></span></h2>
                     </div>
                  </div>
                  <div className="col-xxl-5 col-lg-6 ms-auto">
                     <p className="text-white fs-24 m0 lh-lg  wow fadeInRight">DG Property brings together specialist brokers, deep market knowledge, and a proven track record to serve commercial occupiers, investors and developers across South Africa.</p>
                  </div>
               </div>

               <div className="wow fadeInUp mt-70 xl-mt-50">
                  <div className="row">
                     {feature_data.filter((items) => items.page === "home_6_feature_1").map((item) => (
                        <div key={item.id} className="col-lg-4">
                           <div className="card-style-eight mt-45 wow fadeInUp">
                              <div className="d-flex align-items-start pe-xxl-5">
                                 <Image src={item.icon ? item.icon : ""} alt="" className="lazy-img icon" />
                                 <div className="text">
                                    <h5 className="text-white">{item.title}</h5>
                                    <p>{item.desc}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BLockFeatureTwo
