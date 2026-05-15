import property_feature_list from "@/data/inner-data/PropertyFeatureListData"
import { COMMERCIAL_FIELD_LABELS } from "@/data/commercialPropertyConfig";

interface Props {
   categoryDetails?: Record<string, any>;
   category?: string;
}

const CommonPropertyFeatureList = ({ categoryDetails, category }: Props) => {
   // If we have real category details, show them in a single accordion panel
   if (categoryDetails && Object.keys(categoryDetails).length > 0) {
      const features = Object.entries(categoryDetails)
         .filter(([, v]) => v !== "" && v !== null && v !== undefined)
         .map(([key, value]) => ({
            title: COMMERCIAL_FIELD_LABELS[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()) + ":",
            count: String(value),
         }));

      if (features.length > 0) {
         return (
            <div className="accordion" id="accordionTwo">
               <div className="accordion-item">
                  <h2 className="accordion-header">
                     <button className="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsePropertyDetails" aria-expanded="true" aria-controls="collapsePropertyDetails">
                        Property Details
                     </button>
                  </h2>
                  <div id="collapsePropertyDetails" className="accordion-collapse collapse show" data-bs-parent="#accordionTwo">
                     <div className="accordion-body">
                        <div className="feature-list-two">
                           <ul className="style-none d-flex flex-wrap justify-content-between">
                              {features.map((f, i) => (
                                 <li key={i}><span>{f.title} </span> <span className="fw-500 color-dark">{f.count}</span></li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         );
      }
   }

   // Fallback — static placeholder data
   return (
      <div className="accordion" id="accordionTwo">
         {property_feature_list.map((item) => (
            <div key={item.id} className="accordion-item">
               <h2 className="accordion-header">
                  <button className={`accordion-button ${item.id === 1 ? "" : "collapsed"}`} type="button"
                     data-bs-toggle="collapse" data-bs-target={`#collapse${item.id}`} aria-expanded="false"
                     aria-controls={`collapse${item.id}`}>
                     {item.title}
                  </button>
               </h2>
               <div id={`collapse${item.id}`} className={`accordion-collapse collapse ${item.id === 1 ? "show" : ""}`}
                  data-bs-parent="#accordionTwo">
                  <div className="accordion-body">
                     <div className="feature-list-two">
                        <ul className="style-none d-flex flex-wrap justify-content-between">
                           {item.feature_list.map((list, i) => (
                              <li key={i}><span>{list.title} </span> <span className="fw-500 color-dark">{list.count}</span></li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}

export default CommonPropertyFeatureList;
