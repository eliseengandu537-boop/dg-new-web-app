import NiceSelect from "@/ui/NiceSelect";
import {
   commercialKeywordText,
   commercialLocationLabel,
   commercialLocationOptions,
   commercialPriceLabel,
   commercialPriceRangeOptions,
   commercialPropertyTypeLabel,
   commercialPropertyTypeOptions,
   commercialSearchButtonText,
} from "@/data/commercialSearchData";

const DropdownOne = () => {

   const selectHandler = (e: any) => { };

   const searchHandler = () => {
      window.location.href = '/listing_07';
   };

   return (
      <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
         <div className="row gx-0 align-items-center">
            <div className="col-xl-2 col-lg-4">
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
               <div className="input-box-one border-left">
                  <div className="label">{commercialKeywordText}</div>
                  <input type="text" placeholder={commercialKeywordText} className="type-input" />
               </div>
            </div>
            <div className="col-xl-2 col-lg-6">
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
            <div className="col-xl-2 col-lg-6">
               <div className="input-box-one lg-mt-10">
                  <button className="fw-500 w-100 tran3s search-btn-three">{commercialSearchButtonText}</button>
               </div>
            </div>
         </div>
      </form>
   );
};

export default DropdownOne;
