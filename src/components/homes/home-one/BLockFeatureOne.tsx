import Image from "next/image"
import titleShape from "@/assets/images/shape/title_shape_01.svg"

const BLockFeatureOne = () => {
   return (
      <div className="block-feature-one mt-130 xl-mt-100 lg-mt-80 mb-150 xl-mb-100 lg-mb-80">
         <div className="container">
            <div className="title-one text-center mb-50 xl-mb-30 lg-mb-20 wow fadeInUp">
               <h3>Unlock DG-property&apos;s <span>advantages <Image src={titleShape} alt="" className="lazy-img" /></span></h3>
               <p className="fs-24">Your trusted real estate partner in every transaction.</p>
            </div>


         </div>
      </div>
   )
}

export default BLockFeatureOne
