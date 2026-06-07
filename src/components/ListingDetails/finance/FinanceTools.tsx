"use client";

import { useState } from "react";
import SideDrawer from "./SideDrawer";
import {
  CommercialBondCalculator,
  RoiCalculator,
  RentalYieldCalculator,
  ValuationRequestForm,
  type FinanceDefaults,
} from "./calculators";

type ToolKey = "bond" | "roi" | "yield" | "valuation";

interface Tool {
  key: ToolKey;
  title: string;
  desc: string;
  icon: string;
  subtitle: string;
}

const TOOLS: Tool[] = [
  { key: "bond", title: "Commercial Bond Calculator", desc: "Estimate monthly repayments", icon: "bi-bank", subtitle: "Estimate repayments on a commercial bond for this property." },
  { key: "roi", title: "Property ROI Calculator", desc: "Net income, cap rate & return", icon: "bi-graph-up-arrow", subtitle: "Calculate the return on investment for this property." },
  { key: "yield", title: "Rental Yield Calculator", desc: "Gross & net rental yield", icon: "bi-percent", subtitle: "Work out the rental yield for this property." },
  { key: "valuation", title: "Property Valuation Request", desc: "Get a professional valuation", icon: "bi-clipboard-data", subtitle: "Request a professional market valuation from our team." },
];

const FinanceTools = ({ property, categoryLabel }: { property: any; categoryLabel: string }) => {
  const [active, setActive] = useState<ToolKey | null>(null);

  const cd = property.categoryDetails || {};
  const price = Number(property.price) || 0;
  const sizeSqm = Number(cd.size ?? cd.gla ?? cd.sqm ?? 0) || 0;
  const rentalPerM2 = Number(cd.rentalPerM2 ?? 0) || 0;
  const monthlyRental = rentalPerM2 > 0 && sizeSqm > 0 ? Math.round(rentalPerM2 * sizeSqm) : 0;
  const address = [property.suburb, property.city, property.province].filter(Boolean).join(", ");

  const defaults: FinanceDefaults = {
    title: property.title || "this property",
    reference: property.referenceNumber || "",
    categoryLabel,
    address,
    price,
    sizeSqm,
    monthlyRental,
  };

  const activeTool = TOOLS.find((t) => t.key === active) || null;

  return (
    <div style={cardStyle}>
      <div style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 8 }}>
        Finance
      </div>
      <h4 style={{ color: "#0f172a", fontSize: 22, marginBottom: 6 }}>Finance tools</h4>
      <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.55, marginBottom: 18 }}>
        Run the numbers on this property. Tap a tool to open the calculator.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {TOOLS.map((tool) => (
          <button key={tool.key} type="button" onClick={() => setActive(tool.key)} style={toolButtonStyle}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0f172a"; e.currentTarget.style.background = "#f8fafc"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e7edf3"; e.currentTarget.style.background = "#fff"; }}
          >
            <span style={iconWrapStyle}><i className={`bi ${tool.icon}`} style={{ fontSize: 18 }} /></span>
            <span style={{ flex: 1, textAlign: "left" }}>
              <span style={{ display: "block", color: "#0f172a", fontSize: 14.5, fontWeight: 700, lineHeight: 1.3 }}>{tool.title}</span>
              <span style={{ display: "block", color: "#64748b", fontSize: 12.5, marginTop: 2 }}>{tool.desc}</span>
            </span>
            <i className="bi bi-chevron-right" style={{ color: "#94a3b8", fontSize: 14 }} />
          </button>
        ))}
      </div>

      <SideDrawer
        open={active !== null}
        title={activeTool?.title || ""}
        subtitle={activeTool?.subtitle}
        onClose={() => setActive(null)}
      >
        {active === "bond" && <CommercialBondCalculator defaults={defaults} />}
        {active === "roi" && <RoiCalculator defaults={defaults} />}
        {active === "yield" && <RentalYieldCalculator defaults={defaults} />}
        {active === "valuation" && <ValuationRequestForm defaults={defaults} />}
      </SideDrawer>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  borderRadius: 22, border: "1px solid #e7edf3", background: "#fff",
  padding: "24px 24px 26px", boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
};
const toolButtonStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 14, width: "100%",
  padding: "14px 16px", borderRadius: 14, border: "1px solid #e7edf3",
  background: "#fff", cursor: "pointer", transition: "border-color 0.15s, background 0.15s",
};
const iconWrapStyle: React.CSSProperties = {
  flexShrink: 0, width: 42, height: 42, borderRadius: 12,
  background: "#0f172a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
};

export default FinanceTools;
