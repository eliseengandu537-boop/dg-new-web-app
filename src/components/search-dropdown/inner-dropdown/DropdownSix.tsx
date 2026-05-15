import NiceSelect from "@/ui/NiceSelect"
import PriceRange from "../../common/PriceRange";
import Link from "next/link";
import ListingDropdownModal from "@/modals/ListingDropdownModal";
import {
   commercialInvestmentTypeOptions,
   commercialKeywordText,
   commercialLocationLabel,
   commercialLocationOptions,
   commercialPriceLabel,
   commercialPropertyTypeLabel,
   commercialPropertyTypeOptions,
   commercialSearchButtonText,
   commercialYieldRangeOptions,
} from "@/data/commercialSearchData";

const DropdownSix = ({
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

   const selectHandler = (e: any) => { };

   return (
      <>
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
               <div className="col-12">
                  <div className="input-box-one border-0 mb-15">
                     <div className="label2">{commercialPropertyTypeLabel}</div>
                     <NiceSelect className="nice-select fw-normal box-style"
                        options={commercialPropertyTypeOptions}
                        defaultCurrent={0}
                        onChange={handleStatusChange}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-12">
                  <div className="input-box-one border-0 mb-15">
                     <div className="label2">{commercialKeywordText}</div>
                     <input onChange={handleSearchChange} type="text" placeholder={commercialKeywordText} className="type-input box-style" />
                  </div>
               </div>
               <div className="col-12">
                  <div className="input-box-one border-0 mb-15">
                     <div className="label2">{commercialLocationLabel}</div>
                     <NiceSelect className="nice-select location fw-normal box-style"
                        options={commercialLocationOptions}
                        defaultCurrent={0}
                        onChange={handleLocationChange}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-sm-6">
                  <div className="input-box-one border-0 mb-40 sm-mb-20">
                     <div className="label2">Investment Type</div>
                     <NiceSelect className="nice-select fw-normal box-style"
                        options={commercialInvestmentTypeOptions}
                        defaultCurrent={0}
                        onChange={selectHandler}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-sm-6">
                  <div className="input-box-one border-0 mb-40 sm-mb-20">
                     <div className="label2">Yield Range</div>
                     <NiceSelect className="nice-select fw-normal box-style"
                        options={commercialYieldRangeOptions}
                        defaultCurrent={0}
                        onChange={selectHandler}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-12">
                  <h6 className="block-title fw-bold mt-40 mb-15">{commercialPriceLabel}</h6>
                  <div className="price-ranger">
                     <div className="price-input style-two d-flex align-items-center justify-content-end pt-5">
                        <div className="field d-flex align-items-center">
                           <input type="number" className="input-min" value={priceValue[0]} onChange={() => handlePriceChange} />
                        </div>
                        <div className="divider-line"></div>
                        <div className="field d-flex align-items-center">
                           <input type="number" className="input-max" value={priceValue[1]} onChange={() => handlePriceChange} />
                        </div>
                        <div className="currency ps-1">USD</div>
                     </div>
                  </div>
                  <PriceRange
                     MAX={maxPrice}
                     MIN={0}
                     STEP={1}
                     values={priceValue}
                     handleChanges={handlePriceChange}
                  />
                  <div className="col-12">
                     <div className="input-box-one border-0 mb-35 mt-35">
                        <div className="label2">Minimum Size (m²)</div>
                        <input type="text" placeholder="Minimum Size (m²)" className="type-input box-style" />
                     </div>
                  </div>
                  <div className="col-12">
                     <div className="input-box-one border-0 mb-0">
                        <div className="label2">Maximum Size (m²)</div>
                        <input type="text" placeholder="Maximum Size (m²)" className="type-input box-style" />
                     </div>
                  </div>
                  <div className="col-12">
                     <button className="fw-500 text-uppercase tran3s apply-search w-100 rounded-0 mt-40 mb-25">
                        <i className="fa-light fa-magnifying-glass"></i>
                        <span>{commercialSearchButtonText}</span>
                     </button>
                  </div>
                  <div className="col-12">
                     <div className="d-flex justify-content-between form-widget">
                        <a onClick={handleResetFilter} style={{ cursor: "pointer" }} className="tran3s">
                           <i className="fa-regular fa-arrows-rotate"></i>
                           <span>Reset Filter</span>
                        </a>
                        <Link href="#" className="tran3s">
                           <i className="fa-regular fa-star"></i>
                           <span>Save Search</span>
                        </Link>
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

export default DropdownSix
