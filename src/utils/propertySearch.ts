import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";

export interface PropertySearchSuggestion {
  value: string;
  label: string;
  type: "title" | "location" | "reference";
}

type SearchParamsReader = {
  get(name: string): string | null;
};

const FILTER_KEYS: (keyof CommercialSearchFilters)[] = [
  "listingType",
  "listingCategory",
  "category",
  "location",
  "search",
  "priceRange",
  "priceMin",
  "priceMax",
  "area",
  "size",
  "budget",
  "yield",
  "anchorTenant",
  "numberOfTenants",
  "rentalPerM2",
  "operatingCost",
  "boxType",
  "extraction",
  "minimumLeaseTerm",
  "streetFacing",
  "inlineStore",
  "powerSupplyKva",
  "yardSize",
  "warehouseGla",
  "officeGla",
  "loadingDock",
  "rollerShutters",
  "zoning",
  "heightToEaves",
  "cranes",
  "litersPump",
  "netIncome",
  "landBusinessOption",
  "leaseTerm",
  "oilCompany",
  "cStoreTurnover",
];

const isBlank = (value: unknown) =>
  value === undefined || value === null || String(value).trim() === "";

export const normalizeCommercialSearchFilters = (
  filters: CommercialSearchFilters = {}
): CommercialSearchFilters => {
  const normalizedEntries = Object.entries(filters).filter(([, value]) => !isBlank(value));
  return Object.fromEntries(normalizedEntries) as CommercialSearchFilters;
};

export const buildCommercialSearchQuery = (filters: CommercialSearchFilters = {}) => {
  const params = new URLSearchParams();
  const normalized = normalizeCommercialSearchFilters(filters);

  Object.entries(normalized).forEach(([key, value]) => {
    params.set(key, String(value));
  });

  return params.toString();
};

export const parseCommercialSearchFilters = (
  searchParams: SearchParamsReader,
  fallback: CommercialSearchFilters = {}
): CommercialSearchFilters => {
  const filters: CommercialSearchFilters = { ...fallback };

  FILTER_KEYS.forEach((key) => {
    const value = searchParams.get(String(key));
    if (value !== null) {
      filters[key] = value;
    }
  });

  return normalizeCommercialSearchFilters(filters);
};

export const getListingTypeForTab = (tabIndex: number) => {
  if (tabIndex === 1) return "lease";
  if (tabIndex === 2) return "investment";
  return "sale";
};

export const getTabIndexForListingType = (listingType?: string) => {
  if (listingType === "lease") return 1;
  if (listingType === "investment") return 2;
  return 0;
};
