const fs = require('fs');

// SA commercial properties pool — will cycle through these for all listing entries
const saProps = [
  { title: "Sandton Corporate Park", address: "14 Alice Lane, Sandton, Johannesburg", location: "Sandton, Johannesburg", tag: "TO LET", tag_bg: null, status: "Office Leasing", price: 185, price_text: "m² / month", amenities: ["A/C & Heating", "Parking", "Generator", "Fibre Internet", "24/7 Security", "Elevator"] },
  { title: "Bedfordview Retail Centre", address: "59 Van Buuren Rd, Bedfordview, Johannesburg", location: "Bedfordview, Johannesburg", tag: "FOR SALE", tag_bg: "sale", status: "Investment Sale", price: 18500000, price_text: null, amenities: ["Anchor Tenants", "Parking", "Security", "Loading Bay", "Generator"] },
  { title: "Germiston Industrial Hub", address: "22 Jet Park Rd, Germiston, Gauteng", location: "Germiston, Gauteng", tag: "TO LET", tag_bg: null, status: "Industrial Lease", price: 62, price_text: "m² / month", amenities: ["Dock Levellers", "Yard Space", "3-Phase Power", "Sprinklers", "Security"] },
  { title: "Rosebank Mixed-Use Tower", address: "50 Bath Ave, Rosebank, Johannesburg", location: "Rosebank, Johannesburg", tag: "FOR SALE", tag_bg: "sale", status: "Investment Sale", price: 32000000, price_text: null, amenities: ["Retail Ground Floor", "Office Floors", "Parking Basement", "Fibre Internet", "Generator"] },
  { title: "Midrand Logistics Centre", address: "12 Allandale Rd, Midrand, Gauteng", location: "Midrand, Gauteng", tag: "TO LET", tag_bg: null, status: "Warehouse Lease", price: 58, price_text: "m² / month", amenities: ["9m Eave Height", "Multiple Dock Doors", "Yard Space", "Office Suite", "CCTV"] },
  { title: "Cape Town Business Park", address: "Voortrekker Rd, Bellville, Cape Town", location: "Bellville, Cape Town", tag: "TO LET", tag_bg: null, status: "Office Leasing", price: 145, price_text: "m² / month", amenities: ["A/C & Heating", "Parking", "Fibre Internet", "Security", "Boardroom"] },
  { title: "Pretoria Commercial Node", address: "501 Church St, Arcadia, Tshwane", location: "Pretoria, Tshwane", tag: "FOR SALE", tag_bg: "sale", status: "Commercial Sale", price: 12500000, price_text: null, amenities: ["Parking Basement", "Generator", "Security", "Canteen", "Elevator"] },
  { title: "Durban Industrial Estate", address: "8 Mahogany Rd, Westmead, Durban", location: "Westmead, Durban", tag: "TO LET", tag_bg: null, status: "Industrial Lease", price: 55, price_text: "m² / month", amenities: ["Dock Levellers", "On-Grade Doors", "3-Phase Power", "Office Suite", "CCTV"] },
  { title: "Alrode Warehouse Facility", address: "15 Steel Rd, Alrode, Alberton", location: "Alrode, Alberton", tag: "TO LET", tag_bg: null, status: "Warehouse Lease", price: 60, price_text: "m² / month", amenities: ["10m Eave Height", "Sprinklers", "Generator", "Yard Space", "Security"] },
  { title: "Kramerville Office Park", address: "3 Kramerville Rd, Sandton, Johannesburg", location: "Sandton, Johannesburg", tag: "FOR SALE", tag_bg: "sale", status: "Investment Sale", price: 22000000, price_text: null, amenities: ["A/C & Heating", "Parking", "Fibre Internet", "Generator", "Security"] },
];

const sqftValues = [1200, 850, 2400, 1800, 3200, 960, 1500, 2800, 1100, 4500];

let raw = fs.readFileSync('src/data/inner-data/ListingData.ts', 'utf8');
let c = raw.replace(/\r\n/g, '\n');

// Replace each listing entry block - find all entries and replace them
let entryCount = 0;

// Replace title
c = c.replace(/title: "(Blueberry villa|White House villa|Luxury villa in Dal lake\.|Luxury villa in Dal lake)"/g, () => {
  const prop = saProps[entryCount % saProps.length];
  return `title: "${prop.title}"`;
});

// Reset count and replace address
entryCount = 0;
c = c.replace(/address: "([^"]+(?:Mexico|Washington DC|Egypt|Germany|France|India|Cuba|Dhaka|USA|Miami|Tokyo|London|Paris|Seoul|Sydney|Hong Kong|Singapore|Dubai|Barcelona|Amsterdam|Vienna)[^"]*)"/g, (match) => {
  const prop = saProps[entryCount % saProps.length];
  entryCount++;
  return `address: "${prop.address}"`;
});

// Reset and replace location 
entryCount = 0;
c = c.replace(/location: "([^"]+(?:Mexico|Washington DC|Egypt|Germany|France|India|Cuba|Dhaka|USA|Miami|Tokyo|London|Paris|Seoul|Sydney|Hong Kong|Singapore|Dubai|Barcelona|Amsterdam|Vienna|Acapulco|Berlin|Cannes|Delhi|Havana|Giza)[^"]*)"/g, (match) => {
  const prop = saProps[entryCount % saProps.length];
  entryCount++;
  return `location: "${prop.location}"`;
});

// Replace residential status values
const statusMap = {
  '"Sell Villas"': '"Commercial Sale"',
  '"Buy Apartments"': '"Investment Sale"',
  '"Rent Condos"': '"Retail Leasing"',
  '"Sell Houses"': '"Commercial Sale"',
  '"Rent Industrial"': '"Industrial Lease"',
  '"Buy Houses"': '"Investment Sale"',
  '"Sell Apartments"': '"Commercial Sale"',
  '"Rent Houses"': '"Office Leasing"',
  '"Rent Villas"': '"Warehouse Lease"',
};
for (const [from, to] of Object.entries(statusMap)) {
  c = c.split(`status: ${from}`).join(`status: ${to}`);
}

// Replace residential amenity sets with commercial ones
const amenityReplacements = [
  { from: '["Garages", "Parking", "Wifi", "Elevator"]', to: '["Parking", "Generator", "Fibre Internet", "Elevator", "Security"]' },
  { from: '["Swimming Pool", "Parking", "Wifi", "Fireplace", "Play Ground", "Elevator"]', to: '["A/C & Heating", "Parking", "Generator", "Fibre Internet", "24/7 Security", "Elevator"]' },
  { from: '["Swimming Pool", "Parking", "Wifi", "Pet Friendly", "Ceiling Height", "Fireplace", "Play Ground", "Elevator"]', to: '["Dock Levellers", "Yard Space", "3-Phase Power", "Sprinklers", "Security", "Office Suite"]' },
  { from: '["A/C & Heating", "Garages", "Parking", "Wifi", "Ceiling Height", "Fireplace", "Play Ground", "Elevator"]', to: '["A/C & Heating", "Parking Basement", "Fibre Internet", "Generator", "Security", "Boardroom"]' },
  { from: '["A/C & Heating", "Garages", "Garden", "Fireplace", "Play Ground", "Elevator"]', to: '["A/C & Heating", "Parking", "Fibre Internet", "24/7 Security", "Generator"]' },
  { from: '["Disabled Access", "Swimming Pool", "Parking", "Ceiling Height", "Fireplace",]', to: '["Disabled Access", "Parking", "Generator", "CCTV", "Security",]' },
  { from: '["Garden", "Parking", "Wifi", "Pet Friendly", "Play Ground", "Elevator"]', to: '["Dock Levellers", "Yard Space", "On-Grade Doors", "CCTV", "Security"]' },
  { from: '["A/C & Heating", "Fireplace", "Play Ground", "Elevator"]', to: '["A/C & Heating", "Generator", "Fibre Internet", "Security"]' },
  { from: '["A/C & Heating", "Garages", "Parking", "Wifi", "Fireplace", "Play Ground", "Elevator"]', to: '["A/C & Heating", "Parking Basement", "Generator", "Fibre Internet", "Security"]' },
  { from: '["Disabled Access", "Garden", "Parking", "Wifi", "Fireplace",]', to: '["Disabled Access", "Parking", "Fibre Internet", "CCTV", "Security",]' },
];
for (const { from, to } of amenityReplacements) {
  c = c.split(from).join(to);
}

// Remove bed/bath from property_info lines (listing_details pages have extra fields)
// Replace common property_info patterns
c = c.replace(/property_info: \{ sqft: (\d+), bed: "\d+", bath: "\d+" \}/g, (_, sqft) => {
  return `property_info: { sqft: ${sqft}, bed: "N/A", bath: "N/A" }`;
});
c = c.replace(/property_info: \{ sqft: (\d+), bed: "\d+", bath: "\d+", kitchen: "\d+", parking_lot: "\d+", garden: "\d+" \}/g, (_, sqft) => {
  return `property_info: { sqft: ${sqft}, bed: "N/A", bath: "N/A", kitchen: "N/A", parking_lot: "N/A", garden: "N/A" }`;
});

// Replace any remaining FOR SELL with FOR SALE
c = c.split('"FOR SELL"').join('"FOR SALE"');

c = c.replace(/\n/g, '\r\n');
fs.writeFileSync('src/data/inner-data/ListingData.ts', c, 'utf8');
console.log('Done: ListingData.ts');

// Verify
const check = fs.readFileSync('src/data/inner-data/ListingData.ts', 'utf8');
console.log('Sandton:', check.includes('Sandton Corporate Park'));
console.log('Mexico remaining:', check.includes('Mexico'));
console.log('villa remaining:', check.includes('Blueberry villa'));
console.log('FOR SELL remaining:', check.includes('"FOR SELL"'));
console.log('Sell Villas remaining:', check.includes('Sell Villas'));
