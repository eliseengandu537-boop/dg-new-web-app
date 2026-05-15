"use client";
import { useEffect, useState } from "react";
import {
  fetchAllPlans, createPlan, updatePlan, deletePlan,
  fetchAllSubscriptions, assignSubscription, activateSubscription,
  fetchAllClients,
} from "@/utils/dashboardApi";

interface Plan {
  id: number;
  name: string;
  description?: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  maxSavedProperties: number;
  maxViewings: number;
  sortOrder: number;
  isActive: boolean;
  subscriptions?: any[];
}

interface Subscription {
  id: number;
  userId: number;
  planId: number;
  status: string;
  billingCycle: string;
  startDate?: string;
  endDate?: string;
  paymentReference?: string;
  paymentProofUrl?: string;
  user?: { id: number; name: string; email: string };
  membershipPlan?: { id: number; name: string };
}

const EMPTY_PLAN = { name: "", description: "", priceMonthly: 0, priceYearly: 0, features: [] as string[], maxSavedProperties: 5, maxViewings: 3, sortOrder: 1, isActive: true };

export default function AdminMembershipsPage() {
  const [tab, setTab] = useState<"plans" | "subscriptions">("plans");

  // Plans
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [planError, setPlanError] = useState("");
  const [editingPlan, setEditingPlan] = useState<Partial<Plan> | null>(null);
  const [isNewPlan, setIsNewPlan] = useState(false);
  const [planSaving, setPlanSaving] = useState(false);
  const [featuresInput, setFeaturesInput] = useState(""); // comma-separated

  // Subscriptions
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [subPage, setSubPage] = useState(1);
  const [subTotalPages, setSubTotalPages] = useState(1);
  const [subLoading, setSubLoading] = useState(false);
  const [subError, setSubError] = useState("");

  // Assign subscription modal
  const [showAssign, setShowAssign] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [assignForm, setAssignForm] = useState({ userId: "", planId: "", billingCycle: "monthly", startDate: "", endDate: "", paymentReference: "" });
  const [assigning, setAssigning] = useState(false);

  const loadPlans = async () => {
    setPlansLoading(true);
    setPlanError("");
    try {
      const res = await fetchAllPlans();
      setPlans(Array.isArray(res.data) ? res.data : []);
    } catch {
      setPlanError("Failed to load plans.");
    } finally {
      setPlansLoading(false);
    }
  };

  const loadSubs = async (p = 1) => {
    setSubLoading(true);
    setSubError("");
    try {
      const res = await fetchAllSubscriptions({ page: p, limit: 20 });
      const d = res.data;
      setSubscriptions(Array.isArray(d) ? d : (d.subscriptions || []));
      setSubTotal(d.total ?? 0);
      setSubTotalPages(d.totalPages ?? 1);
    } catch {
      setSubError("Failed to load subscriptions.");
    } finally {
      setSubLoading(false);
    }
  };

  useEffect(() => { loadPlans(); loadSubs(); }, []);
  useEffect(() => { if (tab === "subscriptions") loadSubs(subPage); }, [subPage]);

  const openNewPlan = () => {
    setEditingPlan({ ...EMPTY_PLAN });
    setFeaturesInput("");
    setIsNewPlan(true);
  };

  const openEditPlan = (plan: Plan) => {
    setEditingPlan({ ...plan });
    setFeaturesInput(Array.isArray(plan.features) ? plan.features.join(", ") : "");
    setIsNewPlan(false);
  };

  const handlePlanSave = async () => {
    if (!editingPlan || !editingPlan.name) { alert("Plan name is required."); return; }
    setPlanSaving(true);
    try {
      const payload = {
        ...editingPlan,
        features: featuresInput.split(",").map((f) => f.trim()).filter(Boolean),
      };
      if (isNewPlan) {
        const res = await createPlan(payload);
        setPlans((prev) => [...prev, res.data]);
      } else {
        const res = await updatePlan(editingPlan.id!, payload);
        setPlans((prev) => prev.map((p) => p.id === res.data.id ? res.data : p));
      }
      setEditingPlan(null);
    } catch {
      alert("Failed to save plan.");
    } finally {
      setPlanSaving(false);
    }
  };

  const handleDeletePlan = async (id: number) => {
    if (!confirm("Delete this plan? Existing subscriptions will remain.")) return;
    try {
      await deletePlan(id);
      setPlans((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete plan.");
    }
  };

  const loadClientsForAssign = async () => {
    try {
      const res = await fetchAllClients();
      setClients(Array.isArray(res.data) ? res.data : []);
    } catch { /* silent */ }
  };

  const openAssign = () => {
    loadClientsForAssign();
    setAssignForm({ userId: "", planId: "", billingCycle: "monthly", startDate: "", endDate: "", paymentReference: "" });
    setShowAssign(true);
  };

  const handleAssign = async () => {
    if (!assignForm.userId || !assignForm.planId) { alert("Select client and plan."); return; }
    setAssigning(true);
    try {
      await assignSubscription({ ...assignForm, userId: Number(assignForm.userId), planId: Number(assignForm.planId) });
      setShowAssign(false);
      loadSubs(subPage);
    } catch {
      alert("Failed to assign subscription.");
    } finally {
      setAssigning(false);
    }
  };

  const [activatingId, setActivatingId] = useState<number | null>(null);

  const handleActivate = async (id: number) => {
    setActivatingId(id);
    try {
      await activateSubscription(id);
      loadSubs(subPage);
    } catch {
      alert("Failed to activate subscription.");
    } finally {
      setActivatingId(null);
    }
  };

  const STATUS_COLORS: Record<string, string> = { active: "#27ae60", cancelled: "#e74c3c", expired: "#95a5a6", pending_payment: "#e67e22" };
  const PLAN_COLORS = ["#6dbf8b", "#3498db", "#9b59b6", "#e67e22"];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#1a2332" }}>Memberships</h2>
        <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>Manage plans and client subscriptions</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "2px solid #eee" }}>
        {(["plans", "subscriptions"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "10px 28px", background: "none", border: "none",
            borderBottom: tab === t ? "2px solid #6dbf8b" : "2px solid transparent",
            color: tab === t ? "#6dbf8b" : "#666",
            fontWeight: tab === t ? 700 : 400, fontSize: 14, cursor: "pointer",
            marginBottom: -2, textTransform: "capitalize",
          }}>{t}</button>
        ))}
      </div>

      {/* ── Plans Tab ─────────────────────────────────────────────── */}
      {tab === "plans" && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
            <button onClick={openNewPlan} style={{
              padding: "10px 22px", background: "#6dbf8b", color: "#fff",
              border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>+ New Plan</button>
          </div>

          {planError && <div style={{ background: "#fde", padding: 12, borderRadius: 8, color: "#c00", marginBottom: 16 }}>{planError}</div>}
          {plansLoading && <div style={{ textAlign: "center", padding: 40, color: "#666" }}>Loading plans...</div>}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {plans.map((plan, i) => (
              <div key={plan.id} style={{
                background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14,
                overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                borderTop: `4px solid ${PLAN_COLORS[i % PLAN_COLORS.length]}`,
              }}>
                <div style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 17, color: "#1a2332" }}>{plan.name}</div>
                      {!plan.isActive && <span style={{ fontSize: 10, background: "#f0f0f0", color: "#999", padding: "2px 6px", borderRadius: 20 }}>INACTIVE</span>}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 700, fontSize: 18, color: PLAN_COLORS[i % PLAN_COLORS.length] }}>R{plan.priceMonthly}/mo</div>
                      <div style={{ fontSize: 12, color: "#aaa" }}>R{plan.priceYearly}/yr</div>
                    </div>
                  </div>

                  {plan.description && <div style={{ color: "#666", fontSize: 13, marginBottom: 12 }}>{plan.description}</div>}

                  <div style={{ fontSize: 12, color: "#555", marginBottom: 12 }}>
                    <div>Saved properties: <strong>{plan.maxSavedProperties}</strong></div>
                    <div>Viewings/month: <strong>{plan.maxViewings}</strong></div>
                  </div>

                  {Array.isArray(plan.features) && plan.features.length > 0 && (
                    <ul style={{ margin: "0 0 14px", padding: "0 0 0 16px", fontSize: 12, color: "#444", lineHeight: 1.8 }}>
                      {plan.features.map((f, fi) => <li key={fi}>{f}</li>)}
                    </ul>
                  )}

                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button onClick={() => openEditPlan(plan)} style={{
                      flex: 1, padding: "8px 0", background: "#f0f7ff", color: "#3498db",
                      border: "none", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer",
                    }}>Edit</button>
                    <button onClick={() => handleDeletePlan(plan.id)} style={{
                      padding: "8px 14px", background: "#fde", color: "#e74c3c",
                      border: "none", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer",
                    }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Subscriptions Tab ─────────────────────────────────────── */}
      {tab === "subscriptions" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ color: "#666", fontSize: 13 }}>{subTotal} subscriptions</div>
            <button onClick={openAssign} style={{
              padding: "10px 22px", background: "#6dbf8b", color: "#fff",
              border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>+ Assign Subscription</button>
          </div>

          {/* Pending payment alert banner */}
          {subscriptions.filter(s => s.status === "pending_payment").length > 0 && (
            <div style={{ background: "#fff8e1", border: "1px solid #ffc107", borderRadius: 10, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20 }}>🔔</span>
              <div>
                <div style={{ fontWeight: 700, color: "#795548", fontSize: 13 }}>
                  {subscriptions.filter(s => s.status === "pending_payment").length} payment{subscriptions.filter(s => s.status === "pending_payment").length > 1 ? "s" : ""} awaiting verification
                </div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                  Review the payment proof below and click <strong>Activate</strong> to confirm the subscription.
                </div>
              </div>
            </div>
          )}

          {subError && <div style={{ background: "#fde", padding: 12, borderRadius: 8, color: "#c00", marginBottom: 16 }}>{subError}</div>}
          {subLoading && <div style={{ textAlign: "center", padding: 40, color: "#666" }}>Loading...</div>}

          {!subLoading && (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f8f9fa" }}>
                    {["Client", "Email", "Plan", "Billing", "Status", "Start", "End", "Ref", ""].map((h) => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 600, color: "#555", borderBottom: "1px solid #e8e8e8", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.length === 0 ? (
                    <tr><td colSpan={9} style={{ padding: 40, textAlign: "center", color: "#aaa" }}>No subscriptions found.</td></tr>
                  ) : subscriptions.map((sub) => (
                    <tr key={sub.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 600, color: "#1a2332" }}>{sub.user?.name || `User #${sub.userId}`}</td>
                      <td style={{ padding: "12px 14px", color: "#555" }}>{sub.user?.email || "N/A"}</td>
                      <td style={{ padding: "12px 14px", color: "#3498db", fontWeight: 600 }}>{sub.membershipPlan?.name || `Plan #${sub.planId}`}</td>
                      <td style={{ padding: "12px 14px", color: "#555", textTransform: "capitalize" }}>{sub.billingCycle}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{
                          background: (STATUS_COLORS[sub.status] || "#ccc") + "22",
                          color: STATUS_COLORS[sub.status] || "#555",
                          padding: "3px 10px", borderRadius: 20, fontWeight: 600, fontSize: 11, textTransform: "capitalize",
                        }}>{sub.status}</span>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#666" }}>{sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "N/A"}</td>
                      <td style={{ padding: "12px 14px", color: "#666" }}>{sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "N/A"}</td>
                      <td style={{ padding: "12px 14px", color: "#999", fontSize: 12 }}>
                        {sub.paymentReference || "N/A"}
                        {sub.paymentProofUrl && <><br /><a href={sub.paymentProofUrl} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "#3498db" }}>View Proof</a></>}
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        {sub.status === "pending_payment" && (
                          <button onClick={() => handleActivate(sub.id)} disabled={activatingId === sub.id} style={{ padding: "5px 14px", background: "#27ae60", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>
                            {activatingId === sub.id ? "..." : "Activate"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {subTotalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
              {Array.from({ length: subTotalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setSubPage(p)} style={{
                  padding: "6px 14px", borderRadius: 6,
                  background: p === subPage ? "#6dbf8b" : "#f0f0f0",
                  color: p === subPage ? "#fff" : "#333",
                  border: "none", cursor: "pointer",
                }}>{p}</button>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Plan Edit Modal ─────────────────────────────────────────── */}
      {editingPlan && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 32, width: "100%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a2332" }}>{isNewPlan ? "New Plan" : "Edit Plan"}</h3>
              <button onClick={() => setEditingPlan(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#aaa" }}>×</button>
            </div>

            {[
              { label: "Name *", field: "name", type: "text" },
              { label: "Description", field: "description", type: "text" },
              { label: "Monthly Price (R)", field: "priceMonthly", type: "number" },
              { label: "Yearly Price (R)", field: "priceYearly", type: "number" },
              { label: "Max Saved Properties", field: "maxSavedProperties", type: "number" },
              { label: "Max Viewings / Month", field: "maxViewings", type: "number" },
              { label: "Sort Order", field: "sortOrder", type: "number" },
            ].map(({ label, field, type }) => (
              <div key={field} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>{label}</label>
                <input
                  type={type}
                  value={(editingPlan as any)[field] ?? ""}
                  onChange={(e) => setEditingPlan((prev) => ({ ...prev, [field]: type === "number" ? Number(e.target.value) : e.target.value }))}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13, boxSizing: "border-box" }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Features (comma-separated)</label>
              <textarea
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                rows={3}
                placeholder="Priority support, Unlimited viewings, Featured listings"
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13, resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                <input type="checkbox" checked={editingPlan.isActive ?? true} onChange={(e) => setEditingPlan((prev) => ({ ...prev, isActive: e.target.checked }))} />
                Plan is active (visible to clients)
              </label>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditingPlan(null)} style={{ flex: 1, padding: "11px 0", background: "#f0f0f0", color: "#555", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Cancel</button>
              <button onClick={handlePlanSave} disabled={planSaving} style={{ flex: 2, padding: "11px 0", background: "#6dbf8b", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: planSaving ? "not-allowed" : "pointer" }}>
                {planSaving ? "Saving..." : "Save Plan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Assign Subscription Modal ───────────────────────────────── */}
      {showAssign && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 32, width: "100%", maxWidth: 480 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a2332" }}>Assign Subscription</h3>
              <button onClick={() => setShowAssign(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#aaa" }}>×</button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Client *</label>
              <select value={assignForm.userId} onChange={(e) => setAssignForm((f) => ({ ...f, userId: e.target.value }))}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13 }}>
                <option value="">Select a client...</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name || c.email} ({c.email})</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Plan *</label>
              <select value={assignForm.planId} onChange={(e) => setAssignForm((f) => ({ ...f, planId: e.target.value }))}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13 }}>
                <option value="">Select a plan...</option>
                {plans.map((p) => <option key={p.id} value={p.id}>{p.name} (R{p.priceMonthly}/mo)</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Billing Cycle</label>
              <select value={assignForm.billingCycle} onChange={(e) => setAssignForm((f) => ({ ...f, billingCycle: e.target.value }))}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13 }}>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {[
              { label: "Start Date", field: "startDate", type: "date" },
              { label: "End Date", field: "endDate", type: "date" },
              { label: "Payment Reference", field: "paymentReference", type: "text" },
            ].map(({ label, field, type }) => (
              <div key={field} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>{label}</label>
                <input type={type} value={(assignForm as any)[field]}
                  onChange={(e) => setAssignForm((f) => ({ ...f, [field]: e.target.value }))}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13, boxSizing: "border-box" }} />
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <button onClick={() => setShowAssign(false)} style={{ flex: 1, padding: "11px 0", background: "#f0f0f0", color: "#555", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Cancel</button>
              <button onClick={handleAssign} disabled={assigning} style={{ flex: 2, padding: "11px 0", background: "#6dbf8b", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: assigning ? "not-allowed" : "pointer" }}>
                {assigning ? "Saving..." : "Assign Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
