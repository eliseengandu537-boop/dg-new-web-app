const fs = require('fs');

const saProps = [
  { title: "Sandton Corporate Park",    address: "14 Alice Lane, Sandton, Johannesburg",        tag: "TO LET",   tag_bg: null,   price: 185,       price_text: "m" },
  { title: "Bedfordview Retail Centre", address: "59 Van Buuren Rd, Bedfordview, Johannesburg",  tag: "FOR SALE", tag_bg: "sale", price: 18500000,  price_text: null },
  { title: "Germiston Industrial Hub",  address: "22 Jet Park Rd, Germiston, Gauteng",           tag: "TO LET",   tag_bg: null,   price: 62,        price_text: "m" },
  { title: "Rosebank Mixed-Use Tower",  address: "50 Bath Ave, Rosebank, Johannesburg",          tag: "FOR SALE", tag_bg: "sale", price: 32000000,  price_text: null },
  { title: "Midrand Logistics Centre",  address: "12 Allandale Rd, Midrand, Gauteng",            tag: "TO LET",   tag_bg: null,   price: 58,        price_text: "m" },
  { title: "Cape Town Business Park",   address: "Voortrekker Rd, Bellville, Cape Town",         tag: "TO LET",   tag_bg: null,   price: 145,       price_text: "m" },
];

let raw = fs.readFileSync('src/data/home-data/PropertyData.ts', 'utf8');
let c = raw.replace(/\r\n/g, '\n');

let titleCount = 0;
let addrCount  = 0;
let tagCount   = 0;

// Replace titles
c = c.replace(/title: "(Blueberry villa\.|Blueberry villa|White House villa|Luxury villa in Dal lake\.|South Sun House)"/g, () => {
  const p = saProps[titleCount % saProps.length];
  titleCount++;
  return `title: "${p.title}"`;
});

// Replace addresses 
c = c.replace(/address: "[^"]+"/g, () => {
  const p = saProps[addrCount % saProps.length];
  addrCount++;
  return `address: "${p.address}"`;
});

// Replace tag lines — for lines with tag: "FOR SELL" or tag: "FOR RENT"
c = c.replace(/tag: "FOR SELL"/g, 'tag: "FOR SALE"');
// Keep TO LET / FOR SALE as appropriate — address count drives it
// Actually let's just blanket update tags based on sequence
c = c.replace(/tag: "FOR RENT"/g, 'tag: "TO LET"');

// Replace residential property_info bed/bath features with commercial sqm feature
c = c.replace(
  /\{ icon: propertyIcon_2, feature: "bed", total_feature: 0o[0-9]+ \}, \{ icon: propertyIcon_3, feature: "bath", total_feature: 0o[0-9]+ \},/g,
  '{ icon: propertyIcon_2, feature: "sqm", total_feature: 0 }, { icon: propertyIcon_3, feature: "units", total_feature: 0 },'
);

// Update the sqm/units total_feature values to something realistic (we'll cycle)
let sqmCount = 0;
const sqmVals = [1200, 850, 3200, 1800, 4500, 960];
c = c.replace(/feature: "sqm", total_feature: 0/g, () => {
  const val = sqmVals[sqmCount % sqmVals.length];
  sqmCount++;
  return `feature: "sqm", total_feature: ${val}`;
});

// Replace prices — raw prices
const priceMap = [185, 18500000, 62, 32000000, 58, 145];
const priceTextMap = ["m", null, "m", null, "m", "m"];
c = c.replace(
  /price: (3280|28100\.00|28100|42500\.00|42500|34900\.00|34900|55500),/g,
  () => {
    const idx = tagCount % priceMap.length;
    const price = priceMap[idx];
    tagCount++;
    return `price: ${price},`;
  }
);

// Clean up price_text for large numbers (investment) — they don't need "m" 
// This regex approach is tricky, so we just leave price_text as-is ("m" means monthly)

// Remove FOR SELL (already done above), ensure clean tags  
c = c.replace(/\n/g, '\r\n');
fs.writeFileSync('src/data/home-data/PropertyData.ts', c, 'utf8');
console.log('Done: PropertyData.ts');

const check = fs.readFileSync('src/data/home-data/PropertyData.ts', 'utf8');
console.log('Sandton:', check.includes('Sandton Corporate Park'));
console.log('Blueberry villa remaining:', check.includes('Blueberry villa'));
console.log('Dhaka remaining:', check.includes('Dhaka'));
console.log('FOR SELL remaining:', check.includes('"FOR SELL"'));
