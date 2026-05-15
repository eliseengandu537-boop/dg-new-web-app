const fs = require('fs');

// Helper: normalize CRLF in file content, do replacement, then restore original line ending style
function replaceInFile(file, replacements) {
  let raw = fs.readFileSync(file, 'utf8');
  // Normalize to LF for matching
  let c = raw.replace(/\r\n/g, '\n');
  
  for (const [from, to] of replacements) {
    const prev = c;
    c = c.replace(from, to);
    if (c === prev) {
      console.log(`  WARNING: not found -> "${from.substring(0,60).replace(/\n/g,'\\n')}..."`);
    }
  }
  
  // Restore CRLF
  c = c.replace(/\n/g, '\r\n');
  fs.writeFileSync(file, c, 'utf8');
}

// ===== FeatureData.ts =====
console.log('Transforming FeatureData.ts...');
replaceInFile('src/data/home-data/FeatureData.ts', [
  // home_1_feature_1
  ['title: "Buy a home",\n      btn:"Find Home",\n      desc: "Explore HOZN 2 million+ homes and uncover your ideal living space.",',
   'title: "LEASE COMMERCIAL SPACE",\n      btn:"View Leasing",\n      desc: "Retail, office and industrial leasing across South Africa\'s key commercial nodes.",'],
  
  ['title: "RENT A HOME",\n      btn:"Rent Home",\n      desc: "Discover a rental you\'ll love on HOZN, thanks to 35+ filters and tailored keywords.",',
   'title: "BUY INVESTMENT PROPERTY",\n      btn:"View Investments",\n      desc: "Acquire income-producing commercial assets backed by DG Property\'s expert due diligence.",'],
  
  ['title: "SELL PROPERTY",\n      btn:"Sell Property",',
   'title: "SELL YOUR ASSET",\n      btn:"List Your Property",'],
  
  // The en-dash character U+2013
  ['desc: "List, sell, thrive \u2013 with our top-notch real estate agency. It\'s super easy & fun.",',
   'desc: "Mandate DG Property to market and dispose of your commercial or industrial asset discreetly.",'],
  
  // home_two_feature_3
  ['page: "home_two_feature_3",\n      icon: feature4Icon_1,\n      title: "Property Insurance",\n      desc: "Elit esse cillum dolo fugiat nulla tur nos ullamo.",',
   'page: "home_two_feature_3",\n      icon: feature4Icon_1,\n      title: "Discreet Execution",\n      desc: "Off-market and mandated transactions handled with confidentiality and precision.",'],
  
  ['page: "home_two_feature_3",\n      icon: feature4Icon_2,\n      title: "Easy Payments",\n      desc: "quis nostrud exerct ullamo sucirity finibus ne derived.",',
   'page: "home_two_feature_3",\n      icon: feature4Icon_2,\n      title: "Market Intelligence",\n      desc: "Sharp insight into commercial market trends, vacancy rates and investment yields.",'],
  
  ['page: "home_two_feature_3",\n      icon: feature4Icon_3,\n      title: "Quick Process",\n      desc: "Duis aute irure dolor reprehe de Cicero\'s voluptat velit.",',
   'page: "home_two_feature_3",\n      icon: feature4Icon_3,\n      title: "Hands-On Advisory",\n      desc: "Practical guidance from mandate to close, covering leasing, acquisition and disposal.",'],
  
  // home_3_feature_1
  ['page: "home_3_feature_1",\n      icon: feature5Icon_1,\n      title: "Buy a home",\n      btn: "Find Home",\n      desc: "Explore HOZN 2 million+ homes and uncover your ideal living space.",',
   'page: "home_3_feature_1",\n      icon: feature5Icon_1,\n      title: "Commercial Leasing",\n      btn: "View Leasing",\n      desc: "Retail, office and industrial leasing solutions across South Africa\'s major commercial nodes.",'],
  
  ['page: "home_3_feature_1",\n      icon: feature5Icon_2,\n      title: "Buy a home",\n      btn: "Rent Home",\n      desc: "Discover a rental you\'ll love on HOZN, thanks to 35+ filters and tailored keywords.",',
   'page: "home_3_feature_1",\n      icon: feature5Icon_2,\n      title: "Investment Sales",\n      btn: "View Investments",\n      desc: "Acquire or dispose of income-generating commercial property with expert market guidance.",'],
  
  ['page: "home_3_feature_1",\n      icon: feature5Icon_3,\n      title: "Buy a home",\n      btn: "Sell Property",\n      desc: "List, sell, thrive \u2013 with our top-notch real estate agency. It\'s super easy & fun.",',
   'page: "home_3_feature_1",\n      icon: feature5Icon_3,\n      title: "Development Land",\n      btn: "View Land",\n      desc: "Identify and transact on development land suited to commercial, industrial or mixed-use projects.",'],
  
  // home_three_feature_2
  ['page: "home_three_feature_2",\n      icon: feature3Icon_4,\n      title: "Property Insurance",\n      desc: "Elit esse cillum dolo fugiat nulla tur nos ullamo.",',
   'page: "home_three_feature_2",\n      icon: feature3Icon_4,\n      title: "Specialist Focus",\n      desc: "Dedicated to commercial, industrial and investment property \u2014 nothing residential, nothing generic.",'],
  
  ['page: "home_three_feature_2",\n      icon: feature3Icon_5,\n      title: "Easy Payments",\n      desc: "quis nostrud exerct ullamo sucirity finibus ne derived.",',
   'page: "home_three_feature_2",\n      icon: feature3Icon_5,\n      title: "Qualified Network",\n      desc: "Access to a deep network of landlords, investors, developers and occupiers across South Africa.",'],
  
  ['page: "home_three_feature_2",\n      icon: feature3Icon_6,\n      title: "Quick Process",\n      desc: "Duis aute irure dolor reprehe de Cicero\'s voluptat velit.",',
   'page: "home_three_feature_2",\n      icon: feature3Icon_6,\n      title: "Proven Results",\n      desc: "Over R250M in completed transactions underpins our track record in commercial brokerage.",'],
  
  // home_4_feature_1
  ['page: "home_4_feature_1",\n      icon: feature6Icon_1,\n      title: "Buy a home",\n      btn: "Find Home",\n      desc: "Explore HOZN 2 million+ homes and uncover your ideal living space.",',
   'page: "home_4_feature_1",\n      icon: feature6Icon_1,\n      title: "Retail Leasing",\n      btn: "View Retail",\n      desc: "Connect your retail space with quality tenants. DG Property manages the full leasing process.",'],
  
  ['page: "home_4_feature_1",\n      icon: feature6Icon_2,\n      title: "Rent a home",\n      btn: "Rent Home",\n      desc: "Discover a rental you\'ll love on HOZN, thanks to 35+ filters and tailored keywords.",',
   'page: "home_4_feature_1",\n      icon: feature6Icon_2,\n      title: "Industrial Property",\n      btn: "View Industrial",\n      desc: "Warehouses, logistics hubs and manufacturing facilities for lease or sale across South Africa.",'],
  
  ['page: "home_4_feature_1",\n      icon: feature6Icon_3,\n      title: "Sell a home",\n      btn: "Sell Property",\n      desc: "List, sell, thrive \u2013 with our top-notch real estate agency. It\'s super easy & fun.",',
   'page: "home_4_feature_1",\n      icon: feature6Icon_3,\n      title: "Investment Sales",\n      btn: "View Investments",\n      desc: "Sell or acquire yielding commercial assets with the support of DG Property\'s brokerage team.",'],
  
  // home_5_feature_1 - US cities
  ['item_bg: "home-5-feature-item-1",\n      title: "California",\n      desc: "1,230 Listing",',
   'item_bg: "home-5-feature-item-1",\n      title: "Johannesburg",\n      desc: "Commercial & Industrial",'],
  
  ['item_bg: "home-5-feature-item-2",\n      title: "Miami",\n      desc: "1,140 Listing",',
   'item_bg: "home-5-feature-item-2",\n      title: "Cape Town",\n      desc: "Retail & Office",'],
  
  ['item_bg: "home-5-feature-item-3",\n      title: "New York",\n      desc: "1,740 Listing",',
   'item_bg: "home-5-feature-item-3",\n      title: "Durban",\n      desc: "Logistics & Port Node",'],
  
  ['item_bg: "home-5-feature-item-4",\n      title: "Washington DC",\n      desc: "720 Listing",',
   'item_bg: "home-5-feature-item-4",\n      title: "Pretoria",\n      desc: "Office & Government",'],
  
  // home_6_feature_1
  ['page: "home_6_feature_1",\n      icon:feature7Icon_1,\n      title: "Property Insurance",\n      desc: "Elit esse cillum dol fug nulla tur nos ullamo.",',
   'page: "home_6_feature_1",\n      icon:feature7Icon_1,\n      title: "Commercial Sales",\n      desc: "End-to-end sales mandates for office, retail and industrial assets across South Africa.",'],
  
  ['page: "home_6_feature_1",\n      icon:feature7Icon_2,\n      title: "Easy Payments",\n      desc: "quis nostrud exerct ulla security finibus ne derived.",',
   'page: "home_6_feature_1",\n      icon:feature7Icon_2,\n      title: "Tenant Representation",\n      desc: "Securing the right space for growing businesses through focused tenant advisory services.",'],
  
  ['page: "home_6_feature_1",\n      icon:feature7Icon_3,\n      title: "Quick Process",\n      desc: "Duis aute irure do reprehe de Cicero\'s voluptat velit.",',
   'page: "home_6_feature_1",\n      icon:feature7Icon_3,\n      title: "Portfolio Strategy",\n      desc: "Helping investors grow, manage and optimise commercial property portfolios for maximum returns.",'],
]);

const feat = fs.readFileSync('src/data/home-data/FeatureData.ts', 'utf8');
console.log('  LEASE COMMERCIAL SPACE:', feat.includes('LEASE COMMERCIAL SPACE'));
console.log('  BUY INVESTMENT PROPERTY:', feat.includes('BUY INVESTMENT PROPERTY'));
console.log('  Discreet Execution:', feat.includes('Discreet Execution'));
console.log('  Commercial Leasing:', feat.includes('Commercial Leasing'));
console.log('  Specialist Focus:', feat.includes('Specialist Focus'));
console.log('  Retail Leasing:', feat.includes('Retail Leasing'));
console.log('  Johannesburg (home5):', feat.includes('home-5-feature-item-1') && feat.includes('"Johannesburg"'));
console.log('  Commercial Sales:', feat.includes('Commercial Sales'));
console.log('  Remaining Buy a home:', (feat.match(/Buy a home/g)||[]).length);

// ===== FeaturedListingData.ts =====
console.log('\nTransforming FeaturedListingData.ts...');
replaceInFile('src/data/home-data/FeaturedListingData.ts', [
  ['tag: "Rent",\n      item_bg_img:"item-bg-1",\n      title: "Blueberry villa.",\n      address: "Mirpur 10, Stadium dhaka 1208",',
   'tag: "TO LET",\n      item_bg_img:"item-bg-1",\n      title: "Sandton Office Park",\n      address: "Sandton, Johannesburg, Gauteng",'],
  ['tag: "Sell",\n      item_bg_img:"item-bg-2",\n      title: "Swimming Pool Villa",\n      address: "127 green road, California, USA",',
   'tag: "FOR SALE",\n      item_bg_img:"item-bg-2",\n      title: "Bedfordview Retail Centre",\n      address: "Bedfordview, Johannesburg, Gauteng",'],
  ['tag: "Rent",\n      item_bg_img:"item-bg-3",\n      title: "Modern Duplex",\n      address: "Twin tower, 32 street, Florida",',
   'tag: "TO LET",\n      item_bg_img:"item-bg-3",\n      title: "Germiston Industrial Hub",\n      address: "Germiston, Ekurhuleni, Gauteng",'],
  ['{feature: "bed", total_feature: 0o3 }', '{feature: "units", total_feature: 3 }'],
  ['{feature: "kitchen", total_feature: 0o1 }', '{feature: "tenants", total_feature: 1 }'],
  ['{feature: "bath", total_feature: 0o2 }', '{feature: "levels", total_feature: 2 }'],
]);
const feat2 = fs.readFileSync('src/data/home-data/FeaturedListingData.ts', 'utf8');
console.log('  Sandton Office Park:', feat2.includes('Sandton Office Park'));

// ===== AgentData.ts (home-data) =====
console.log('\nTransforming AgentData.ts (home)...');
replaceInFile('src/data/home-data/AgentData.ts', [
  ['title: "Mark Filo",\n      desc: "CEO & Founder",', 'title: "Dustin De Gennaro",\n      desc: "Director & Founding Principal",'],
  ['title: "Chris Matial",\n      desc: "Retailer",', 'title: "Deylin van Zyl",\n      desc: "Commercial Broker",'],
  ['title: "Jubayer Al Hasan",\n      desc: "Marketing Expert",', 'title: "Sarah Matthys",\n      desc: "Retail Leasing Specialist",'],
  ['title: "Jannatul Ferdaus",\n      desc: "Broker",', 'title: "Ryan Naidoo",\n      desc: "Investment Sales Broker",'],
  ['title: "Chris Matial",\n      desc: "Broker",', 'title: "Lara Botha",\n      desc: "Tenant Representative",'],
]);
const ag = fs.readFileSync('src/data/home-data/AgentData.ts', 'utf8');
console.log('  Dustin De Gennaro:', ag.includes('Dustin De Gennaro'));

// ===== BlogData.ts (home-data) =====
console.log('\nTransforming BlogData.ts (home)...');
replaceInFile('src/data/home-data/BlogData.ts', [
  ['title: "Spending Habits, 13 Tips for grow Your Money.",', 'title: "Commercial Lease Negotiations: What Tenants Need to Know.",'],
  ['title: "Designer\'s Checklist for Every UX/UI Project.",', 'title: "Industrial Property Trends in Gauteng for 2025.",'],
  ['title: "Print, publishing qui visual ux layout mockups.",', 'title: "Why Retail Nodes Are Recovering Faster Than Expected.",'],
  ['info_name: "Rashed Ka .",', 'info_name: "DG Property .",'],
  ['info_name: "Jubayer Hasan . ",', 'info_name: "DG Property .",'],
  ['info_name: "Mark Quins . ",', 'info_name: "DG Property .",'],
  ['info_name: "Rashed Kabir . ",', 'info_name: "DG Property .",'],
]);
const bl = fs.readFileSync('src/data/home-data/BlogData.ts', 'utf8');
console.log('  Commercial Lease Negotiations:', bl.includes('Commercial Lease Negotiations'));

// ===== FeedbackData.ts - home_3 (residential) =====
console.log('\nTransforming FeedbackData.ts...');
replaceInFile('src/data/home-data/FeedbackData.ts', [
  ['desc: "Efficient and friendly service, guided us perfectly. Satisfied with our new home. Thank you!",',
   'desc: "DG Property guided our retail lease from search through to signature. Professional and precise.",'],
  ['title: "Rashed Kabir",\n      country: "Milan, Itlay",',
   'title: "Corporate Occupier",\n      country: "Johannesburg, SA",'],
  ['desc: "Found our dream home. Great Business with them. Thank you for excellent service.",',
   'desc: "Sold our industrial asset above asking. The DG team delivered a qualified buyer within weeks.",'],
  ['title: "Jannat Ferdu.",\n      country: "London, Uk",',
   'title: "Property Fund Manager",\n      country: "Gauteng, SA",'],
  ['title: "Jubayer Hasan",\n      country: "Miami, USA",',
   'title: "Private Investor",\n      country: "Cape Town, SA",'],
]);
const fb = fs.readFileSync('src/data/home-data/FeedbackData.ts', 'utf8');
console.log('  Corporate Occupier:', fb.includes('Corporate Occupier'));

console.log('\n--- All home-data transforms complete ---');
