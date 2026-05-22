const fs = require('fs');

// ===== FeatureData.ts =====
(function() {
  const file = 'src/data/home-data/FeatureData.ts';
  let c = fs.readFileSync(file, 'utf8');

  // home_1_feature_1 - Buy a home / RENT A HOME / SELL PROPERTY
  c = c.replace(
    `title: "Buy a home",
      btn:"Find Home",
      desc: "Explore HOZN 2 million+ homes and uncover your ideal living space.",`,
    `title: "LEASE COMMERCIAL SPACE",
      btn:"View Leasing",
      desc: "Retail, office and industrial leasing across South Africa's key commercial nodes.",`
  );
  c = c.replace(
    `title: "RENT A HOME",
      btn:"Rent Home",
      desc: "Discover a rental you'll love on HOZN, thanks to 35+ filters and tailored keywords.",`,
    `title: "BUY INVESTMENT PROPERTY",
      btn:"View Investments",
      desc: "Acquire income-producing commercial assets backed by DG Property's expert due diligence.",`
  );
  c = c.replace(
    `title: "SELL PROPERTY",
      btn:"Sell Property",`,
    `title: "SELL YOUR ASSET",
      btn:"List Your Property",`
  );
  c = c.replace(
    `desc: "List, sell, thrive \u2013 with our top-notch real estate agency. It's super easy & fun.",`,
    `desc: "Mandate DG Property to market and dispose of your commercial or industrial asset discreetly.",`
  );

  // home_1_feature_2 - US cities to SA cities (already done by multi_replace)

  // home_two_feature_3
  c = c.replace(
    `title: "Property Insurance",
      desc: "Elit esse cillum dolo fugiat nulla tur nos ullamo.",`,
    `title: "Discreet Execution",
      desc: "Off-market and mandated transactions handled with confidentiality and precision.",`
  );
  c = c.replace(
    `title: "Easy Payments",
      desc: "quis nostrud exerct ullamo sucirity finibus ne derived.",`,
    `title: "Market Intelligence",
      desc: "Sharp insight into commercial market trends, vacancy rates and investment yields.",`
  );
  c = c.replace(
    `title: "Quick Process",
      desc: "Duis aute irure dolor reprehe de Cicero's voluptat velit.",`,
    `title: "Hands-On Advisory",
      desc: "Practical guidance from mandate to close, covering leasing, acquisition and disposal.",`
  );

  // home_3_feature_1 - uses feature5Icons
  c = c.replace(
    `page: "home_3_feature_1",
      icon: feature5Icon_1,
      title: "Buy a home",
      btn: "Find Home",
      desc: "Explore HOZN 2 million+ homes and uncover your ideal living space.",`,
    `page: "home_3_feature_1",
      icon: feature5Icon_1,
      title: "Commercial Leasing",
      btn: "View Leasing",
      desc: "Retail, office and industrial leasing solutions across South Africa's major commercial nodes.",`
  );
  c = c.replace(
    `page: "home_3_feature_1",
      icon: feature5Icon_2,
      title: "Buy a home",
      btn: "Rent Home",
      desc: "Discover a rental you'll love on HOZN, thanks to 35+ filters and tailored keywords.",`,
    `page: "home_3_feature_1",
      icon: feature5Icon_2,
      title: "Investment Sales",
      btn: "View Investments",
      desc: "Acquire or dispose of income-generating commercial property with expert market guidance.",`
  );
  c = c.replace(
    `page: "home_3_feature_1",
      icon: feature5Icon_3,
      title: "Buy a home",
      btn: "Sell Property",
      desc: "List, sell, thrive \u2013 with our top-notch real estate agency. It's super easy & fun.",`,
    `page: "home_3_feature_1",
      icon: feature5Icon_3,
      title: "Development Land",
      btn: "View Land",
      desc: "Identify and transact on development land suited to commercial, industrial or mixed-use projects.",`
  );

  // home_three_feature_2
  c = c.replace(
    `page: "home_three_feature_2",
      icon: feature3Icon_4,
      title: "Property Insurance",
      desc: "Elit esse cillum dolo fugiat nulla tur nos ullamo.",`,
    `page: "home_three_feature_2",
      icon: feature3Icon_4,
      title: "Specialist Focus",
      desc: "Dedicated to commercial, industrial and investment property — nothing residential, nothing generic.",`
  );
  c = c.replace(
    `page: "home_three_feature_2",
      icon: feature3Icon_5,
      title: "Easy Payments",
      desc: "quis nostrud exerct ullamo sucirity finibus ne derived.",`,
    `page: "home_three_feature_2",
      icon: feature3Icon_5,
      title: "Qualified Network",
      desc: "Access to a deep network of landlords, investors, developers and occupiers across South Africa.",`
  );
  c = c.replace(
    `page: "home_three_feature_2",
      icon: feature3Icon_6,
      title: "Quick Process",
      desc: "Duis aute irure dolor reprehe de Cicero's voluptat velit.",`,
    `page: "home_three_feature_2",
      icon: feature3Icon_6,
      title: "Proven Results",
      desc: "Over R250M in completed transactions underpins our track record in commercial brokerage.",`
  );

  // home_4_feature_1 - uses feature6Icons
  c = c.replace(
    `page: "home_4_feature_1",
      icon: feature6Icon_1,
      title: "Buy a home",
      btn: "Find Home",
      desc: "Explore HOZN 2 million+ homes and uncover your ideal living space.",`,
    `page: "home_4_feature_1",
      icon: feature6Icon_1,
      title: "Retail Leasing",
      btn: "View Retail",
      desc: "Connect your retail space with quality tenants. DG Property manages the full leasing process.",`
  );
  c = c.replace(
    `page: "home_4_feature_1",
      icon: feature6Icon_2,
      title: "Rent a home",
      btn: "Rent Home",
      desc: "Discover a rental you'll love on HOZN, thanks to 35+ filters and tailored keywords.",`,
    `page: "home_4_feature_1",
      icon: feature6Icon_2,
      title: "Industrial Property",
      btn: "View Industrial",
      desc: "Warehouses, logistics hubs and manufacturing facilities for lease or sale across South Africa.",`
  );
  c = c.replace(
    `page: "home_4_feature_1",
      icon: feature6Icon_3,
      title: "Sell a home",
      btn: "Sell Property",
      desc: "List, sell, thrive \u2013 with our top-notch real estate agency. It's super easy & fun.",`,
    `page: "home_4_feature_1",
      icon: feature6Icon_3,
      title: "Investment Sales",
      btn: "View Investments",
      desc: "Sell or acquire yielding commercial assets with the support of DG Property's brokerage team.",`
  );

  // home_5_feature_1 - US cities
  c = c.replace(
    `page: "home_5_feature_1",
      item_bg: "home-5-feature-item-1",
      title: "California",
      desc: "1,230 Listing",`,
    `page: "home_5_feature_1",
      item_bg: "home-5-feature-item-1",
      title: "Johannesburg",
      desc: "Commercial & Industrial",`
  );
  c = c.replace(
    `page: "home_5_feature_1",
      item_bg: "home-5-feature-item-2",
      title: "Miami",
      desc: "1,140 Listing",`,
    `page: "home_5_feature_1",
      item_bg: "home-5-feature-item-2",
      title: "Cape Town",
      desc: "Retail & Office",`
  );
  c = c.replace(
    `page: "home_5_feature_1",
      item_bg: "home-5-feature-item-3",
      title: "New York",
      desc: "1,740 Listing",`,
    `page: "home_5_feature_1",
      item_bg: "home-5-feature-item-3",
      title: "Durban",
      desc: "Logistics & Port Node",`
  );
  c = c.replace(
    `page: "home_5_feature_1",
      item_bg: "home-5-feature-item-4",
      title: "Washington DC",
      desc: "720 Listing",`,
    `page: "home_5_feature_1",
      item_bg: "home-5-feature-item-4",
      title: "Pretoria",
      desc: "Office & Government",`
  );

  // home_6_feature_1
  c = c.replace(
    `page: "home_6_feature_1",
      icon:feature7Icon_1,
      title: "Property Insurance",
      desc: "Elit esse cillum dol fug nulla tur nos ullamo.",`,
    `page: "home_6_feature_1",
      icon:feature7Icon_1,
      title: "Commercial Sales",
      desc: "End-to-end sales mandates for office, retail and industrial assets across South Africa.",`
  );
  c = c.replace(
    `page: "home_6_feature_1",
      icon:feature7Icon_2,
      title: "Easy Payments",
      desc: "quis nostrud exerct ulla security finibus ne derived.",`,
    `page: "home_6_feature_1",
      icon:feature7Icon_2,
      title: "Tenant Representation",
      desc: "Securing the right space for growing businesses through focused tenant advisory services.",`
  );
  c = c.replace(
    `page: "home_6_feature_1",
      icon:feature7Icon_3,
      title: "Quick Process",
      desc: "Duis aute irure do reprehe de Cicero's voluptat velit.",`,
    `page: "home_6_feature_1",
      icon:feature7Icon_3,
      title: "Portfolio Strategy",
      desc: "Helping investors grow, manage and optimise commercial property portfolios for maximum returns.",`
  );

  fs.writeFileSync(file, c, 'utf8');
  const r = fs.readFileSync(file, 'utf8');
  console.log('FeatureData.ts:');
  console.log('  LEASE COMMERCIAL SPACE:', r.includes('LEASE COMMERCIAL SPACE'));
  console.log('  BUY INVESTMENT PROPERTY:', r.includes('BUY INVESTMENT PROPERTY'));
  console.log('  SELL YOUR ASSET:', r.includes('SELL YOUR ASSET'));
  console.log('  Discreet Execution:', r.includes('Discreet Execution'));
  console.log('  Commercial Leasing:', r.includes('Commercial Leasing'));
  console.log('  Specialist Focus:', r.includes('Specialist Focus'));
  console.log('  Retail Leasing:', r.includes('Retail Leasing'));
  console.log('  Johannesburg (home5):', r.includes("home-5-feature-item-1") && r.includes("Johannesburg"));
  console.log('  Commercial Sales:', r.includes('Commercial Sales'));
  console.log('  Remaining "Buy a home":', (r.match(/Buy a home/g)||[]).length);
  console.log('  Remaining residential:', r.includes('RENT A HOME') || r.includes('Explore HOZN'));
})();

// ===== CategoryData.ts =====
(function() {
  const file = 'src/data/home-data/CategoryData.ts';
  let c = fs.readFileSync(file, 'utf8');

  // home_3 categories: replace residential with commercial
  const replacements = [
    ['text: "Shopping Mall",', 'text: "Retail Space",'],
    ['text: "Apartments",', 'text: "Office Space",'],
    ['text: "Villa",', 'text: "Industrial",'],
    ['text: "Industry",', 'text: "Warehousing",'],
    ['text: "Medical",', 'text: "Mixed-Use",'],
    ['text: "House",', 'text: "Development Land",'],
    ['text: "Loft",', 'text: "Logistics",'],
  ];
  for (const [from, to] of replacements) {
    c = c.replace(from, to);
  }

  // home_4 - apartments
  c = c.replace(/page: "home_4"([\s\S]*?)text: "Apartments",/, (m, g1) => `page: "home_4"${g1}text: "Office Space",`);

  fs.writeFileSync(file, c, 'utf8');
  const r = fs.readFileSync(file, 'utf8');
  console.log('\nCategoryData.ts:');
  console.log('  Retail Space:', r.includes('Retail Space'));
  console.log('  Office Space:', r.includes('Office Space'));
  console.log('  Warehousing:', r.includes('Warehousing'));
})();

// ===== FeaturedListingData.ts =====
(function() {
  const file = 'src/data/home-data/FeaturedListingData.ts';
  let c = fs.readFileSync(file, 'utf8');

  c = c
    .replace(`title: "Blueberry villa.",\n      address: "Mirpur 10, Stadium dhaka 1208",`, `title: "Sandton Office Park",\n      address: "Sandton, Johannesburg, Gauteng",`)
    .replace(`tag: "Rent",\n      item_bg_img:"item-bg-1",`, `tag: "TO LET",\n      item_bg_img:"item-bg-1",`)
    .replace(`title: "Swimming Pool Villa",\n      address: "127 green road, California, USA",`, `title: "Bedfordview Retail Centre",\n      address: "Bedfordview, Johannesburg, Gauteng",`)
    .replace(`tag: "Sell",\n      item_bg_img:"item-bg-2",`, `tag: "FOR SALE",\n      item_bg_img:"item-bg-2",`)
    .replace(`title: "Modern Duplex",\n      address: "Twin tower, 32 street, Florida",`, `title: "Germiston Industrial Hub",\n      address: "Germiston, Ekurhuleni, Gauteng",`)
    .replace(`tag: "Rent",\n      item_bg_img:"item-bg-3",`, `tag: "TO LET",\n      item_bg_img:"item-bg-3",`)
    .replace(/feature: "bed", total_feature: 0o3/g, 'feature: "units", total_feature: 3')
    .replace(/feature: "kitchen", total_feature: 0o1/g, 'feature: "tenants", total_feature: 1')
    .replace(/feature: "bath", total_feature: 0o2/g, 'feature: "levels", total_feature: 2');

  fs.writeFileSync(file, c, 'utf8');
  const r = fs.readFileSync(file, 'utf8');
  console.log('\nFeaturedListingData.ts:');
  console.log('  Sandton Office Park:', r.includes('Sandton Office Park'));
  console.log('  Bedfordview Retail:', r.includes('Bedfordview Retail'));
})();

// ===== AgentData.ts (home-data) =====
(function() {
  const file = 'src/data/home-data/AgentData.ts';
  let c = fs.readFileSync(file, 'utf8');

  c = c
    .replace(`title: "Mark Filo",\n      desc: "CEO & Founder",`, `title: "Dustin De Gennaro",\n      desc: "Director & Founding Principal",`)
    .replace(`title: "Chris Matial",\n      desc: "Retailer",`, `title: "Deylin van Zyl",\n      desc: "Commercial Broker",`)
    .replace(`title: "Jubayer Al Hasan",\n      desc: "Marketing Expert",`, `title: "Sarah Matthys",\n      desc: "Retail Leasing Specialist",`)
    .replace(`title: "Jannatul Ferdaus",\n      desc: "Broker",`, `title: "Ryan Naidoo",\n      desc: "Investment Sales Broker",`)
    .replace(`title: "Chris Matial",\n      desc: "Broker",`, `title: "Lara Botha",\n      desc: "Tenant Representative",`);

  fs.writeFileSync(file, c, 'utf8');
  const r = fs.readFileSync(file, 'utf8');
  console.log('\nAgentData.ts (home):');
  console.log('  Dustin De Gennaro:', r.includes('Dustin De Gennaro'));
})();

// ===== BlogData.ts (home-data) =====
(function() {
  const file = 'src/data/home-data/BlogData.ts';
  let c = fs.readFileSync(file, 'utf8');

  c = c
    .replace(`title: "Spending Habits, 13 Tips for grow Your Money.",`, `title: "Commercial Lease Negotiations: What Tenants Need to Know.",`)
    .replace(`title: "Designer's Checklist for Every UX/UI Project.",`,  `title: "Industrial Property Trends in Gauteng for 2025.",`)
    .replace(`title: "Print, publishing qui visual ux layout mockups.",`, `title: "Why Retail Nodes Are Recovering Faster Than Expected.",`)
    .replace(`info_name: "Mark Quins . ",`, `info_name: "DG Property . ",`)
    .replace(`info_name: "Rashed Kabir . ",\n   info_time: 7,`, `info_name: "DG Property . ",\n   info_time: 7,`);

  // home_4 blog entries
  c = c
    .replace(`title: "Spending Habits, 13 Tips for grow Your Money.",\n},`, `title: "How Investment Yields Are Shifting in SA's Commercial Sector.",\n},`)
    .replace(`title: "Designer's Checklist for Every UX/UI Project.",\n},`, `title: "Office Vacancies vs Demand: The 2025 Outlook.",\n},`)
    .replace(`title: "Print, publishing qui visual ux layout mockups.",\n},`, `title: "Development Land: Identifying Value in Urban Fringe Zones.",\n},`);

  fs.writeFileSync(file, c, 'utf8');
  const r = fs.readFileSync(file, 'utf8');
  console.log('\nBlogData.ts (home):');
  console.log('  Commercial Lease Negotiations:', r.includes('Commercial Lease Negotiations'));
})();

// ===== FeedbackData.ts - home_3 (residential) =====
(function() {
  const file = 'src/data/home-data/FeedbackData.ts';
  let c = fs.readFileSync(file, 'utf8');

  c = c
    .replace(`desc: "Efficient and friendly service, guided us perfectly. Satisfied with our new home. Thank you!",\n      title: "Rashed Kabir",\n      country: "Milan, Itlay",`, `desc: "DG Property guided our retail lease from search through to signature. Professional and precise.",\n      title: "Corporate Occupier",\n      country: "Johannesburg, SA",`)
    .replace(`desc: "Found our dream home. Great Business with them. Thank you for excellent service.",\n      title: "Jannat Ferdu.",\n      country: "London, Uk",`, `desc: "Sold our industrial asset above asking. The DG team delivered a qualified buyer within weeks.",\n      title: "Property Fund Manager",\n      country: "Gauteng, SA",`)
    .replace(`desc: "Efficient and friendly service, guided us perfectly. Satisfied with our new home. Thank you!",\n      title: "Jubayer Hasan",\n      country: "Miami, USA",`, `desc: "Excellent market knowledge and discretion throughout the transaction. Highly recommended.",\n      title: "Private Investor",\n      country: "Cape Town, SA",`)
    .replace(`desc: "Found our dream home. Great Business with them. Thank you for excellent service.",\n      title: "Jannat Ferdu.",\n      country: "London, Uk",`, `desc: "Our warehouse lease was handled seamlessly. DG Property understands the industrial space.",\n      title: "Logistics Director",\n      country: "Ekurhuleni, SA",`);

  fs.writeFileSync(file, c, 'utf8');
  const r = fs.readFileSync(file, 'utf8');
  console.log('\nFeedbackData.ts:');
  console.log('  Corporate Occupier:', r.includes('Corporate Occupier'));
})();

// ===== MenuData.ts =====
(function() {
  const file = 'src/data/home-data/MenuData.ts';
  let c = fs.readFileSync(file, 'utf8');

  const newMenu = `interface MenuItem {
    id: number;
    title: string;
    class_name?:string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
    }[];
    menu_column?: {
        id: number;
        mega_title: string;
        mega_menus: {
            link: string;
            title: string;
        }[];
    }[]
}[];

const menu_data: MenuItem[] = [

    {
        id: 1,
        has_dropdown: false,
        title: "Home",
        link: "/home-two",
    },

    {
        id: 2,
        has_dropdown: true,
        title: "Properties",
        link: "#",
        sub_menus: [
            { link: "/listing_07", title: "All Listings" },
            { link: "/listing_05", title: "Commercial for Sale" },
            { link: "/listing_03", title: "Industrial for Lease" },
            { link: "/listing_details_06", title: "Property Details" },
            { link: "/listing_09", title: "Investment Portfolio" },
        ],
    },

    {
        id: 3,
        has_dropdown: true,
        title: "Services",
        link: "#",
        sub_menus: [
            { link: "/service_01", title: "Commercial Leasing" },
            { link: "/service_02", title: "Investment Sales" },
            { link: "/service_details", title: "Industrial Brokerage" },
        ],
    },

    {
        id: 4,
        has_dropdown: true,
        title: "About",
        link: "#",
        sub_menus: [
            { link: "/about_us_02", title: "About DG Property" },
            { link: "/agent", title: "Meet the Team" },
            { link: "/faq", title: "FAQ" },
            { link: "/contact", title: "Contact Us" },
        ],
    },

    {
        id: 5,
        has_dropdown: true,
        title: "Insights",
        link: "#",
        sub_menus: [
            { link: "/blog_01", title: "Market Insights" },
            { link: "/blog_02", title: "Property News" },
            { link: "/blog_details", title: "Article Details" },
        ],
    },
];
export default menu_data;
`;

  fs.writeFileSync(file, newMenu, 'utf8');
  console.log('\nMenuData.ts: rewritten');
})();

console.log('\n--- All home-data transforms complete ---');
