"use client"
import { useState } from "react";
import VideoPopup from "@/modals/VideoPopup";
import Image from "next/image"
import videoImg from "@/assets/images/listing/img_47.jpg";

/** Extract YouTube video ID from any YouTube URL format */
const getYouTubeId = (url?: string | null): string | null => {
   if (!url) return null;
   const m = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
   return m?.[1] ?? null;
};

interface Props {
   videoUrl?: string | null;
   featuredImage?: string | null;
}

const CommonPropertyVideoTour = ({ videoUrl, featuredImage }: Props) => {
   const [isVideoOpen, setIsVideoOpen] = useState(false);
   const youtubeId = getYouTubeId(videoUrl);

   const handlePlay = () => {
      if (youtubeId) {
         setIsVideoOpen(true);
      } else if (videoUrl) {
         window.open(videoUrl, "_blank", "noopener,noreferrer");
      }
   };

   return (
      <>
         <h4 className="mb-40">Video Tour</h4>
         <div className="bg-white shadow4 border-20 p-15">
            <div className="position-relative border-15 image-bg overflow-hidden z-1">
               {featuredImage
                  ? /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={featuredImage} alt="Video Tour" className="lazy-img w-100" style={{ height: 300, objectFit: "cover" }} />
                  : <Image src={videoImg} alt="" className="lazy-img w-100" />
               }
               {(youtubeId || videoUrl) && (
                  <a onClick={handlePlay} style={{ cursor: "pointer" }} className="video-icon tran3s rounded-circle d-flex align-items-center justify-content-center">
                     <i className="fa-thin fa-play"></i>
                  </a>
               )}
            </div>
         </div>

         {youtubeId && (
            <VideoPopup
               isVideoOpen={isVideoOpen}
               setIsVideoOpen={setIsVideoOpen}
               videoId={youtubeId}
            />
         )}
      </>
   )
}

export default CommonPropertyVideoTour;
