interface DataType {
   id: number;
   page: string;
   widget_title: string;
   widget_class?: string;
   widget_class2?: string;
   footer_link: {
      link: string;
      link_title: string;
   }[];

}

const commercialListingLinks = [
   { link: "/listing_01", link_title: "Office Space" },
   { link: "/listing_02", link_title: "Retail Space" },
   { link: "listing_03", link_title: "Industrial Property" },
   { link: "listing_04", link_title: "Warehouses" },
   { link: "/development-land", link_title: "Development Land" },
   { link: "/listing_06", link_title: "Investment Properties" },
];

const legalLinks = [
   { link: "/terms-and-conditions", link_title: "Terms & conditions" },
   { link: "/privacy-policy", link_title: "Privacy policy" },
   { link: "/faq", link_title: "Faq’s" },
];

const footer_data: DataType[] = [
   {
      id: 2,
      widget_class: "xs-mt-30",
      page: "home_1",
      widget_title: "Legal",
      footer_link: legalLinks
   },
   {
      id: 3,
      widget_class: "xs-mt-30",
      page: "home_1",
      widget_title: "New Listing",
      footer_link: commercialListingLinks
   },

   // home two

   {
      id: 2,
      widget_class: "col-xxl-3 col-xl-4",
      page: "home_3",
      widget_title: "Legal",
      footer_link: legalLinks
   },
   {
      id: 3,
      page: "home_3",
      widget_title: "New Listing",
      footer_link: commercialListingLinks
   },

   // home four

   {
      id: 2,
      widget_class: "col-xl-2 col-lg-3",
      page: "home_4",
      widget_title: "New Listing",
      footer_link: commercialListingLinks
   },
   {
      id: 3,
      widget_class: "col-xl-2 col-lg-3",
      page: "home_4",
      widget_title: "Legal",
      footer_link: legalLinks
   },

   // home five

   {
      id: 2,
      widget_class: "col-lg-3",
      page: "home_5",
      widget_title: "Legal",
      footer_link: legalLinks
   },
   {
      id: 3,
      widget_class: "col-lg-2",
      page: "home_5",
      widget_title: "New Listing",
      footer_link: commercialListingLinks
   },
]

export default footer_data;
