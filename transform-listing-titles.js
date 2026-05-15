const fs = require('fs');

const titles = [
  "Sandton Corporate Park",
  "Bedfordview Retail Centre",
  "Germiston Industrial Hub",
  "Rosebank Mixed-Use Tower",
  "Midrand Logistics Centre",
  "Cape Town Business Park",
  "Pretoria Commercial Node",
  "Durban Industrial Estate",
  "Alrode Warehouse Facility",
  "Kramerville Office Park",
];

let raw = fs.readFileSync('src/data/inner-data/ListingData.ts', 'utf8');
let c = raw.replace(/\r\n/g, '\n');

let count = 0;
c = c.replace(/title: "Sandton Corporate Park"/g, () => {
  const title = titles[count % titles.length];
  count++;
  return `title: "${title}"`;
});

c = c.replace(/\n/g, '\r\n');
fs.writeFileSync('src/data/inner-data/ListingData.ts', c, 'utf8');
console.log('Fixed titles. Count:', count);

// Verify
const check = fs.readFileSync('src/data/inner-data/ListingData.ts', 'utf8');
const allSandton = (check.match(/"Sandton Corporate Park"/g) || []).length;
console.log('Remaining Sandton Corporate Park:', allSandton);
