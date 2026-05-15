import { StaticImageData } from "next/image";

import propertyThumb_1 from "@/assets/images/listing/img_01.jpg";
import propertyThumb_2 from "@/assets/images/listing/img_02.jpg";
import propertyThumb_3 from "@/assets/images/listing/img_03.jpg";
import propertyThumb_4 from "@/assets/images/listing/img_04.jpg";
import propertyThumb_5 from "@/assets/images/listing/img_05.jpg";
import propertyThumb_6 from "@/assets/images/listing/img_06.jpg";

import property2Thumb_1 from "@/assets/images/listing/img_07.jpg";
import property2Thumb_2 from "@/assets/images/listing/img_08.jpg";
import property2Thumb_3 from "@/assets/images/listing/img_09.jpg";

import property3Thumb_1 from "@/assets/images/listing/img_13.jpg";
import property3Thumb_2 from "@/assets/images/listing/img_14.jpg";
import property3Thumb_3 from "@/assets/images/listing/img_15.jpg";
import property3Thumb_4 from "@/assets/images/listing/img_16.jpg";

import propertyLargThumb_1 from "@/assets/images/listing/img_large_01.jpg";
import propertyLargThumb_2 from "@/assets/images/listing/img_large_02.jpg";
import propertyLargThumb_3 from "@/assets/images/listing/img_large_03.jpg";
import propertyLargThumb_4 from "@/assets/images/listing/img_large_04.jpg";
import propertyLargThumb_5 from "@/assets/images/listing/img_large_05.jpg";
import propertyLargThumb_6 from "@/assets/images/listing/img_large_06.jpg";

import propertyIcon_1 from "@/assets/images/icon/icon_04.svg";
import propertyIcon_2 from "@/assets/images/icon/icon_05.svg";
import propertyIcon_3 from "@/assets/images/icon/icon_06.svg";

interface DataType {
   id: number;
   page: string;
   tag: string;
   tag_bg?: string;
   thumb?:StaticImageData
   carousel_thumb: {
      id?:string;
      img: StaticImageData;
      active?: string;
   }[];
   title: string;
   address: string;
   property_info: {
      icon: StaticImageData;
      feature: string;
      total_feature: number;
   }[];
   data_delay_time?: string;
   price: number;
   price_text?: string;
   carousel?: string;
}[];

const property_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      tag: "TO LET",
      carousel_thumb: [{ img: propertyThumb_1, active: "active" }, { img: propertyThumb_2 }, { img: propertyThumb_3 }],
      title: "Sandton Corporate Park",
      address: "14 Alice Lane, Sandton, Johannesburg",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 1370 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 1200 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      price: 185,
      price_text: "m",
      carousel: "1",
   },
   {
      id: 2,
      page: "home_1",
      tag: "FOR SALE",
      tag_bg: "sale",
      carousel_thumb: [{ img: propertyThumb_2, active: "active" }, { img: propertyThumb_3 }, { img: propertyThumb_1 }],
      title: "Bedfordview Retail Centre",
      address: "59 Van Buuren Rd, Bedfordview, Johannesburg",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 1270 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 850 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      data_delay_time: "0.1s",
      price: 18500000,
      carousel: "2",
   },
   {
      id: 3,
      page: "home_1",
      tag: "FOR SALE",
      tag_bg: "sale",
      carousel_thumb: [{ img: propertyThumb_3, active: "active" }, { img: propertyThumb_2 }, { img: propertyThumb_1 }],
      title: "Germiston Industrial Hub",
      address: "22 Jet Park Rd, Germiston, Gauteng",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 1270 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 3200 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      data_delay_time: "0.2s",
      price: 62,
      carousel: "3",
   },
   {
      id: 4,
      page: "home_1",
      tag: "TO LET",
      carousel_thumb: [{ img: propertyThumb_4, active: "active" }, { img: propertyThumb_5 }, { img: propertyThumb_6 }],
      title: "Rosebank Mixed-Use Tower",
      address: "50 Bath Ave, Rosebank, Johannesburg",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 1370 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 1800 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      price: 32000000,
      price_text: "m",
      carousel: "4",
   },
   {
      id: 5,
      page: "home_1",
      tag: "FOR SALE",
      tag_bg: "sale",
      carousel_thumb: [{ img: propertyThumb_5, active: "active" }, { img: propertyThumb_4 }, { img: propertyThumb_6 }],
      title: "Midrand Logistics Centre",
      address: "12 Allandale Rd, Midrand, Gauteng",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 1270 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 4500 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      data_delay_time: "0.1s",
      price: 58,
      carousel: "5",
   },
   {
      id: 6,
      page: "home_1",
      tag: "TO LET",
      carousel_thumb: [{ img: propertyThumb_6, active: "active" }, { img: propertyThumb_5 }, { img: propertyThumb_4 }],
      title: "Cape Town Business Park",
      address: "Voortrekker Rd, Bellville, Cape Town",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 1270 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 960 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      data_delay_time: "0.2s",
      price: 145,
      price_text: "m",
      carousel: "6",
   },

   // home two
   
   {
      id: 1,
      page: "home_2",
      tag: "TO LET",
      carousel_thumb: [{ img: property2Thumb_1, active: "active" }, { img: property2Thumb_2 }, { img: property2Thumb_3 }],
      title: "Sandton Corporate Park",
      address: "14 Alice Lane, Sandton, Johannesburg",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 1370 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 1200 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      price: 185,
      carousel: "1",
   },
   {
      id: 2,
      page: "home_2",
      tag: "FOR SALE",
      carousel_thumb: [{ img: property2Thumb_2, active: "active" }, { img: property2Thumb_1 }, { img: property2Thumb_2 }],
      title: "Bedfordview Retail Centre",
      address: "59 Van Buuren Rd, Bedfordview, Johannesburg",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 1270 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 850 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      data_delay_time: "0.1s",
      price: 18500000,
      carousel: "2",
   },
   {
      id: 3,
      page: "home_2",
      tag: "FOR SALE",
      carousel_thumb: [{ img: property2Thumb_3, active: "active" }, { img: property2Thumb_2 }, { img: property2Thumb_1 }],
      title: "Germiston Industrial Hub",
      address: "22 Jet Park Rd, Germiston, Gauteng",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 1270 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 3200 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      data_delay_time: "0.2s",
      price: 62,
      carousel: "3",
   },

   // home_3_property_2

   {
      id: 1,
      page: "home_3_property_2",
      tag: "TO LET",
      thumb:property3Thumb_1,
      carousel_thumb: [{id:"1", img: propertyLargThumb_1}, {id:"2", img: propertyLargThumb_2 }, {id:"3", img: propertyLargThumb_3 }],
      title: "Rosebank Mixed-Use Tower",
      address: "50 Bath Ave, Rosebank, Johannesburg",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 1780 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 1800 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      price: 32000000,
      carousel:"03",
   },
   {
      id: 2,
      page: "home_3_property_2",
      tag: "FOR SALE",
      thumb:property3Thumb_2,
      carousel_thumb: [{id:"4", img: propertyLargThumb_4}, {id:"5", img: propertyLargThumb_5 }, {id:"6", img: propertyLargThumb_6 }],
      title: "Midrand Logistics Centre",
      address: "12 Allandale Rd, Midrand, Gauteng",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 2340 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 4500 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      price: 58,
      carousel:"03",
   },
   {
      id: 3,
      page: "home_3_property_2",
      tag: "FOR SALE",
      thumb:property3Thumb_3,
      carousel_thumb: [{id:"1", img: propertyLargThumb_1}, {id:"5", img: propertyLargThumb_5 }, {id:"3", img: propertyLargThumb_3 }, {id:"2", img: propertyLargThumb_2 }],
      title: "Cape Town Business Park",
      address: "Voortrekker Rd, Bellville, Cape Town",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 1857 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 960 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      price: 145,
      carousel:"04",
   },
   {
      id: 4,
      page: "home_3_property_2",
      tag: "FOR SALE",
      thumb:property3Thumb_4,
      carousel_thumb: [{id:"4", img: propertyLargThumb_4}, {id:"6", img: propertyLargThumb_6 }, {id:"3", img: propertyLargThumb_3 }, {id:"2", img: propertyLargThumb_2 }],
      title: "Sandton Corporate Park",
      address: "14 Alice Lane, Sandton, Johannesburg",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 2450 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 1200 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      price: 185,
      carousel:"04",
   },
   {
      id: 5,
      page: "home_3_property_2",
      tag: "FOR SALE",
      thumb:property3Thumb_2,
      carousel_thumb: [{id:"4", img: propertyLargThumb_4}, {id:"5", img: propertyLargThumb_5 }, {id:"6", img: propertyLargThumb_6 }],
      title: "Bedfordview Retail Centre",
      address: "59 Van Buuren Rd, Bedfordview, Johannesburg",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 2340 }, { icon: propertyIcon_2, feature: "sqm", total_feature: 850 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },],
      price: 18500000,
      carousel:"03",
   },

   // home_5
]

export default property_data;