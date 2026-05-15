const fs = require('fs');

function fixFile(file, replacements) {
  let raw = fs.readFileSync(file, 'utf8');
  let c = raw.replace(/\r\n/g, '\n');
  for (const [from, to] of replacements) {
    const prev = c;
    c = c.split(from).join(to);
    if (c === prev) console.log(`  WARNING: not found -> "${from.substring(0,60)}"`);
  }
  c = c.replace(/\n/g, '\r\n');
  fs.writeFileSync(file, c, 'utf8');
}

// Fix home_4_feature_1 third desc (still has old desc with en-dash)
fixFile('src/data/home-data/FeatureData.ts', [
  // The en-dash in the investment sales desc
  [`title: "Investment Sales",\n      btn: "View Investments",\n      desc: "List, sell, thrive \u2013 with our top-notch real estate agency. It's super easy & fun.",\n      data_delay_time: "0.2s",\n   },\n\n   // home_5_feature_1`,
   `title: "Investment Sales",\n      btn: "View Investments",\n      desc: "Sell or acquire yielding commercial assets with the support of DG Property's brokerage team.",\n      data_delay_time: "0.2s",\n   },\n\n   // home_5_feature_1`],
]);

// Fix BlogData.ts - remaining "Designer's Checklist" entries
fixFile('src/data/home-data/BlogData.ts', [
  [`   page:"home_2",\n   class_name:"blog-item-2",\n   date:"12 AUG",\n   info_name:"DG Property .",\n   info_time:7,\n   title:"Designer's Checklist for Every UX/UI Project.",\n   data_delay_time:"0.1s",`,
   `   page:"home_2",\n   class_name:"blog-item-2",\n   date:"12 AUG",\n   info_name:"DG Property .",\n   info_time:7,\n   title:"Industrial Property Trends in Gauteng for 2025.",\n   data_delay_time:"0.1s",`],
  [`   page:"home_4",\n   class_name:"blog-item-2",\n   date:"17 AUG",\n   info_name:"DG Property .",\n   info_time:7,\n   title:"Designer's Checklist for Every UX/UI Project.",`,
   `   page:"home_4",\n   class_name:"blog-item-2",\n   date:"17 AUG",\n   info_name:"DG Property .",\n   info_time:7,\n   title:"Office Vacancies vs Demand: The 2025 Outlook.",`],
  [`   page:"home_4",\n   class_name:"blog-item-3",\n   date:"21 SEP",\n   info_name:"DG Property .",\n   info_time:8,\n   title:"Commercial Lease Negotiations: What Tenants Need to Know.",`,
   `   page:"home_4",\n   class_name:"blog-item-3",\n   date:"21 SEP",\n   info_name:"DG Property .",\n   info_time:8,\n   title:"How Investment Yields Are Shifting in SA's Commercial Sector.",`],
]);

const b = fs.readFileSync('src/data/home-data/BlogData.ts','utf8');
console.log('BlogData - Designer Checklist remaining:', b.includes("Designer's Checklist"));
console.log('BlogData - Industrial Trends:', b.includes('Industrial Property Trends'));
console.log('BlogData - Office Vacancies:', b.includes('Office Vacancies'));

const f = fs.readFileSync('src/data/home-data/FeatureData.ts','utf8');
console.log('FeatureData - Investment Sales desc fixed:', f.includes("Sell or acquire yielding commercial assets"));
console.log('FeatureData - en-dash remaining:', f.includes("It's super easy & fun"));
