import { StaticImageData } from "next/image";

import featureIcon_1 from "@/assets/images/icon/icon_01.svg";
import featureIcon_2 from "@/assets/images/icon/icon_02.svg";
import featureIcon_3 from "@/assets/images/icon/icon_03.svg";

import feature3Icon_1 from "@/assets/images/icon/icon_07.svg";
import feature3Icon_2 from "@/assets/images/icon/icon_08.svg";
import feature3Icon_3 from "@/assets/images/icon/icon_09.svg";
import feature3Icon_4 from "@/assets/images/icon/icon_26.svg";
import feature3Icon_5 from "@/assets/images/icon/icon_27.svg";
import feature3Icon_6 from "@/assets/images/icon/icon_28.svg";

import feature4Icon_1 from "@/assets/images/icon/icon_11.svg";
import feature4Icon_2 from "@/assets/images/icon/icon_12.svg";
import feature4Icon_3 from "@/assets/images/icon/icon_13.svg";

import feature5Icon_1 from "@/assets/images/icon/icon_23.svg";
import feature5Icon_2 from "@/assets/images/icon/icon_24.svg";
import feature5Icon_3 from "@/assets/images/icon/icon_25.svg";

import feature6Icon_1 from "@/assets/images/icon/icon_35.svg";
import feature6Icon_2 from "@/assets/images/icon/icon_36.svg";
import feature6Icon_3 from "@/assets/images/icon/icon_37.svg";

import feature7Icon_1 from "@/assets/images/icon/icon_40.svg";
import feature7Icon_2 from "@/assets/images/icon/icon_41.svg";
import feature7Icon_3 from "@/assets/images/icon/icon_42.svg";

import featureImg_1 from "@/assets/images/media/img_19.jpg";
import featureImg_2 from "@/assets/images/media/img_20.jpg";
import featureImg_3 from "@/assets/images/media/img_21.jpg";

interface DataType {
   id: number;
   page: string;
   item_bg?: string;
   img?: StaticImageData;
   icon?: StaticImageData;
   title: string;
   desc?: string;
   tag?: string;
   data_delay_time?: string;
   btn?: string;
   class_name?:string;
}

const feature_data: DataType[] = [
   {
      id: 1,
      page: "home_1_feature_1",
      icon: featureIcon_1,
      title: "LEASE COMMERCIAL SPACE",
      btn:"View Leasing",
      desc: "Retail, office and industrial leasing across South Africa's key commercial nodes.",
   },
   {
      id: 2,
      page: "home_1_feature_1",
      icon: featureIcon_2,
      title: "BUY INVESTMENT PROPERTY",
      btn:"View Investments",
      desc: "Acquire income-producing commercial assets backed by DG Property's expert due diligence.",
   },
   {
      id: 3,
      page: "home_1_feature_1",
      icon: featureIcon_3,
      title: "SELL YOUR ASSET",
      btn:"List Your Property",
      desc: "Mandate DG Property to market and dispose of your commercial or industrial asset discreetly.",
   },

   // home_1_feature_2

   {
      id: 1,
      page: "home_1_feature_2",
      item_bg: "card-1",
      title: "Johannesburg",
      desc: "Commercial & Industrial Hub",
   },
   {
      id: 2,
      page: "home_1_feature_2",
      item_bg: "card-2",
      title: "Cape Town",
      desc: "Retail & Office Node",
   },
   {
      id: 3,
      page: "home_1_feature_2",
      item_bg: "card-3",
      title: "Durban",
      desc: "Logistics & Industrial",
   },
   {
      id: 4,
      page: "home_1_feature_2",
      item_bg: "card-5",
      title: "Pretoria",
      desc: "Government & Office",
   },
   {
      id: 5,
      page: "home_1_feature_2",
      item_bg: "card-5",
      title: "Sandton",
      desc: "Premium Commercial Node",
   },

   // home_1_feature_3

   {
      id: 1,
      page: "home_1_feature_3",
      icon: feature3Icon_1,
      title: "Create Account",
      desc: "It’s very easy to open an account and start your journey.",
   },
   {
      id: 2,
      page: "home_1_feature_3",
      class_name:"arrow position-relative",
      icon: feature3Icon_2,
      title: "Find Home",
      desc: "Complete your profile with all the info to get attention of client.",
   },
   {
      id: 3,
      page: "home_1_feature_3",
      icon: feature3Icon_3,
      title: "Quick Process",
      desc: "Apply & get your preferable jobs with all the requirements and get it.",
   },

   // home_two_feature_1

   {
      id: 1,
      page: "home_2_feature_1",
      item_bg: "location-card-1",
      title: "Sandton",
   },
   {
      id: 2,
      page: "home_2_feature_1",
      item_bg: "location-card-2",
      title: "Bedfordview",
      data_delay_time: "0.1s",
   },
   {
      id: 3,
      page: "home_2_feature_1",
      item_bg: "location-card-3",
      title: "Midrand",
      data_delay_time: "0.2s",
   },
   {
      id: 4,
      page: "home_2_feature_1",
      item_bg: "location-card-4",
      title: "Germiston",
   },
   {
      id: 5,
      page: "home_2_feature_1",
      item_bg: "location-card-5",
      title: "Rosebank",
      data_delay_time: "0.1s",
   },
   {
      id: 6,
      page: "home_2_feature_1",
      item_bg: "location-card-6",
      title: "Cape Town CBD",
      data_delay_time: "0.2s",
   },

   // home_two_feature_2

   {
      id: 1,
      page: "home_two_feature_2",
      img: featureImg_1,
      title: "Explore & buy Home",
      tag: "BUY HOME",
      data_delay_time: "0.2s",
   },
   {
      id: 2,
      page: "home_two_feature_2",
      img: featureImg_2,
      title: "List & Sell quickly",
      tag: "Sell Now",
      data_delay_time: "0.1s",
   },
   {
      id: 3,
      page: "home_two_feature_2",
      img: featureImg_3,
      title: "Discover & get Lease",
      tag: "LEASE NOW",
      data_delay_time: "0.2s",
   },

   // home_two_feature_3

   {
      id: 1,
      page: "home_two_feature_3",
      icon: feature4Icon_1,
      title: "Discreet Execution",
      desc: "Off-market and mandated transactions handled with confidentiality and precision.",
   },
   {
      id: 2,
      page: "home_two_feature_3",
      icon: feature4Icon_2,
      title: "Market Intelligence",
      desc: "Sharp insight into commercial market trends, vacancy rates and investment yields.",
   },
   {
      id: 3,
      page: "home_two_feature_3",
      icon: feature4Icon_3,
      title: "Hands-On Advisory",
      desc: "Practical guidance from mandate to close, covering leasing, acquisition and disposal.",
   },

   // home_3_feature_1

   {
      id: 1,
      page: "home_3_feature_1",
      icon: feature5Icon_1,
      title: "Commercial Leasing",
      btn: "View Leasing",
      desc: "Retail, office and industrial leasing solutions across South Africa's major commercial nodes.",
   },
   {
      id: 2,
      page: "home_3_feature_1",
      icon: feature5Icon_2,
      title: "Investment Sales",
      btn: "View Investments",
      desc: "Acquire or dispose of income-generating commercial property with expert market guidance.",
      data_delay_time: "0.1s",
   },
   {
      id: 3,
      page: "home_3_feature_1",
      icon: feature5Icon_3,
      title: "Development Land",
      btn: "View Land",
      desc: "Identify and transact on development land suited to commercial, industrial or mixed-use projects.",
      data_delay_time: "0.2s",
   },
   

   // home_three_feature_2

   {
      id: 1,
      page: "home_three_feature_2",
      icon: feature3Icon_4,
      title: "Specialist Focus",
      desc: "Dedicated to commercial, industrial and investment property, nothing residential, nothing generic.",
   },
   {
      id: 2,
      page: "home_three_feature_2",
      icon: feature3Icon_5,
      title: "Qualified Network",
      desc: "Access to a deep network of landlords, investors, developers and occupiers across South Africa.",
   },
   {
      id: 3,
      page: "home_three_feature_2",
      icon: feature3Icon_6,
      title: "Proven Results",
      desc: "Over R250M in completed transactions underpins our track record in commercial brokerage.",
   },

   // home_4_feature_1

   {
      id: 1,
      page: "home_4_feature_1",
      icon: feature6Icon_1,
      title: "Retail Leasing",
      btn: "View Retail",
      desc: "Connect your retail space with quality tenants. DG Property manages the full leasing process.",
   },
   {
      id: 2,
      page: "home_4_feature_1",
      icon: feature6Icon_2,
      title: "Industrial Property",
      btn: "View Industrial",
      desc: "Warehouses, logistics hubs and manufacturing facilities to let or for sale across South Africa.",
      data_delay_time: "0.1s",
   },
   {
      id: 3,
      page: "home_4_feature_1",
      icon: feature6Icon_3,
      title: "Investment Sales",
      btn: "View Investments",
      desc: "Sell or acquire yielding commercial assets with the support of DG Property's brokerage team.",
      data_delay_time: "0.2s",
   },

   // home_5_feature_1

   {
      id: 1,
      page: "home_5_feature_1",
      item_bg: "home-5-feature-item-1",
      title: "Johannesburg",
      desc: "Commercial & Industrial",
   },
   {
      id: 2,
      page: "home_5_feature_1",
      item_bg: "home-5-feature-item-2",
      title: "Cape Town",
      desc: "Retail & Office",
      data_delay_time: "0.1s",
   },
   {
      id: 3,
      page: "home_5_feature_1",
      item_bg: "home-5-feature-item-3",
      title: "Durban",
      desc: "Logistics & Port Node",
      data_delay_time: "0.2s",
   },
   {
      id: 4,
      page: "home_5_feature_1",
      item_bg: "home-5-feature-item-4",
      title: "Pretoria",
      desc: "Office & Government",
      data_delay_time: "0.3s",
   },

   // home_6_feature_1
   
   {
      id: 1,
      page: "home_6_feature_1",
      icon:feature7Icon_1,
      title: "Commercial Sales",
      desc: "End-to-end sales mandates for office, retail and industrial assets across South Africa.",
   }, 
   {
      id: 2,
      page: "home_6_feature_1",
      icon:feature7Icon_2,
      title: "Tenant Representation",
      desc: "Securing the right space for growing businesses through focused tenant advisory services.",
   }, 
   {
      id: 3,
      page: "home_6_feature_1",
      icon:feature7Icon_3,
      title: "Portfolio Strategy",
      desc: "Helping investors grow, manage and optimise commercial property portfolios for maximum returns.",
   },
]

export default feature_data;
