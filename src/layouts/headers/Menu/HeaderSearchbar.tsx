"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { commercialKeywordText } from "@/data/commercialSearchData";

const HeaderSearchbar = ({ isSearch, setIsSearch }: any) => {

   const router = useRouter();
   const [searchValue, setSearchValue] = useState("");

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const query = searchValue.trim();
      if (query) {
         router.push(`/properties?search=${encodeURIComponent(query)}`);
      }
      setSearchValue('');
      setIsSearch(false);
   };

   return (
      <>
         <div className={`modal fade search-modal ${isSearch ? "active" : ""}`} id="searchModal" role="dialog" aria-modal="true" aria-label="Search properties" aria-hidden={!isSearch}>
            <div className="modal-dialog modal-fullscreen modal-dialog-centered">
               <div className="modal-content d-flex justify-content-center">
                  <form onSubmit={handleSubmit} role="search">
                     <label htmlFor="header-property-search" className="visually-hidden">Search properties</label>
                     <input id="header-property-search" value={searchValue} onChange={handleSearchChange} type="search" placeholder={commercialKeywordText} />
                     <button type="submit" aria-label="Submit property search"><i className="fa-light fa-arrow-right-long" aria-hidden="true"></i></button>
                  </form>
               </div>
            </div>
         </div>
         <div onClick={() => setIsSearch(false)} className={`search-backdrop modal-backdrop fade ${isSearch ? "show" : ""}`}></div>
      </>
   )
}

export default HeaderSearchbar
