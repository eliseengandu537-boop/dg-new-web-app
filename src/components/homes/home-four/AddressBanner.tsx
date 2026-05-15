import Link from "next/link"
import Image from "next/image"
import { contactInfo } from "@/data/contact-info";

import circleImg from "@/assets/images/icon/icon_39.svg"

interface DataType {
   id: number;
   class_name?: string;
   title: string;
   address_1: string;
   address_2?: string;
}

const address_data: DataType[] = [
   {
      id: 1,
      title: "Email us",
      address_1: contactInfo.emailDisplay
   },
   {
      id: 2,
      class_name: "skew-line",
      title: "Phone",
      address_1: contactInfo.phoneDisplay,
   },
   {
      id: 3,
      title: "Located in",
      address_1: contactInfo.locationName,
      address_2: contactInfo.fullAddress,
   },
]

const AddressBanner = ({ style }: any) => {
   return (
      <div className={`address-banner wow fadeInUp mt-120 lg-mt-80 ${style ? "mb-140" : ""}`}>
         <div className="container container-large">
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-between">
               {address_data.map((item) => (
                  <div key={item.id} className={`block position-relative ${item.class_name} z-1 mt-25`}>
                     <div className="d-xl-flex align-items-center">
                        <div className="icon rounded-circle d-flex align-items-center justify-content-center"><Image src={circleImg} alt="" className="lazy-img" /></div>
                        <div className="text">
                           <p className="fs-22">{item.title}</p>
                           <Link href={item.title === "Email us" ? contactInfo.emailHref : item.title === "Phone" ? contactInfo.phoneHref : "#"} className="tran3s">{item.address_1}</Link>
                           {item.address_2 && <> { " " } <span className="tran3s">{item.address_2}</span></>}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default AddressBanner
