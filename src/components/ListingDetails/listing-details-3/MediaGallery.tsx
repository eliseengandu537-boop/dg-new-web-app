import Image, { StaticImageData } from "next/image";
import Fancybox from "@/components/common/Fancybox";

import bigCarousel_1 from "@/assets/images/listing/img_52.jpg"
import bigCarousel_2 from "@/assets/images/listing/img_53.jpg"
import bigCarousel_3 from "@/assets/images/listing/img_54.jpg"
import bigCarousel_4 from "@/assets/images/listing/img_55.jpg"
import bigCarousel_5 from "@/assets/images/listing/img_56.jpg"

import smallCarousel_1 from "@/assets/images/listing/img_43_s.jpg"
import smallCarousel_2 from "@/assets/images/listing/img_44_s.jpg"
import smallCarousel_3 from "@/assets/images/listing/img_45_s.jpg"
import smallCarousel_4 from "@/assets/images/listing/img_46_s.jpg"

const largeThumb: string[] = ["1", "2", "3"];

const big_carousel: StaticImageData[] = [bigCarousel_1, bigCarousel_2, bigCarousel_3, bigCarousel_4, bigCarousel_5];
const small_carousel: StaticImageData[] = [smallCarousel_1, smallCarousel_2, smallCarousel_3, smallCarousel_4];
const mainGalleryHeight = "clamp(300px, 52vw, 520px)";
const thumbGalleryHeight = "calc((clamp(300px, 52vw, 520px) - 48px) / 4)";

const MediaGallery = () => {
   return (
      <div className="media-gallery mt-80 lg-mt-50 mb-60">
         <div id="media_slider_3" className="carousel slide row g-3 align-items-stretch">
            {/* Main image */}
            <div className="col-lg-9">
               <div className="bg-white shadow4 border-20 p-20 h-100">
                  <div className="position-relative z-1 overflow-hidden border-20" style={{ height: mainGalleryHeight, minHeight: 180 }}>
                     <div className="img-fancy-btn border-10 fw-500 fs-16 color-dark">
                        See all 37 Photos
                        <Fancybox options={{ Carousel: { infinite: true } }}>
                           {largeThumb.map((thumb, index) => (
                              <a key={index} className="d-block" data-fancybox="img3" href={`/assets/images/listing/img_large_0${thumb}.jpg`}></a>
                           ))}
                        </Fancybox>
                     </div>
                     <div className="carousel-inner" style={{ height: "100%" }}>
                        {big_carousel.map((carousel, index) => (
                           <div key={index} className={`carousel-item h-100 ${index === 0 ? "active" : ""}`}>
                              <Image src={carousel} alt="" className="border-20 w-100" style={{ height: "100%", minHeight: 180, objectFit: "cover" }} />
                           </div>
                        ))}
                     </div>
                     <button className="carousel-control-prev" type="button" data-bs-target="#media_slider_3" data-bs-slide="prev">
                        <i className="bi bi-chevron-left"></i>
                        <span className="visually-hidden">Previous</span>
                     </button>
                     <button className="carousel-control-next" type="button" data-bs-target="#media_slider_3" data-bs-slide="next">
                        <i className="bi bi-chevron-right"></i>
                        <span className="visually-hidden">Next</span>
                     </button>
                  </div>
               </div>
            </div>

            {/* Thumbnails column — each as its own card */}
            <div className="col-lg-3 d-none d-lg-flex flex-column gap-3">
               {small_carousel.map((carousel, i) => (
                  <button
                     key={i}
                     type="button"
                     data-bs-target="#media_slider_3"
                     data-bs-slide-to={`${i}`}
                     className={`p-0 border-0 bg-transparent flex-fill ${i === 0 ? "active" : ""}`}
                     aria-label={`Slide ${i + 1}`}
                     style={{ minHeight: thumbGalleryHeight, height: thumbGalleryHeight, flex: "0 0 auto" }}
                  >
                     <div className="bg-white shadow4 border-15 overflow-hidden" style={{ height: "100%" }}>
                        <Image src={carousel} alt="" className="w-100 h-100" style={{ objectFit: "cover", display: "block" }} />
                     </div>
                  </button>
               ))}
            </div>
         </div>
      </div>
   )
}

export default MediaGallery

