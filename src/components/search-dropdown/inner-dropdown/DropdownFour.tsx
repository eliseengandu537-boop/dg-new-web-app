"use client"
import NiceSelect from "@/ui/NiceSelect";
import { useState } from "react";
import Image from "next/image"
import Link from "next/link"
import ListingDropdownModal from "@/modals/ListingDropdownModal";
import {
   commercialAdvancedFiltersLabel,
   commercialLocationLabel,
   commercialLocationOptions,
   commercialPropertyTypeLabel,
   commercialPropertyTypeOptions,
   commercialSearchButtonText,
   commercialSearchTabs,
} from "@/data/commercialSearchData";

import titleShape from "@/assets/images/shape/title_shape_02.svg"

const tab_title: string[] = commercialSearchTabs;

const DropdownFour = ({
   handleBathroomChange,
   handleBedroomChange,
   handleSearchChange,
   handlePriceChange,
   maxPrice,
   priceValue,
   handleResetFilter,
   selectedAmenities,
   handleAmenityChange,
   handleLocationChange,
   handleStatusChange, }: any) => {

   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: any) => {
      setActiveTab(index);
   };

   const openAdvanceFilter = () => {
      const el = document.getElementById('advanceFilterModal');
      if (el) (window as any).bootstrap?.Modal?.getOrCreateInstance(el).show();
   };

   return (
      <>
         <div className="inner-banner-two inner-banner z-1 pt-170 xl-pt-150 md-pt-130 pb-100 xl-pb-80 md-pb-50 position-relative" style={{ backgroundImage: `url(/assets/images/media/lo.jpg)` }}>
            {/* dark glow overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,22,35,0.82) 0%, rgba(10,22,35,0.60) 60%, rgba(10,22,35,0.45) 100%)", zIndex: 0 }} />
            {/* gold accent line */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: "linear-gradient(90deg, #c8973a, #e8b86d, #c8973a)", zIndex: 1 }} />
            <div className="container" style={{ position: "relative", zIndex: 2 }}>
               <div className="row">
                  <div className="col-lg-6">
                     <div className="title-one mb-30 md-mb-20">
                        <h3 style={{ color: "#fff" }}>Find Your <span style={{ color: "#fff" }}>Property <Image src={titleShape} alt="" className="lazy-img" /></span></h3>
                     </div>
                     <ul className="theme-breadcrumb style-none d-inline-flex align-items-center justify-content-center position-relative z-1 bottom-line" style={{ "--crumb-color": "rgba(255,255,255,0.65)", "--crumb-last": "#fff", "--crumb-line": "rgba(255,255,255,0.4)" } as React.CSSProperties}>
                        <li><Link href="/" style={{ color: "rgba(255,255,255,0.65)" }}>Home</Link></li>
                        <li style={{ color: "rgba(255,255,255,0.65)" }}>/</li>
                        <li><Link href="#" style={{ color: "rgba(255,255,255,0.65)" }}>Pages</Link></li>
                        <li style={{ color: "rgba(255,255,255,0.65)" }}>/</li>
                        <li style={{ color: "#fff" }}>Listing</li>
                     </ul>
                  </div>
                  <div className="col-lg-6">
                     <p className="sub-heading" style={{ color: "rgba(255,255,255,0.85)" }}>Over 745,000 listings, Property, lots and plots available now!</p>
                  </div>
               </div>
               <div className="search-wrapper-one layout-one position-relative mt-80 xl-mt-50">
                  <nav className="search-filter-nav-one d-flex">
                     <div className="nav nav-tabs border-0" role="tablist">
                        {tab_title.map((tab, index) => (
                           <button key={index} onClick={() => handleTabClick(index)} className={`nav-link m0 ${activeTab === index ? "active" : ""}`} id="buy-tab" type="button">{tab}</button>
                        ))}
                     </div>
                  </nav>

                  <div className="bg-wrapper border-0 rounded-0">
                     <div className="tab-content">
                        <div className={`tab-pane show ${activeTab === 0 ? "active" : ""}`} id="buy">
                           <form onSubmit={(e) => e.preventDefault()}>
                              <div className="row gx-0 align-items-center">
                                 <div className="col-lg-3">
                                    <div className="input-box-one border-left">
                                       <div className="label">{commercialPropertyTypeLabel}</div>
                                       <NiceSelect className="nice-select fw-normal"
                                          options={commercialPropertyTypeOptions}
                                          defaultCurrent={0}
                                          onChange={handleStatusChange}
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
                                          onChange={handleLocationChange}
                                          name=""
                                          placeholder="" />
                                    </div>
                                 </div>
                                 <div className="col-lg-5">
                                    <div className="input-box-one">
                                       <div className="d-flex align-items-center justify-content-center justify-content-lg-end md-mt-10">
                                          <button type="button" onClick={openAdvanceFilter} className="search-modal-btn tran3s text-uppercase fw-500 d-inline-flex align-items-center me-3">
                                             <span>{commercialAdvancedFiltersLabel}</span>
                                             <i className="fa-light fa-sliders-up"></i>
                                          </button>
                                          <button className="fw-500 text-uppercase tran3s search-btn-four w-auto">
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
                           <form onSubmit={(e) => e.preventDefault()}>
                              <div className="row gx-0 align-items-center">
                                 <div className="col-lg-3">
                                    <div className="input-box-one border-left">
                                       <div className="label">{commercialPropertyTypeLabel}</div>
                                       <NiceSelect className="nice-select fw-normal"
                                          options={commercialPropertyTypeOptions}
                                          defaultCurrent={0}
                                          onChange={handleStatusChange}
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
                                          onChange={handleLocationChange}
                                          name=""
                                          placeholder="" />
                                    </div>
                                 </div>
                                 <div className="col-lg-5">
                                    <div className="input-box-one">
                                       <div className="d-flex align-items-center justify-content-center justify-content-lg-end md-mt-10">
                                          <button type="button" onClick={openAdvanceFilter} className="search-modal-btn tran3s text-uppercase fw-500 d-inline-flex align-items-center me-3">
                                             <span>{commercialAdvancedFiltersLabel}</span>
                                             <i className="fa-light fa-sliders-up"></i>
                                          </button>
                                          <button className="fw-500 text-uppercase tran3s search-btn-four w-auto">
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
                           <form onSubmit={(e) => e.preventDefault()}>
                              <div className="row gx-0 align-items-center">
                                 <div className="col-lg-3">
                                    <div className="input-box-one border-left">
                                       <div className="label">{commercialPropertyTypeLabel}</div>
                                       <NiceSelect className="nice-select fw-normal"
                                          options={commercialPropertyTypeOptions}
                                          defaultCurrent={0}
                                          onChange={handleStatusChange}
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
                                          onChange={handleLocationChange}
                                          name=""
                                          placeholder="" />
                                    </div>
                                 </div>
                                 <div className="col-lg-5">
                                    <div className="input-box-one">
                                       <div className="d-flex align-items-center justify-content-center justify-content-lg-end md-mt-10">
                                          <button type="button" onClick={openAdvanceFilter} className="search-modal-btn tran3s text-uppercase fw-500 d-inline-flex align-items-center me-3">
                                             <span>{commercialAdvancedFiltersLabel}</span>
                                             <i className="fa-light fa-sliders-up"></i>
                                          </button>
                                          <button className="fw-500 text-uppercase tran3s search-btn-four w-auto">
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
            </div>
         </div>
         <ListingDropdownModal
            handleSearchChange={handleSearchChange}
            handleBedroomChange={handleBedroomChange}
            handleBathroomChange={handleBathroomChange}
            handlePriceChange={handlePriceChange}
            maxPrice={maxPrice}
            priceValue={priceValue}
            handleResetFilter={handleResetFilter}
            selectedAmenities={selectedAmenities}
            handleAmenityChange={handleAmenityChange}
            handleLocationChange={handleLocationChange}
            handleStatusChange={handleStatusChange}
         />
      </>
   )
}

export default DropdownFour
