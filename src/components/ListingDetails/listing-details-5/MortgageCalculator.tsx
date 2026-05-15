import BondCalculatorForm from "../shared/BondCalculatorForm";

const MortgageCalculator = () => {
   return (
      <div className="accordion-item">
         <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNineA" aria-expanded="true" aria-controls="collapseNineA">
               Bond Calculator
            </button>
         </h2>
         <div id="collapseNineA" className="accordion-collapse collapse">
            <div className="accordion-body">
               <div className="mortgage-calculator">
                  <BondCalculatorForm rounded={false} />
               </div>
            </div>
         </div>
      </div>
   )
}

export default MortgageCalculator
