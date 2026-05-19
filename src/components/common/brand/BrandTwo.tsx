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

type BrandLogo = {
   key: string
   src: StaticImageData
   width?: number
   height?: number
}

const brand_data: BrandLogo[] = [
   { key: "l1", src: brandLogo_1 },
   { key: "l2", src: brandLogo_2 },
   { key: "l3", src: brandLogo_3 },
   { key: "l4", src: brandLogo_4 },
   { key: "l5", src: brandLogo_5 },
   { key: "l6", src: brandLogo_6 },
   { key: "l7", src: brandLogo_7 },
   { key: "l8", src: brandLogo_8 },
   { key: "l9", src: brandLogo_9 },
   { key: "l10", src: brandLogo_10 },
   { key: "l11", src: brandLogo_11 },
   { key: "l12", src: brandLogo_12 },
   { key: "l13", src: brandLogo_13 },
]

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
            {brand_data.map((brand) => (
               <div key={brand.key} className="item" style={{ padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image
                     src={brand.src}
                     alt=""
                     style={{
                        height: brand.height || 80,
                        width: brand.width || 180,
                        objectFit: "contain",
                        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.4))",
                     }}
                  />
               </div>
            ))}
         </Slider>
      </div>
   )
}

export default BrandTwo
