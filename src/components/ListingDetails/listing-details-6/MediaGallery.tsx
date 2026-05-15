import Fancybox from "@/components/common/Fancybox";

interface Props {
   featuredImage?: string;
   gallery?: string[];
   title?: string;
}

const mainGalleryHeight = "clamp(300px, 52vw, 520px)";
const thumbGalleryHeight = "calc((clamp(300px, 52vw, 520px) - 48px) / 4)";

const MediaGallery = ({ featuredImage, gallery = [], title = "" }: Props) => {
   // Build full image list: featured first, then gallery extras
   const allImages: string[] = [];
   if (featuredImage) allImages.push(featuredImage);
   gallery.forEach((img) => { if (img && img !== featuredImage) allImages.push(img); });

   if (allImages.length === 0) {
      return (
         <div className="media-gallery-grid p0 mb-60">
            <div className="bg-white shadow4 border-20 p-30" style={{ minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
               <div style={{ textAlign: "center", color: "#a0aec0" }}>
                  <i className="bi bi-building" style={{ fontSize: 64 }}></i>
                  <p className="mt-3 fs-18">No images available</p>
               </div>
            </div>
         </div>
      );
   }

   const sliderId = "media_slider_6";

   return (
      <div className="media-gallery-grid p0 mb-60">
         <div id={sliderId} className="carousel slide row g-3 align-items-stretch">
            {/* Main image */}
            <div className="col-lg-9">
               <div className="bg-white shadow4 border-20 p-20 h-100">
                  <div className="position-relative z-1 overflow-hidden border-20" style={{ height: mainGalleryHeight, minHeight: 180 }}>
                     <div className="img-fancy-btn border-10 fw-500 fs-16 color-dark">
                        See all {allImages.length} Photos
                        <Fancybox options={{ Carousel: { infinite: true } }}>
                           {allImages.map((img, index) => (
                              <a key={index} className="d-block" data-fancybox="prop-gallery" href={img}></a>
                           ))}
                        </Fancybox>
                     </div>
                     <div className="carousel-inner" style={{ height: "100%" }}>
                        {allImages.map((img, index) => (
                           <div key={index} className={`carousel-item h-100 ${index === 0 ? "active" : ""}`}>
                              <img src={img} alt={title} className="border-20 w-100"
                                 style={{ height: "100%", minHeight: 180, objectFit: "cover" }} />
                           </div>
                        ))}
                     </div>
                     <button className="carousel-control-prev" type="button" data-bs-target={`#${sliderId}`} data-bs-slide="prev">
                        <i className="bi bi-chevron-left"></i>
                        <span className="visually-hidden">Previous</span>
                     </button>
                     <button className="carousel-control-next" type="button" data-bs-target={`#${sliderId}`} data-bs-slide="next">
                        <i className="bi bi-chevron-right"></i>
                        <span className="visually-hidden">Next</span>
                     </button>
                  </div>
               </div>
            </div>

            {/* Thumbnails column — each as its own card */}
            <div className="col-lg-3 d-none d-lg-flex flex-column gap-3">
               {allImages.slice(0, 4).map((img, i) => (
                  <button
                     key={i}
                     type="button"
                     data-bs-target={`#${sliderId}`}
                     data-bs-slide-to={`${i}`}
                     className={`p-0 border-0 bg-transparent flex-fill ${i === 0 ? "active" : ""}`}
                     aria-label={`Slide ${i + 1}`}
                     style={{ minHeight: thumbGalleryHeight, height: thumbGalleryHeight, flex: "0 0 auto" }}
                  >
                     <div className="bg-white shadow4 border-15 overflow-hidden" style={{ height: "100%" }}>
                        <img src={img} alt="" className="w-100 h-100" style={{ objectFit: "cover", display: "block" }} />
                     </div>
                  </button>
               ))}
            </div>
         </div>
      </div>
   );
}

export default MediaGallery
