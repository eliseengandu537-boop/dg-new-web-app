"use client";

import { useEffect, useId, useMemo, useState } from "react";
import NiceSelect from "@/ui/NiceSelect";
import {
  ADMIN_LISTING_CATEGORY_LABELS,
  COMMERCIAL_PRICE_RANGE_MAP,
  COMMERCIAL_SEARCH_FIELDS,
  COMMERCIAL_SEARCH_LOCATION_OPTIONS,
  COMMERCIAL_SEARCH_PROPERTY_TYPE_OPTIONS,
  COMMERCIAL_SEARCH_TABS,
  getCommercialPriceRangeOptions,
  type CommercialSearchFilters,
  type CommercialFieldDefinition,
  type SelectOption,
} from "@/data/commercialPropertyConfig";

type SearchBarVariant = "default" | "simple";

interface CommercialPropertySearchBarProps {
  overlay?: boolean;
  defaultFilters?: CommercialSearchFilters;
  variant?: SearchBarVariant;
  onSearch: (filters: CommercialSearchFilters) => void;
}

const DEFAULT_FILTERS: CommercialSearchFilters = {
  listingType: "sale",
  category: "",
  location: "",
  search: "",
  priceRange: "",
  priceMin: "",
  priceMax: "",
};

const baseInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #dfe5dd",
  borderRadius: 10,
  fontSize: 14,
  color: "#1f2937",
  background: "#fff",
  outline: "none",
};

const baseCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.98)",
  borderRadius: 18,
  boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
  maxWidth: 1100,
  margin: "0 auto",
  width: "100%",
};

const fieldLabelStyle: React.CSSProperties = {
  fontWeight: 500,
  fontSize: 15,
  marginBottom: 6,
  color: "#24324a",
};

const simpleFieldShellStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #d7dfd1",
  borderRadius: 14,
  padding: "12px 16px",
  minHeight: 74,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: "0 10px 28px rgba(17, 24, 39, 0.05)",
};

const simpleFieldTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.2,
  textTransform: "uppercase",
  color: "#7a8561",
  marginBottom: 6,
};

const simpleFieldInputStyle: React.CSSProperties = {
  ...baseInputStyle,
  border: "none",
  borderRadius: 0,
  padding: 0,
  background: "transparent",
  fontSize: 15,
  fontWeight: 500,
  color: "#24324a",
};

const simpleTextButtonStyle: React.CSSProperties = {
  border: "1px solid #d7dfd1",
  background: "#fff",
  borderRadius: 999,
  padding: "10px 16px",
  fontWeight: 600,
  fontSize: 14,
  color: "#24324a",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

const SIMPLE_PROPERTY_TYPES_BY_LISTING_CATEGORY: Record<string, string[]> = {
  commercial: ["commercial_office", "mixed_use"],
  development: ["development_land"],
  retail_leasing: ["retail"],
  industrial: ["industrial_warehouse"],
  investment: ["investment"],
  fuel_station: ["fuel_station"],
};

const LISTING_TYPE_LABELS: Record<string, string> = {
  sale: "For Sale",
  lease: "To Let",
  investment: "Investment",
};

const buildSimpleSelectOptions = (
  options: SelectOption[],
  emptyLabel: string,
  allowedValues?: string[]
) => {
  const allowedSet = allowedValues ? new Set(allowedValues) : null;

  return options
    .filter((option) => option.value === "" || !allowedSet || allowedSet.has(option.value))
    .map((option) => (option.value === "" ? { ...option, text: emptyLabel } : option));
};

const normalizeFilters = (filters: CommercialSearchFilters): CommercialSearchFilters => {
  const entries = Object.entries(filters).filter(([, value]) => value !== "" && value !== undefined && value !== null);
  return Object.fromEntries(entries) as CommercialSearchFilters;
};

const CommercialPropertySearchBar = ({
  overlay = false,
  defaultFilters,
  variant = "default",
  onSearch,
}: CommercialPropertySearchBarProps) => {
  const baseFilters = useMemo(
    () => ({ ...DEFAULT_FILTERS, ...defaultFilters }),
    [defaultFilters]
  );
  const locationListId = useId();
  const [filters, setFilters] = useState<CommercialSearchFilters>(baseFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectResetKey, setSelectResetKey] = useState(0);
  const isSimple = variant === "simple";

  useEffect(() => {
    setFilters(baseFilters);
    setSelectResetKey((prev) => prev + 1);
  }, [baseFilters]);

  const dynamicFields = useMemo(
    () => (filters.category ? COMMERCIAL_SEARCH_FIELDS[filters.category] || [] : []),
    [filters.category]
  );

  const propertyTypeOptions = useMemo(() => {
    if (!isSimple) {
      return COMMERCIAL_SEARCH_PROPERTY_TYPE_OPTIONS;
    }

    const allowedValues = baseFilters.listingCategory
      ? SIMPLE_PROPERTY_TYPES_BY_LISTING_CATEGORY[baseFilters.listingCategory]
      : undefined;

    return buildSimpleSelectOptions(
      COMMERCIAL_SEARCH_PROPERTY_TYPE_OPTIONS,
      "Any Type",
      allowedValues
    );
  }, [baseFilters.listingCategory, isSimple]);

  const priceRangeOptions = useMemo(
    () => {
      const currentListingType = filters.listingType || baseFilters.listingType || "sale";
      const options = getCommercialPriceRangeOptions(currentListingType);

      return isSimple ? buildSimpleSelectOptions(options, "Any Budget") : options;
    },
    [baseFilters.listingType, filters.listingType, isSimple]
  );

  const simpleSearchTitle = useMemo(() => {
    if (!baseFilters.listingCategory) {
      return "Search Properties";
    }

    const label = ADMIN_LISTING_CATEGORY_LABELS[baseFilters.listingCategory];
    return label ? `Search ${label}` : "Search Properties";
  }, [baseFilters.listingCategory]);

  const simpleSearchDescription = useMemo(() => {
    if (baseFilters.listingType === "lease") {
      return "Search by suburb, property type or budget to find available space faster.";
    }

    if (baseFilters.listingType === "investment") {
      return "Search by suburb, property type or budget to narrow investment stock quickly.";
    }

    return "Search by suburb, property type or budget to find the right listing quickly.";
  }, [baseFilters.listingType]);

  const hasActiveFilters = useMemo(() => {
    const normalized = normalizeFilters(filters);

    return Object.entries(normalized).some(([key, value]) => {
      if (key === "listingCategory" && value === baseFilters.listingCategory) {
        return false;
      }

      if (key === "listingType" && value === baseFilters.listingType) {
        return false;
      }

      return true;
    });
  }, [baseFilters.listingCategory, baseFilters.listingType, filters]);

  const updateFilter = (key: keyof CommercialSearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleListingTypeChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      listingType: value,
      priceRange: "",
      priceMin: "",
      priceMax: "",
    }));
    setSelectResetKey((prev) => prev + 1);
  };

  const handlePropertyTypeChange = (value: string) => {
    setFilters((prev) => ({
      listingType: prev.listingType ?? "",
      listingCategory: prev.listingCategory || "",
      category: value,
      location: prev.location || "",
      priceRange: prev.priceRange || "",
      priceMin: prev.priceMin || "",
      priceMax: prev.priceMax || "",
    }));
  };

  const handlePriceRangeChange = (value: string) => {
    const range = COMMERCIAL_PRICE_RANGE_MAP[value] || {};
    setFilters((prev) => ({
      ...prev,
      priceRange: value,
      priceMin: range.min !== undefined ? String(range.min) : "",
      priceMax: range.max !== undefined ? String(range.max) : "",
    }));
  };

  useEffect(() => {
    if (
      filters.priceRange &&
      !priceRangeOptions.some((option) => option.value === filters.priceRange)
    ) {
      setFilters((prev) => ({
        ...prev,
        priceRange: "",
        priceMin: "",
        priceMax: "",
      }));
    }
  }, [filters.priceRange, priceRangeOptions]);

  const applySearch = () => {
    onSearch(normalizeFilters(filters));
  };

  const resetFilters = () => {
    const nextFilters = { ...baseFilters };
    setFilters(nextFilters);
    setShowAdvanced(false);
    setSelectResetKey((prev) => prev + 1);
    onSearch(normalizeFilters(nextFilters));
  };

  const renderDynamicField = (field: CommercialFieldDefinition) => {
    if (field.type === "select") {
      return (
        <select
          value={filters[field.key as keyof CommercialSearchFilters] || ""}
          onChange={(e) => updateFilter(field.key as keyof CommercialSearchFilters, e.target.value)}
          style={baseInputStyle}
        >
          {(field.options || []).map((option) => (
            <option key={option.value || option.text} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type === "number" ? "number" : "text"}
        placeholder={field.placeholder || field.label}
        value={filters[field.key as keyof CommercialSearchFilters] || ""}
        onChange={(e) => updateFilter(field.key as keyof CommercialSearchFilters, e.target.value)}
        style={baseInputStyle}
      />
    );
  };

  return (
    <div className={`search-wrapper-one layout-one position-relative ${overlay ? "" : "mt-250 xl-mt-150 lg-mt-100"}`}>
      {!isSimple && (
        <nav className="search-filter-nav-one d-flex justify-content-center mb-3">
          <div className="nav nav-tabs border-0" role="tablist">
            {COMMERCIAL_SEARCH_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleListingTypeChange(tab.value)}
                className={`nav-link m0 ${filters.listingType === tab.value ? "active" : ""}`}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      <div
        style={{
          ...baseCardStyle,
          padding: isSimple ? "24px" : "32px 32px 24px 32px",
          border: isSimple ? "1px solid rgba(255,255,255,0.28)" : "none",
          backdropFilter: isSimple ? "blur(14px)" : undefined,
        }}
      >
        {isSimple && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              alignItems: "flex-start",
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 999,
                  padding: "7px 14px",
                  background: "rgba(122,133,97,0.12)",
                  color: "#586245",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Quick Search
              </div>
              <h3 style={{ margin: 0, color: "#24324a", fontSize: 26, fontWeight: 700 }}>
                {simpleSearchTitle}
              </h3>
              <p style={{ margin: "8px 0 0", color: "#5b6472", fontSize: 15, lineHeight: 1.6 }}>
                {simpleSearchDescription}
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {baseFilters.listingCategory && (
                <span
                  style={{
                    borderRadius: 999,
                    padding: "8px 14px",
                    background: "#f6f8f3",
                    color: "#24324a",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {ADMIN_LISTING_CATEGORY_LABELS[baseFilters.listingCategory]}
                </span>
              )}
              {baseFilters.listingType && (
                <span
                  style={{
                    borderRadius: 999,
                    padding: "8px 14px",
                    background: "#eef2ec",
                    color: "#586245",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {LISTING_TYPE_LABELS[baseFilters.listingType] || baseFilters.listingType}
                </span>
              )}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            applySearch();
          }}
        >
          {isSimple ? (
            <>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "stretch" }}>
                <div style={{ flex: "1.8 1 320px", minWidth: 240 }}>
                  <div style={simpleFieldShellStyle}>
                    <div style={simpleFieldTitleStyle}>Location</div>
                    <input
                      type="text"
                      list={locationListId}
                      placeholder="Search suburb, city or province"
                      value={filters.location || ""}
                      onChange={(event) => updateFilter("location", event.target.value)}
                      style={simpleFieldInputStyle}
                    />
                  </div>
                </div>

                <div style={{ flex: "1 1 210px", minWidth: 180 }}>
                  <div style={simpleFieldShellStyle}>
                    <div style={simpleFieldTitleStyle}>Property Type</div>
                    <select
                      value={filters.category || ""}
                      onChange={(event) => handlePropertyTypeChange(event.target.value)}
                      style={{ ...simpleFieldInputStyle, cursor: "pointer" }}
                    >
                      {propertyTypeOptions.map((option) => (
                        <option key={option.value || option.text} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ flex: "1 1 210px", minWidth: 180 }}>
                  <div style={simpleFieldShellStyle}>
                    <div style={simpleFieldTitleStyle}>Budget</div>
                    <select
                      value={filters.priceRange || ""}
                      onChange={(event) => handlePriceRangeChange(event.target.value)}
                      style={{ ...simpleFieldInputStyle, cursor: "pointer" }}
                    >
                      {priceRangeOptions.map((option) => (
                        <option key={option.value || option.text} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ flex: "0 1 180px", minWidth: 170 }}>
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      minHeight: 74,
                      background: "#7a8561",
                      color: "#fff",
                      border: "none",
                      borderRadius: 14,
                      padding: "16px 24px",
                      fontWeight: 700,
                      fontSize: 16,
                      letterSpacing: 0.4,
                      boxShadow: "0 12px 26px rgba(122,133,97,0.18)",
                    }}
                  >
                    Search
                    <i className="fa-light fa-magnifying-glass" style={{ marginLeft: 10 }}></i>
                  </button>
                </div>
              </div>

              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => setShowAdvanced((prev) => !prev)}
                    style={simpleTextButtonStyle}
                  >
                    <i className="fa-light fa-sliders-up"></i>
                    <span>{showAdvanced ? "Hide more filters" : "More filters"}</span>
                  </button>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      style={simpleTextButtonStyle}
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div style={{ color: "#6b7280", fontSize: 14 }}>
                  Start with a suburb, then narrow down only if you need to.
                </div>
              </div>

              <datalist id={locationListId}>
                {COMMERCIAL_SEARCH_LOCATION_OPTIONS.filter((option) => option.value).map((option) => (
                  <option key={option.value} value={option.text} />
                ))}
              </datalist>
            </>
          ) : (
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-end", justifyContent: "center" }}>
              <div style={{ flex: "1 1 200px", minWidth: 180 }}>
                <div style={fieldLabelStyle}>Property Type</div>
                <NiceSelect
                  key={`property-type-${selectResetKey}`}
                  className="nice-select fw-normal"
                  options={propertyTypeOptions}
                  defaultCurrent={Math.max(0, propertyTypeOptions.findIndex((option) => option.value === (filters.category || "")))}
                  onChange={(event) => handlePropertyTypeChange(event.target.value)}
                  name="propertyType"
                  placeholder=""
                />
              </div>

              <div style={{ flex: "1 1 200px", minWidth: 180 }}>
                <div style={fieldLabelStyle}>Location</div>
                <input
                  type="text"
                  list={locationListId}
                  placeholder="City, Suburb, or Province"
                  value={filters.location || ""}
                  onChange={(event) => updateFilter("location", event.target.value)}
                  style={baseInputStyle}
                />
              </div>

              <div style={{ flex: "1 1 200px", minWidth: 180 }}>
                <div style={fieldLabelStyle}>Price / Lease Range</div>
                <NiceSelect
                  key={`price-range-${selectResetKey}-${filters.listingType || baseFilters.listingType || "sale"}`}
                  className="nice-select fw-normal"
                  options={priceRangeOptions}
                  defaultCurrent={Math.max(0, priceRangeOptions.findIndex((option) => option.value === (filters.priceRange || "")))}
                  onChange={(event) => handlePriceRangeChange(event.target.value)}
                  name="priceRange"
                  placeholder=""
                />
              </div>

              <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 260, flexWrap: "wrap", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={() => setShowAdvanced((prev) => !prev)}
                  style={{
                    border: "1px solid #bdbdbd",
                    background: "#fff",
                    borderRadius: 8,
                    padding: "10px 22px",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#222",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <i className="fa-light fa-sliders-up"></i>
                  <span style={{ marginLeft: 4 }}>{showAdvanced ? "Hide Filters" : "Advanced Filters"}</span>
                </button>

                <button
                  type="submit"
                  style={{
                    background: "#7a8561",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "12px 32px",
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: 1,
                    boxShadow: "0 2px 8px rgba(122,133,97,0.08)",
                  }}
                >
                  <span>Search Properties</span>
                  <i className="fa-light fa-magnifying-glass" style={{ marginLeft: 8 }}></i>
                </button>
              </div>

              <datalist id={locationListId}>
                {COMMERCIAL_SEARCH_LOCATION_OPTIONS.filter((option) => option.value).map((option) => (
                  <option key={option.value} value={option.text} />
                ))}
              </datalist>
            </div>
          )}
        </form>

        {showAdvanced && (
          <div
            style={{
              marginTop: isSimple ? 22 : 26,
              paddingTop: isSimple ? 22 : 24,
              borderTop: "1px solid #ecebe5",
            }}
          >
            {dynamicFields.length > 0 ? (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 16,
                  }}
                >
                  {dynamicFields.map((field) => (
                    <div key={field.key}>
                      <div style={fieldLabelStyle}>
                        {field.label}
                        {field.unit ? ` (${field.unit})` : ""}
                      </div>
                      {renderDynamicField(field)}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap", marginTop: 20 }}>
                  <button
                    type="button"
                    onClick={resetFilters}
                    style={{
                      ...(isSimple
                        ? simpleTextButtonStyle
                        : {
                            ...baseInputStyle,
                            width: "auto",
                            padding: "10px 18px",
                            cursor: "pointer",
                            fontWeight: 600,
                          }),
                    }}
                  >
                    Reset Filters
                  </button>
                  <button
                    type="button"
                    onClick={applySearch}
                    style={{
                      background: "#7a8561",
                      color: "#fff",
                      border: "none",
                      borderRadius: isSimple ? 12 : 10,
                      padding: isSimple ? "12px 22px" : "12px 24px",
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    Apply Filters
                  </button>
                </div>
              </>
            ) : (
              <div style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
                Select a property type to unlock the relevant advanced commercial filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommercialPropertySearchBar;
