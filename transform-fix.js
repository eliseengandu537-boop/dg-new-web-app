const fs = require('fs');

function fixFile(file, replacements) {
  let raw = fs.readFileSync(file, 'utf8');
  let c = raw.replace(/\r\n/g, '\n');
  
  for (const [from, to] of replacements) {
    const prev = c;
    c = c.split(from).join(to); // replace all occurrences
    if (c === prev) {
      console.log(`  WARNING: not found -> "${from.substring(0,80).replace(/\n/g,'\\n')}"`);
    }
  }
  
  c = c.replace(/\n/g, '\r\n');
  fs.writeFileSync(file, c, 'utf8');
}

// Fix remaining FeatureData.ts issues
console.log('Fixing FeatureData.ts remaining...');
fixFile('src/data/home-data/FeatureData.ts', [
  // The remaining home_3_feature_1 entry with en-dash - search by title only
  ['title: "Buy a home",\n      btn: "Sell Property",',
   'title: "Development Land",\n      btn: "View Land",'],
  // The desc with en-dash
  ['desc: "List, sell, thrive \u2013 with our top-notch real estate agency. It\'s super easy & fun.",',
   'desc: "Identify and transact on development land suited to commercial, industrial or mixed-use projects.",'],
  // home_4_feature_1 remaining
  ['title: "Sell a home",\n      btn: "Sell Property",',
   'title: "Investment Sales",\n      btn: "View Investments",'],
  ['page: "home_4_feature_1",\n      icon: feature6Icon_3,\n      title: "Investment Sales",\n      btn: "View Investments",\n      desc: "Identify and transact on development land suited to commercial, industrial or mixed-use projects.",',
   'page: "home_4_feature_1",\n      icon: feature6Icon_3,\n      title: "Investment Sales",\n      btn: "View Investments",\n      desc: "Sell or acquire yielding commercial assets with the support of DG Property\'s brokerage team.",'],
]);

const feat = fs.readFileSync('src/data/home-data/FeatureData.ts', 'utf8');
console.log('  Buy a home remaining:', (feat.match(/Buy a home/g)||[]).length);
console.log('  Development Land:', feat.includes('Development Land'));
console.log('  SELL PROPERTY remaining:', feat.includes('Sell Property'));

// Fix BlogData.ts (home-data) - different indentation (3-space, no trailing spaces)
console.log('\nFixing BlogData.ts (home)...');
fixFile('src/data/home-data/BlogData.ts', [
  ['title:"Spending Habits, 13 Tips for grow Your Money.",', 'title:"Commercial Lease Negotiations: What Tenants Need to Know.",'],
  ['title:"Designer\'s Checklist for Every UX/UI Project.",', 'title:"Industrial Property Trends in Gauteng for 2025.",'],
  ['title:"Print, publishing qui visual ux layout mockups.",', 'title:"Why Retail Nodes Are Recovering Faster Than Expected.",'],
  ['info_name:"Rashed Ka .",', 'info_name:"DG Property .",'],
  ['info_name:"Jubayer Hasan . ",', 'info_name:"DG Property .",'],
  ['info_name:"Mark Quins . ",', 'info_name:"DG Property .",'],
  ['info_name:"Rashed Kabir . ",', 'info_name:"DG Property .",'],
  // Also without space versions
  ['title:"Spending Habits, 13 Tips for Grow Your Money.",', 'title:"How Investment Yields Are Shifting in SA\'s Commercial Sector.",'],
]);

const bl = fs.readFileSync('src/data/home-data/BlogData.ts', 'utf8');
console.log('  Commercial Lease Negotiations:', bl.includes('Commercial Lease Negotiations'));
console.log('  Industrial Property Trends:', bl.includes('Industrial Property Trends'));

// Fix FeaturedListingData.ts property_info items
console.log('\nFixing FeaturedListingData.ts property_info...');
fixFile('src/data/home-data/FeaturedListingData.ts', [
  ['{feature: "sqft", total_feature: 2137 }, {feature: "bed", total_feature: 0o3 }, {feature: "kitchen", total_feature: 0o1 }, {feature: "bath", total_feature: 0o2 }',
   '{feature: "sqft", total_feature: 2137 }, {feature: "units", total_feature: 3 }, {feature: "tenants", total_feature: 1 }, {feature: "levels", total_feature: 2 }'],
]);

const fl = fs.readFileSync('src/data/home-data/FeaturedListingData.ts', 'utf8');
console.log('  units:', fl.includes('units'));

console.log('\n--- Fixes complete ---');
