const fs = require('fs');

function transformFile(file, fn) {
  let raw = fs.readFileSync(file, 'utf8');
  let c = raw.replace(/\r\n/g, '\n');
  c = fn(c);
  c = c.replace(/\n/g, '\r\n');
  fs.writeFileSync(file, c, 'utf8');
  console.log(`Done: ${file}`);
}

// ──────────────────────────────────────────────
// ServiceData.ts
// ──────────────────────────────────────────────
transformFile('src/data/inner-data/ServiceData.ts', c => {
  return c
    .replace(`title: "Buy a home",\n      btn: "Buy Home",\n      desc: "Explore Dg-property 2 million+ homes and uncover your ideal living space.",`,
             `title: "Commercial Leasing",\n      btn: "View Leases",\n      desc: "Secure the right commercial space for your business across Gauteng and beyond.",`)
    .replace(`title: "Rent a Home",\n      btn: "Rent Home",\n      desc: "Discover a rental you'll love on HOZN, thanks to 35+ filters.",`,
             `title: "Investment Sales",\n      btn: "View Investments",\n      desc: "Buy or sell yielding commercial and industrial assets with specialist brokerage support.",`)
    .replace(`title: "Sell Home",\n      btn: "Sell Home",\n      desc: "List, sell, thrive \u2013 with our top-notch real estate agency.",`,
             `title: "Industrial Brokerage",\n      btn: "View Industrial",\n      desc: "Lease or acquire warehousing, factory and logistics facilities across South Africa.",`)
    .replace(`title: "Mortgage",\n      btn: "Buy Home",\n      desc: "Explore HOZN 2 million+ homes and uncover your ideal living space.",`,
             `title: "Tenant Representation",\n      btn: "Get Representation",\n      desc: "Let DG Property negotiate on your behalf to secure favourable lease terms.",`)
    .replace(`title: "Consulting",\n      btn: "Rent Home",\n      desc: "Discover a rental you'll love on HOZN, thanks to 35+ filters.",`,
             `title: "Development Land",\n      btn: "View Land",\n      desc: "Identify and transact on sites zoned for commercial, industrial or mixed-use development.",`)
    .replace(`title: "Property Managements",\n      btn: "Sell Home",\n      desc: "List, sell, thrive \u2013 with our top-notch real estate agency.",`,
             `title: "Portfolio Advisory",\n      btn: "Get Advice",\n      desc: "Strategic guidance for property investors and corporate occupiers managing diverse portfolios.",`);
});

// ──────────────────────────────────────────────
// AgentData.ts  — 20 agents, cycle through 5 names
// ──────────────────────────────────────────────
const agentNames = [
  { title: "Dustin De Gennaro", tag: "Director & Founding Principal" },
  { title: "Deylin van Zyl",    tag: "Commercial Broker" },
  { title: "Sarah Matthys",     tag: "Retail Leasing Specialist" },
  { title: "Ryan Naidoo",       tag: "Investment Sales Broker" },
  { title: "Lara Botha",        tag: "Tenant Representative" },
];

transformFile('src/data/inner-data/AgentData.ts', c => {
  // Replace each 4-block set
  const oldNames = ['Chris Matial', 'Mark Filo', 'Zubayer Hasan', 'Jannatul Ferdaus'];
  const oldTags  = ['7 Listing',   '3 Listing', '3 Listing',      '2 Listing'];
  // We'll just replace all occurrences by walking each agent entry
  let count = 0;
  c = c.replace(
    /tag: "(7 Listing|3 Listing|2 Listing)",\n      title: "(Chris Matial|Mark Filo|Zubayer Hasan|Jannatul Ferdaus)"/g,
    () => {
      const agent = agentNames[count % agentNames.length];
      count++;
      return `tag: "${agent.tag}",\n      title: "${agent.title}"`;
    }
  );
  return c;
});

// ──────────────────────────────────────────────
// BlogData.ts
// ──────────────────────────────────────────────
const blogTitles = [
  "Commercial Lease Negotiations: What Tenants Need to Know.",
  "Industrial Property Trends in Gauteng for 2025.",
  "Why Retail Nodes Are Recovering Faster Than Expected.",
  "How Investment Yields Are Shifting in SA's Commercial Sector.",
  "Office Vacancies vs Demand: The 2025 Outlook.",
  "Understanding Zoning for Commercial Development in SA.",
  "Tenant Fit-Out Rights: A Practical Guide for Occupiers.",
  "Warehouse Logistics Demand Reshaping Gauteng's Property Map.",
  "Mixed-Use Developments: The New Commercial Frontier.",
  "Triple Net Leases Explained for SA Commercial Investors.",
  "Why Sandton Remains SA's Premier Commercial Node.",
  "Cape Town's Atlantic Seaboard: Commercial Property Snapshot.",
];
const blogAuthors = [
  "DG Property . ", "DG Property . ", "DG Property . ",
  "DG Property . ", "DG Property . ", "DG Property . ",
];
const blogDates = [
  "08 JAN", "17 AUG", "21 SEP", "14 JUN", "07 FEB", "21 SEP",
  "03 MAR", "11 OCT", "28 APR", "05 DEC", "19 JUL", "22 NOV",
];

transformFile('src/data/inner-data/BlogData.ts', c => {
  let count = 0;
  // Replace each title + author
  c = c.replace(
    /date: "[^"]+",\n      info_name: "[^"]+",\n      info_time: \d+,\n      title: "[^"]+",/g,
    (match) => {
      const idx = count % blogTitles.length;
      const timeMatch = match.match(/info_time: (\d+)/);
      const time = timeMatch ? timeMatch[1] : '7';
      const result = `date: "${blogDates[idx]}",\n      info_name: "DG Property . ",\n      info_time: ${time},\n      title: "${blogTitles[idx]}",`;
      count++;
      return result;
    }
  );
  return c;
});

// ──────────────────────────────────────────────
// FaqData.ts
// ──────────────────────────────────────────────
transformFile('src/data/inner-data/FaqData.ts', c => {
  // Replace section ids and titles
  c = c
    .replace(`id_name: "Selling",\n      title: "SELLING",\n      md_pt:true,`, 
             `id_name: "Leasing",\n      title: "COMMERCIAL LEASING",\n      md_pt:true,`)
    .replace(`id_name: "Renting",\n      title: "RENTING",`, 
             `id_name: "Investment",\n      title: "INVESTMENT SALES",`)
    .replace(`id_name: "Buying",\n      title: "BUYING",`, 
             `id_name: "Industrial",\n      title: "INDUSTRIAL & WAREHOUSE",`)
    .replace(`id_name: "Payments",\n      title: "PAYMENTS",`, 
             `id_name: "Development",\n      title: "DEVELOPMENT LAND",`)
    .replace(`id_name: "Terms",\n      title: "TERMS & CONDITIONS",`, 
             `id_name: "Tenant",\n      title: "TENANT ADVISORY",`)
    .replace(`id_name: "Account",\n      title: "ACCOUNT",`, 
             `id_name: "General",\n      title: "GENERAL",`);

  // Replace Leasing questions
  c = c
    .replace(`question: "How does the free trial work?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 2,\n            question: "How do you weigh different criteria in your process?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 3,\n            question: "What's the process of selling property?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 4,\n            question: "Refund & Frauds",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",`,
             `question: "What is a commercial lease and how long do they typically run?",\n            answer: "A commercial lease is a legally binding agreement between a landlord and a business tenant. In South Africa, commercial leases typically run 3 to 5 years, with options to renew. DG Property assists tenants in negotiating favourable terms.",\n         },\n         {\n            id: 2,\n            question: "What costs are payable by the tenant in a commercial lease?",\n            answer: "Beyond rental, tenants typically pay occupational costs such as rates, taxes, utilities, levies, and insurance. Triple net leases shift most of these costs to the tenant. DG Property helps clarify all cost obligations before you sign.",\n         },\n         {\n            id: 3,\n            question: "Can I negotiate a rent-free period when leasing commercial space?",\n            answer: "Yes. Depending on market conditions and the length of the lease, landlords may offer rent-free periods (often 1\u20133 months) to assist with fit-out costs. DG Property negotiates these incentives on behalf of tenants.",\n         },\n         {\n            id: 4,\n            question: "What is a turnover rental clause?",\n            answer: "Common in retail leases, a turnover clause means the tenant pays a base rental plus a percentage of monthly revenue that exceeds a threshold. This is standard in South African shopping centres.",`);

  // Replace Investment Sales questions
  c = c
    .replace(`question: "Can a home depreciate in value?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 6,\n            question: "Is an older home as good a value as a new home?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 7,\n            question: "What is a broker?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 8,\n            question: "Can I pay my own taxes and insurance?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",`,
             `question: "What is a commercial property investment yield?",\n            answer: "Yield is the annual rental income expressed as a percentage of the property's purchase price. In South Africa, commercial property yields typically range between 7% and 10%, depending on location, lease quality and asset type.",\n         },\n         {\n            id: 6,\n            question: "What is a net initial yield vs. reversionary yield?",\n            answer: "The net initial yield is based on passing rent, while the reversionary yield reflects the income at open market rental value. Understanding both is critical when assessing an investment property.",\n         },\n         {\n            id: 7,\n            question: "How does DG Property assist investment buyers?",\n            answer: "DG Property identifies on-market and off-market commercial assets, provides detailed investment analysis, and negotiates purchase terms to help clients acquire properties that meet their return targets.",\n         },\n         {\n            id: 8,\n            question: "What due diligence should I conduct before buying commercial property?",\n            answer: "Key areas include lease review, tenant covenant strength, building condition reports, title deed and servitude searches, zoning confirmation, and an independent valuation. DG Property coordinates this process for buyers.",`);

  // Replace Industrial questions
  c = c
    .replace(`question: "How does the free trial work?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 10,\n            question: "How do you weigh different criteria in your process?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 11,\n            question: "Refund & Frauds",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",`,
             `question: "What is the difference between a warehouse and a distribution centre?",\n            answer: "A warehouse is used primarily for storage, while a distribution centre is designed for the rapid receipt, processing and despatch of goods. Each has different requirements in terms of height, dock doors, yard depth and power supply.",\n         },\n         {\n            id: 10,\n            question: "What key specifications should I check when leasing industrial space?",\n            answer: "Focus on eave height (ideal 8m+), power (amps and phases), yard depth for truck turning, number of dock levellers and on-grade doors, office component, and any sprinkler systems. DG Property assesses these for each client.",\n         },\n         {\n            id: 11,\n            question: "Which industrial nodes does DG Property specialise in?",\n            answer: "DG Property is active in Gauteng's major industrial corridors including Jet Park, Alrode, Wadeville, Boksburg, Germiston, Midrand and Centurion, as well as select nodes in Cape Town and Durban.",`);

  // Replace Development Land questions
  c = c
    .replace(`question: "Which payment method is supported?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 13,\n            question: "Is my card is secure here?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 14,\n            question: "Can I provide cheque to my client for payment?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",`,
             `question: "What zoning is required for commercial development?",\n            answer: "In South Africa, commercial development typically requires Business 1 or Business 2 zoning, while industrial development requires Industrial 1 or 2. Rezoning applications can be lodged with the local municipality and DG Property can advise on feasibility.",\n         },\n         {\n            id: 13,\n            question: "What is a bulk development right and why does it matter?",\n            answer: "Bulk refers to the maximum permissible gross floor area (GFA) that can be built on a site, determined by the Floor Area Ratio (FAR) and coverage allowances. Higher bulk equals greater development potential and value.",\n         },\n         {\n            id: 14,\n            question: "How do I find suitable development land through DG Property?",\n            answer: "DG Property maintains an active database of development land across South Africa. We match site requirements against available land and can facilitate off-market introductions for serious developers.",`);

  // Replace Tenant Advisory questions  
  c = c
    .replace(`question: "How does the free trial work?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 16,\n            question: "How do you weigh different criteria in your process?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",`,
             `question: "What does tenant representation mean?",\n            answer: "Tenant representation means DG Property acts exclusively on behalf of the occupier, not the landlord. We search the market, shortlist suitable properties, and negotiate lease terms in the tenant's best interests — at no cost to the tenant in most cases.",\n         },\n         {\n            id: 16,\n            question: "When should a business start its property search?",\n            answer: "Ideally 12 to 18 months before lease expiry for large occupiers, and 6 to 9 months for smaller businesses. Starting early provides negotiating leverage and ensures alternatives are properly evaluated.",`);

  // Replace General questions
  c = c
    .replace(`question: "Can a home depreciate in value?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",\n         },\n         {\n            id: 18,\n            question: "Is an older home as good a value as a new home?",\n            answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",`,
             `question: "How do I contact DG Property?",\n            answer: "You can reach DG Property at our Bedfordview office: Bedford Arcade, 59 Van Buuren Rd, Bedfordview, Johannesburg 2007. Call us on 087 630 2532 or email hello@dg-property.co.za. We respond within one business day.",\n         },\n         {\n            id: 18,\n            question: "Does DG Property work outside Gauteng?",\n            answer: "While DG Property is headquartered in Johannesburg and most active in Gauteng, we assist clients with transactions in Cape Town, Durban and other major centres through our national network.",`);

  return c;
});

// ──────────────────────────────────────────────
// ProjectData.ts — replace category values
// ──────────────────────────────────────────────
const projectCategories = ['retail', 'office', 'industrial', 'warehouse', 'mixed-use', 'development', 'logistics', 'retail office'];
const oldCategories = ['house flat', 'villa', 'apartments', 'house', 'flat', 'apartments flat', 'flat villa'];
transformFile('src/data/inner-data/ProjectData.ts', c => {
  let count = 0;
  return c.replace(/category: "(house flat|villa|apartments|house|flat|apartments flat|flat villa)"/g, () => {
    const cat = projectCategories[count % projectCategories.length];
    count++;
    return `category: "${cat}"`;
  });
});

// ──────────────────────────────────────────────
// PricingData.ts
// ──────────────────────────────────────────────
transformFile('src/data/inner-data/PricingData.ts', c => {
  return c
    .replace(/plan: "FREE PLAN",\n            price: "0",\n            desc: "Great for Individual Person",/g,
             `plan: "ADVISORY",\n            price: "0",\n            desc: "Initial Consultation & Market Overview",`)
    .replace(/plan: "Gold Plan",\n            price: "\$89",\n            desc: "Great for Startup",/g,
             `plan: "Brokerage",\n            price: "POA",\n            desc: "Full Commercial Brokerage Service",`)
    .replace(/plan: "Business Plan",\n            price: "\$147",\n            desc: "Great for Large Business",/g,
             `plan: "Portfolio",\n            price: "POA",\n            desc: "Strategic Portfolio & Investment Advisory",`)
    .replace(/plan: "Gold Plan",\n            price: "\$189",\n            desc: "Great for Startup",/g,
             `plan: "Brokerage",\n            price: "POA",\n            desc: "Full Commercial Brokerage Service",`)
    .replace(/plan: "Business Plan",\n            price: "\$347",\n            desc: "Great for Large Business",/g,
             `plan: "Portfolio",\n            price: "POA",\n            desc: "Strategic Portfolio & Investment Advisory",`);
});

console.log('\nAll inner-data files transformed.');
