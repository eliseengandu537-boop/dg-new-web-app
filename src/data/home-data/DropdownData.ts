import {
   commercialLocationOptions,
   commercialPriceLabel,
   commercialPriceRangeOptions,
   commercialPropertyTypeLabel,
   commercialPropertyTypeOptions,
} from "@/data/commercialSearchData";

interface InputField {
   id: number;
   page: string;
   col?: string;
   border_lg?: string;
   label: string;
   options: {
      value: string;
      text: string;
   }[];
   className?: string;
}

const createDropdownFields = (
   page: string,
   layout: {
      typeCol?: string;
      locationCol?: string;
      priceCol?: string;
      typeBorder?: string;
      locationBorder?: string;
      priceBorder?: string;
   }
): InputField[] => [
   {
      id: 1,
      page,
      col: layout.typeCol,
      border_lg: layout.typeBorder,
      label: commercialPropertyTypeLabel,
      options: commercialPropertyTypeOptions,
   },
   {
      id: 2,
      page,
      col: layout.locationCol,
      border_lg: layout.locationBorder,
      label: "Location",
      options: commercialLocationOptions,
      className: "location",
   },
   {
      id: 3,
      page,
      col: layout.priceCol,
      border_lg: layout.priceBorder,
      label: commercialPriceLabel,
      options: commercialPriceRangeOptions,
   },
];

const dropdoun_data: InputField[] = [
   ...createDropdownFields("home_1", {
      typeCol: "col-xl-3",
      locationCol: "col-xl-4",
      priceCol: "col-xl-3",
      priceBorder: "border-lg-0",
   }),
   ...createDropdownFields("home_2_tab_1", {
      typeCol: "col-xl-2",
      locationCol: "col-xl-3",
      priceCol: "col-xl-3",
   }),
   ...createDropdownFields("home_2_tab_2", {
      typeCol: "col-xl-2",
      locationCol: "col-xl-3",
      priceCol: "col-xl-3",
   }),
   ...createDropdownFields("home_3_tab_1", {
      typeCol: "mb-25",
      locationCol: "mb-25",
      priceCol: "mb-50 lg-mb-30",
      priceBorder: "border-lg-0",
   }),
   ...createDropdownFields("home_3_tab_2", {
      typeCol: "mb-25",
      locationCol: "mb-25",
      priceCol: "mb-50 lg-mb-30",
      priceBorder: "border-lg-0",
   }),
   ...createDropdownFields("home_3_tab_3", {
      typeCol: "mb-25",
      locationCol: "mb-25",
      priceCol: "mb-50 lg-mb-30",
      priceBorder: "border-lg-0",
   }),
   ...createDropdownFields("home_5_tab_1", {
      typeCol: "col-lg-3",
      locationCol: "col-lg-4",
      priceCol: "col-xl-3 col-lg-4",
      typeBorder: "border-left",
      locationBorder: "border-left",
   }),
   ...createDropdownFields("home_5_tab_2", {
      typeCol: "col-lg-3",
      locationCol: "col-lg-4",
      priceCol: "col-xl-3 col-lg-4",
      typeBorder: "border-left",
      locationBorder: "border-left",
   }),
   ...createDropdownFields("home_6_tab_1", {
      typeCol: "col-xxl-2",
      priceBorder: "border-lg-0",
   }),
   ...createDropdownFields("home_6_tab_2", {
      typeCol: "col-xxl-2",
      priceBorder: "border-lg-0",
   }),
   ...createDropdownFields("home_6_tab_3", {
      typeCol: "col-xxl-2",
      priceBorder: "border-lg-0",
   }),
];

export default dropdoun_data;
