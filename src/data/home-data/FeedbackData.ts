import { StaticImageData } from "next/image";

import feedbackThumb_1 from "@/assets/images/media/img_01.jpg";
import feedbackThumb_2 from "@/assets/images/media/img_02.jpg";
import feedbackThumb_3 from "@/assets/images/media/img_03.jpg";

import feedback3Thumb_1 from "@/assets/images/media/img_01.jpg";
import feedback3Thumb_2 from "@/assets/images/media/img_02.jpg";
import feedback3Thumb_3 from "@/assets/images/media/img_03.jpg";

import quoteIcon from "@/assets/images/icon/icon_29.svg";

interface DataType {
   id: number;
   page: string;
   desc: string;
   title: string;
   country: string;
   thumb: StaticImageData;
   quote_icon: StaticImageData;
}

const feedback_data: DataType[] = [
   {
      id: 1,
      page: "home_3",
      desc: "DG Property guided our retail lease from search through to signature. Professional and precise.",
      title: "Corporate Occupier",
      country: "Johannesburg, SA",
      thumb: feedback3Thumb_1,
      quote_icon: quoteIcon,
   },
   {
      id: 2,
      page: "home_3",
      desc: "Sold our industrial asset above asking. The DG team delivered a qualified buyer within weeks.",
      title: "Property Fund Manager",
      country: "Gauteng, SA",
      thumb: feedback3Thumb_2,
      quote_icon: quoteIcon,
   },
   {
      id: 3,
      page: "home_3",
      desc: "Efficient and friendly service, guided us perfectly. Satisfied with our new home. Thank you!",
      title: "Private Investor",
      country: "Cape Town, SA",
      thumb: feedback3Thumb_3,
      quote_icon: quoteIcon,
   },
   {
      id: 4,
      page: "home_3",
      desc: "Found our dream home. Great Business with them. Thank you for excellent service.",
      title: "Jannat Ferdu.",
      country: "London, Uk",
      thumb: feedback3Thumb_2,
      quote_icon: quoteIcon,
   },

   // home_5

   {
      id: 1,
      page: "home_5",
      desc: "Relationship-led brokerage backed by sharp market knowledge and consistent follow-through.",
      title: "Client experience,",
      country: " DG Property",
      thumb: feedbackThumb_1,
      quote_icon: quoteIcon,
   },
   {
      id: 2,
      page: "home_5",
      desc: "A team that understands leasing, acquisitions and disposals from both the owner and occupier perspective.",
      title: "Commercial focus,",
      country: " DG Property",
      thumb: feedbackThumb_2,
      quote_icon: quoteIcon,
   },
   {
      id: 3,
      page: "home_5",
      desc: "Discreet execution, clear communication and practical advice from first conversation to close.",
      title: "Transaction approach,",
      country: " DG Property",
      thumb: feedbackThumb_3,
      quote_icon: quoteIcon,
   },
]

export default feedback_data;
