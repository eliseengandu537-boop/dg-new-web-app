interface DataType{
   id:number;
   page:string;
   class_name:string;
   date:string;
   info_name:string;
   info_time:number;
   title:string;
   data_delay_time?:string;
}

const blog_data:DataType[]=[
{
   id:1,
   page:"home_2",
   class_name:"blog-item-1",
   date:"09 FEB",
   info_name:"DG Property .",
   info_time:6,
   title:"Commercial Lease Negotiations: What Tenants Need to Know.",
},
{
   id:2,
   page:"home_2",
   class_name:"blog-item-2",
   date:"12 AUG",
   info_name:"DG Property .",
   info_time:7,
   title:"Industrial Property Trends in Gauteng for 2025.",
   data_delay_time:"0.1s",
},

// home_4

{
   id:1,
   page:"home_4",
   class_name:"blog-item-1",
   date:"08 JAN",
   info_name:"DG Property .",
   info_time:8,
   title:"Why Retail Nodes Are Recovering Faster Than Expected.",
},
{
   id:2,
   page:"home_4",
   class_name:"blog-item-2",
   date:"17 AUG",
   info_name:"DG Property .",
   info_time:7,
   title:"Office Vacancies vs Demand: The 2025 Outlook.",
},
{
   id:3,
   page:"home_4",
   class_name:"blog-item-3",
   date:"21 SEP",
   info_name:"DG Property .",
   info_time:8,
   title:"How Investment Yields Are Shifting in SA's Commercial Sector.",
},
]

export default blog_data;