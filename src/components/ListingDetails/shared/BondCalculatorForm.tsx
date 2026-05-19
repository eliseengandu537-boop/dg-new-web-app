"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { submitBondLead } from "@/utils/dashboardApi";
import {
  calculateBondResults,
  formatDecimalInput,
  formatWholeNumberInput,
  formatZar,
  parseFormattedNumber,
} from "@/utils/bondCalculator";

interface Props {
  rounded?: boolean;
  sourceContext?: string;
  compact?: boolean;
}

interface SubmissionState {
  type: "success" | "error";
  message: string;
}

const resultCards = [
  { key: "monthlyRepayment", label: "Monthly repayment" },
  { key: "loanAmount", label: "Total loan amount" },
  { key: "totalInterest", label: "Total interest" },
  { key: "totalPayable", label: "Total amount payable" },
] as const;

const BondCalculatorForm = ({ rounded = true, sourceContext, compact = false }: Props) => {
  const pathname = usePathname();
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTermYears, setLoanTermYears] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const homePriceValue = parseFormattedNumber(homePrice);
  const downPaymentValue = parseFormattedNumber(downPayment);
  const interestRateValue = parseFormattedNumber(interestRate);
  const loanTermValue = parseFormattedNumber(loanTermYears);

  const results = calculateBondResults({
    homePrice: homePriceValue,
    downPayment: downPaymentValue,
    annualInterestRate: interestRateValue,
    loanTermYears: loanTermValue,
  });
  const canRevealResults = Boolean(fullName.trim() && phone.trim() && email.trim());

  const inputClassName = `type-input ${rounded ? "" : "rounded-0"}`.trim();
  const buttonClassName = `btn-five text-uppercase sm w-100 mb-10 ${rounded ? "rounded-3" : "rounded-0"}`.trim();
  const leadSource = sourceContext ? `Bond Calculator - ${sourceContext}` : `Bond Calculator - ${pathname}`;
  const fieldSpacing = compact ? 14 : 25;
  const finalFieldSpacing = compact ? 14 : 20;
  const inputStyle = compact ? compactInputStyle : undefined;
  const labelStyle = compact ? compactLabelStyle : undefined;
  const buttonStyle = compact ? compactButtonStyle : undefined;
  const activeResultsGridStyle = compact ? { ...resultsGridStyle, gap: 10, marginBottom: 16 } : resultsGridStyle;
  const activeResultCardStyle = compact ? { ...resultCardStyle, padding: "12px 14px" } : resultCardStyle;
  const activeResultLabelStyle = compact ? { ...resultLabelStyle, fontSize: 11, marginBottom: 6 } : resultLabelStyle;
  const activeResultValueStyle = compact ? { ...resultValueStyle, fontSize: 16 } : resultValueStyle;
  const activeLockedResultsStyle = compact ? { ...lockedResultsStyle, marginBottom: 16, padding: "12px 14px", fontSize: 12, lineHeight: 1.5 } : lockedResultsStyle;
  const activeLeadSectionStyle = compact ? { ...leadSectionStyle, paddingTop: 0 } : leadSectionStyle;

  const clearFeedback = () => {
    if (submissionState) setSubmissionState(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearFeedback();

    if (!fullName.trim()) {
      setSubmissionState({ type: "error", message: "Full name is required." });
      return;
    }

    if (!phone.trim()) {
      setSubmissionState({ type: "error", message: "Phone number is required." });
      return;
    }

    if (!email.trim()) {
      setSubmissionState({ type: "error", message: "Email is required." });
      return;
    }

    if (homePriceValue <= 0 || interestRateValue <= 0 || loanTermValue <= 0) {
      setSubmissionState({
        type: "error",
        message: "Enter a valid home price, interest rate, and loan term.",
      });
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitBondLead({
        leadType: "bond_calculator",
        name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        source: leadSource,
        homePrice: homePriceValue,
        deposit: downPaymentValue,
        interestRate: interestRateValue,
        loanTermYears: loanTermValue,
        monthlyRepayment: results.monthlyRepayment,
        loanAmount: results.loanAmount,
        totalInterest: results.totalInterest,
        totalPayable: results.totalPayable,
        status: "new",
      });

      setSubmissionState({
        type: "success",
        message: "Bond lead saved successfully. Our team will contact you soon.",
      });
      setFullName("");
      setPhone("");
      setEmail("");
    } catch {
      setSubmissionState({
        type: "error",
        message: "We could not save your bond lead right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-box-three" style={{ marginBottom: fieldSpacing }}>
        <div className="label" style={labelStyle}>Home Price*</div>
        <input
          type="text"
          inputMode="numeric"
          value={homePrice}
          onChange={(event) => {
            clearFeedback();
            setHomePrice(formatWholeNumberInput(event.target.value));
          }}
          placeholder="1 320 000"
          className={inputClassName}
          style={inputStyle}
        />
      </div>

      <div className="input-box-three" style={{ marginBottom: fieldSpacing }}>
        <div className="label" style={labelStyle}>Down Payment*</div>
        <input
          type="text"
          inputMode="numeric"
          value={downPayment}
          onChange={(event) => {
            clearFeedback();
            setDownPayment(formatWholeNumberInput(event.target.value));
          }}
          placeholder="100 000"
          className={inputClassName}
          style={inputStyle}
        />
      </div>

      <div className="input-box-three" style={{ marginBottom: fieldSpacing }}>
        <div className="label" style={labelStyle}>Interest Rate*</div>
        <input
          type="text"
          inputMode="decimal"
          value={interestRate}
          onChange={(event) => {
            clearFeedback();
            setInterestRate(formatDecimalInput(event.target.value));
          }}
          placeholder="11.75"
          className={inputClassName}
          style={inputStyle}
        />
      </div>

      <div className="input-box-three" style={{ marginBottom: fieldSpacing }}>
        <div className="label" style={labelStyle}>Loan Term (Years)*</div>
        <input
          type="text"
          inputMode="numeric"
          value={loanTermYears}
          onChange={(event) => {
            clearFeedback();
            setLoanTermYears(event.target.value.replace(/[^\d]/g, ""));
          }}
          placeholder="20"
          className={inputClassName}
          style={inputStyle}
        />
      </div>

      <div style={activeLeadSectionStyle}>
        <div className="input-box-three" style={{ marginBottom: fieldSpacing }}>
          <div className="label" style={labelStyle}>Full name*</div>
          <input
            type="text"
            value={fullName}
            onChange={(event) => {
              clearFeedback();
              setFullName(event.target.value);
            }}
            placeholder="Your full name"
            className={inputClassName}
            style={inputStyle}
          />
        </div>

        <div className="input-box-three" style={{ marginBottom: fieldSpacing }}>
          <div className="label" style={labelStyle}>Phone number*</div>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) => {
              clearFeedback();
              setPhone(event.target.value);
            }}
            placeholder="Your phone number"
            className={inputClassName}
            style={inputStyle}
          />
        </div>

        <div className="input-box-three" style={{ marginBottom: finalFieldSpacing }}>
          <div className="label" style={labelStyle}>Email*</div>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              clearFeedback();
              setEmail(event.target.value);
            }}
            placeholder="Enter email address"
            className={inputClassName}
            style={inputStyle}
          />
        </div>
      </div>

      {canRevealResults ? (
        <div style={activeResultsGridStyle}>
          {resultCards.map((card) => (
            <div key={card.key} style={activeResultCardStyle}>
              <div style={activeResultLabelStyle}>{card.label}</div>
              <div style={activeResultValueStyle}>{formatZar(results[card.key])}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={activeLockedResultsStyle}>
          Enter name, phone, and email to unlock the bond results.
        </div>
      )}

      {submissionState && (
        <div
          style={{
            ...feedbackStyle,
            background: submissionState.type === "success" ? "#f0fff4" : "#fff5f5",
            color: submissionState.type === "success" ? "#276749" : "#c53030",
            borderColor: submissionState.type === "success" ? "#9ae6b4" : "#feb2b2",
          }}
        >
          {submissionState.message}
        </div>
      )}

      <button type="submit" className={buttonClassName} style={buttonStyle} disabled={isSubmitting}>
        Save Bond Lead
      </button>
    </form>
  );
};

const resultsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 12,
  marginBottom: 24,
};

const resultCardStyle: React.CSSProperties = {
  padding: "16px 18px",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: 14,
  background: "#f8f8f8",
};

const resultLabelStyle: React.CSSProperties = {
  fontSize: 13,
  color: "rgba(0,0,0,0.6)",
  marginBottom: 8,
  lineHeight: 1.4,
};

const resultValueStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "#000",
  lineHeight: 1.3,
};

const lockedResultsStyle: React.CSSProperties = {
  marginBottom: 24,
  padding: "16px 18px",
  border: "1px dashed rgba(0,0,0,0.14)",
  borderRadius: 14,
  background: "#fafafa",
  color: "rgba(0,0,0,0.62)",
  fontSize: 13,
  lineHeight: 1.7,
};

const leadSectionStyle: React.CSSProperties = {
  paddingTop: 8,
};

const compactLabelStyle: React.CSSProperties = {
  fontSize: 12,
  marginBottom: 6,
};

const compactInputStyle: React.CSSProperties = {
  height: 42,
  fontSize: 14,
  padding: "0 12px",
  borderRadius: 8,
};

const compactButtonStyle: React.CSSProperties = {
  minWidth: 0,
  lineHeight: "46px",
  fontSize: 12,
  padding: "0 20px",
  letterSpacing: 0.8,
};

const feedbackStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid transparent",
  marginBottom: 16,
};

export default BondCalculatorForm;
