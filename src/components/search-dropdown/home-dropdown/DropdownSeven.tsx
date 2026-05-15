"use client"
import { useState } from "react";
import NiceSelect from "@/ui/NiceSelect";
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

const DropdownSeven = () => {

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
         <div className="search-wrapper-one layout-one position-relative">
            <nav className="search-filter-nav-one d-flex">
               <div className="nav nav-tabs border-0" role="tablist">
                  {tab_title.map((tab, index) => (
                     <button key={index} onClick={() => handleTabClick(index)} className={`nav-link ${activeTab === index ? "active" : ""}`} id="buy-tab" type="button">{tab}</button>
                  ))}
               </div>
            </nav>

            <div className="bg-wrapper border-0">
               <div className="tab-content">
                  <div className={`tab-pane show ${activeTab === 0 ? "active" : ""}`} id="buy">
                     <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                        <div className="row gx-0 align-items-center">
                           <div className="col-xxl-2 col-xl-3 col-lg-4">
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
                           <div className="col-xl-3 col-lg-4">
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
                              <div className="input-box-one border-left border-lg-0">
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
                           <div className="col-xxl-4 col-xl-3">
                              <div className="input-box-one lg-mt-10">
                                 <div className="d-flex align-items-center justify-content-center">
                                    <button type="button" onClick={openAdvanceFilter} className="search-modal-btn tran3s text-uppercase fw-500 d-inline-flex align-items-center rounded-3 me-3">
                                       <span className="d-xl-none d-xxl-block">{commercialAdvancedFiltersLabel}</span>
                                       <i className="fa-light fa-sliders-up"></i>
                                    </button>
                                    <button className="fw-500 text-uppercase tran3s search-btn-four rounded-3">
                                       <span>{commercialSearchButtonText}</span>
                                       <i className="fa-light fa-magnifying-glass"></i>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>

                  <div className={`tab-pane show ${activeTab === 1 ? "active" : ""}`} id="buy">
                     <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                        <div className="row gx-0 align-items-center">
                           <div className="col-xxl-2 col-xl-3 col-lg-4">
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
                           <div className="col-xl-3 col-lg-4">
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
                              <div className="input-box-one border-left border-lg-0">
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
                           <div className="col-xxl-4 col-xl-3">
                              <div className="input-box-one lg-mt-10">
                                 <div className="d-flex align-items-center justify-content-center">
                                    <button type="button" onClick={openAdvanceFilter} className="search-modal-btn tran3s text-uppercase fw-500 d-inline-flex align-items-center rounded-3 me-3">
                                       <span className="d-xl-none d-xxl-block">{commercialAdvancedFiltersLabel}</span>
                                       <i className="fa-light fa-sliders-up"></i>
                                    </button>
                                    <button className="fw-500 text-uppercase tran3s search-btn-four rounded-3">
                                       <span>{commercialSearchButtonText}</span>
                                       <i className="fa-light fa-magnifying-glass"></i>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>

                  <div className={`tab-pane show ${activeTab === 2 ? "active" : ""}`} id="buy">
                     <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                        <div className="row gx-0 align-items-center">
                           <div className="col-xxl-2 col-xl-3 col-lg-4">
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
                           <div className="col-xl-3 col-lg-4">
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
                              <div className="input-box-one border-left border-lg-0">
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
                           <div className="col-xxl-4 col-xl-3">
                              <div className="input-box-one lg-mt-10">
                                 <div className="d-flex align-items-center justify-content-center">
                                    <button type="button" onClick={openAdvanceFilter}
                                       className="search-modal-btn tran3s text-uppercase fw-500 d-inline-flex align-items-center me-3">
                                       <span className="me-3 d-xl-none d-xxl-block">{commercialAdvancedFiltersLabel}</span>
                                       <i className="fa-light fa-sliders-up"></i>
                                    </button>
                                    <button className="fw-500 text-uppercase tran3s search-btn-four rounded-3">
                                       <span>{commercialSearchButtonText}</span>
                                       <i className="fa-light fa-magnifying-glass"></i>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         <DropdownModal />
      </>
   )
}

export default DropdownSeven
