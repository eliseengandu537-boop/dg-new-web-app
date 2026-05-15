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

// curly apostrophe U+2019
const curlyApos = '\u2019';

// Fix BlogData.ts remaining entries with curly apostrophes
fixFile('src/data/home-data/BlogData.ts', [
  [`title:"Designer${curlyApos}s Checklist for Every UX/UI Project.",\n   data_delay_time:"0.1s",`,
   `title:"Industrial Property Trends in Gauteng for 2025.",\n   data_delay_time:"0.1s",`],
  [`title:"Designer${curlyApos}s Checklist for Every UX/UI Project.",`,
   `title:"Office Vacancies vs Demand: The 2025 Outlook.",`],
]);

// Fix FeatureData.ts - home_4_feature_1 Investment Sales desc with curly apostrophe
fixFile('src/data/home-data/FeatureData.ts', [
  // The description still has the old text with en-dash and curly apostrophe
  [`title: "Investment Sales",\n      btn: "View Investments",\n      desc: "List, sell, thrive \u2013 with our top-notch real estate agency. It${curlyApos}s super easy & fun.",`,
   `title: "Investment Sales",\n      btn: "View Investments",\n      desc: "Sell or acquire yielding commercial assets with the support of DG Property's brokerage team.",`],
]);

const b = fs.readFileSync('src/data/home-data/BlogData.ts','utf8');
console.log('BlogData - Industrial Trends:', b.includes('Industrial Property Trends'));
console.log('BlogData - Office Vacancies:', b.includes('Office Vacancies'));
console.log(`BlogData - Designer's remaining:`, b.includes('Checklist'));

const f = fs.readFileSync('src/data/home-data/FeatureData.ts','utf8');
console.log('FeatureData - Investment Sales desc fixed:', f.includes("Sell or acquire yielding commercial assets"));
console.log(`FeatureData - curly apos remaining:`, f.includes(`easy & fun`));
