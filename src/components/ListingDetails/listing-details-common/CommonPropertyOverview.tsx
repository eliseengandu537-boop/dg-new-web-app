import Image, { StaticImageData } from "next/image"
import { COMMERCIAL_FIELD_LABELS } from "@/data/commercialPropertyConfig";

import icon_1 from "@/assets/images/icon/icon_47.svg"
import icon_2 from "@/assets/images/icon/icon_48.svg"
import icon_3 from "@/assets/images/icon/icon_49.svg"
import icon_4 from "@/assets/images/icon/icon_50.svg"
import icon_5 from "@/assets/images/icon/icon_51.svg"

const STATIC_OVERVIEW = [
   { id: 1, icon: icon_1, title: "Sqft . 3,720" },
   { id: 2, icon: icon_2, title: "Bed . 03" },
   { id: 3, icon: icon_3, title: "Bath . 2" },
   { id: 4, icon: icon_4, title: "Kitchen . 01" },
   { id: 5, icon: icon_5, title: "Type . Apartment" },
];

const ICONS = [icon_1, icon_2, icon_3, icon_4, icon_5];

interface Props {
   categoryDetails?: Record<string, any>;
   category?: string;
   listingType?: string;
}

const CommonPropertyOverview = ({ categoryDetails, category, listingType }: Props) => {
   if (categoryDetails && Object.keys(categoryDetails).length > 0) {
      const items = Object.entries(categoryDetails)
         .filter(([, v]) => v !== "" && v !== null && v !== undefined)
         .slice(0, 5)
         .map(([key, value], i) => ({
            icon: ICONS[i],
            title: `${COMMERCIAL_FIELD_LABELS[key] || key} . ${value}`,
         }));

      if (items.length > 0) {
         return (
               <ul className="style-none d-flex flex-wrap align-items-center justify-content-between" style={{fontSize: '14px', padding: '0 0 0 0'}}>
                  {items.map((item, i) => (
                     <li key={i} style={{marginBottom: '8px'}}>
                        <Image src={item.icon} alt="" className="lazy-img icon" style={{width: '20px', height: '20px'}} />
                        <span style={{fontSize: '14px', color: '#222', marginLeft: '6px'}}>{item.title}</span>
                     </li>
                  ))}
               </ul>
         );
      }
   }

   // Fallback — static placeholder data
   return (
      <ul className="style-none d-flex flex-wrap align-items-center justify-content-between">
         {STATIC_OVERVIEW.map((item) => (
            <li key={item.id}>
               <Image src={item.icon} alt="" className="lazy-img icon" />
               <span className="fs-20 color-dark">{item.title}</span>
            </li>
         ))}
      </ul>
   );
}

export default CommonPropertyOverview
