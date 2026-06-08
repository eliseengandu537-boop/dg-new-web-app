"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import { convertLeadToClient, fetchAllLeads, updateLead } from "@/utils/dashboardApi";
import { formatZar } from "@/utils/bondCalculator";

interface BondLead {
  id: number;
  leadType?: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  source?: string | null;
  status: string;
  notes?: string | null;
  homePrice?: number | null;
  deposit?: number | null;
  interestRate?: number | null;
  loanTermYears?: number | null;
  monthlyRepayment?: number | null;
  loanAmount?: number | null;
  totalInterest?: number | null;
  totalPayable?: number | null;
  convertedClientId?: number | null;
  createdAt: string;
}

type DateFilter = "all" | "today" | "7d" | "30d";

const STATUS_OPTIONS = ["new", "contacted", "qualified", "converted", "lost"];

const statusColors: Record<string, { bg: string; color: string }> = {
  new: { bg: "#ebf8ff", color: "#2b6cb0" },
  contacted: { bg: "#faf5ff", color: "#6b21a8" },
  qualified: { bg: "#f0fff4", color: "#276749" },
  converted: { bg: "#fffbeb", color: "#92400e" },
  lost: { bg: "#fff5f5", color: "#c53030" },
};

export default function BondLeadsPage() {
  const [leads, setLeads] = useState<BondLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [selectedLead, setSelectedLead] = useState<BondLead | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [convertingLeadId, setConvertingLeadId] = useState<number | null>(null);

  useEffect(() => {
    fetchAllLeads({ limit: 500 })
      .then((response) => {
        const list = Array.isArray(response.data) ? response.data : (response.data.leads || []);
        setLeads(list);
      })
      .catch(() => {
        setActionMessage({ type: "error", text: "Failed to load leads." });
      })
      .finally(() => setLoading(false));
  }, []);

  const sourceOptions = Array.from(new Set(leads.map((lead) => lead.source).filter(Boolean) as string[])).sort();

  const filteredLeads = leads.filter((lead) => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      [
        lead.name,
        lead.phone || "",
        lead.email || "",
        lead.source || "",
      ].some((value) => value.toLowerCase().includes(term));

    const matchesStatus = !statusFilter || lead.status === statusFilter;
    const matchesSource = !sourceFilter || lead.source === sourceFilter;
    const matchesDate = matchesDateFilter(lead.createdAt, dateFilter);

    return matchesSearch && matchesStatus && matchesSource && matchesDate;
  });

  const updateLeadInState = (updatedLead: BondLead) => {
    setLeads((current) => current.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)));
    setSelectedLead((current) => (current && current.id === updatedLead.id ? updatedLead : current));
  };

  const handleStatusUpdate = async (lead: BondLead, nextStatus: string) => {
    try {
      const response = await updateLead(lead.id, { status: nextStatus });
      updateLeadInState(response.data);
    } catch {
      setActionMessage({ type: "error", text: "Failed to update lead status." });
    }
  };

  const handleProfileSave = async () => {
    if (!selectedLead) return;

    setSavingProfile(true);
    try {
      const response = await updateLead(selectedLead.id, {
        name: selectedLead.name,
        phone: selectedLead.phone || null,
        email: selectedLead.email || null,
        notes: selectedLead.notes || null,
        status: selectedLead.status,
      });
      updateLeadInState(response.data);
      setActionMessage({ type: "success", text: "Lead profile updated." });
    } catch {
      setActionMessage({ type: "error", text: "Failed to update lead profile." });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleConvert = async (lead: BondLead) => {
    if (lead.convertedClientId || convertingLeadId === lead.id) return;

    setConvertingLeadId(lead.id);
    try {
      const response = await convertLeadToClient(lead.id);
      updateLeadInState(response.data.lead);
      setActionMessage({
        type: "success",
        text: response.data.created ? "Lead converted into a CRM client." : "Lead linked to an existing CRM client.",
      });
    } catch (error: any) {
      setActionMessage({
        type: "error",
        text: error?.response?.data?.error || "Failed to convert lead into a CRM client.",
      });
    } finally {
      setConvertingLeadId(null);
    }
  };

  const handleExport = () => {
    if (filteredLeads.length === 0) return;

    const headers = [
      "Name",
      "Phone",
      "Email",
      "Home Price",
      "Deposit",
      "Interest Rate",
      "Loan Term (Years)",
      "Monthly Repayment",
      "Loan Amount",
      "Total Interest",
      "Total Payable",
      "Status",
      "Date",
      "Lead Source",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.phone || "",
      lead.email || "",
      lead.homePrice ?? "",
      lead.deposit ?? "",
      lead.interestRate ?? "",
      lead.loanTermYears ?? "",
      lead.monthlyRepayment ?? "",
      lead.loanAmount ?? "",
      lead.totalInterest ?? "",
      lead.totalPayable ?? "",
      lead.status,
      dayjs(lead.createdAt).format("YYYY-MM-DD HH:mm"),
      lead.source || "",
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => escapeCsvValue(value)).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads-${dayjs().format("YYYYMMDD-HHmm")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <AdminHeader title="Leads" onMenuToggle={() => {}} />
      <main style={{ padding: "24px clamp(16px, 3vw, 28px)", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", margin: 0 }}>Leads</h2>
            <p style={{ color: "#718096", fontSize: 14, margin: "4px 0 0" }}>
              {filteredLeads.length} of {leads.length} leads
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={handleExport} style={primaryButtonStyle} disabled={filteredLeads.length === 0}>
              Export CSV
            </button>
          </div>
        </div>

        {actionMessage && (
          <div
            style={{
              marginBottom: 16,
              padding: "12px 14px",
              borderRadius: 10,
              border: `1px solid ${actionMessage.type === "success" ? "#9ae6b4" : "#feb2b2"}`,
              background: actionMessage.type === "success" ? "#f0fff4" : "#fff5f5",
              color: actionMessage.type === "success" ? "#276749" : "#c53030",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {actionMessage.text}
          </div>
        )}

        <div style={filtersWrapStyle}>
          <input
            placeholder="Search name, phone, email, or source"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{ ...filterInputStyle, minWidth: 260, flex: "1 1 260px" }}
          />

          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} style={filterInputStyle}>
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {toLabel(status)}
              </option>
            ))}
          </select>

          <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)} style={filterInputStyle}>
            <option value="">All sources</option>
            {sourceOptions.map((source) => (
              <option key={source} value={source}>
                {formatLeadSource(source)}
              </option>
            ))}
          </select>

          <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value as DateFilter)} style={filterInputStyle}>
            <option value="all">All time</option>
            <option value="today">Today</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>

        {loading ? (
          <div style={loadingStateStyle}>Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div style={emptyStateStyle}>No leads found for the current filters.</div>
        ) : (
          <div style={tableWrapStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 1280 }}>
              <thead>
                <tr style={{ background: "#f7fafc" }}>
                  {["Name", "Phone", "Email", "Home Price", "Deposit", "Rate", "Term", "Monthly", "Date", "Lead Source", "Status", "Actions"].map((heading) => (
                    <th key={heading} style={tableHeadingStyle}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: "1px solid #f0f4f8" }}>
                    <td style={tableCellStyle}>
                      <div style={{ fontWeight: 600, color: "#1a2332" }}>{lead.name}</div>
                      {lead.convertedClientId && (
                        <div style={{ fontSize: 12, color: "#2f855a", marginTop: 4 }}>
                          CRM client #{lead.convertedClientId}
                        </div>
                      )}
                    </td>
                    <td style={tableCellStyle}>{lead.phone || "N/A"}</td>
                    <td style={tableCellStyle}>{lead.email || "N/A"}</td>
                    <td style={tableCellStyle}>{formatZar(lead.homePrice || 0)}</td>
                    <td style={tableCellStyle}>{formatZar(lead.deposit || 0)}</td>
                    <td style={tableCellStyle}>{lead.interestRate ? `${lead.interestRate}%` : "N/A"}</td>
                    <td style={tableCellStyle}>{lead.loanTermYears ? `${lead.loanTermYears} yrs` : "N/A"}</td>
                    <td style={tableCellStyle}>
                      <div style={{ fontWeight: 600, color: "#1a2332" }}>{formatZar(lead.monthlyRepayment || 0)}</div>
                    </td>
                    <td style={tableCellStyle}>{dayjs(lead.createdAt).format("DD MMM YYYY")}</td>
                    <td style={tableCellStyle}>{formatLeadSource(lead.source)}</td>
                    <td style={tableCellStyle}>
                      <select
                        value={lead.status}
                        onChange={(event) => handleStatusUpdate(lead, event.target.value)}
                        style={{
                          ...statusSelectStyle,
                          background: statusColors[lead.status]?.bg || "#edf2f7",
                          color: statusColors[lead.status]?.color || "#4a5568",
                        }}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {toLabel(status)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setSelectedLead({ ...lead })} style={secondaryButtonStyle}>
                          View
                        </button>
                        <button
                          onClick={() => handleConvert(lead)}
                          style={lead.convertedClientId ? mutedButtonStyle : successButtonStyle}
                          disabled={!!lead.convertedClientId || convertingLeadId === lead.id}
                        >
                          {lead.convertedClientId ? "Converted" : convertingLeadId === lead.id ? "Converting" : "Convert"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedLead && (
          <LeadProfileModal
            lead={selectedLead}
            saving={savingProfile}
            converting={convertingLeadId === selectedLead.id}
            onChange={setSelectedLead}
            onClose={() => setSelectedLead(null)}
            onSave={handleProfileSave}
            onConvert={() => handleConvert(selectedLead)}
          />
        )}
      </main>
    </>
  );
}

function LeadProfileModal({
  lead,
  saving,
  converting,
  onChange,
  onClose,
  onSave,
  onConvert,
}: {
  lead: BondLead;
  saving: boolean;
  converting: boolean;
  onChange: (lead: BondLead) => void;
  onClose: () => void;
  onSave: () => void;
  onConvert: () => void;
}) {
  const metricCards = [
    { label: "Monthly repayment", value: formatZar(lead.monthlyRepayment || 0) },
    { label: "Total loan amount", value: formatZar(lead.loanAmount || 0) },
    { label: "Total interest", value: formatZar(lead.totalInterest || 0) },
    { label: "Total payable", value: formatZar(lead.totalPayable || 0) },
  ];

  return (
    <div style={modalBackdropStyle}>
      <div style={modalCardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a2332", margin: "0 0 6px" }}>{lead.name}</h3>
            <div style={{ fontSize: 13, color: "#718096" }}>
              Submitted {dayjs(lead.createdAt).format("DD MMM YYYY HH:mm")}
            </div>
          </div>
          <button onClick={onClose} style={closeButtonStyle}>×</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 20 }}>
          {metricCards.map((card) => (
            <div key={card.label} style={profileMetricCardStyle}>
              <div style={{ fontSize: 12, color: "#718096", marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1a2332" }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div style={modalFieldsGridStyle}>
          <ModalField label="Full name" value={lead.name} onChange={(value) => onChange({ ...lead, name: value })} />
          <ModalField label="Phone" value={lead.phone || ""} onChange={(value) => onChange({ ...lead, phone: value })} />
          <ModalField label="Email" value={lead.email || ""} onChange={(value) => onChange({ ...lead, email: value })} />
          <div>
            <label style={modalLabelStyle}>Status</label>
            <select
              value={lead.status}
              onChange={(event) => onChange({ ...lead, status: event.target.value })}
              style={modalInputStyle}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {toLabel(status)}
                </option>
              ))}
            </select>
          </div>
          <ReadOnlyField label="Home price" value={formatZar(lead.homePrice || 0)} />
          <ReadOnlyField label="Deposit" value={formatZar(lead.deposit || 0)} />
          <ReadOnlyField label="Interest rate" value={lead.interestRate ? `${lead.interestRate}%` : "N/A"} />
          <ReadOnlyField label="Loan term" value={lead.loanTermYears ? `${lead.loanTermYears} years` : "N/A"} />
          <ReadOnlyField label="Lead source" value={formatLeadSource(lead.source)} fullWidth />
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={modalLabelStyle}>Notes</label>
            <textarea
              rows={4}
              value={lead.notes || ""}
              onChange={(event) => onChange({ ...lead, notes: event.target.value })}
              style={{ ...modalInputStyle, resize: "vertical" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <div style={{ fontSize: 13, color: "#718096" }}>
            {lead.convertedClientId ? `Converted to CRM client #${lead.convertedClientId}` : "Not yet converted to a CRM client"}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={onClose} style={mutedOutlineButtonStyle}>Close</button>
            <button onClick={onSave} style={primaryButtonStyle} disabled={saving}>
              {saving ? "Saving" : "Save Changes"}
            </button>
            <button onClick={onConvert} style={lead.convertedClientId ? mutedButtonStyle : successButtonStyle} disabled={!!lead.convertedClientId || converting}>
              {lead.convertedClientId ? "Converted" : converting ? "Converting" : "Convert to CRM Client"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label style={modalLabelStyle}>{label}</label>
      <input value={value} onChange={(event) => onChange(event.target.value)} style={modalInputStyle} />
    </div>
  );
}

function ReadOnlyField({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div style={fullWidth ? { gridColumn: "1 / -1" } : undefined}>
      <div style={modalLabelStyle}>{label}</div>
      <div style={readOnlyValueStyle}>{value}</div>
    </div>
  );
}

const matchesDateFilter = (createdAt: string, filter: DateFilter) => {
  if (filter === "all") return true;
  const created = dayjs(createdAt);
  if (filter === "today") return created.isSame(dayjs(), "day");
  if (filter === "7d") return created.isAfter(dayjs().subtract(7, "day"));
  return created.isAfter(dayjs().subtract(30, "day"));
};

const escapeCsvValue = (value: unknown) => {
  const normalized = String(value ?? "");
  return `"${normalized.replace(/"/g, '""')}"`;
};

const toLabel = (value: string) =>
  value
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

const formatLeadSource = (source?: string | null) => {
  if (!source) return "N/A";
  if (source.startsWith("Bond Calculator - ")) return source.replace("Bond Calculator - ", "");
  return source;
};

const filtersWrapStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 18,
};

const filterInputStyle: React.CSSProperties = {
  padding: "10px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  fontSize: 14,
  background: "#fff",
  minWidth: 150,
};

const tableWrapStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  overflowX: "auto",
};

const tableHeadingStyle: React.CSSProperties = {
  padding: "11px 16px",
  textAlign: "left",
  fontWeight: 600,
  color: "#718096",
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  whiteSpace: "nowrap",
};

const tableCellStyle: React.CSSProperties = {
  padding: "13px 16px",
  color: "#4a5568",
  verticalAlign: "middle",
  whiteSpace: "nowrap",
};

const statusSelectStyle: React.CSSProperties = {
  border: "none",
  borderRadius: 20,
  padding: "5px 10px",
  fontSize: 12,
  fontWeight: 600,
  outline: "none",
  cursor: "pointer",
};

const primaryButtonStyle: React.CSSProperties = {
  background: "#6dbf8b",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 16px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  background: "#edf2f7",
  color: "#2d3748",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  padding: "8px 12px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const successButtonStyle: React.CSSProperties = {
  background: "#f0fff4",
  color: "#276749",
  border: "1px solid #9ae6b4",
  borderRadius: 8,
  padding: "8px 12px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const mutedButtonStyle: React.CSSProperties = {
  background: "#f7fafc",
  color: "#a0aec0",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  padding: "8px 12px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "not-allowed",
};

const mutedOutlineButtonStyle: React.CSSProperties = {
  background: "#fff",
  color: "#4a5568",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  padding: "10px 16px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

const loadingStateStyle: React.CSSProperties = {
  padding: "48px 16px",
  textAlign: "center",
  color: "#718096",
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
};

const emptyStateStyle: React.CSSProperties = {
  padding: "48px 16px",
  textAlign: "center",
  color: "#a0aec0",
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
};

const modalBackdropStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(15, 23, 42, 0.55)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
};

const modalCardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  width: "100%",
  maxWidth: 860,
  maxHeight: "90vh",
  overflowY: "auto",
  padding: 26,
  boxShadow: "0 30px 60px rgba(15, 23, 42, 0.2)",
};

const closeButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#718096",
  fontSize: 24,
  cursor: "pointer",
  lineHeight: 1,
};

const profileMetricCardStyle: React.CSSProperties = {
  padding: "16px 18px",
  borderRadius: 12,
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
};

const modalLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#718096",
  textTransform: "uppercase",
  letterSpacing: 0.5,
  marginBottom: 6,
};

const modalInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  color: "#2d3748",
  boxSizing: "border-box",
};

const modalFieldsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 14,
};

const readOnlyValueStyle: React.CSSProperties = {
  minHeight: 42,
  display: "flex",
  alignItems: "center",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #edf2f7",
  background: "#f8fafc",
  fontSize: 14,
  color: "#2d3748",
};
