"use client"
import NiceSelect from "@/ui/NiceSelect";
import { useState } from "react";
import DropdownModal from "./DropdownModal";
import {
   commercialAdvancedFiltersLabel,
   commercialLocationLabel,
   commercialLocationOptions,
   commercialPriceLabel,
   commercialPriceRangeOptions,
   commercialPropertyTypeLabel,
   commercialPropertyTypeOptions,
   commercialSearchButtonText,
   commercialSearchTabs,
} from "@/data/commercialSearchData";

const tab_title: string[] = commercialSearchTabs;

interface DropdownSixProps {
   overlay?: boolean;
}

const DropdownSix = ({ overlay = false }: DropdownSixProps) => {
   const selectHandler = (e: any) => { };
   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: any) => {
      setActiveTab(index);
   };

   const searchHandler = () => {
      window.location.href = '/listing_01';
   };

   const openAdvanceFilter = () => {
      const el = document.getElementById('advanceFilterModal');
      if (el) (window as any).bootstrap?.Modal?.getOrCreateInstance(el).show();
   };

   return (
      <>
         <div className={`search-wrapper-one layout-one position-relative ${overlay ? "" : "mt-250 xl-mt-150 lg-mt-100"}`}>
            <nav className="search-filter-nav-one d-flex justify-content-center mb-3">
               <div className="nav nav-tabs border-0" role="tablist">
                  {tab_title.map((tab, index) => (
                     <button key={index} onClick={() => handleTabClick(index)} className={`nav-link m0 ${activeTab === index ? "active" : ""}`} id="buy-tab" type="button">{tab}</button>
                  ))}
               </div>
            </nav>
            <div style={{ background: 'rgba(255,255,255,0.98)', borderRadius: 18, boxShadow: '0 4px 32px rgba(0,0,0,0.08)', padding: '32px 32px 24px 32px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
               <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'center' }}>
                     <div style={{ flex: '1 1 200px', minWidth: 180 }}>
                        <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 6 }}>{commercialPropertyTypeLabel}</div>
                        <NiceSelect className="nice-select fw-normal" options={commercialPropertyTypeOptions} defaultCurrent={0} onChange={selectHandler} name="" placeholder="" />
                     </div>
                     <div style={{ flex: '1 1 200px', minWidth: 180 }}>
                        <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 6 }}>{commercialLocationLabel}</div>
                        <NiceSelect className="nice-select location fw-normal" options={commercialLocationOptions} defaultCurrent={0} onChange={selectHandler} name="" placeholder="" />
                     </div>
                     <div style={{ flex: '1 1 200px', minWidth: 180 }}>
                        <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 6 }}>{commercialPriceLabel}</div>
                        <NiceSelect className="nice-select fw-normal" options={commercialPriceRangeOptions} defaultCurrent={0} onChange={selectHandler} name="" placeholder="" />
                     </div>
                     <div style={{ display: 'flex', gap: 12, alignItems: 'center', minWidth: 220 }}>
                        <button type="button" onClick={openAdvanceFilter} style={{ border: '1px solid #bdbdbd', background: '#fff', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: 15, color: '#222', display: 'flex', alignItems: 'center', gap: 8 }}>
                           <i className="fa-light fa-sliders-up"></i>
                           <span style={{ marginLeft: 4 }}>{commercialAdvancedFiltersLabel}</span>
                        </button>
                        <button style={{ background: '#7a8561', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 16, letterSpacing: 1, boxShadow: '0 2px 8px rgba(122,133,97,0.08)' }}>
                           <span>{commercialSearchButtonText}</span>
                           <i className="fa-light fa-magnifying-glass" style={{ marginLeft: 8 }}></i>
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
         <DropdownModal/>
      </>
   );
};

export default DropdownSix;
