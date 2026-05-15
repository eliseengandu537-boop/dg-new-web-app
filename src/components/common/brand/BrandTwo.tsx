"use client"
import Image, { StaticImageData } from "next/image"
import Slider from "react-slick"

import brandLogo_1 from "@/assets/images/logo/l1.png"
import brandLogo_2 from "@/assets/images/logo/l2.png"
import brandLogo_3 from "@/assets/images/logo/l3.png"
import brandLogo_4 from "@/assets/images/logo/l4.png"
import brandLogo_5 from "@/assets/images/logo/l5.png"
import brandLogo_6 from "@/assets/images/logo/l6.png"
import brandLogo_7 from "@/assets/images/logo/l7.png"
import brandLogo_8 from "@/assets/images/logo/l8.png"
import brandLogo_9 from "@/assets/images/logo/l9.png"
import brandLogo_10 from "@/assets/images/logo/l10.png"
import brandLogo_11 from "@/assets/images/logo/l11.png"
import brandLogo_12 from "@/assets/images/logo/l12.png"
import brandLogo_13 from "@/assets/images/logo/l13.png"
import brandLogo_14 from "@/assets/images/logo/l14.png"
import brandLogo_15 from "@/assets/images/logo/l15.png"
import brandLogo_16 from "@/assets/images/logo/l16.png"
import brandLogo_17 from "@/assets/images/logo/l17.png"

const brand_data: StaticImageData[] = [brandLogo_1, brandLogo_2, brandLogo_3, brandLogo_4, brandLogo_5, brandLogo_6, brandLogo_7, brandLogo_8, brandLogo_9, brandLogo_10, brandLogo_11, brandLogo_12, brandLogo_13, brandLogo_14, brandLogo_15, brandLogo_16, brandLogo_17]

const setting = {
   dots: false,
   arrows: false,
   centerPadding: '0px',
   slidesToShow: 5,
   slidesToScroll: 1,
   autoplay: true,
   autoplaySpeed: 3500,
   responsive: [
      {
         breakpoint: 1200,
         settings: {
            slidesToShow: 4
         }
      },
      {
         breakpoint: 768,
         settings: {
            slidesToShow: 3
         }
      },
      {
         breakpoint: 576,
         settings: {
            slidesToShow: 2
         }
      }
   ]
}

const BrandTwo = () => {
   return (
      <div style={{ background: "#111", borderRadius: 0, padding: "28px 16px", width: "100%" }}>
         <Slider {...setting} className="partner-logo-one">
            {brand_data.map((brand, i) => (
               <div key={i} className="item" style={{ padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}><Image src={brand} alt="" style={{ height: 80, width: 180, objectFit: "contain", filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.4))" }} /></div>
            ))}
         </Slider>
      </div>
   )
}

export default BrandTwo
