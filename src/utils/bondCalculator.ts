export interface BondCalculationInput {
  homePrice: number;
  downPayment: number;
  annualInterestRate: number;
  loanTermYears: number;
}

export interface BondCalculationResult {
  monthlyRepayment: number;
  loanAmount: number;
  totalInterest: number;
  totalPayable: number;
}

const zarFormatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-ZA");

const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export const formatZar = (value: number) => zarFormatter.format(Number.isFinite(value) ? value : 0);

export const formatWholeNumberInput = (value: string) => {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return numberFormatter.format(Number(digits));
};

export const formatDecimalInput = (value: string, decimals = 2) => {
  const sanitized = value.replace(",", ".").replace(/[^\d.]/g, "");
  const [wholePart = "", ...rest] = sanitized.split(".");
  const decimalPart = rest.join("").slice(0, decimals);

  if (!wholePart && !decimalPart) return "";
  if (sanitized.endsWith(".") && !decimalPart) return `${wholePart}.`;
  return decimalPart ? `${wholePart}.${decimalPart}` : wholePart;
};

export const parseFormattedNumber = (value: string) => {
  const normalized = value.replace(/[^\d.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const calculateBondResults = ({
  homePrice,
  downPayment,
  annualInterestRate,
  loanTermYears,
}: BondCalculationInput): BondCalculationResult => {
  const principal = Math.max(homePrice - downPayment, 0);
  const months = Math.max(Math.round(loanTermYears * 12), 0);
  const monthlyRate = Math.max(annualInterestRate, 0) / 100 / 12;

  if (principal <= 0 || months <= 0) {
    return {
      monthlyRepayment: 0,
      loanAmount: roundMoney(principal),
      totalInterest: 0,
      totalPayable: roundMoney(principal),
    };
  }

  if (monthlyRate === 0) {
    const monthlyRepayment = principal / months;
    return {
      monthlyRepayment: roundMoney(monthlyRepayment),
      loanAmount: roundMoney(principal),
      totalInterest: 0,
      totalPayable: roundMoney(principal),
    };
  }

  const factor = Math.pow(1 + monthlyRate, months);
  const monthlyRepayment = principal * (monthlyRate * factor) / (factor - 1);
  const totalPayable = monthlyRepayment * months;
  const totalInterest = totalPayable - principal;

  return {
    monthlyRepayment: roundMoney(monthlyRepayment),
    loanAmount: roundMoney(principal),
    totalInterest: roundMoney(totalInterest),
    totalPayable: roundMoney(totalPayable),
  };
};

export const formatPercent = (value: number) =>
  `${(Number.isFinite(value) ? value : 0).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;

// ── Property ROI ───────────────────────────────────────────────────────────
export interface RoiInput {
  purchasePrice: number;
  annualGrossIncome: number;
  annualExpenses: number;
  cashInvested: number; // total cash put in (deposit + costs); falls back to purchase price
}

export interface RoiResult {
  netOperatingIncome: number; // NOI
  capRate: number;            // NOI / purchase price
  roi: number;                // NOI / cash invested
}

export const calculateRoi = ({ purchasePrice, annualGrossIncome, annualExpenses, cashInvested }: RoiInput): RoiResult => {
  const noi = annualGrossIncome - annualExpenses;
  const base = cashInvested > 0 ? cashInvested : purchasePrice;
  return {
    netOperatingIncome: roundMoney(noi),
    capRate: purchasePrice > 0 ? roundMoney((noi / purchasePrice) * 100) : 0,
    roi: base > 0 ? roundMoney((noi / base) * 100) : 0,
  };
};

// ── Rental yield ─────────────────────────────────────────────────────────────
export interface RentalYieldInput {
  propertyValue: number;
  monthlyRental: number;
  annualExpenses: number;
}

export interface RentalYieldResult {
  annualRentalIncome: number;
  grossYield: number;
  netYield: number;
}

export const calculateRentalYield = ({ propertyValue, monthlyRental, annualExpenses }: RentalYieldInput): RentalYieldResult => {
  const annualRent = monthlyRental * 12;
  return {
    annualRentalIncome: roundMoney(annualRent),
    grossYield: propertyValue > 0 ? roundMoney((annualRent / propertyValue) * 100) : 0,
    netYield: propertyValue > 0 ? roundMoney(((annualRent - annualExpenses) / propertyValue) * 100) : 0,
  };
};
