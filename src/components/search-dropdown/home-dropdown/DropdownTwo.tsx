"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  COMMERCIAL_PRICE_RANGE_MAP,
  COMMERCIAL_SEARCH_PROPERTY_TYPE_OPTIONS,
  getCommercialPriceRangeOptions,
} from "@/data/commercialPropertyConfig";
import { fetchPublicPropertySuggestions } from "@/utils/dashboardApi";
import {
  buildCommercialSearchQuery,
  type PropertySearchSuggestion,
} from "@/utils/propertySearch";

type SuggestionField = "location" | "search";

type HeroSearchFilters = {
  category: string;
  location: string;
  search: string;
  priceRange: string;
};

const TAB_CONFIG = [
  { label: "For Sale", icon: "bi-house-door", listingType: "sale" },
  { label: "To Let", icon: "bi-key", listingType: "lease" },
  { label: "Investments", icon: "bi-graph-up-arrow", listingType: "investment" },
];

const INITIAL_FILTERS: HeroSearchFilters = {
  category: "",
  location: "",
  search: "",
  priceRange: "",
};

const MIN_AUTOCOMPLETE_CHARS = 2;

const SUGGESTION_TYPE_LABELS: Record<PropertySearchSuggestion["type"], string> = {
  title: "Property",
  location: "Location",
  reference: "Reference",
};

const SUGGESTION_TYPE_ICONS: Record<PropertySearchSuggestion["type"], string> = {
  title: "bi-buildings",
  location: "bi-geo-alt",
  reference: "bi-hash",
};

const DropdownTwo = () => {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [filters, setFilters] = useState<HeroSearchFilters>(INITIAL_FILTERS);
  const [openSuggestionField, setOpenSuggestionField] = useState<SuggestionField | null>(null);
  const [locationSuggestions, setLocationSuggestions] = useState<PropertySearchSuggestion[]>([]);
  const [keywordSuggestions, setKeywordSuggestions] = useState<PropertySearchSuggestion[]>([]);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isKeywordLoading, setIsKeywordLoading] = useState(false);

  const listingType = TAB_CONFIG[activeTab]?.listingType || "sale";
  const priceRangeOptions = useMemo(
    () => getCommercialPriceRangeOptions(listingType),
    [listingType]
  );
  const selectedPriceRange = useMemo(
    () => COMMERCIAL_PRICE_RANGE_MAP[filters.priceRange] || {},
    [filters.priceRange]
  );
  const hasActiveFilters = Boolean(
    filters.category || filters.location.trim() || filters.search.trim() || filters.priceRange
  );

  useEffect(() => {
    if (
      filters.priceRange &&
      !priceRangeOptions.some((option) => option.value === filters.priceRange)
    ) {
      setFilters((prev) => ({ ...prev, priceRange: "" }));
    }
  }, [filters.priceRange, priceRangeOptions]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpenSuggestionField(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    const term = filters.location.trim();
    if (term.length < MIN_AUTOCOMPLETE_CHARS) {
      setLocationSuggestions([]);
      setIsLocationLoading(false);
      return;
    }

    let ignore = false;
    setIsLocationLoading(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const res = await fetchPublicPropertySuggestions({
          field: "location",
          term,
          listingType,
          category: filters.category,
          priceMin: selectedPriceRange.min,
          priceMax: selectedPriceRange.max,
        });

        if (!ignore) {
          setLocationSuggestions(res.data?.suggestions || []);
        }
      } catch {
        if (!ignore) {
          setLocationSuggestions([]);
        }
      } finally {
        if (!ignore) {
          setIsLocationLoading(false);
        }
      }
    }, 180);

    return () => {
      ignore = true;
      window.clearTimeout(timeoutId);
    };
  }, [
    filters.category,
    filters.location,
    listingType,
    selectedPriceRange.max,
    selectedPriceRange.min,
  ]);

  useEffect(() => {
    const term = filters.search.trim();
    if (term.length < MIN_AUTOCOMPLETE_CHARS) {
      setKeywordSuggestions([]);
      setIsKeywordLoading(false);
      return;
    }

    let ignore = false;
    setIsKeywordLoading(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const res = await fetchPublicPropertySuggestions({
          field: "search",
          term,
          listingType,
          category: filters.category,
          priceMin: selectedPriceRange.min,
          priceMax: selectedPriceRange.max,
        });

        if (!ignore) {
          setKeywordSuggestions(res.data?.suggestions || []);
        }
      } catch {
        if (!ignore) {
          setKeywordSuggestions([]);
        }
      } finally {
        if (!ignore) {
          setIsKeywordLoading(false);
        }
      }
    }, 180);

    return () => {
      ignore = true;
      window.clearTimeout(timeoutId);
    };
  }, [
    filters.category,
    filters.search,
    listingType,
    selectedPriceRange.max,
    selectedPriceRange.min,
  ]);

  const updateFilter = (key: keyof HeroSearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setOpenSuggestionField(null);
    setFilters((prev) => ({ ...prev, priceRange: "" }));
  };

  const handleSuggestionSelect = (field: SuggestionField, value: string) => {
    updateFilter(field, value);
    setOpenSuggestionField(null);
  };

  const handleSearch = () => {
    const query = buildCommercialSearchQuery({
      listingType,
      category: filters.category,
      location: filters.location,
      search: filters.search,
      priceRange: filters.priceRange,
      priceMin: selectedPriceRange.min !== undefined ? String(selectedPriceRange.min) : "",
      priceMax: selectedPriceRange.max !== undefined ? String(selectedPriceRange.max) : "",
    });

    router.push(query ? `/listing_07?${query}` : "/listing_07");
  };

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setLocationSuggestions([]);
    setKeywordSuggestions([]);
    setOpenSuggestionField(null);
  };

  const renderSuggestionPanel = (
    field: SuggestionField,
    suggestions: PropertySearchSuggestion[],
    loading: boolean
  ) => {
    const term = field === "location" ? filters.location.trim() : filters.search.trim();

    if (openSuggestionField !== field || term.length < MIN_AUTOCOMPLETE_CHARS) {
      return null;
    }

    return (
      <div className="hero-suggestion-panel">
        {loading ? (
          <div className="hero-suggestion-state">Searching live listings...</div>
        ) : suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <button
              key={`${field}-${suggestion.type}-${suggestion.value}`}
              type="button"
              className="hero-suggestion-item"
              onClick={() => handleSuggestionSelect(field, suggestion.value)}
            >
              <span className="hero-suggestion-icon">
                <i className={`bi ${SUGGESTION_TYPE_ICONS[suggestion.type]}`}></i>
              </span>
              <span className="hero-suggestion-copy">
                <span className="hero-suggestion-label">{suggestion.label}</span>
                <span className="hero-suggestion-meta">
                  {SUGGESTION_TYPE_LABELS[suggestion.type]}
                </span>
              </span>
            </button>
          ))
        ) : (
          <div className="hero-suggestion-state">No matching properties found</div>
        )}
      </div>
    );
  };

  const priceFieldLabel =
    listingType === "lease"
      ? "Lease Range"
      : listingType === "investment"
        ? "Investment Budget"
        : "Price Range";

  return (
    <div ref={rootRef} className="hero-property-search">
      <div className="hero-search-tabs" role="tablist" aria-label="Listing type">
        {TAB_CONFIG.map((tab, index) => (
          <button
            key={tab.listingType}
            type="button"
            className={`hero-search-tab ${activeTab === index ? "is-active" : ""}`}
            onClick={() => handleTabChange(index)}
            role="tab"
            aria-selected={activeTab === index}
          >
            <i className={`bi ${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="hero-search-card">
        <form
          className="hero-search-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <div className="hero-search-grid">
            <div className="hero-search-field">
              <label htmlFor="hero-property-type">Property Type</label>
              <div className="hero-field-shell hero-field-shell--select">
                <i className="bi bi-buildings hero-field-icon"></i>
                <select
                  id="hero-property-type"
                  className="hero-field-control hero-field-control--select"
                  value={filters.category}
                  onFocus={() => setOpenSuggestionField(null)}
                  onChange={(event) => updateFilter("category", event.target.value)}
                >
                  {COMMERCIAL_SEARCH_PROPERTY_TYPE_OPTIONS.map((option) => (
                    <option key={option.value || option.text} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                <i className="bi bi-chevron-down hero-field-chevron"></i>
              </div>
            </div>

            <div className="hero-search-field">
              <label htmlFor="hero-location-search">Location</label>
              <div className="hero-field-shell">
                <i className="bi bi-geo-alt hero-field-icon"></i>
                <input
                  id="hero-location-search"
                  type="text"
                  className="hero-field-control"
                  placeholder="Search suburb, city, or province"
                  autoComplete="off"
                  value={filters.location}
                  onFocus={() => setOpenSuggestionField("location")}
                  onChange={(event) => {
                    setOpenSuggestionField("location");
                    updateFilter("location", event.target.value);
                  }}
                />
                {renderSuggestionPanel("location", locationSuggestions, isLocationLoading)}
              </div>
            </div>

            <div className="hero-search-field">
              <label htmlFor="hero-keyword-search">Keyword</label>
              <div className="hero-field-shell">
                <i className="bi bi-search hero-field-icon"></i>
                <input
                  id="hero-keyword-search"
                  type="text"
                  className="hero-field-control"
                  placeholder="Title, suburb, city, ref, or keyword"
                  autoComplete="off"
                  value={filters.search}
                  onFocus={() => setOpenSuggestionField("search")}
                  onChange={(event) => {
                    setOpenSuggestionField("search");
                    updateFilter("search", event.target.value);
                  }}
                />
                {renderSuggestionPanel("search", keywordSuggestions, isKeywordLoading)}
              </div>
            </div>

            <div className="hero-search-field">
              <label htmlFor="hero-price-range">{priceFieldLabel}</label>
              <div className="hero-field-shell hero-field-shell--select">
                <i className="bi bi-cash-stack hero-field-icon"></i>
                <select
                  id="hero-price-range"
                  className="hero-field-control hero-field-control--select"
                  value={filters.priceRange}
                  onFocus={() => setOpenSuggestionField(null)}
                  onChange={(event) => updateFilter("priceRange", event.target.value)}
                >
                  {priceRangeOptions.map((option) => (
                    <option key={option.value || option.text} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                <i className="bi bi-chevron-down hero-field-chevron"></i>
              </div>
            </div>
          </div>

          <button type="submit" className="hero-search-submit">
            <i className="bi bi-search"></i>
            <span>Search Listings</span>
          </button>
        </form>

        <div className="hero-search-meta">
          {hasActiveFilters && (
            <button type="button" className="hero-search-reset" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .hero-property-search {
          margin-top: 40px;
          max-width: 1120px;
          width: 100%;
        }

        .hero-search-tabs {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          padding: 6px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.18);
          margin-bottom: 14px;
        }

        .hero-search-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 46px;
          padding: 0 18px;
          border: none;
          border-radius: 999px;
          background: transparent;
          color: rgba(255, 255, 255, 0.78);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: all 0.2s ease;
        }

        .hero-search-tab.is-active {
          background: linear-gradient(135deg, #96a085 0%, #6b735f 100%);
          color: #ffffff;
          box-shadow: 0 12px 24px rgba(107, 115, 95, 0.35);
        }

        .hero-search-card {
          background: #ffffff;
          border: 1px solid #e0e5dd;
          border-radius: 20px;
          box-shadow: 0 14px 34px rgba(5, 18, 33, 0.16);
          padding: 18px;
        }

        .hero-search-form {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 190px;
          gap: 14px;
          align-items: end;
        }

        .hero-search-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.1fr) minmax(0, 1.3fr) minmax(0, 0.95fr);
          gap: 14px;
          min-width: 0;
        }

        .hero-search-field {
          position: relative;
          min-width: 0;
        }

        .hero-search-field label {
          display: block;
          margin-bottom: 8px;
          color: #4b5a69;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-field-shell {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 74px;
          border-radius: 14px;
          border: 1px solid #dbe3da;
          background: #ffffff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .hero-field-shell:focus-within {
          border-color: #7c876a;
          box-shadow: 0 0 0 3px rgba(124, 135, 106, 0.14);
        }

        .hero-field-shell--select {
          padding-right: 18px;
        }

        .hero-field-icon {
          position: absolute;
          left: 16px;
          z-index: 1;
          color: #7b8667;
          font-size: 18px;
        }

        .hero-field-chevron {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #7b8667;
          font-size: 14px;
          pointer-events: none;
        }

        .hero-field-control {
          width: 100%;
          min-height: 72px;
          border: none;
          outline: none;
          background: transparent;
          color: #172638;
          font-size: 15px;
          font-weight: 500;
          padding: 0 16px 0 48px;
          font-family: inherit;
        }

        .hero-field-control::placeholder {
          color: #7b8795;
          font-weight: 400;
        }

        .hero-field-control--select {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          padding-right: 42px;
        }

        .hero-search-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 74px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #818b70 0%, #5f6854 100%);
          color: #ffffff;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.03em;
          padding: 0 28px;
          transition: opacity 0.2s ease;
        }

        .hero-search-submit:hover,
        .hero-search-submit:focus-visible {
          opacity: 0.92;
        }

        .hero-search-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          padding: 14px 4px 0;
        }

        .hero-search-meta p {
          margin: 0;
          color: #617082;
          font-size: 14px;
        }

        .hero-search-reset {
          border: none;
          background: transparent;
          color: #5f6854;
          font-size: 14px;
          font-weight: 700;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .hero-suggestion-panel {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          right: 0;
          z-index: 20;
          display: grid;
          gap: 6px;
          padding: 10px;
          border-radius: 18px;
          border: 1px solid #e4eadf;
          background: #ffffff;
          box-shadow: 0 24px 44px rgba(17, 24, 39, 0.16);
        }

        .hero-suggestion-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          width: 100%;
          border: none;
          border-radius: 14px;
          background: #f8faf7;
          padding: 12px;
          text-align: left;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .hero-suggestion-item:hover,
        .hero-suggestion-item:focus-visible {
          background: #eef4ea;
          transform: translateY(-1px);
        }

        .hero-suggestion-icon {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(124, 135, 106, 0.12);
          color: #6e775d;
          flex-shrink: 0;
        }

        .hero-suggestion-copy {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .hero-suggestion-label {
          color: #172638;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
        }

        .hero-suggestion-meta {
          color: #708092;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .hero-suggestion-state {
          color: #708092;
          font-size: 14px;
          padding: 10px 6px;
        }

        @media (max-width: 1199px) {
          .hero-search-form {
            grid-template-columns: 1fr;
          }

          .hero-search-submit {
            width: 100%;
          }
        }

        @media (max-width: 991px) {
          .hero-search-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .hero-property-search {
            margin-top: 32px;
          }

          .hero-search-tabs {
            width: 100%;
            justify-content: space-between;
            border-radius: 22px;
          }

          .hero-search-tab {
            flex: 1 1 0;
            justify-content: center;
            min-width: 0;
            padding: 12px 10px;
            font-size: 11px;
            letter-spacing: 0.04em;
          }

          .hero-search-tab span {
            white-space: nowrap;
          }

          .hero-search-card {
            padding: 14px;
            border-radius: 22px;
          }

          .hero-search-grid {
            grid-template-columns: 1fr;
          }

          .hero-field-shell,
          .hero-search-submit {
            min-height: 68px;
            border-radius: 16px;
          }

          .hero-field-control {
            min-height: 66px;
          }
        }

        @media (max-width: 575px) {
          .hero-search-tabs {
            gap: 6px;
          }

          .hero-search-tab {
            padding: 11px 8px;
          }

          .hero-search-meta {
            padding-top: 12px;
          }

          .hero-search-meta p {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default DropdownTwo;
