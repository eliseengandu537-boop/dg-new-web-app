"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { commercialKeywordText } from "@/data/commercialSearchData";
import { fetchPublicPropertySuggestions } from "@/utils/dashboardApi";
import type { PropertySearchSuggestion } from "@/utils/propertySearch";

const MIN_AUTOCOMPLETE_CHARS = 2;

const suggestionTypeLabels: Record<PropertySearchSuggestion["type"], string> = {
   title: "Property",
   location: "Area",
   reference: "Reference",
};

const suggestionTypeIcons: Record<PropertySearchSuggestion["type"], string> = {
   title: "bi-buildings",
   location: "bi-geo-alt",
   reference: "bi-hash",
};

const HeaderSearchbar = ({ isSearch, setIsSearch }: any) => {

   const router = useRouter();
   const [searchValue, setSearchValue] = useState("");
   const [suggestions, setSuggestions] = useState<PropertySearchSuggestion[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const inputRef = useRef<HTMLInputElement | null>(null);

   useEffect(() => {
      if (!isSearch) {
         setSuggestions([]);
         setIsLoading(false);
         return;
      }

      const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === "Escape") {
            setIsSearch(false);
         }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
         window.clearTimeout(focusTimer);
         document.removeEventListener("keydown", handleKeyDown);
      };
   }, [isSearch, setIsSearch]);

   useEffect(() => {
      const query = searchValue.trim();
      if (!isSearch || query.length < MIN_AUTOCOMPLETE_CHARS) {
         setSuggestions([]);
         setIsLoading(false);
         return;
      }

      let ignore = false;
      setIsLoading(true);

      const timeoutId = window.setTimeout(async () => {
         try {
            const response = await fetchPublicPropertySuggestions({
               field: "search",
               term: query,
            });

            if (!ignore) {
               setSuggestions(response.data?.suggestions || []);
            }
         } catch {
            if (!ignore) {
               setSuggestions([]);
            }
         } finally {
            if (!ignore) {
               setIsLoading(false);
            }
         }
      }, 200);

      return () => {
         ignore = true;
         window.clearTimeout(timeoutId);
      };
   }, [isSearch, searchValue]);

   const openSearchResults = (query: string) => {
      router.push(`/properties?search=${encodeURIComponent(query)}`);
      setSearchValue("");
      setSuggestions([]);
      setIsSearch(false);
   };

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const query = searchValue.trim();
      if (query) {
         openSearchResults(query);
      }
   };

   return (
      <>
         <div className={`modal fade search-modal ${isSearch ? "active" : ""}`} id="searchModal" role="dialog" aria-modal="true" aria-label="Search properties" aria-hidden={!isSearch}>
            <div className="modal-dialog modal-fullscreen modal-dialog-centered">
               <div className="modal-content d-flex justify-content-center">
                  <form onSubmit={handleSubmit} role="search" autoComplete="off">
                     <label htmlFor="header-property-search" className="visually-hidden">Search properties</label>
                     <input
                        ref={inputRef}
                        id="header-property-search"
                        value={searchValue}
                        onChange={handleSearchChange}
                        type="search"
                        placeholder={commercialKeywordText}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-controls="header-property-suggestions"
                        aria-expanded={searchValue.trim().length >= MIN_AUTOCOMPLETE_CHARS}
                     />
                     <button type="submit" aria-label="Submit property search"><i className="fa-light fa-arrow-right-long" aria-hidden="true"></i></button>
                     {searchValue.trim().length >= MIN_AUTOCOMPLETE_CHARS && (
                        <div id="header-property-suggestions" className="header-search-suggestions" role="listbox" aria-label="Property search suggestions">
                           {isLoading ? (
                              <div className="header-search-suggestions__state">Searching listings...</div>
                           ) : suggestions.length > 0 ? (
                              suggestions.map((suggestion) => (
                                 <button
                                    key={`${suggestion.type}-${suggestion.value}`}
                                    type="button"
                                    className="header-search-suggestion"
                                    role="option"
                                    aria-selected="false"
                                    onClick={() => openSearchResults(suggestion.value)}
                                 >
                                    <span className="header-search-suggestion__icon" aria-hidden="true">
                                       <i className={`bi ${suggestionTypeIcons[suggestion.type]}`}></i>
                                    </span>
                                    <span className="header-search-suggestion__copy">
                                       <span className="header-search-suggestion__label">{suggestion.label}</span>
                                       <span className="header-search-suggestion__type">{suggestionTypeLabels[suggestion.type]}</span>
                                    </span>
                                 </button>
                              ))
                           ) : (
                              <div className="header-search-suggestions__state">No matching properties yet. Press Enter to search all listings.</div>
                           )}
                        </div>
                     )}
                  </form>
               </div>
            </div>
         </div>
         <div onClick={() => setIsSearch(false)} className={`search-backdrop modal-backdrop fade ${isSearch ? "show" : ""}`}></div>
      </>
   )
}

export default HeaderSearchbar
