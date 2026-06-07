"use client";

import { useState } from "react";
import { submitCalculatorLead } from "@/utils/dashboardApi";
import {
  formatDecimalInput,
  formatWholeNumberInput,
} from "@/utils/bondCalculator";

// ── Shared styles ────────────────────────────────────────────────────────────
export const fieldWrapStyle: React.CSSProperties = { marginBottom: 16 };
export const labelStyle: React.CSSProperties = { display: "block", fontSize: 12.5, fontWeight: 600, color: "#334155", marginBottom: 6 };
export const inputStyle: React.CSSProperties = {
  width: "100%", height: 44, padding: "0 14px", fontSize: 14,
  border: "1px solid #e2e8f0", borderRadius: 10, outline: "none", boxSizing: "border-box", color: "#0f172a",
};
export const helperTextStyle: React.CSSProperties = { fontSize: 12, color: "#94a3b8", marginTop: 6, lineHeight: 1.5 };
export const dividerStyle: React.CSSProperties = { border: "none", borderTop: "1px solid #eef2f7", margin: "22px 0 18px" };

export const resultsGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))", gap: 10, marginBottom: 4 };
const resultCardStyle: React.CSSProperties = { padding: "14px 16px", borderRadius: 12, background: "#f8fafc", border: "1px solid #eef2f7" };
const resultLabelStyle: React.CSSProperties = { fontSize: 11.5, color: "#64748b", marginBottom: 6, lineHeight: 1.4 };
const resultValueStyle: React.CSSProperties = { fontSize: 18, fontWeight: 800, color: "#0f172a", lineHeight: 1.25 };

export const primaryButtonStyle: React.CSSProperties = {
  width: "100%", height: 48, border: "none", borderRadius: 10,
  background: "#0f172a", color: "#fff", fontSize: 14, fontWeight: 700, letterSpacing: 0.4,
  cursor: "pointer", textTransform: "uppercase",
};
const feedbackStyle: React.CSSProperties = { fontSize: 13, fontWeight: 500, padding: "11px 14px", borderRadius: 10, border: "1px solid transparent", marginBottom: 14 };
export const sectionTitleStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 };
export const sectionLeadStyle: React.CSSProperties = { fontSize: 13, color: "#64748b", marginBottom: 14, lineHeight: 1.55 };

// ── Result card ──────────────────────────────────────────────────────────────
export const ResultCard = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div style={highlight ? { ...resultCardStyle, background: "#0f172a", borderColor: "#0f172a" } : resultCardStyle}>
    <div style={highlight ? { ...resultLabelStyle, color: "rgba(255,255,255,0.7)" } : resultLabelStyle}>{label}</div>
    <div style={highlight ? { ...resultValueStyle, color: "#fff" } : resultValueStyle}>{value}</div>
  </div>
);

// ── Field ────────────────────────────────────────────────────────────────────
type FieldFormat = "money" | "decimal" | "integer" | "text" | "tel" | "email";

export const FinanceField = ({
  label, value, onChange, placeholder, format = "text", suffix,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; format?: FieldFormat; suffix?: string;
}) => {
  const handle = (raw: string) => {
    if (format === "money") return onChange(formatWholeNumberInput(raw));
    if (format === "decimal") return onChange(formatDecimalInput(raw));
    if (format === "integer") return onChange(raw.replace(/[^\d]/g, ""));
    return onChange(raw);
  };
  const inputMode =
    format === "money" || format === "integer" ? "numeric"
      : format === "decimal" ? "decimal"
        : format === "tel" ? "tel" : undefined;
  const type = format === "email" ? "email" : format === "tel" ? "tel" : "text";

  return (
    <div style={fieldWrapStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handle(e.target.value)}
          style={suffix ? { ...inputStyle, paddingRight: 46 } : inputStyle}
        />
        {suffix && (
          <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 13, fontWeight: 600 }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

const lockedNoteStyle: React.CSSProperties = {
  marginTop: 18, padding: "14px 16px", border: "1px dashed #cbd5e1", borderRadius: 12,
  background: "#f8fafc", color: "#64748b", fontSize: 13, lineHeight: 1.6,
  display: "flex", alignItems: "center", gap: 10,
};

// Locked placeholder shown in place of the results until contact details are filled.
export const LockedResults = ({ message }: { message?: string }) => (
  <div style={lockedNoteStyle}>
    <i className="bi bi-lock-fill" style={{ fontSize: 16, color: "#94a3b8", flexShrink: 0 }} />
    <span>{message || "Enter your name, phone and email below to reveal the results."}</span>
  </div>
);

// ── Lead capture hook + UI ───────────────────────────────────────────────────
// Manages the contact fields and submission. Results stay hidden until
// `canReveal` is true (name + phone + email all filled in).
export interface LeadCapture {
  name: string; phone: string; email: string;
  setName: (v: string) => void; setPhone: (v: string) => void; setEmail: (v: string) => void;
  hasContact: boolean; // all three fields filled
  revealed: boolean;   // Calculate pressed & lead saved → results unlocked
  submitting: boolean;
  feedback: { type: "success" | "error"; message: string } | null;
  setFeedback: (f: { type: "success" | "error"; message: string } | null) => void;
  submit: (opts: { leadType: string; source: string; buildPayload: () => Record<string, any> }) => Promise<void>;
}

export const useLeadCapture = (): LeadCapture => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const hasContact = Boolean(name.trim() && phone.trim() && email.trim());

  const submit: LeadCapture["submit"] = async ({ leadType, source, buildPayload }) => {
    setFeedback(null);
    if (!hasContact) {
      setFeedback({ type: "error", message: "Please enter your name, phone and email to calculate." });
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    try {
      await submitCalculatorLead({
        leadType, source, status: "new",
        name: name.trim(), phone: phone.trim(), email: email.trim(),
        ...buildPayload(),
      });
      // Their details are now with the admin — unlock the results.
      setRevealed(true);
      setFeedback({ type: "success", message: "Thank you — your details have been sent to our team. Here are your results." });
    } catch {
      setFeedback({ type: "error", message: "We couldn't send your details right now. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return { name, phone, email, setName, setPhone, setEmail, hasContact, revealed, submitting, feedback, setFeedback, submit };
};

// The contact fields block — required before results are shown.
export const ContactFields = ({ lead, intro }: { lead: LeadCapture; intro?: string }) => (
  <div>
    <hr style={dividerStyle} />
    <div style={sectionTitleStyle}>Enter your details to view the results</div>
    <p style={sectionLeadStyle}>{intro || "Add your contact details to unlock the results — a commercial specialist will follow up with you."}</p>
    <FinanceField label="Full name*" value={lead.name} onChange={lead.setName} placeholder="Your full name" />
    <FinanceField label="Phone number*" value={lead.phone} onChange={lead.setPhone} placeholder="Your phone number" format="tel" />
    <FinanceField label="Email*" value={lead.email} onChange={lead.setEmail} placeholder="Enter email address" format="email" />
  </div>
);

// "Calculate" button + feedback. Pressing it sends the visitor's details to the
// admin and unlocks the results. Hidden once results are revealed (results then
// update live as inputs change, so no duplicate leads are created).
export const LeadSubmit = ({
  lead, leadType, source, buildPayload, ctaLabel = "Calculate",
}: {
  lead: LeadCapture; leadType: string; source: string; ctaLabel?: string;
  buildPayload: () => Record<string, any>;
}) => (
  <div style={{ marginTop: 18 }}>
    {lead.feedback && (
      <div style={{
        ...feedbackStyle,
        background: lead.feedback.type === "success" ? "#f0fff4" : "#fff5f5",
        color: lead.feedback.type === "success" ? "#276749" : "#c53030",
        borderColor: lead.feedback.type === "success" ? "#9ae6b4" : "#feb2b2",
      }}>
        {lead.feedback.message}
      </div>
    )}
    {!lead.revealed && (
      <button
        type="button"
        style={lead.hasContact ? primaryButtonStyle : { ...primaryButtonStyle, opacity: 0.55, cursor: "not-allowed" }}
        onClick={() => lead.submit({ leadType, source, buildPayload })}
        disabled={lead.submitting || !lead.hasContact}
      >
        {lead.submitting ? "Sending..." : ctaLabel}
      </button>
    )}
  </div>
);
