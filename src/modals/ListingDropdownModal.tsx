import PriceRange from "@/components/common/PriceRange"
import NiceSelect from "@/ui/NiceSelect"
import Link from "next/link"
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


const ListingDropdownModal = ({
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
      <div className="modal fade" id="advanceFilterModal" tabIndex={-1} aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered">
            <div className="container">
               <div className="row">
                  <div className="col-xl-8 m-auto">
                     <div className="modal-content">
                        <button type="button" className="btn-close ms-auto mt-20 me-4" data-bs-dismiss="modal" aria-label="Close"><i className="fa-regular fa-xmark"></i></button>
                        <div className="advance-search-panel">
                           <div className="main-bg border-0">
                              <form onSubmit={(e) => e.preventDefault()}>
                                 <div className="row gx-lg-5">
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">{commercialPropertyTypeLabel}</div>
                                          <NiceSelect className="nice-select fw-normal"
                                             options={commercialPropertyTypeOptions}
                                             defaultCurrent={0}
                                             onChange={handleStatusChange}
                                             name=""
                                             placeholder="" />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">{commercialLocationLabel}</div>
                                          <NiceSelect className="nice-select location fw-normal"
                                             options={commercialLocationOptions}
                                             defaultCurrent={0}
                                             onChange={handleLocationChange}
                                             name=""
                                             placeholder="" />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">{commercialKeywordText}</div>
                                          <input onChange={handleSearchChange} type="text" placeholder={commercialKeywordText} className="type-input" />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Investment Type</div>
                                          <NiceSelect className="nice-select fw-normal"
                                             options={commercialInvestmentTypeOptions}
                                             defaultCurrent={0}
                                             onChange={selectHandler}
                                             name=""
                                             placeholder="" />
                                       </div>
                                    </div>
                                    <div className="col-lg-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Yield Range</div>
                                          <NiceSelect className="nice-select fw-normal"
                                             options={commercialYieldRangeOptions}
                                             defaultCurrent={0}
                                             onChange={selectHandler}
                                             name=""
                                             placeholder="" />
                                       </div>
                                    </div>
                                    <div className="col-lg-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Minimum Size (m²)</div>
                                          <input type="text" placeholder="Minimum Size (m²)" className="type-input" />
                                       </div>
                                    </div>
                                    <div className="col-lg-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Maximum Size (m²)</div>
                                          <input type="text" placeholder="Maximum Size (m²)" className="type-input" />
                                       </div>
                                    </div>
                                    <div className="col-12">
                                       <h6 className="block-title fw-bold mt-20 mb-20">{commercialPriceLabel}</h6>
                                       <div className="price-ranger">
                                          <div className="price-input d-flex align-items-center justify-content-between pt-5">
                                             <div className="field d-flex align-items-center">
                                                <input type="number" className="input-min" value={priceValue[0]} onChange={() => handlePriceChange} />
                                             </div>
                                             <div className="divider-line"></div>
                                             <div className="field d-flex align-items-center">
                                                <input type="number" className="input-max" value={priceValue[0]} onChange={() => handlePriceChange} />
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
                                    </div>
                                    <div className="col-12">
                                       <button className="fw-500 text-uppercase tran3s apply-search w-100 mt-40 mb-25">
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
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ListingDropdownModal
