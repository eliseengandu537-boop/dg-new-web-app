"use client"
import Image, { StaticImageData } from "next/image";
import Fancybox from "@/components/common/Fancybox";

import galleryThumb_1 from "@/assets/images/listing/img_57.jpg"
import galleryThumb_2 from "@/assets/images/listing/img_58.jpg"
import galleryThumb_3 from "@/assets/images/listing/img_59.jpg"
import galleryThumb_4 from "@/assets/images/listing/img_60.jpg"

const gallery_data: StaticImageData[] = [galleryThumb_1, galleryThumb_2, galleryThumb_3, galleryThumb_4];

const MediaGallery = () => {
   return (
      <div className="media-gallery mt-100 xl-mt-80 lg-mt-60">
         <div id="media_slider_4" className="carousel slide row g-3 align-items-stretch">
            {/* Main image */}
            <div className="col-lg-9">
               <div className="bg-white shadow4 border-20 p-10 h-100">
                  <div className="position-relative z-1 overflow-hidden border-20" style={{ height: "100%", minHeight: 120, maxHeight: 260 }}>
                     <div className="img-fancy-btn border-10 fw-500 fs-16 color-dark">
                        See all {gallery_data.length} Photos
                        <Fancybox options={{ Carousel: { infinite: true } }}>
                           {gallery_data.map((_, i) => (
                              <a key={i} className="d-block" data-fancybox="img4" href={`/assets/images/listing/img_large_0${(i % 3) + 1}.jpg`}></a>
                           ))}
                        </Fancybox>
                     </div>
                     <div className="carousel-inner" style={{ height: "100%", maxHeight: 260 }}>
                        {gallery_data.map((gallery, i) => (
                           <div key={i} className={`carousel-item h-100 ${i === 0 ? "active" : ""}`}>
                              <Image src={gallery} alt="" className="w-100 border-20" style={{ height: "220px", objectFit: "cover", borderRadius: "12px" }} />
                           </div>
                        ))}
                     </div>
                     <button className="carousel-control-prev" type="button" data-bs-target="#media_slider_4" data-bs-slide="prev">
                        <i className="bi bi-chevron-left"></i>
                        <span className="visually-hidden">Previous</span>
                     </button>
                     <button className="carousel-control-next" type="button" data-bs-target="#media_slider_4" data-bs-slide="next">
                        <i className="bi bi-chevron-right"></i>
                        <span className="visually-hidden">Next</span>
                     </button>
                  </div>
               </div>
            </div>

            {/* Thumbnails column — each as its own card */}
            <div className="col-lg-3 d-none d-lg-flex flex-column gap-3">
               {gallery_data.map((gallery, i) => (
                  <button
                     key={i}
                     type="button"
                     data-bs-target="#media_slider_4"
                     data-bs-slide-to={`${i}`}
                     className={`p-0 border-0 bg-transparent flex-fill ${i === 0 ? "active" : ""}`}
                     aria-label={`Slide ${i + 1}`}
                     style={{ minHeight: 0 }}
                  >
                     <div className="bg-white shadow4 border-15 overflow-hidden" style={{ height: "100%" }}>
                        <Image src={gallery} alt="" className="w-100 h-100" style={{ objectFit: "cover", display: "block" }} />
                     </div>
                  </button>
               ))}
            </div>
         </div>
      </div>
   )
}

export default MediaGallery

