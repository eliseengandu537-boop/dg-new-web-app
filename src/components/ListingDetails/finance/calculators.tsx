"use client";

import { useState } from "react";
import {
  calculateBondResults,
  calculateRoi,
  calculateRentalYield,
  formatZar,
  formatPercent,
  parseFormattedNumber,
} from "@/utils/bondCalculator";
import { submitCalculatorLead } from "@/utils/dashboardApi";
import {
  FinanceField,
  ResultCard,
  ContactFields,
  LeadSubmit,
  useLeadCapture,
  resultsGridStyle,
  sectionTitleStyle,
  sectionLeadStyle,
  primaryButtonStyle,
  dividerStyle,
} from "./financeShared";

export interface FinanceDefaults {
  title: string;
  reference: string;
  categoryLabel: string;
  address: string;
  price: number;
  sizeSqm: number;
  monthlyRental: number; // estimated/asking monthly rental if known
}

const ResultsBlock = ({ children }: { children: React.ReactNode }) => (
  <div style={{ ...resultsGridStyle, marginTop: 18, marginBottom: 4 }}>{children}</div>
);

const propertyTag = (d: FinanceDefaults) =>
  `${d.title}${d.reference ? ` (${d.reference})` : ""}`;

// ── Commercial Bond Calculator ───────────────────────────────────────────────
export const CommercialBondCalculator = ({ defaults }: { defaults: FinanceDefaults }) => {
  const lead = useLeadCapture();
  const [price, setPrice] = useState(defaults.price ? defaults.price.toLocaleString("en-ZA") : "");
  const [deposit, setDeposit] = useState("");
  const [rate, setRate] = useState("11.75");
  const [term, setTerm] = useState("20");

  const r = calculateBondResults({
    homePrice: parseFormattedNumber(price),
    downPayment: parseFormattedNumber(deposit),
    annualInterestRate: parseFormattedNumber(rate),
    loanTermYears: parseFormattedNumber(term),
  });

  return (
    <div>
      <div style={sectionTitleStyle}>Repayment estimate</div>
      <p style={sectionLeadStyle}>Estimate monthly repayments on a commercial bond for this property.</p>

      <FinanceField label="Property price" value={price} onChange={setPrice} placeholder="1 320 000" format="money" suffix="R" />
      <FinanceField label="Deposit" value={deposit} onChange={setDeposit} placeholder="100 000" format="money" suffix="R" />
      <FinanceField label="Interest rate" value={rate} onChange={setRate} placeholder="11.75" format="decimal" suffix="%" />
      <FinanceField label="Loan term" value={term} onChange={setTerm} placeholder="20" format="integer" suffix="yrs" />

      <ContactFields lead={lead} />

      <LeadSubmit
        lead={lead}
        leadType="commercial_bond_calculator"
        source={`Commercial Bond Calculator - ${propertyTag(defaults)}`}
        ctaLabel="Calculate"
        buildPayload={() => ({
          homePrice: parseFormattedNumber(price),
          deposit: parseFormattedNumber(deposit),
          interestRate: parseFormattedNumber(rate),
          loanTermYears: parseFormattedNumber(term),
          monthlyRepayment: r.monthlyRepayment,
          loanAmount: r.loanAmount,
          totalInterest: r.totalInterest,
          totalPayable: r.totalPayable,
          notes: `Commercial bond enquiry for ${propertyTag(defaults)}. Price ${formatZar(parseFormattedNumber(price))}, deposit ${formatZar(parseFormattedNumber(deposit))}, ${rate}% over ${term} yrs → ${formatZar(r.monthlyRepayment)}/month.`,
        })}
      />

      {lead.revealed && (
        <ResultsBlock>
          <ResultCard label="Monthly repayment" value={formatZar(r.monthlyRepayment)} highlight />
          <ResultCard label="Loan amount" value={formatZar(r.loanAmount)} />
          <ResultCard label="Total interest" value={formatZar(r.totalInterest)} />
          <ResultCard label="Total payable" value={formatZar(r.totalPayable)} />
        </ResultsBlock>
      )}
    </div>
  );
};

// ── Property ROI Calculator ──────────────────────────────────────────────────
export const RoiCalculator = ({ defaults }: { defaults: FinanceDefaults }) => {
  const lead = useLeadCapture();
  const [price, setPrice] = useState(defaults.price ? defaults.price.toLocaleString("en-ZA") : "");
  const [income, setIncome] = useState(defaults.monthlyRental ? (defaults.monthlyRental * 12).toLocaleString("en-ZA") : "");
  const [expenses, setExpenses] = useState("");
  const [cash, setCash] = useState("");

  const r = calculateRoi({
    purchasePrice: parseFormattedNumber(price),
    annualGrossIncome: parseFormattedNumber(income),
    annualExpenses: parseFormattedNumber(expenses),
    cashInvested: parseFormattedNumber(cash),
  });

  return (
    <div>
      <div style={sectionTitleStyle}>Return on investment</div>
      <p style={sectionLeadStyle}>See the net operating income, cap rate and cash-on-cash return for this property.</p>

      <FinanceField label="Purchase price" value={price} onChange={setPrice} placeholder="5 000 000" format="money" suffix="R" />
      <FinanceField label="Annual gross income" value={income} onChange={setIncome} placeholder="600 000" format="money" suffix="R" />
      <FinanceField label="Annual operating expenses" value={expenses} onChange={setExpenses} placeholder="120 000" format="money" suffix="R" />
      <FinanceField label="Total cash invested (optional)" value={cash} onChange={setCash} placeholder="Deposit + costs" format="money" suffix="R" />

      <ContactFields lead={lead} />

      <LeadSubmit
        lead={lead}
        leadType="roi_calculator"
        source={`Property ROI Calculator - ${propertyTag(defaults)}`}
        ctaLabel="Calculate"
        buildPayload={() => ({
          homePrice: parseFormattedNumber(price),
          notes: `ROI enquiry for ${propertyTag(defaults)}. Price ${formatZar(parseFormattedNumber(price))}, gross income ${formatZar(parseFormattedNumber(income))}, expenses ${formatZar(parseFormattedNumber(expenses))} → NOI ${formatZar(r.netOperatingIncome)}, cap rate ${formatPercent(r.capRate)}, ROI ${formatPercent(r.roi)}.`,
        })}
      />

      {lead.revealed && (
        <ResultsBlock>
          <ResultCard label="ROI (cash-on-cash)" value={formatPercent(r.roi)} highlight />
          <ResultCard label="Cap rate" value={formatPercent(r.capRate)} />
          <ResultCard label="Net operating income" value={formatZar(r.netOperatingIncome)} />
        </ResultsBlock>
      )}
    </div>
  );
};

// ── Rental Yield Calculator ──────────────────────────────────────────────────
export const RentalYieldCalculator = ({ defaults }: { defaults: FinanceDefaults }) => {
  const lead = useLeadCapture();
  const [value, setValue] = useState(defaults.price ? defaults.price.toLocaleString("en-ZA") : "");
  const [rent, setRent] = useState(defaults.monthlyRental ? defaults.monthlyRental.toLocaleString("en-ZA") : "");
  const [expenses, setExpenses] = useState("");

  const r = calculateRentalYield({
    propertyValue: parseFormattedNumber(value),
    monthlyRental: parseFormattedNumber(rent),
    annualExpenses: parseFormattedNumber(expenses),
  });

  return (
    <div>
      <div style={sectionTitleStyle}>Rental yield</div>
      <p style={sectionLeadStyle}>Work out the gross and net rental yield based on the property value and monthly rent.</p>

      <FinanceField label="Property value" value={value} onChange={setValue} placeholder="5 000 000" format="money" suffix="R" />
      <FinanceField label="Monthly rental" value={rent} onChange={setRent} placeholder="45 000" format="money" suffix="R" />
      <FinanceField label="Annual expenses (optional)" value={expenses} onChange={setExpenses} placeholder="60 000" format="money" suffix="R" />

      <ContactFields lead={lead} />

      <LeadSubmit
        lead={lead}
        leadType="rental_yield_calculator"
        source={`Rental Yield Calculator - ${propertyTag(defaults)}`}
        ctaLabel="Calculate"
        buildPayload={() => ({
          homePrice: parseFormattedNumber(value),
          notes: `Rental yield enquiry for ${propertyTag(defaults)}. Value ${formatZar(parseFormattedNumber(value))}, rent ${formatZar(parseFormattedNumber(rent))}/month → gross ${formatPercent(r.grossYield)}, net ${formatPercent(r.netYield)}.`,
        })}
      />

      {lead.revealed && (
        <ResultsBlock>
          <ResultCard label="Gross yield" value={formatPercent(r.grossYield)} highlight />
          <ResultCard label="Net yield" value={formatPercent(r.netYield)} />
          <ResultCard label="Annual rental income" value={formatZar(r.annualRentalIncome)} />
        </ResultsBlock>
      )}
    </div>
  );
};

// ── Property Valuation Request Form ──────────────────────────────────────────
export const ValuationRequestForm = ({ defaults }: { defaults: FinanceDefaults }) => {
  const [propertyType, setPropertyType] = useState(defaults.categoryLabel || "");
  const [size, setSize] = useState(defaults.sizeSqm ? String(defaults.sizeSqm) : "");
  const [location, setLocation] = useState(defaults.address || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const submit = async () => {
    setFeedback(null);
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setFeedback({ type: "error", message: "Please enter your name, phone and email." });
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    try {
      await submitCalculatorLead({
        leadType: "valuation_request",
        source: `Property Valuation Request - ${propertyTag(defaults)}`,
        status: "new",
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        interestedCategory: propertyType.trim() || null,
        notes: `Valuation request. Type: ${propertyType || "—"}, size: ${size || "—"} m², location: ${location || "—"}. Reference listing: ${propertyTag(defaults)}.${message.trim() ? ` Message: ${message.trim()}` : ""}`,
      });
      setFeedback({ type: "success", message: "Valuation request sent — our team will be in touch shortly." });
      setName(""); setPhone(""); setEmail(""); setMessage("");
    } catch {
      setFeedback({ type: "error", message: "We couldn't send your request right now. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div style={sectionTitleStyle}>Request a valuation</div>
      <p style={sectionLeadStyle}>Tell us about the property and our team will prepare a professional market valuation.</p>

      <FinanceField label="Property type" value={propertyType} onChange={setPropertyType} placeholder="e.g. Retail / Office" />
      <FinanceField label="Approx. size" value={size} onChange={setSize} placeholder="500" format="integer" suffix="m²" />
      <FinanceField label="Location / address" value={location} onChange={setLocation} placeholder="Suburb, City" />

      <hr style={dividerStyle} />
      <div style={sectionTitleStyle}>Your details</div>
      <p style={sectionLeadStyle}>We&apos;ll use these to send your valuation.</p>
      <FinanceField label="Full name*" value={name} onChange={setName} placeholder="Your full name" />
      <FinanceField label="Phone number*" value={phone} onChange={setPhone} placeholder="Your phone number" format="tel" />
      <FinanceField label="Email*" value={email} onChange={setEmail} placeholder="Enter email address" format="email" />
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#334155", marginBottom: 6 }}>Message (optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Anything else we should know?"
          style={{ width: "100%", padding: "10px 14px", fontSize: 14, border: "1px solid #e2e8f0", borderRadius: 10, outline: "none", boxSizing: "border-box", resize: "vertical", color: "#0f172a" }}
        />
      </div>

      {feedback && (
        <div style={{
          fontSize: 13, fontWeight: 500, padding: "11px 14px", borderRadius: 10, border: "1px solid transparent", marginBottom: 14,
          background: feedback.type === "success" ? "#f0fff4" : "#fff5f5",
          color: feedback.type === "success" ? "#276749" : "#c53030",
          borderColor: feedback.type === "success" ? "#9ae6b4" : "#feb2b2",
        }}>
          {feedback.message}
        </div>
      )}
      <button type="button" style={primaryButtonStyle} onClick={submit} disabled={submitting}>
        {submitting ? "Sending..." : "Request valuation"}
      </button>
    </div>
  );
};
