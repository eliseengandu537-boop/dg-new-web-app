import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import seviceDetailsThumb_1 from "@/assets/images/media/lk.jpg";
import seviceDetailsThumb_2 from "@/assets/images/media/lk1.jpg";

import seviceDetailsIcon_1 from "@/assets/images/icon/icon_72.svg";
import seviceDetailsIcon_2 from "@/assets/images/icon/icon_73.svg";
import seviceDetailsIcon_3 from "@/assets/images/icon/icon_74.svg";

interface ContentType {
   title_1: string;
   title_2: string;
   title_3: string;
   desc_1: JSX.Element;
   desc_2: JSX.Element;
   desc_3: JSX.Element;
   desc_4: JSX.Element;
   service_features: {
      icon: StaticImageData;
      title: string;
      desc: string
   }[];
   service_list: string[];
   sidebar_list: string[];
}[];

const content_data: ContentType = {
   title_1: "Retail Services",
   title_2: "Retail Strategy",
   title_3: "Retail Visionaries",
   desc_1: (<>We don&apos;t just lease retail spaces &mdash; we place the right brands in the right locations with precision and style. At DG Property, we know what&apos;s hot, what&apos;s coming, and where your brand belongs. Whether it&apos;s high-traffic storefronts, vibrant mixed-use hubs, or trendsetting precincts, we know how to spot the perfect fit &mdash; faster, smarter, and better than anyone else.</>),
   desc_2: (<>Our retail leasing strategy focuses on maximising occupancy and lease yield by targeting a balanced mix of high-performing anchor tenants, complementary specialty retailers, and experiential offerings. We prioritise tenant synergy, foot traffic generation, and long-term value creation through data-driven market analysis, proactive lease negotiations, and strategic tenant placement tailored to each property&apos;s location and consumer profile.<br /><br />We provide end-to-end leasing services designed to optimise performance and tenant satisfaction. Our offerings include market analysis, strategic marketing, tenant sourcing, lease negotiation, and retail mix strategies. With deep market insights and a proactive approach, we help property owners attract quality tenants, reduce vacancy rates, and enhance long-term portfolio value. Retail leasing for niche clients focuses on attracting specialised retailers that cater to specific consumer segments, such as boutique fashion, wellness, artisanal food, or lifestyle brands. These tenants enhance a property&apos;s uniqueness, drive targeted foot traffic, and align with curated retail environments that prioritise experience and brand differentiation.</>),
   desc_3: (<>Retail leasing works hand-in-hand with development teams to strategically place tenants that align with the project&apos;s vision, target demographic, and long-term goals. By being involved from the early planning stages, we help curate a tenant mix that enhances the overall appeal, drives foot traffic, supports the creation of vibrant destinations and contributes to the overall success and identity of the site.<br /><br />Our retail vision is centred on creating diverse, dynamic retail environments by strategically placing tenants across a range of formats &mdash; including petrol stations, non-GLA spaces, stand-alone sites, and owner-occupied premises. We specialise in identifying and supporting niche, locally owned businesses that bring unique value to their communities, while also remaining open to partnerships with national tenants where they align with the site&apos;s character and goals. By balancing tailored tenant placement with broader market appeal, we aim to deliver well-rounded retail offerings that enhance convenience, drive foot traffic, and support long-term commercial success across all asset types &mdash; but most importantly we focus on developing and nurturing relationships with our clients.</>),
   desc_4: (<>We offer a level of service that goes beyond traditional brokerage. With an extensive network and industry connections unmatched by most, we also provide superior additional services including tailored marketing solutions such as email campaigns, websites, brochures, and social media strategies to elevate every opportunity.</>),
   service_features: [
      {
         icon: seviceDetailsIcon_1,
         title: "Leasing Advisory",
         desc: "Bespoke leasing strategies for landlords and developers, informed by market intelligence and community insight, smarter, faster, built for the future."
      },
      {
         icon: seviceDetailsIcon_2,
         title: "Retail Services",
         desc: "Market analysis, tenant sourcing, lease negotiation, and retail mix strategies designed to optimise performance and tenant satisfaction."
      },
      {
         icon: seviceDetailsIcon_3,
         title: "Marketing",
         desc: "Tailored marketing solutions including email campaigns, websites, brochures, and social media strategies to elevate every opportunity."
      },
   ],
   service_list: ["High-traffic storefront placement", "Mixed-use & precinct leasing", "Niche & boutique tenant sourcing", "National & anchor tenant negotiations", "End-to-end lease advisory"],
   sidebar_list: ["Commercial Leasing", "Investment Sales", "Retail Leasing", "Tenant Representation", "Development Land"],
}

const { title_1, title_2, title_3, desc_1, desc_2, desc_3, desc_4, service_features, service_list, sidebar_list } = content_data;

const ServiceDetailsArea = () => {
   return (
      <div className="service-details mt-150 xl-mt-100 mb-150 xl-mb-100">
         <div className="container">
            <div className="row">
               <div className="col-lg-8">
                  <div className="service-post">
                     <div className="btn-line fw-500 text-uppercase">RETAIL LEASING</div>
                     <h3 className="mb-30">{title_1}</h3>
                     <p className="fs-20 lh-lg pb-25">{desc_1}</p>
                     <p className="fs-20 lh-lg">{desc_2}</p>
                     <div className="img-gallery pt-15 pb-70 lg-pb-50">
                        <div className="row">
                           <div className="col-8">
                              <Image src={seviceDetailsThumb_1} alt="" className="lazy-img w-100 mt-20" />
                           </div>
                           <div className="col-4">
                              <Image src={seviceDetailsThumb_2} alt="" className="lazy-img w-100 mt-20" />
                           </div>
                        </div>
                     </div>
                     <h4 className="mb-30">{title_2}</h4>
                     <p className="fs-20 lh-lg pb-25">{desc_3}</p>

                     <div className="feature-wrapper mt-60 lg-mt-40 mb-65 lg-mb-40">
                        <div className="bg-wrapper">
                           <div className="row">
                              {service_features.map((item, index) => (
                                 <div key={index} className="col-xl-4 col-lg-6 col-md-4">
                                    <div className="card-style-eleven mt-30">
                                       <div className="icon"><Image src={item.icon} alt="" className="lazy-img" /></div>
                                       <h5 className="mt-30 mb-20">{item.title}</h5>
                                       <p>{item.desc}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     <h4 className="mb-30">{title_3}</h4>
                     <p className="fs-20 lh-lg pb-25">{desc_4}</p>
                     <ul className="list-style-one fs-22 color-dark style-none">
                        {service_list.map((list, i) => <li key={i}>{list}</li>)}
                     </ul>
                     <Link href="/inquiry" className="btn-two mt-30">Send Inquiry</Link>
                     <div style={{ marginTop: 20 }}>
                        <Link href="/listing_09" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(90deg, #c8973a, #e8b86d)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 34px", borderRadius: 50, textDecoration: "none", letterSpacing: 0.4 }}>
                           View Retail Properties <i className="bi bi-arrow-up-right"></i>
                        </Link>
                     </div>
                  </div>
               </div>
               
               <div className="col-lg-4">
                  <div className="ms-xl-5">
                     <div className="service-sidebar md-mt-80">
                        <div className="service-category">
                           <ul className="style-none">
                              <li><Link href="/service_details" className="active">Retail Leasing</Link></li>
                              {sidebar_list.map((list, i) => <li key={i}><Link href="#">{list}</Link></li>)}
                           </ul>
                        </div>
                        <div className="contact-banner text-center mt-45">
                           <h4 className="mb-35 text-white">Any Questions? <br />Let&apos;s talk</h4>
                           <Link href="/inquiry" className="btn-two">Let&apos;s Talk</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ServiceDetailsArea