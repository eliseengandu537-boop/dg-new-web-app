interface DataType {
   id: number;
   id_name: string;
   title: string;
   md_pt?:boolean;
   faq: {
      id: number;
      question: string;
      answer: string;
   }[];
}

const inner_faq_data:DataType[] = [
   {
      id: 2,
      id_name: "Investment",
      title: "INVESTMENT SALES",
      faq: [
         {
            id: 5,
            question: "What is a commercial property investment yield?",
            answer: "Yield is the annual lease income expressed as a percentage of the property's purchase price. In South Africa, commercial property yields typically range between 7% and 10%, depending on location, lease quality and asset type.",
         },
         {
            id: 6,
            question: "What is a net initial yield vs. reversionary yield?",
            answer: "The net initial yield is based on passing lease, while the reversionary yield reflects the income at open market lease value. Understanding both is critical when assessing an investment property.",
         },
         {
            id: 7,
            question: "How does DG Property assist investment buyers?",
            answer: "DG Property identifies on-market and off-market commercial assets, provides detailed investment analysis, and negotiates purchase terms to help clients acquire properties that meet their return targets.",
         },
         {
            id: 8,
            question: "What due diligence should I conduct before buying commercial property?",
            answer: "Key areas include lease review, tenant covenant strength, building condition reports, title deed and servitude searches, zoning confirmation, and an independent valuation. DG Property coordinates this process for buyers.",
         },
      ]
   },
   {
      id: 3,
      id_name: "Industrial",
      title: "INDUSTRIAL & WAREHOUSE",
      faq: [
         {
            id: 9,
            question: "What is the difference between a warehouse and a distribution centre?",
            answer: "A warehouse is used primarily for storage, while a distribution centre is designed for the rapid receipt, processing and despatch of goods. Each has different requirements in terms of height, dock doors, yard depth and power supply.",
         },
         {
            id: 10,
            question: "What key specifications should I check when leasing industrial space?",
            answer: "Focus on eave height (ideal 8m+), power (amps and phases), yard depth for truck turning, number of dock levellers and on-grade doors, office component, and any sprinkler systems. DG Property assesses these for each client.",
         },
         {
            id: 11,
            question: "Which industrial nodes does DG Property specialise in?",
            answer: "DG Property is active in Gauteng's major industrial corridors including Jet Park, Alrode, Wadeville, Boksburg, Germiston, Midrand and Centurion, as well as select nodes in Cape Town and Durban.",
         },
      ]
   },
   {
      id: 4,
      id_name: "Development",
      title: "DEVELOPMENT LAND",
      faq: [
         {
            id: 12,
            question: "What zoning is required for commercial development?",
            answer: "In South Africa, commercial development typically requires Business 1 or Business 2 zoning, while industrial development requires Industrial 1 or 2. Rezoning applications can be lodged with the local municipality and DG Property can advise on feasibility.",
         },
         {
            id: 13,
            question: "What is a bulk development right and why does it matter?",
            answer: "Bulk refers to the maximum permissible gross floor area (GFA) that can be built on a site, determined by the Floor Area Ratio (FAR) and coverage allowances. Higher bulk equals greater development potential and value.",
         },
         {
            id: 14,
            question: "How do I find suitable development land through DG Property?",
            answer: "DG Property maintains an active database of development land across South Africa. We match site requirements against available land and can facilitate off-market introductions for serious developers.",
         },
      ]
   },
   {
      id: 5,
      id_name: "Tenant",
      title: "TENANT ADVISORY",
      faq: [
         {
            id: 15,
            question: "What does tenant representation mean?",
            answer: "Tenant representation means DG Property acts exclusively on behalf of the occupier, not the landlord. We search the market, shortlist suitable properties, and negotiate lease terms in the tenant's best interests, at no cost to the tenant in most cases.",
         },
         {
            id: 16,
            question: "When should a business start its property search?",
            answer: "Ideally 12 to 18 months before lease expiry for large occupiers, and 6 to 9 months for smaller businesses. Starting early provides negotiating leverage and ensures alternatives are properly evaluated.",
         },
      ]
   },
   {
      id: 6,
      id_name: "General",
      title: "GENERAL",
      faq: [
         {
            id: 17,
            question: "How do I contact DG Property?",
            answer: "You can reach DG Property at our Bedfordview office: Bedford Arcade, 59 Van Buuren Rd, Bedfordview, Johannesburg 2007. Call us on 087 630 2532 or email hello@dg-property.co.za. We respond within one business day.",
         },
         {
            id: 18,
            question: "Does DG Property work outside Gauteng?",
            answer: "While DG Property is headquartered in Johannesburg and most active in Gauteng, we assist clients with transactions in Cape Town, Durban and other major centres through our national network.",
         },
      ]
   },
]

export default inner_faq_data;
