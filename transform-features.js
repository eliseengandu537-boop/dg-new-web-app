const fs = require('fs');
const file = 'src/data/home-data/FeatureData.ts';
let c = fs.readFileSync(file, 'utf8');

// Replace home_1_feature_1 (Buy a home / RENT A HOME / SELL PROPERTY)
c = c.replace(
  /(\s+id: 1,\s+page: "home_1_feature_1",[\s\S]*?page: "home_1_feature_3",)/,
  `
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

   // home_1_feature_3

   {
      id: 1,
      page: "home_1_feature_3",`
);

// Replace home_two_feature_3 (Property Insurance, Easy Payments, Quick Process)
c = c.replace(
  /\/\/ home_two_feature_3\s+\{[\s\S]*?title: "Quick Process",[\s\S]*?desc: "Duis aute irure dolor reprehe de Cicero's voluptat velit\.",[\s\S]*?\},/,
  `// home_two_feature_3

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
   },`
);

// Replace home_3_feature_1 (Buy a home x3)
c = c.replace(
  /\{[\s\S]*?page: "home_3_feature_1",[\s\S]*?page: "home_3_feature_1",[\s\S]*?page: "home_3_feature_1",[\s\S]*?desc: "List, sell, thrive[\s\S]*?\},/,
  `{
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
   },`
);

// Replace home_three_feature_2 (Property Insurance, Easy Payments, Quick Process)
c = c.replace(
  /\/\/ home_three_feature_2\s+\{[\s\S]*?title: "Quick Process",[\s\S]*?desc: "Duis aute irure dolor reprehe de Cicero's voluptat velit\.",[\s\S]*?\},/,
  `// home_three_feature_2

   {
      id: 1,
      page: "home_three_feature_2",
      icon: feature3Icon_4,
      title: "Specialist Focus",
      desc: "Dedicated to commercial, industrial and investment property — nothing residential, nothing generic.",
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
   },`
);

// Replace home_4_feature_1 (Buy/Rent/Sell a home)
c = c.replace(
  /\{[\s\S]*?page: "home_4_feature_1",[\s\S]*?page: "home_4_feature_1",[\s\S]*?page: "home_4_feature_1",[\s\S]*?btn: "Sell Property",[\s\S]*?\},/,
  `{
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
      desc: "Warehouses, logistics hubs and manufacturing facilities for lease or sale across South Africa.",
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
   },`
);

// Replace home_5_feature_1 (US cities)
c = c.replace(
  /\/\/ home_5_feature_1\s+\{[\s\S]*?title: "California",[\s\S]*?title: "Miami",[\s\S]*?title: "New York",[\s\S]*?title: "Washington DC",[\s\S]*?\},/,
  `// home_5_feature_1

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
   },`
);

// Replace home_6_feature_1 (Property Insurance, Easy Payments, Quick Process)
c = c.replace(
  /\/\/ home_6_feature_1\s+\{[\s\S]*?title: "Quick Process",[\s\S]*?desc: "Duis aute irure do reprehe de Cicero's voluptat velit\.",[\s\S]*?\},/,
  `// home_6_feature_1
   
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
   },`
);

fs.writeFileSync(file, c, 'utf8');

// Verify
const result = fs.readFileSync(file, 'utf8');
console.log('LEASE COMMERCIAL:', result.includes('LEASE COMMERCIAL SPACE'));
console.log('Buy a home:', result.includes('Buy a home'));
console.log('RENT A HOME:', result.includes('RENT A HOME'));
console.log('Discreet Execution:', result.includes('Discreet Execution'));
console.log('Commercial Leasing:', result.includes('Commercial Leasing'));
console.log('Specialist Focus:', result.includes('Specialist Focus'));
console.log('Retail Leasing:', result.includes('Retail Leasing'));
console.log('Johannesburg (home5):', result.includes('home_5_feature_1'));
console.log('Commercial Sales:', result.includes('Commercial Sales'));
