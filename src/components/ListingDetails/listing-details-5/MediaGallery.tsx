import Image from "next/image";
import Fancybox from "@/components/common/Fancybox";

import bigImg_1 from "@/assets/images/listing/img_61.jpg"
import bigImg_2 from "@/assets/images/listing/img_62.jpg"
import bigImg_3 from "@/assets/images/listing/img_63.jpg"
import bigImg_4 from "@/assets/images/listing/img_64.jpg"

const gallery_data = [bigImg_1, bigImg_2, bigImg_3, bigImg_4];
const large_img: string[] = ["1", "2", "3"];
const mainGalleryHeight = "clamp(300px, 52vw, 520px)";
const thumbGalleryHeight = "calc((clamp(300px, 52vw, 520px) - 48px) / 4)";

const MediaGallery = () => {
   return (
      <div className="media-gallery mb-50">
         <div id="media_slider_5" className="carousel slide row g-3 align-items-stretch">
            {/* Main image */}
            <div className="col-lg-9">
               <div className="bg-white shadow4 border-20 p-20 h-100">
                  <div className="position-relative z-1 overflow-hidden border-20" style={{ height: mainGalleryHeight, minHeight: 180 }}>
                     <div className="img-fancy-btn border-10 fw-500 fs-16 color-dark">
                        See all {gallery_data.length} Photos
                        <Fancybox options={{ Carousel: { infinite: true } }}>
                           {large_img.map((thumb, index) => (
                              <a key={index} className="d-block" data-fancybox="gallery9" href={`/assets/images/listing/img_large_0${thumb}.jpg`}></a>
                           ))}
                        </Fancybox>
                     </div>
                     <div className="carousel-inner" style={{ height: "100%" }}>
                        {gallery_data.map((img, i) => (
                           <div key={i} className={`carousel-item h-100 ${i === 0 ? "active" : ""}`}>
                              <Image src={img} alt="" className="w-100 border-20" style={{ height: "100%", minHeight: 180, objectFit: "cover" }} />
                           </div>
                        ))}
                     </div>
                     <button className="carousel-control-prev" type="button" data-bs-target="#media_slider_5" data-bs-slide="prev">
                        <i className="bi bi-chevron-left"></i>
                        <span className="visually-hidden">Previous</span>
                     </button>
                     <button className="carousel-control-next" type="button" data-bs-target="#media_slider_5" data-bs-slide="next">
                        <i className="bi bi-chevron-right"></i>
                        <span className="visually-hidden">Next</span>
                     </button>
                  </div>
               </div>
            </div>

            {/* Thumbnails column — each as its own card */}
            <div className="col-lg-3 d-none d-lg-flex flex-column gap-3">
               {gallery_data.map((img, i) => (
                  <button
                     key={i}
                     type="button"
                     data-bs-target="#media_slider_5"
                     data-bs-slide-to={`${i}`}
                     className={`p-0 border-0 bg-transparent flex-fill ${i === 0 ? "active" : ""}`}
                     aria-label={`Slide ${i + 1}`}
                     style={{ minHeight: thumbGalleryHeight, height: thumbGalleryHeight, flex: "0 0 auto" }}
                  >
                     <div className="bg-white shadow4 border-15 overflow-hidden" style={{ height: "100%" }}>
                        <Image src={img} alt="" className="w-100 h-100" style={{ objectFit: "cover", display: "block" }} />
                     </div>
                  </button>
               ))}
            </div>
         </div>
      </div>
   )
}

export default MediaGallery

