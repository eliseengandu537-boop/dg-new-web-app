"use client"
import NiceSelect from "@/ui/NiceSelect";
import { useState } from "react";
import {
   commercialKeywordText,
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

const DropdownFour = () => {

   const selectHandler = (e: any) => { };
   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: any) => {
      setActiveTab(index);
   };

   const searchHandler = () => {
      window.location.href = '/listing_01';
   };

   return (
      <div className="search-wrapper-two position-relative ms-xl-5 ms-lg-4 ps-xxl-4 md-mt-60">
         <nav className="search-filter-nav-two d-inline-flex">
            <div className="nav nav-tabs border-0" role="tablist">
               {tab_title.map((tab, index) => (
                  <button key={index} onClick={() => handleTabClick(index)} className={`nav-link ${activeTab === index ? "active" : ""}`} id="buy-tab" type="button">{tab}</button>
               ))}
            </div>
         </nav>

         <div className="bg-wrapper position-relative z-1">
            <h4 className="mb-35 xl-mb-30">Search Commercial Property</h4>
            <div className="tab-content">
               <div className={`tab-pane show ${activeTab === 0 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">{commercialPropertyTypeLabel}</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={commercialPropertyTypeOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">{commercialLocationLabel}</div>
                              <NiceSelect className="nice-select location fw-normal"
                                 options={commercialLocationOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">{commercialKeywordText}</div>
                              <input type="text" placeholder={commercialKeywordText} className="type-input" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-50 lg-mb-30">
                              <div className="label">{commercialPriceLabel}</div>
                              <NiceSelect
                                 className="nice-select fw-normal"
                                 options={commercialPriceRangeOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one">
                              <button className="btn-five text-uppercase rounded-0 w-100">{commercialSearchButtonText}</button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               <div className={`tab-pane show ${activeTab === 1 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">{commercialPropertyTypeLabel}</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={commercialPropertyTypeOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">{commercialLocationLabel}</div>
                              <NiceSelect className="nice-select location fw-normal"
                                 options={commercialLocationOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">{commercialKeywordText}</div>
                              <input type="text" placeholder={commercialKeywordText} className="type-input" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-50 lg-mb-30">
                              <div className="label">{commercialPriceLabel}</div>
                              <NiceSelect
                                 className="nice-select fw-normal"
                                 options={commercialPriceRangeOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one">
                              <button className="btn-five text-uppercase rounded-0 w-100">{commercialSearchButtonText}</button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               <div className={`tab-pane show ${activeTab === 2 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">{commercialPropertyTypeLabel}</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={commercialPropertyTypeOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">{commercialLocationLabel}</div>
                              <NiceSelect className="nice-select location fw-normal"
                                 options={commercialLocationOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">{commercialKeywordText}</div>
                              <input type="text" placeholder={commercialKeywordText} className="type-input" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-50 lg-mb-30">
                              <div className="label">{commercialPriceLabel}</div>
                              <NiceSelect
                                 className="nice-select fw-normal"
                                 options={commercialPriceRangeOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one">
                              <button className="btn-five text-uppercase rounded-0 w-100">{commercialSearchButtonText}</button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DropdownFour
