export interface SelectOption {
  value: string;
  text: string;
}

export type CommercialFieldType = "text" | "number" | "select";

export interface CommercialFieldDefinition {
  key: string;
  label: string;
  type?: CommercialFieldType;
  unit?: string;
  options?: SelectOption[];
  placeholder?: string;
}

export interface CommercialSearchFilters {
  listingType?: string;
  listingCategory?: string;
  category?: string;
  location?: string;
  search?: string;
  priceRange?: string;
  priceMin?: string;
  priceMax?: string;
  area?: string;
  size?: string;
  budget?: string;
  yield?: string;
  anchorTenant?: string;
  numberOfTenants?: string;
  rentalPerM2?: string;
  operatingCost?: string;
  boxType?: string;
  extraction?: string;
  minimumLeaseTerm?: string;
  streetFacing?: string;
  inlineStore?: string;
  powerSupplyKva?: string;
  yardSize?: string;
  warehouseGla?: string;
  officeGla?: string;
  loadingDock?: string;
  rollerShutters?: string;
  zoning?: string;
  heightToEaves?: string;
  cranes?: string;
  litersPump?: string;
  netIncome?: string;
  landBusinessOption?: string;
  leaseTerm?: string;
  oilCompany?: string;
  cStoreTurnover?: string;
}

export const YES_NO_OPTIONS: SelectOption[] = [
  { value: "", text: "Select" },
  { value: "yes", text: "Yes" },
  { value: "no", text: "No" },
];

export const BOX_TYPE_OPTIONS: SelectOption[] = [
  { value: "", text: "Select" },
  { value: "white_box", text: "White Box" },
  { value: "grey_box", text: "Grey Box" },
];

export const RETAIL_LEVEL_OPTIONS: SelectOption[] = [
  { value: "", text: "Select Level" },
  { value: "ground_floor", text: "Ground Floor" },
  { value: "upper_level", text: "Upper Level" },
];

export const RETAIL_MALL_TYPE_OPTIONS: SelectOption[] = [
  { value: "", text: "Select Mall Type" },
  { value: "neighbourhood", text: "Neighbourhood" },
  { value: "community", text: "Community" },
  { value: "regional", text: "Regional" },
  { value: "lifestyle", text: "Lifestyle" },
  { value: "strip", text: "Strip Mall" },
];

export const LAND_BUSINESS_OPTIONS: SelectOption[] = [
  { value: "", text: "Select" },
  { value: "land", text: "Land" },
  { value: "business", text: "Business" },
  { value: "both", text: "Both" },
];

export const OFFICE_GRADE_OPTIONS: SelectOption[] = [
  { value: "", text: "Select Grade" },
  { value: "A", text: "Grade A" },
  { value: "B", text: "Grade B" },
  { value: "C", text: "Grade C" },
];

export const BUILDING_CONDITION_OPTIONS: SelectOption[] = [
  { value: "", text: "Select Condition" },
  { value: "A-Grade", text: "A-Grade" },
  { value: "B-Grade", text: "B-Grade" },
  { value: "C-Grade", text: "C-Grade" },
  { value: "Refurbished", text: "Refurbished" },
  { value: "New Build", text: "New Build" },
];

export const INDUSTRIAL_UNIT_TYPE_OPTIONS: SelectOption[] = [
  { value: "", text: "Select Unit Type" },
  { value: "stand_alone", text: "Stand Alone" },
  { value: "park_unit", text: "Park Unit" },
];

export const INDUSTRIAL_BUILDING_STATE_OPTIONS: SelectOption[] = [
  { value: "", text: "Select Condition" },
  { value: "new_build", text: "New Build" },
  { value: "existing", text: "Existing" },
];

export const INDUSTRIAL_LOADING_TYPE_OPTIONS: SelectOption[] = [
  { value: "", text: "Select Loading Type" },
  { value: "on_grade", text: "On Grade" },
  { value: "dock_loading", text: "Dock Loading" },
  { value: "both", text: "Both" },
];

export const COMMERCIAL_SEARCH_TABS: { label: string; value: string }[] = [
  { label: "For Sale", value: "sale" },
  { label: "To Let", value: "lease" },
  { label: "Investments", value: "investment" },
];

export const COMMERCIAL_SEARCH_PROPERTY_TYPE_OPTIONS: SelectOption[] = [
  { value: "", text: "All Property Types" },
  { value: "commercial_office", text: "Commercial Office" },
  { value: "retail", text: "Retail" },
  { value: "development_land", text: "Development" },
  { value: "industrial_warehouse", text: "Industrial" },
  { value: "investment", text: "Investment" },
  { value: "fuel_station", text: "Fuel Station" },
  { value: "mixed_use", text: "Mixed-Use" },
];

export const COMMERCIAL_SEARCH_LOCATION_OPTIONS: SelectOption[] = [
  { value: "", text: "City, Suburb, or Province" },
  { value: "johannesburg", text: "Johannesburg" },
  { value: "sandton", text: "Sandton" },
  { value: "cape town", text: "Cape Town" },
  { value: "durban", text: "Durban" },
  { value: "pretoria", text: "Pretoria" },
];

export const COMMERCIAL_PRICE_RANGE_OPTIONS_BY_LISTING_TYPE: Record<string, SelectOption[]> = {
  sale: [
    { value: "", text: "Any Price Range" },
    { value: "sale-up-to-r5m", text: "Up to R5,000,000" },
    { value: "sale-r5m-to-r20m", text: "R5,000,000 - R20,000,000" },
    { value: "sale-r20m-plus", text: "R20,000,000+" },
  ],
  lease: [
    { value: "", text: "Any Lease Range" },
    { value: "lease-up-to-r50k", text: "Up to R50,000 pm" },
    { value: "lease-r50k-to-r150k", text: "R50,000 - R150,000 pm" },
    { value: "lease-r150k-plus", text: "R150,000+ pm" },
  ],
  investment: [
    { value: "", text: "Any Investment Budget" },
    { value: "investment-up-to-r5m", text: "Up to R5,000,000" },
    { value: "investment-r5m-to-r20m", text: "R5,000,000 - R20,000,000" },
    { value: "investment-r20m-plus", text: "R20,000,000+" },
  ],
};

export const getCommercialPriceRangeOptions = (listingType = "sale"): SelectOption[] =>
  COMMERCIAL_PRICE_RANGE_OPTIONS_BY_LISTING_TYPE[listingType] ||
  COMMERCIAL_PRICE_RANGE_OPTIONS_BY_LISTING_TYPE.sale;

export const COMMERCIAL_SEARCH_PRICE_RANGE_OPTIONS: SelectOption[] =
  getCommercialPriceRangeOptions("sale");

export const COMMERCIAL_PRICE_RANGE_MAP: Record<string, { min?: number; max?: number }> = {
  "sale-up-to-r5m": { max: 5_000_000 },
  "sale-r5m-to-r20m": { min: 5_000_000, max: 20_000_000 },
  "sale-r20m-plus": { min: 20_000_000 },
  "lease-up-to-r50k": { max: 50_000 },
  "lease-r50k-to-r150k": { min: 50_000, max: 150_000 },
  "lease-r150k-plus": { min: 150_000 },
  "investment-up-to-r5m": { max: 5_000_000 },
  "investment-r5m-to-r20m": { min: 5_000_000, max: 20_000_000 },
  "investment-r20m-plus": { min: 20_000_000 },
};

export const COMMERCIAL_CATEGORY_OPTIONS = [
  { value: "commercial_office", label: "Commercial Office" },
  { value: "industrial_warehouse", label: "Industrial" },
  { value: "retail", label: "Retail" },
  { value: "development_land", label: "Development" },
  { value: "mixed_use", label: "Mixed-Use Development" },
  { value: "investment", label: "Investment" },
  { value: "fuel_station", label: "Fuel Station" },
] as const;

export const ADMIN_LISTING_CATEGORY_OPTIONS = [
  { value: "commercial", label: "Commercial" },
  { value: "development", label: "Development" },
  { value: "retail_leasing", label: "Retail Leasing" },
  { value: "industrial", label: "Industrial" },
  { value: "investment", label: "Investment" },
  { value: "fuel_station", label: "Fuel Station" },
] as const;

export const ADMIN_LISTING_CATEGORY_LABELS: Record<string, string> = {
  commercial: "Commercial",
  development: "Development",
  retail_leasing: "Retail Leasing",
  industrial: "Industrial",
  investment: "Investment",
  fuel_station: "Fuel Station",
};

export const ADMIN_LISTING_CATEGORY_PROPERTY_TYPES: Record<string, readonly string[]> = {
  commercial: ["commercial_office", "mixed_use"],
  development: ["development_land"],
  retail_leasing: ["retail"],
  industrial: ["industrial_warehouse"],
  investment: ["investment"],
  fuel_station: ["fuel_station"],
};

export const ADMIN_LISTING_CATEGORY_DEFAULT_PROPERTY_TYPE: Record<string, string> = {
  commercial: "commercial_office",
  development: "development_land",
  retail_leasing: "retail",
  industrial: "industrial_warehouse",
  investment: "investment",
  fuel_station: "fuel_station",
};

export const CATEGORY_TO_LISTING_CATEGORY_MAP: Record<string, string> = {
  commercial_office: "commercial",
  mixed_use: "commercial",
  development_land: "development",
  retail: "retail_leasing",
  industrial_warehouse: "industrial",
  investment: "investment",
  fuel_station: "fuel_station",
};

export const deriveListingCategory = (category?: string, listingType?: string): string => {
  if (category && CATEGORY_TO_LISTING_CATEGORY_MAP[category]) {
    return CATEGORY_TO_LISTING_CATEGORY_MAP[category];
  }

  if (listingType === "investment") return "investment";
  if (listingType === "lease") return "retail_leasing";

  return "commercial";
};

export const CATEGORY_AMENITIES: Record<string, string[]> = {
  commercial_office: [
    "24-Hour Access",
    "Parking Bays",
    "Basement Parking",
    "Visitor Parking",
    "Security / Guard",
    "Access Control",
    "CCTV",
    "Reception Area",
    "Boardroom / Meeting Rooms",
    "Kitchenette / Canteen",
    "Shared Ablutions",
    "Air Conditioning",
    "Fibre Internet",
    "Backup Power / Generator",
    "Solar Power",
    "Backup Water",
    "Lifts / Elevators",
    "Disabled Access",
    "Sprinkler System / Fire Safety",
    "Signage Rights",
    "Tenant Installation",
    "Server Room",
    "Balcony / Terrace",
    "Open Plan Layout",
    "Partitioned Offices",
  ],
  retail: [
    "On Grade",
    "Extraction",
    "White Box",
    "Grey Box",
    "Loading Access",
    "Storage / Back of House",
    "Ground Floor",
    "Upper Level",
    "Outdoor Seating",
  ],
  industrial_warehouse: [
    "Stand Alone",
    "Park Unit",
    "New Build",
    "Existing Building",
    "Dock Levellers / Loading Docks",
    "Roller Shutter Doors",
    "On Grade Loading",
    "Dock Loading",
    "Super Link Truck Access",
    "Generator",
    "Solar Power",
  ],
  development_land: [
    "Approved Plans", "Serviced Land", "Water & Sewage on Site", "Electricity on Boundary",
    "Road Frontage", "Fenced / Secured", "Flat Topography", "Corner Stand",
    "Residential Rights", "Commercial Rights", "Industrial Zoning", "Mixed-Use Rights",
  ],
  mixed_use: [
    "Residential Units", "Retail Component", "Office Component", "Parking Basement",
    "Fibre Internet", "Generator / Backup Power", "Solar Power", "CCTV / Security",
    "Access Control", "Rooftop Space", "Loading / Service Area", "Disabled Access",
  ],
  investment: [
    "Grocery Anchor Tenant",
    "Pharmacy Anchor Tenant",
    "National Brand Tenants",
    "Independent Tenant Mix",
    "Retail Income Component",
    "Kiosk Income Component",
    "Parking Income Component",
    "Net Leases",
    "Gross Leases",
    "Turnover Rental",
    "Staggered Lease Expiry",
    "Clustered Lease Expiry",
    "Expansion Potential",
    "A-Grade Building",
    "Refurbished Building",
    "Solar Power",
    "Generator",
  ],
  fuel_station: [
    "Owner-Operated", "Triple Net (NNN) Lease", "Convenience Store", "Car Wash",
    "ATM", "Canopy / Forecourt Cover", "Forecourt Lighting", "Generator",
    "Solar Power", "24-Hour Operation", "Branded Fuel", "Unbranded Fuel",
    "LPG / Gas Sales", "Lube Bay / Workshop",
  ],
};

export const COMMERCIAL_CATEGORY_FIELDS: Record<string, CommercialFieldDefinition[]> = {
  commercial_office: [
    { key: "area", label: "Area", placeholder: "e.g. Sandton CBD" },
    { key: "size", label: "Size", type: "number", unit: "m²" },
    { key: "grade", label: "Office Grade", type: "select", options: OFFICE_GRADE_OPTIONS },
    { key: "floors", label: "Number of Floors", type: "number" },
    { key: "parkingBays", label: "Parking Bays", type: "number" },
    { key: "rentalPerM2", label: "Rental", type: "number", unit: "R/m²" },
  ],
  retail: [
    { key: "size", label: "GLA", type: "number", unit: "m²" },
    { key: "onGrade", label: "On Grade", type: "select", options: YES_NO_OPTIONS },
    { key: "extraction", label: "Extraction", type: "select", options: YES_NO_OPTIONS },
    { key: "boxType", label: "White Box / Grey Box", type: "select", options: BOX_TYPE_OPTIONS },
    { key: "height", label: "Height", type: "number", unit: "m" },
    { key: "powerSupplyKva", label: "Power Supply", type: "number", unit: "kVA" },
    { key: "loadingAccess", label: "Loading Access", type: "select", options: YES_NO_OPTIONS },
    { key: "storageBackOfHouse", label: "Storage / Back of House", type: "select", options: YES_NO_OPTIONS },
    { key: "unitLevel", label: "Unit Level", type: "select", options: RETAIL_LEVEL_OPTIONS },
    { key: "footTraffic", label: "Foot Traffic" },
    { key: "mallType", label: "Type of Mall", type: "select", options: RETAIL_MALL_TYPE_OPTIONS },
    { key: "anchorTenant", label: "Anchor Tenant" },
    { key: "outdoorSeating", label: "Outdoor Seating", type: "select", options: YES_NO_OPTIONS },
    { key: "rentalPerM2", label: "Rental", type: "number", unit: "R/m²" },
    { key: "operatingCost", label: "Operating Costs", type: "number", unit: "R" },
    { key: "leaseTerm", label: "Lease Term" },
    { key: "tenantInstallation", label: "Tenant Installation" },
    { key: "beneficialOccupation", label: "Beneficial Occupation" },
    { key: "escalation", label: "Escalation", type: "number", unit: "%" },
  ],
  development_land: [
    { key: "area", label: "Area", placeholder: "e.g. Sandton" },
    { key: "size", label: "Size", type: "number", unit: "m²" },
    { key: "rentalPerM2", label: "Rental", type: "number", unit: "R/m²" },
    { key: "operatingCost", label: "Operating Cost", type: "number", unit: "R" },
    { key: "boxType", label: "White Box / Grey Box", type: "select", options: BOX_TYPE_OPTIONS },
    { key: "extraction", label: "Extraction", type: "select", options: YES_NO_OPTIONS },
    { key: "minimumLeaseTerm", label: "Minimum Lease Term", type: "number" },
    { key: "streetFacing", label: "Street Facing", type: "select", options: YES_NO_OPTIONS },
    { key: "inlineStore", label: "Inline Store", type: "select", options: YES_NO_OPTIONS },
    { key: "powerSupplyKva", label: "Power Supply", type: "number", unit: "kVA" },
  ],
  industrial_warehouse: [
    { key: "size", label: "GLA", type: "number", unit: "m²" },
    { key: "erfSize", label: "Erf Size", type: "number", unit: "m²" },
    { key: "warehouseOfficeSplit", label: "Warehouse vs Office Split" },
    { key: "rentalPerM2", label: "Rental", type: "number", unit: "R/m²" },
    { key: "operatingCost", label: "Ops", type: "number", unit: "R" },
    { key: "leaseTerm", label: "Lease Term" },
    { key: "escalation", label: "Esc", type: "number", unit: "%" },
    { key: "availableDate", label: "Available Date" },
    { key: "tenantInstallation", label: "Tenant Installation" },
    { key: "yardSize", label: "Yard Size", type: "number", unit: "m²" },
    { key: "unitType", label: "Stand Alone / Park Unit", type: "select", options: INDUSTRIAL_UNIT_TYPE_OPTIONS },
    { key: "zoning", label: "Zoning" },
    { key: "buildingState", label: "New Build or Existing", type: "select", options: INDUSTRIAL_BUILDING_STATE_OPTIONS },
    { key: "heightToEaves", label: "Height to Eaves", type: "number", unit: "m" },
    { key: "dockLevellers", label: "Dock Levellers / Loading Docks" },
    { key: "rollerShutters", label: "Roller Shutter Doors" },
    { key: "loadingType", label: "On Grade or Dock Loads", type: "select", options: INDUSTRIAL_LOADING_TYPE_OPTIONS },
    { key: "superLinkTruckAccess", label: "Super Link Truck Access", type: "select", options: YES_NO_OPTIONS },
    { key: "powerSupplyKva", label: "Power", type: "number", unit: "kVA" },
    { key: "generatorSolar", label: "Generator / Solar" },
  ],
  mixed_use: [
    { key: "area", label: "Area", placeholder: "e.g. Rosebank" },
    { key: "size", label: "Size", type: "number", unit: "m²" },
    { key: "commercialArea", label: "Commercial Area", type: "number", unit: "m²" },
    { key: "residentialUnits", label: "Residential Units", type: "number" },
    { key: "parkingBays", label: "Parking Bays", type: "number" },
    { key: "buildingCondition", label: "Building Condition", type: "select", options: BUILDING_CONDITION_OPTIONS },
  ],
  investment: [
    { key: "size", label: "Gross Lettable Area (GLA)", type: "number", unit: "m²" },
    { key: "netIncome", label: "Net Annual Income (NAI)", type: "number", unit: "R" },
    { key: "yield", label: "Net Yield / Cap Rate", type: "number", unit: "%" },
    { key: "occupancyRate", label: "Occupancy Rate", type: "number", unit: "%" },
    { key: "wale", label: "Weighted Average Lease Expiry (WALE)" },
    { key: "numberOfTenants", label: "Number of Tenants", type: "number" },
    { key: "rentalIncomeBreakdown", label: "Rental Income Breakdown" },
    { key: "operatingCostsRecoveries", label: "Operating Costs & Recoveries" },
    { key: "netVsGrossLeases", label: "Net vs Gross Leases" },
    { key: "escalation", label: "Escalations", type: "number", unit: "%" },
    { key: "turnoverRentalComponents", label: "Turnover Rental Components" },
    { key: "vacancyImpactOnIncome", label: "Vacancy Impact on Income" },
    { key: "anchorTenants", label: "Anchor Tenants" },
    { key: "nationalVsIndependentRatio", label: "National vs Independent Tenant Ratio" },
    { key: "topFiveTenants", label: "Top 5 Tenants by GLA and Income (%)" },
    { key: "leaseExpiryProfile", label: "Lease Expiry Profile" },
    { key: "tenantCategories", label: "Tenant Categories" },
    { key: "siteSize", label: "Site Size (Erf Size)", type: "number", unit: "m²" },
    { key: "glaBreakdown", label: "GLA Breakdown" },
    { key: "parkingRatio", label: "Parking Ratio" },
    { key: "buildingCondition", label: "Building Condition", type: "select", options: BUILDING_CONDITION_OPTIONS },
    { key: "expansionPotential", label: "Expansion Potential" },
    { key: "layoutEfficiency", label: "Layout Efficiency" },
    { key: "energyInfrastructure", label: "Energy Infrastructure" },
  ],
  fuel_station: [
    { key: "litersPump", label: "Liters Pump", type: "number", unit: "L" },
    { key: "netIncome", label: "Net Income", type: "number", unit: "R" },
    { key: "yield", label: "Yield", type: "number", unit: "%" },
    { key: "landBusinessOption", label: "Land / Business / Both", type: "select", options: LAND_BUSINESS_OPTIONS },
    { key: "leaseTerm", label: "Lease Term" },
    { key: "oilCompany", label: "Oil Company" },
    { key: "cStoreTurnover", label: "C-Store Turnover", type: "number", unit: "R" },
  ],
};

export const COMMERCIAL_SEARCH_FIELDS: Record<string, CommercialFieldDefinition[]> = {
  investment: [
    { key: "area", label: "Area" },
    { key: "size", label: "Size", type: "number", unit: "m²" },
    { key: "budget", label: "Budget", type: "number", unit: "R" },
    { key: "yield", label: "Yield", type: "number", unit: "%" },
    { key: "anchorTenant", label: "Anchor Tenant" },
    { key: "numberOfTenants", label: "Number of Tenants", type: "number" },
  ],
  retail: [
    { key: "area", label: "Area" },
    { key: "size", label: "Size", type: "number", unit: "m²" },
    { key: "budget", label: "Budget", type: "number", unit: "R" },
    { key: "rentalPerM2", label: "Rental", type: "number", unit: "R/m²" },
    { key: "operatingCost", label: "Operating Cost", type: "number", unit: "R" },
    { key: "boxType", label: "White Box / Grey Box", type: "select", options: BOX_TYPE_OPTIONS },
    { key: "extraction", label: "Extraction", type: "select", options: YES_NO_OPTIONS },
    { key: "minimumLeaseTerm", label: "Minimum Lease Term", type: "number" },
    { key: "streetFacing", label: "Street Facing", type: "select", options: YES_NO_OPTIONS },
    { key: "inlineStore", label: "Inline Store", type: "select", options: YES_NO_OPTIONS },
    { key: "powerSupplyKva", label: "Power Supply", type: "number", unit: "kVA" },
  ],
  development_land: [
    { key: "area", label: "Area" },
    { key: "size", label: "Size", type: "number", unit: "m²" },
    { key: "budget", label: "Budget", type: "number", unit: "R" },
    { key: "rentalPerM2", label: "Rental", type: "number", unit: "R/m²" },
    { key: "operatingCost", label: "Operating Cost", type: "number", unit: "R" },
    { key: "boxType", label: "White Box / Grey Box", type: "select", options: BOX_TYPE_OPTIONS },
    { key: "extraction", label: "Extraction", type: "select", options: YES_NO_OPTIONS },
    { key: "minimumLeaseTerm", label: "Minimum Lease Term", type: "number" },
    { key: "streetFacing", label: "Street Facing", type: "select", options: YES_NO_OPTIONS },
    { key: "inlineStore", label: "Inline Store", type: "select", options: YES_NO_OPTIONS },
    { key: "powerSupplyKva", label: "Power Supply", type: "number", unit: "kVA" },
  ],
  industrial_warehouse: [
    { key: "area", label: "Area" },
    { key: "size", label: "Size", type: "number", unit: "m²" },
    { key: "rentalPerM2", label: "Rental", type: "number", unit: "R/m²" },
    { key: "yardSize", label: "Yard Size", type: "number", unit: "m²" },
    { key: "warehouseGla", label: "Warehouse GLA", type: "number", unit: "m²" },
    { key: "officeGla", label: "Office GLA", type: "number", unit: "m²" },
    { key: "loadingDock", label: "Loading Dock", type: "select", options: YES_NO_OPTIONS },
    { key: "rollerShutters", label: "Roller Shutters", type: "select", options: YES_NO_OPTIONS },
    { key: "zoning", label: "Zoning" },
    { key: "heightToEaves", label: "Height to Eaves", type: "number", unit: "m" },
    { key: "cranes", label: "Cranes", type: "select", options: YES_NO_OPTIONS },
    { key: "powerSupplyKva", label: "Power Supply", type: "number", unit: "kVA" },
  ],
  fuel_station: [
    { key: "litersPump", label: "Liters Pump", type: "number", unit: "L" },
    { key: "netIncome", label: "Net Income", type: "number", unit: "R" },
    { key: "yield", label: "Yield", type: "number", unit: "%" },
    { key: "landBusinessOption", label: "Land / Business / Both", type: "select", options: LAND_BUSINESS_OPTIONS },
    { key: "leaseTerm", label: "Lease Term" },
    { key: "oilCompany", label: "Oil Company" },
    { key: "cStoreTurnover", label: "C-Store Turnover", type: "number", unit: "R" },
  ],
};

const dynamicFieldLabels = Object.values(COMMERCIAL_CATEGORY_FIELDS).reduce<Record<string, string>>((acc, fields) => {
  fields.forEach((field) => {
    acc[field.key] = field.unit ? `${field.label} (${field.unit})` : field.label;
  });
  return acc;
}, {});

export const COMMERCIAL_FIELD_LABELS: Record<string, string> = {
  ...dynamicFieldLabels,
  occupancyRate: "Occupancy Rate (%)",
  rentalRatePerM2: "Rental (R/m²)",
  gla: "GLA (m²)",
  warehouseSize: "Warehouse Area (m²)",
  officeSize: "Office Area (m²)",
  erfSize: "Erf Size (m²)",
  dockLevellers: "Dock Levellers",
  loadingBays: "Loading Bays",
  annualEscalation: "Annual Escalation (%)",
  tenantMix: "Tenant Mix",
  capRate: "Cap Rate (%)",
  availableDate: "Available Date",
  carWash: "Car Wash",
};

export const COMMERCIAL_DYNAMIC_FILTER_CATEGORY_SET = new Set([
  "investment",
  "retail",
  "development_land",
  "industrial_warehouse",
  "fuel_station",
]);
