import Link from "next/link"

const FancyBanner = () => {
   return (
      <div className="fancy-banner-two position-relative z-1 pt-90 lg-pt-70 pb-90 lg-pb-70">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-8 m-auto text-center">
                  <div className="title-one mb-50 lg-mb-40">
                     <h2 className="text-white fs-lg">Find your next commercial space.</h2>
                     <p className="fs-24 text-white">Retail, office and industrial leasing across South Africa.</p>
                  </div>
                  <Link href="contact" className="btn-six">Talk to Us</Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FancyBanner
