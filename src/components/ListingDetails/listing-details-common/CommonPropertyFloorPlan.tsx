import Image from "next/image"

import floorPlan_1 from "@/assets/images/listing/floor_1.jpg"
import floorPlan_2 from "@/assets/images/listing/floor_2.jpg"

interface Props {
   style?: any;
   floorPlans?: string[];
}

const CommonPropertyFloorPlan = ({ style, floorPlans }: Props) => {
   const hasPlans = floorPlans && floorPlans.length > 0;

   return (
      <div className={`property-floor-plan ${style ? "bottom-line-dark pb-40 mb-60" : "mb-50"}`}>
         <h4 className="mb-40">Floor Plans</h4>
         <div className={`p-30 ${style ? "bg-dot" : "bg-white shadow4 border-20"}`}>
            <div id="floor-plan" className="carousel slide">
               <div className="carousel-indicators">
                  {hasPlans
                     ? floorPlans.map((_, i) => (
                          <button key={i} type="button" data-bs-target="#floor-plan" data-bs-slide-to={`${i}`}
                             className={i === 0 ? "active" : ""} aria-label={`Floor Plan ${i + 1}`}></button>
                        ))
                     : (<>
                           <button type="button" data-bs-target="#floor-plan" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                           <button type="button" data-bs-target="#floor-plan" data-bs-slide-to="1" aria-label="Slide 2"></button>
                           <button type="button" data-bs-target="#floor-plan" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </>)
                  }
               </div>
               <div className="carousel-inner">
                  {hasPlans
                     ? floorPlans.map((src, i) => (
                          <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img src={src} alt={`Floor Plan ${i + 1}`} className="w-100" style={{ maxHeight: 500, objectFit: "contain" }} />
                          </div>
                        ))
                     : (<>
                           <div className="carousel-item active"><Image src={floorPlan_1} alt="" className="w-100" /></div>
                           <div className="carousel-item"><Image src={floorPlan_2} alt="" className="w-100" /></div>
                           <div className="carousel-item"><Image src={floorPlan_1} alt="" className="w-100" /></div>
                        </>)
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default CommonPropertyFloorPlan;
