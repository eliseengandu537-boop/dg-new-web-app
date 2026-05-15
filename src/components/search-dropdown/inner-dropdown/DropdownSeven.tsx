"use client"
import NiceSelect from "@/ui/NiceSelect"
import ListingDropdownModal from "@/modals/ListingDropdownModal";
import {
   commercialAdvancedFiltersLabel,
   commercialLocationLabel,
   commercialLocationOptions,
   commercialPriceLabel,
   commercialPropertyTypeLabel,
   commercialPropertyTypeOptions,
} from "@/data/commercialSearchData";

const DropdownSeven = ({
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
   handleStatusChange,
   handlePriceDropChange }: any) => {

   const selectHandler = (e: any) => { };

   const openAdvanceFilter = () => {
      const el = document.getElementById('advanceFilterModal');
      if (el) (window as any).bootstrap?.Modal?.getOrCreateInstance(el).show();
   };

   return (
      <>
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="row gx-0 align-items-center">
               <div className="col-xxl-2 col-xl-3 col-sm-6">
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
               <div className="col-xl-3 col-sm-6">
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
               <div className="col-xl-3 col-sm-4">
                  <div className="input-box-one border-left">
                     <div className="label">{commercialPriceLabel}</div>
                     <NiceSelect
                        className="nice-select fw-normal"
                        options={[
                           { value: "price-rental-range", text: "Price / Lease Range" },
                           { value: "up-to-r50k", text: "Up to R50,000 pm / R5,000,000" },
                           { value: "r50k-to-r150k", text: "R50,000 - R150,000 pm / R5,000,000 - R20,000,000" },
                           { value: "r150k-plus", text: "R150,000+ pm / R20,000,000+" },
                        ]}
                        defaultCurrent={0}
                        onChange={(event) => handlePriceDropChange(event.target.value)}
                        name=""
                        placeholder=""
                     />
                  </div>
               </div>
               <div className="col-xl-1 col-sm-4 col-6">
                  <div className="input-box-one border-left">
                     <div className="label">Minimum Size (m²)</div>
                     <input type="text" placeholder="Min Size" className="type-input" />
                  </div>
               </div>
               <div className="col-xl-1 col-sm-4 col-6">
                  <div className="input-box-one border-left">
                     <div className="label">Maximum Size (m²)</div>
                     <input type="text" placeholder="Max Size" className="type-input" />
                  </div>
               </div>
               <div className="col-xxl-2 col-xl-1">
                  <div className="input-box-one lg-mt-20">
                     <div className="d-flex align-items-center justify-content-center justify-content-xl-end">
                        <button type="button" onClick={openAdvanceFilter}
                           className="search-modal-btn tran3s text-uppercase fw-500 d-inline-flex align-items-center">
                           <span className="me-3 d-xl-none d-xxl-block">{commercialAdvancedFiltersLabel}</span>
                           <i className="fa-light fa-sliders-up"></i>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </form>
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

export default DropdownSeven
