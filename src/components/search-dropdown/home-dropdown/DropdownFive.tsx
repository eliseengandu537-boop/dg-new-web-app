"use client"
import { useState } from "react";
import NiceSelect from "@/ui/NiceSelect";
import {
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

const DropdownFive = () => {

   const selectHandler = (e: any) => { };
   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: any) => {
      setActiveTab(index);
   };

   const searchHandler = () => {
      window.location.href = '/listing_05';
   };

   return (
      <div className="search-wrapper-one layout-one mt-60 lg-mt-40 position-relative">
         <nav className="search-filter-nav-one d-flex">
            <div className="nav nav-tabs border-0" role="tablist">
               {tab_title.map((tab, index) => (
                  <button key={index} onClick={() => handleTabClick(index)} className={`nav-link ${activeTab === index ? "active" : ""}`} id="buy-tab" type="button">{tab}</button>
               ))}
            </div>
         </nav>

         <div className="bg-wrapper p0 border-0 rounded-0">
            <div className="tab-content">
               <div className={`tab-pane show ${activeTab === 0 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }} className="md-pt-20">
                     <div className="row gx-0 align-items-center">
                        <div className="col-lg-3">
                           <div className="input-box-one border-left">
                              <div className="label">{commercialPropertyTypeLabel}</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={commercialPropertyTypeOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-lg-4">
                           <div className="input-box-one border-left">
                              <div className="label">{commercialLocationLabel}</div>
                              <NiceSelect className="nice-select location fw-normal"
                                 options={commercialLocationOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-lg-4">
                           <div className="input-box-one">
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
                        <div className="col-xl-2 col-lg-1">
                           <div className="input-box-one p0 ms-xl-5 md-mt-20">
                              <button className="fw-500 text-uppercase tran3s search-btn-two w-100 h-100 pt-45 lg-pt-30 md-pt-20 pb-45 lg-pb-30 md-pb-20 d-flex align-items-center justify-content-center gap-2">
                                 <span>{commercialSearchButtonText}</span>
                                 <i className="fa-light fa-magnifying-glass"></i>
                              </button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               <div className={`tab-pane show ${activeTab === 1 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }} className="md-pt-20">
                     <div className="row gx-0 align-items-center">
                        <div className="col-lg-3">
                           <div className="input-box-one border-left">
                              <div className="label">{commercialPropertyTypeLabel}</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={commercialPropertyTypeOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-lg-4">
                           <div className="input-box-one border-left">
                              <div className="label">{commercialLocationLabel}</div>
                              <NiceSelect className="nice-select location fw-normal"
                                 options={commercialLocationOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-lg-4">
                           <div className="input-box-one">
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
                        <div className="col-xl-2 col-lg-1">
                           <div className="input-box-one p0 ms-xl-5 md-mt-20">
                              <button className="fw-500 text-uppercase tran3s search-btn-two w-100 h-100 pt-45 lg-pt-30 md-pt-20 pb-45 lg-pb-30 md-pb-20 d-flex align-items-center justify-content-center gap-2">
                                 <span>{commercialSearchButtonText}</span>
                                 <i className="fa-light fa-magnifying-glass"></i>
                              </button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               <div className={`tab-pane show ${activeTab === 2 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }} className="md-pt-20">
                     <div className="row gx-0 align-items-center">
                        <div className="col-lg-3">
                           <div className="input-box-one border-left">
                              <div className="label">{commercialPropertyTypeLabel}</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={commercialPropertyTypeOptions}
                                 defaultCurrent={5}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-lg-4">
                           <div className="input-box-one border-left">
                              <div className="label">{commercialLocationLabel}</div>
                              <NiceSelect className="nice-select location fw-normal"
                                 options={commercialLocationOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-lg-4">
                           <div className="input-box-one">
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
                        <div className="col-xl-2 col-lg-1">
                           <div className="input-box-one p0 ms-xl-5 md-mt-20">
                              <button className="fw-500 text-uppercase tran3s search-btn-two w-100 h-100 pt-45 lg-pt-30 md-pt-20 pb-45 lg-pb-30 md-pb-20 d-flex align-items-center justify-content-center gap-2">
                                 <span>{commercialSearchButtonText}</span>
                                 <i className="fa-light fa-magnifying-glass"></i>
                              </button>
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

export default DropdownFive
