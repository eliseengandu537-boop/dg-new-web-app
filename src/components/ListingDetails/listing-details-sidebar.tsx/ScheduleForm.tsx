"use client";

import { FormEvent, useState } from "react";
import { submitPublicInquiry } from "@/utils/dashboardApi";

interface Props {
  propertyId?: number;
  propertyTitle?: string;
}

type SubmissionState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 14,
  border: "1px solid #d7dfd1",
  background: "#fbfcfa",
  padding: "13px 15px",
  fontSize: 14,
  color: "#1f2937",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1,
  textTransform: "uppercase",
  color: "#6b7280",
  marginBottom: 8,
};

const ScheduleForm = ({ propertyId, propertyTitle }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetFeedback = () => {
    if (submissionState) setSubmissionState(null);
  };

  const defaultMessage = propertyTitle
    ? `Hello, I would like more information about ${propertyTitle}.`
    : "Hello, I would like more information about this property.";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetFeedback();

    if (!name.trim() || !email.trim()) {
      setSubmissionState({ type: "error", message: "Please enter your name and email address." });
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitPublicInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: (message.trim() || defaultMessage),
        propertyId,
      });

      setSubmissionState({
        type: "success",
        message: "Your enquiry has been sent. A DG Property advisor will reach out soon.",
      });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setSubmissionState({
        type: "error",
        message: "We could not send your enquiry right now. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle}>Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(event) => {
            resetFeedback();
            setName(event.target.value);
          }}
          placeholder="Your full name"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle}>Your Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => {
            resetFeedback();
            setEmail(event.target.value);
          }}
          placeholder="Enter email address"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle}>Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(event) => {
            resetFeedback();
            setPhone(event.target.value);
          }}
          placeholder="Your phone number"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle}>Message</label>
        <textarea
          value={message}
          onChange={(event) => {
            resetFeedback();
            setMessage(event.target.value);
          }}
          placeholder={defaultMessage}
          rows={5}
          style={{ ...inputStyle, resize: "vertical", minHeight: 140 }}
        />
      </div>

      {submissionState && (
        <div
          style={{
            marginBottom: 16,
            padding: "12px 14px",
            borderRadius: 14,
            border: `1px solid ${submissionState.type === "success" ? "#b7dfc1" : "#f4b6b6"}`,
            background: submissionState.type === "success" ? "#f3fbf4" : "#fff5f5",
            color: submissionState.type === "success" ? "#2e5f42" : "#c53030",
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          {submissionState.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: "100%",
          border: "none",
          borderRadius: 999,
          padding: "14px 18px",
          background: "linear-gradient(135deg, #7a8561 0%, #5d6847 100%)",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: "uppercase",
          boxShadow: "0 18px 30px rgba(93,104,71,0.18)",
        }}
      >
        {isSubmitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
};

export default ScheduleForm;
