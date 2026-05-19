import Image from "next/image"
import Link from "next/link"
import titleShape from "@/assets/images/shape/title_shape_10.svg"

const BLockFeatureThree = () => {
   return (
      <>
         {/* Investment Sales Services & Process */}
         <div className="block-feature-seven position-relative z-1 mt-150 xl-mt-120 lg-mt-100">
            <div className="container container-large">
               <div className="text-center wow fadeInUp">
                  <div className="title-one">
                     <h3>Investment Sales <span>Services <Image src={titleShape} alt="" className="lazy-img" /></span>&amp; Process</h3>
                  </div>
               </div>
               <div className="row mt-60 lg-mt-40">
                  <div className="col-lg-10 mx-auto text-center">
                     <p className="fs-20 lh-lg mb-25 color-dark">Our investment sales process is designed to protect the value and confidentiality of each transaction. Unlike traditional agencies, we do not publicly market investment assets on mass-market platforms such as Property24 or Private Property. Instead, we operate through a curated network of qualified investors and high-net-worth individuals who have demonstrated genuine acquisition capability.</p>
                     <p className="fs-20 lh-lg mb-25 color-dark">Each engagement begins with a Non-Disclosure Agreement (NDA) to ensure full confidentiality before any information is shared. Our process is structured, professional, and designed to match the right buyer to the right asset, discreetly and efficiently.</p>
                     <p className="fs-20 lh-lg color-dark">From initial mandate to final transfer, we manage the full investment sales journey, including pricing strategy, buyer qualification, due diligence support, and transaction coordination.</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Types of Investment Properties */}
         <div className="block-feature-seven position-relative z-1 mt-120 xl-mt-100 lg-mt-80">
            <div className="container container-large">
               <div className="text-center wow fadeInUp">
                  <div className="title-one">
                     <h3>Types of <span>Investment <Image src={titleShape} alt="" className="lazy-img" /></span>Properties</h3>
                  </div>
               </div>
               <div className="row gx-xxl-5 mt-60 lg-mt-40">
                  <div className="col-lg-4 col-md-6 wow fadeInUp">
                     <div className="card-style-two overflow-hidden position-relative z-1 mt-30 p-40 bg-light rounded-4">
                        <div className="content text-center">
                           <div className="btn-line tran3s fw-500 text-uppercase mb-15">Investment Type</div>
                           <h4 className="mt-15 mb-20">Retail Centres</h4>
                           <p className="color-dark">Strip malls, neighbourhood centres, and community retail hubs generating consistent foot traffic and lease income.</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6 wow fadeInUp">
                     <div className="card-style-two overflow-hidden position-relative z-1 mt-30 p-40 bg-light rounded-4">
                        <div className="content text-center">
                           <div className="btn-line tran3s fw-500 text-uppercase mb-15">Investment Type</div>
                           <h4 className="mt-15 mb-20">Filling Stations</h4>
                           <p className="color-dark">Forecourt investments with long-term fuel and convenience retail leases, offering stable, contractual income streams.</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6 wow fadeInUp">
                     <div className="card-style-two overflow-hidden position-relative z-1 mt-30 p-40 bg-light rounded-4">
                        <div className="content text-center">
                           <div className="btn-line tran3s fw-500 text-uppercase mb-15">Investment Type</div>
                           <h4 className="mt-15 mb-20">Industrial Properties</h4>
                           <p className="color-dark">Warehouses, logistics hubs, and light industrial facilities, assets in high demand across South Africa&apos;s growing logistics sector.</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="row mt-60">
                  <div className="col-lg-10 mx-auto text-center">
                     <p className="fs-20 lh-lg mb-40 color-dark">Whether you are seeking capital appreciation, stable monthly returns, or a long-term portfolio asset, DG Property has the market access and expertise to match you with the right investment opportunity.</p>
                     <Link href="/contact" className="btn-five md rounded-0"><span>Discuss Your Investment Goals</span></Link>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default BLockFeatureThree
