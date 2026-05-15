import { StaticImageData } from "next/image";

import serviceIcon_1 from "@/assets/images/icon/icon_69.svg";
import serviceIcon_2 from "@/assets/images/icon/icon_70.svg";
import serviceIcon_3 from "@/assets/images/icon/icon_71.svg";

interface DataType {
   id: number;
   page: string;
   icon: StaticImageData;
   title: string;
   desc: string;
   data_delay_time?: string;
   btn: string;
}[]

const service_data: DataType[] = [
   {
      id: 1,
      page: "service_1",
      icon: serviceIcon_1,
      title: "Commercial Leasing",
      btn: "View Leases",
      desc: "Secure the right commercial space for your business across Gauteng and beyond.",
   },
   {
      id: 2,
      page: "service_1",
      icon: serviceIcon_2,
      title: "Investment Sales",
      btn: "View Investments",
      desc: "Buy or sell yielding commercial and industrial assets with specialist brokerage support.",
      data_delay_time: "0.1s",
   },
   {
      id: 3,
      page: "service_1",
      icon: serviceIcon_3,
      title: "Retail Leasing",
      btn: "View Retail",
      desc: "Placing the right brands in the right locations, including high-traffic storefronts, mixed-use hubs, and trendsetting precincts across South Africa.",
      data_delay_time: "0.2s",
   },
   {
      id: 4,
      page: "service_1",
      icon: serviceIcon_1,
      title: "Tenant Representation",
      btn: "Get Representation",
      desc: "Let DG Property negotiate on your behalf to secure favourable lease terms.",
   },
   {
      id: 5,
      page: "service_1",
      icon: serviceIcon_2,
      title: "Development Land",
      btn: "View Land",
      desc: "Identify and transact on sites zoned for commercial, industrial or mixed-use development.",
      data_delay_time: "0.1s",
   },
   {
      id: 6,
      page: "service_1",
      icon: serviceIcon_3,
      title: "Portfolio Advisory",
      btn: "Get Advice",
      desc: "Strategic guidance for property investors and corporate occupiers managing diverse portfolios.",
      data_delay_time: "0.2s",
   },
   
]

export default service_data;