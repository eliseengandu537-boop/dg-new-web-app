"use client";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import { fetchAllInquiries, updateInquiryStatus, deleteInquiry, approveInquiryContact } from "@/utils/dashboardApi";
import dayjs from "dayjs";

interface Inquiry {
  id: number; name: string; email: string; phone?: string; message: string;
  status: string; adminNotes?: string; createdAt: string;
  contactApproved?: boolean | null;
  contactApprovedAt?: string;
  ownerPlan?: string;
  property?: { id: number; title: string; referenceNumber: string; submittedByUserId?: number; submittedByUser?: { name: string; email: string } };
}

const STATUSES = ["new", "read", "replied", "closed"];

const statusColors: Record<string, { bg: string; color: string }> = {
  new: { bg: "#ebf8ff", color: "#2b6cb0" },
  read: { bg: "#faf5ff", color: "#6b21a8" },
  replied: { bg: "#f0fff4", color: "#276749" },
  closed: { bg: "#f7fafc", color: "#718096" },
};

const PLAN_COLORS: Record<string, string> = {
  Free: "#718096",
  Standard: "#3498db",
  Business: "#6dbf8b",
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [approving, setApproving] = useState(false);
  const limit = 20;

  const load = async (p = 1, status = filterStatus) => {
    setLoading(true);
    try {
      const res = await fetchAllInquiries({ page: p, limit, status: status || undefined });
      const data = res.data;
      const rows = Array.isArray(data) ? data : (data.inquiries || data.rows || []);
      const count = data.total ?? data.count ?? rows.length;
      setInquiries(rows);
      setTotal(count);
    } catch { }
    setLoading(false);
  };

  useEffect(() => { load(page, filterStatus); }, [page, filterStatus]);

  const handleView = (inq: Inquiry) => { setSelected(inq); setNotes(inq.adminNotes || ""); };

  const handleUpdateStatus = async (id: number, status: string, adminNotes?: string) => {
    setSaving(true);
    try {
      const res = await updateInquiryStatus(id, { status, adminNotes });
      setInquiries((p) => p.map((x) => x.id === id ? { ...x, ...res.data } : x));
      if (selected?.id === id) setSelected((s) => s ? { ...s, ...res.data } : s);
    } catch { alert("Failed to update."); }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this inquiry?")) return;
    try { await deleteInquiry(id); setInquiries((p) => p.filter((x) => x.id !== id)); if (selected?.id === id) setSelected(null); }
    catch { alert("Failed to delete."); }
  };

  const handleContactApproval = async (id: number, approved: boolean) => {
    setApproving(true);
    try {
      const res = await approveInquiryContact(id, approved);
      setInquiries((p) => p.map((x) => x.id === id ? { ...x, ...res.data } : x));
      if (selected?.id === id) setSelected((s) => s ? { ...s, ...res.data } : s);
    } catch { alert("Failed to update contact approval."); }
    setApproving(false);
  };

  const pages = Math.ceil(total / limit);

  return (
    <>
      <AdminHeader title="Inquiries" onMenuToggle={() => {}} />
      <main style={{ padding: "24px 28px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", margin: 0 }}>Inquiries</h2>
            <p style={{ color: "#718096", fontSize: 14, margin: "4px 0 0" }}>{total} total inquiries</p>
          </div>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 14 }}>
            <option value="">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 400px" : "1fr", gap: 20 }}>
          {/* Table */}
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            {loading ? <Spinner /> : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#f7fafc" }}>
                    {["From (Buyer)", "Property / Owner", "Status", "Contact Approval", "Date", ""].map((h) => (
                      <th key={h} style={th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inquiries.length === 0 ? (
                    <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: "#a0aec0" }}>No inquiries found.</td></tr>
                  ) : inquiries.map((inq) => (
                    <tr key={inq.id} style={{ borderBottom: "1px solid #f0f4f8", cursor: "pointer", background: selected?.id === inq.id ? "#f7fafc" : undefined }}
                      onClick={() => handleView(inq)}>
                      <td style={td}>
                        <div style={{ fontWeight: 600, color: "#1a2332" }}>{inq.name}</div>
                        <div style={{ fontSize: 12, color: "#718096" }}>{inq.email}</div>
                        {inq.phone && <div style={{ fontSize: 11, color: "#aaa" }}>{inq.phone}</div>}
                      </td>
                      <td style={td}>
                        {inq.property ? (
                          <>
                            <div style={{ fontWeight: 500, fontSize: 13, color: "#1a2332" }}>{inq.property.title}</div>
                            {inq.property.submittedByUser && (
                              <div style={{ fontSize: 11, color: "#718096", marginTop: 2 }}>
                                Owner: {inq.property.submittedByUser.name}
                                {inq.ownerPlan && (
                                  <span style={{ marginLeft: 6, background: (PLAN_COLORS[inq.ownerPlan] || "#ccc") + "20", color: PLAN_COLORS[inq.ownerPlan] || "#888", padding: "1px 6px", borderRadius: 10, fontSize: 10, fontWeight: 700 }}>{inq.ownerPlan}</span>
                                )}
                              </div>
                            )}
                          </>
                        ) : <span style={{ color: "#aaa" }}>N/A</span>}
                      </td>
                      <td style={td}>
                        <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: statusColors[inq.status]?.bg || "#e2e8f0", color: statusColors[inq.status]?.color || "#4a5568" }}>
                          {inq.status}
                        </span>
                      </td>
                      <td style={td} onClick={(e) => e.stopPropagation()}>
                        {inq.contactApproved === true && (
                          <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: "#f0fff4", color: "#27ae60" }}>✓ Approved</span>
                        )}
                        {inq.contactApproved === false && (
                          <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: "#fde", color: "#e74c3c" }}>✗ Denied</span>
                        )}
                        {(inq.contactApproved === null || inq.contactApproved === undefined) && (
                          <div style={{ display: "flex", gap: 4 }}>
                            <button onClick={() => handleContactApproval(inq.id, true)} disabled={approving} style={{ padding: "3px 10px", background: "#f0fff4", color: "#27ae60", border: "1px solid #27ae60", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Approve</button>
                            <button onClick={() => handleContactApproval(inq.id, false)} disabled={approving} style={{ padding: "3px 10px", background: "#fde", color: "#e74c3c", border: "1px solid #e74c3c", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Deny</button>
                          </div>
                        )}
                      </td>
                      <td style={td}>{dayjs(inq.createdAt).format("DD MMM YYYY")}</td>
                      <td style={td} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleDelete(inq.id)} style={btnDel}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {pages > 1 && (
              <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "12px 0" }}>
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} style={{ padding: "4px 10px", border: `1px solid ${p === page ? "#6dbf8b" : "#e2e8f0"}`, borderRadius: 4, background: p === page ? "#6dbf8b" : "#fff", color: p === page ? "#fff" : "#4a5568", cursor: "pointer", fontSize: 13 }}>{p}</button>
                ))}
              </div>
            )}
          </div>

          {/* Side panel */}
          {selected && (
            <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a2332", margin: 0 }}>Inquiry Details</h3>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#718096" }}>×</button>
              </div>

              {/* Contact Approval */}
              <div style={{ background: selected.contactApproved === true ? "#f0fff4" : selected.contactApproved === false ? "#fff5f5" : "#fff8e1", borderRadius: 10, padding: "12px 14px", marginBottom: 16, border: `1px solid ${selected.contactApproved === true ? "#6dbf8b" : selected.contactApproved === false ? "#e74c3c" : "#ffc107"}` }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "#1a2332", marginBottom: 6 }}>CONTACT SHARING</div>
                {selected.contactApproved === true && (
                  <div style={{ fontSize: 12, color: "#27ae60" }}>✓ Approved: property owner can see buyer details{selected.contactApprovedAt ? ` (${dayjs(selected.contactApprovedAt).format("DD MMM YYYY")})` : ""}</div>
                )}
                {selected.contactApproved === false && (
                  <div style={{ fontSize: 12, color: "#e74c3c" }}>✗ Denied: contact details not shared with owner</div>
                )}
                {(selected.contactApproved === null || selected.contactApproved === undefined) && (
                  <div style={{ fontSize: 12, color: "#795548", marginBottom: 10 }}>
                    Pending: decide whether to share this buyer contact with the property owner.
                    {selected.ownerPlan && <><br /><strong>Owner plan: {selected.ownerPlan}</strong>{selected.ownerPlan === "Business" ? " (Business owners get auto-approval.)" : ""}</>}
                  </div>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  {selected.contactApproved !== true && (
                    <button onClick={() => handleContactApproval(selected.id, true)} disabled={approving} style={{ flex: 1, padding: "8px 0", background: "#27ae60", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>✓ Approve Contact</button>
                  )}
                  {selected.contactApproved !== false && (
                    <button onClick={() => handleContactApproval(selected.id, false)} disabled={approving} style={{ flex: 1, padding: "8px 0", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>✗ Deny Contact</button>
                  )}
                </div>
              </div>

              <dl style={{ fontSize: 14, margin: 0 }}>
                {[["Buyer Name", selected.name], ["Email", selected.email], ["Phone", selected.phone || "N/A"], ["Date", dayjs(selected.createdAt).format("DD MMM YYYY, HH:mm")]].map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 10 }}>
                    <dt style={{ color: "#718096", fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{k}</dt>
                    <dd style={{ margin: 0, color: "#2d3748" }}>{v}</dd>
                  </div>
                ))}
                {selected.property?.submittedByUser && (
                  <div style={{ marginBottom: 10 }}>
                    <dt style={{ color: "#718096", fontSize: 12, fontWeight: 600, marginBottom: 2 }}>Property Owner</dt>
                    <dd style={{ margin: 0, color: "#2d3748" }}>{selected.property.submittedByUser.name} <span style={{ color: "#aaa" }}>({selected.property.submittedByUser.email})</span></dd>
                  </div>
                )}
                <div style={{ marginBottom: 10 }}>
                  <dt style={{ color: "#718096", fontSize: 12, fontWeight: 600, marginBottom: 2 }}>Message</dt>
                  <dd style={{ margin: 0, background: "#f7fafc", borderRadius: 6, padding: 10, color: "#4a5568", whiteSpace: "pre-wrap", fontSize: 13 }}>{selected.message}</dd>
                </div>
              </dl>

              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#718096", marginBottom: 6 }}>Status</label>
              <select value={selected.status} onChange={(e) => handleUpdateStatus(selected.id, e.target.value, notes)} style={{ width: "100%", padding: "8px 10px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 14, marginBottom: 12 }}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>

              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#718096", marginBottom: 6 }}>Admin Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} style={{ width: "100%", padding: "8px 10px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 14, resize: "vertical", boxSizing: "border-box", marginBottom: 12 }} />
              <button onClick={() => handleUpdateStatus(selected.id, selected.status, notes)} disabled={saving} style={{ width: "100%", background: "#6dbf8b", color: "#fff", border: "none", borderRadius: 8, padding: 10, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
                {saving ? "Saving..." : "Save Notes"}
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function Spinner() {
  return <div style={{ textAlign: "center", padding: 60, color: "#a0aec0" }}><i className="bi bi-arrow-repeat" style={{ fontSize: 28 }} /></div>;
}

const th: React.CSSProperties = { padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#718096", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 };
const td: React.CSSProperties = { padding: "12px 16px", color: "#4a5568", verticalAlign: "middle" };
const btnDel: React.CSSProperties = { padding: "4px 12px", borderRadius: 5, fontSize: 12, cursor: "pointer", background: "#fff5f5", color: "#c53030", border: "1px solid #fed7d7" };

