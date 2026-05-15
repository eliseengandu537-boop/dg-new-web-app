interface DataType {
   id: number;
   page: string;
   tag: string;
   title: string;
   address: string;
   data_delay_time?: string;
   item_bg_img:string;
   property_info: {
      feature: string;
      total_feature: number;
   }[];
}[];

const feature_listing_data:DataType[]=[
   {
      id: 1,
      page: "home_5",
      tag: "TO LET",
      item_bg_img:"item-bg-1",
      title: "Sandton Office Park",
      address: "Sandton, Johannesburg, Gauteng",
      property_info: [{feature: "sqft", total_feature: 2137 }, {feature: "units", total_feature: 3 }, {feature: "tenants", total_feature: 1 }, {feature: "levels", total_feature: 2 },],
   },
   {
      id: 2,
      page: "home_5",
      tag: "FOR SALE",
      item_bg_img:"item-bg-2",
      title: "Bedfordview Retail Centre",
      address: "Bedfordview, Johannesburg, Gauteng",
      data_delay_time:"0.1s",
      property_info: [{feature: "sqft", total_feature: 2137 }, {feature: "units", total_feature: 3 }, {feature: "tenants", total_feature: 1 }, {feature: "levels", total_feature: 2 },],
   },
   {
      id: 3,
      page: "home_5",
      tag: "TO LET",
      item_bg_img:"item-bg-3",
      title: "Germiston Industrial Hub",
      address: "Germiston, Ekurhuleni, Gauteng",
      data_delay_time:"0.2s",
      property_info: [{feature: "sqft", total_feature: 2137 }, {feature: "units", total_feature: 3 }, {feature: "tenants", total_feature: 1 }, {feature: "levels", total_feature: 2 },],
   },
]

export default feature_listing_data;