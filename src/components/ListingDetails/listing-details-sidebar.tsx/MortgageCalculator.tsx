"use client";
import BondCalculatorForm from "../shared/BondCalculatorForm";

const MortgageCalculator = ({ sourceContext }: { sourceContext?: string }) => {
   return <BondCalculatorForm sourceContext={sourceContext} compact />
}

export default MortgageCalculator
