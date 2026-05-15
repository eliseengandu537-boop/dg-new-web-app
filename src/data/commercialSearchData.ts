export interface SearchOption {
   value: string;
   text: string;
}

export const commercialSearchTabs: string[] = ["For Sale", "To Let", "Investments"];

export const commercialPropertyTypeLabel = "Property Type";
export const commercialLocationLabel = "Location";
export const commercialPriceLabel = "Price / Lease Range";
export const commercialKeywordText = "Property Name, Area, or Reference Number";
export const commercialAdvancedFiltersLabel = "Advanced Filters";
export const commercialSearchButtonText = "Search Properties";

export const commercialPropertyTypeOptions: SearchOption[] = [
   { value: "office-space", text: "Office Space" },
   { value: "retail-space", text: "Retail Space" },
   { value: "industrial-property", text: "Industrial Property" },
   { value: "warehouses", text: "Warehouses" },
   { value: "commercial-land", text: "Commercial Land" },
   { value: "investment-properties", text: "Investment Properties" },
   { value: "mixed-use-developments", text: "Mixed-Use Developments" },
];

export const commercialLocationOptions: SearchOption[] = [
   { value: "location", text: "City, Suburb, or Province" },
   { value: "johannesburg", text: "Johannesburg" },
   { value: "sandton", text: "Sandton" },
   { value: "cape-town", text: "Cape Town" },
   { value: "durban", text: "Durban" },
];

export const commercialPriceRangeOptions: SearchOption[] = [
   { value: "price-rental-range", text: "Price / Lease Range" },
   { value: "up-to-r50k", text: "Up to R50,000 pm / R5,000,000" },
   { value: "r50k-to-r150k", text: "R50,000 - R150,000 pm / R5,000,000 - R20,000,000" },
   { value: "r150k-plus", text: "R150,000+ pm / R20,000,000+" },
];

export const commercialInvestmentTypeOptions: SearchOption[] = [
   { value: "investment-type", text: "Investment Type" },
   { value: "single-tenant", text: "Single-Tenant" },
   { value: "multi-tenant", text: "Multi-Tenant" },
   { value: "value-add", text: "Value-Add" },
   { value: "core-stabilised", text: "Core / Stabilised" },
];

export const commercialYieldRangeOptions: SearchOption[] = [
   { value: "yield-range", text: "Yield Range" },
   { value: "below-6", text: "Below 6%" },
   { value: "6-to-8", text: "6% - 8%" },
   { value: "8-to-10", text: "8% - 10%" },
   { value: "10-plus", text: "10%+" },
];

export const commercialSizeOptions: SearchOption[] = [
   { value: "minimum-size", text: "Minimum Size (m²)" },
   { value: "100", text: "100 m²" },
   { value: "250", text: "250 m²" },
   { value: "500", text: "500 m²" },
   { value: "1000", text: "1,000 m²" },
   { value: "2500", text: "2,500 m²" },
];

export const commercialMaxSizeOptions: SearchOption[] = [
   { value: "maximum-size", text: "Maximum Size (m²)" },
   { value: "250", text: "250 m²" },
   { value: "500", text: "500 m²" },
   { value: "1000", text: "1,000 m²" },
   { value: "2500", text: "2,500 m²" },
   { value: "5000", text: "5,000 m²+" },
];

export const commercialTabPropertyTypeDefaults: number[] = [0, 0, 5];
