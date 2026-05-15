"use client";
import { useEffect, useState } from "react";
import { fetchPublicPlans, fetchMySubscription, submitPaymentProof } from "@/utils/dashboardApi";

interface Plan {
  id: number;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  maxSavedProperties: number;
  maxViewings: number;
  maxListings: number;
}

interface Subscription {
  id: number;
  status: string;
  billingCycle: string;
  startDate?: string;
  endDate?: string;
  paymentReference?: string;
  membershipPlan?: Plan;
}

const PLAN_COLORS = ["#718096", "#3498db", "#6dbf8b"];
const PLAN_ACCENT = ["#e2e8f0", "#ebf5fb", "#f0fff4"];

export default function ClientMembershipPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  // Upgrade flow
  const [selected, setSelected] = useState<Plan | null>(null);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [payRef, setPayRef] = useState("");
  const [payProofUrl, setPayProofUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([fetchPublicPlans(), fetchMySubscription().catch(() => ({ data: null }))])
      .then(([plansRes, subRes]) => {
        setPlans(Array.isArray(plansRes.data) ? plansRes.data : []);
        setSubscription(subRes.data || null);
      })
      .catch(() => setError("Failed to load membership info."))
      .finally(() => setLoading(false));
  }, []);

  const currentPlanName = subscription?.membershipPlan?.name || "Free";
  const isPending = subscription?.status === "pending_payment";

  const handleUpgrade = async () => {
    if (!selected) return;
    if (selected.priceMonthly > 0 && !payRef) { setError("Please enter your payment reference."); return; }
    setSubmitting(true);
    setError("");
    try {
      await submitPaymentProof({
        planId: selected.id,
        billingCycle: billing,
        paymentReference: payRef,
        paymentProofUrl: payProofUrl || undefined,
      });
      setSuccess(true);
      setSelected(null);
      // Refresh subscription
      const sub = await fetchMySubscription().catch(() => ({ data: null }));
      setSubscription(sub.data || null);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const price = (plan: Plan) => billing === "yearly" ? plan.priceYearly : plan.priceMonthly;
  const savings = (plan: Plan) => plan.priceMonthly > 0 ? Math.round(((plan.priceMonthly * 12 - plan.priceYearly) / (plan.priceMonthly * 12)) * 100) : 0;

  if (loading) return <div style={{ padding: 60, textAlign: "center", color: "#666" }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#1a2332" }}>My Membership</h2>
        <p style={{ margin: "6px 0 0", color: "#666", fontSize: 14 }}>Choose the right plan to list your properties and connect with buyers.</p>
      </div>

      {/* Current status banner */}
      {isPending && (
        <div style={{ background: "#fff8e1", border: "1px solid #ffc107", borderRadius: 10, padding: "14px 20px", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
          <i className="bi bi-clock" style={{ fontSize: 20, color: "#ffc107" }} />
          <div>
            <strong style={{ color: "#795548" }}>Payment under review</strong>
            <div style={{ color: "#795548", fontSize: 13, marginTop: 2 }}>Your payment for <strong>{subscription?.membershipPlan?.name}</strong> is being verified by our team. You'll be upgraded within 1 business day.</div>
          </div>
        </div>
      )}

      {!isPending && currentPlanName !== "Free" && (
        <div style={{ background: "#f0fff4", border: "1px solid #6dbf8b", borderRadius: 10, padding: "14px 20px", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
          <i className="bi bi-check-circle-fill" style={{ fontSize: 20, color: "#6dbf8b" }} />
          <div>
            <strong style={{ color: "#1a2332" }}>Active: {currentPlanName} Plan</strong>
            <div style={{ color: "#555", fontSize: 13, marginTop: 2 }}>
              {subscription?.billingCycle === "yearly" ? "Billed yearly" : "Billed monthly"}
              {subscription?.endDate && ` · Renews ${new Date(subscription.endDate).toLocaleDateString()}`}
            </div>
          </div>
        </div>
      )}

      {success && (
        <div style={{ background: "#f0fff4", border: "1px solid #6dbf8b", borderRadius: 10, padding: "14px 20px", marginBottom: 28 }}>
          <strong style={{ color: "#27ae60" }}>✓ Payment submitted!</strong>
          <p style={{ margin: "4px 0 0", color: "#555", fontSize: 13 }}>Our team will verify your payment and activate your plan within 1 business day. You'll receive a confirmation once it's done.</p>
        </div>
      )}

      {error && <div style={{ background: "#fde", border: "1px solid #e74c3c", borderRadius: 8, padding: 12, marginBottom: 20, color: "#c00", fontSize: 13 }}>{error}</div>}

      {/* Billing toggle */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        <div style={{ background: "#f0f0f0", borderRadius: 30, padding: 4, display: "inline-flex", gap: 0 }}>
          {(["monthly", "yearly"] as const).map((b) => (
            <button key={b} onClick={() => setBilling(b)} style={{
              padding: "8px 24px", borderRadius: 26, border: "none", fontWeight: 600, fontSize: 13,
              background: billing === b ? "#1a2332" : "transparent",
              color: billing === b ? "#fff" : "#666",
              cursor: "pointer", transition: "all 0.2s",
            }}>
              {b === "monthly" ? "Monthly" : "Yearly"}
              {b === "yearly" && <span style={{ marginLeft: 6, fontSize: 11, background: "#6dbf8b", color: "#fff", padding: "2px 6px", borderRadius: 20 }}>Save up to 17%</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 40 }}>
        {plans.map((plan, i) => {
          const isCurrentPlan = currentPlanName === plan.name;
          const isBusiness = plan.name === "Business";
          return (
            <div key={plan.id} style={{
              background: isBusiness ? "#1a2332" : "#fff",
              border: `2px solid ${isCurrentPlan ? "#6dbf8b" : PLAN_COLORS[i % PLAN_COLORS.length]}`,
              borderRadius: 16, padding: 28, position: "relative",
              boxShadow: isBusiness ? "0 8px 32px rgba(26,35,50,0.18)" : "0 2px 8px rgba(0,0,0,0.06)",
              display: "flex", flexDirection: "column",
            }}>
              {isBusiness && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#6dbf8b", color: "#fff", padding: "3px 16px", borderRadius: 20, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                  MOST POPULAR
                </div>
              )}
              {isCurrentPlan && (
                <div style={{ position: "absolute", top: 14, right: 14, background: "#6dbf8b", color: "#fff", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                  CURRENT
                </div>
              )}

              <div style={{ fontSize: 18, fontWeight: 700, color: isBusiness ? "#fff" : "#1a2332", marginBottom: 6 }}>{plan.name}</div>
              <div style={{ fontSize: 13, color: isBusiness ? "rgba(255,255,255,0.65)" : "#666", marginBottom: 20, lineHeight: 1.5 }}>{plan.description}</div>

              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 34, fontWeight: 800, color: isBusiness ? "#6dbf8b" : PLAN_COLORS[i % PLAN_COLORS.length] }}>
                  {plan.priceMonthly === 0 ? "Free" : `R${price(plan).toLocaleString()}`}
                </span>
                {plan.priceMonthly > 0 && (
                  <span style={{ fontSize: 14, color: isBusiness ? "rgba(255,255,255,0.5)" : "#aaa" }}>/{billing === "yearly" ? "yr" : "mo"}</span>
                )}
                {billing === "yearly" && plan.priceMonthly > 0 && savings(plan) > 0 && (
                  <div style={{ fontSize: 12, color: "#6dbf8b", marginTop: 4 }}>Save {savings(plan)}% vs monthly</div>
                )}
              </div>

              <ul style={{ margin: "0 0 24px", padding: "0 0 0 0", listStyle: "none", flex: 1 }}>
                {Array.isArray(plan.features) && plan.features.map((f, fi) => (
                  <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, fontSize: 13, color: isBusiness ? "rgba(255,255,255,0.8)" : "#444", lineHeight: 1.5 }}>
                    <span style={{ color: "#6dbf8b", flexShrink: 0, marginTop: 1 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {!isCurrentPlan && !isPending && (
                <button
                  onClick={() => { setSelected(plan); setPayRef(""); setPayProofUrl(""); setError(""); setSuccess(false); }}
                  style={{
                    padding: "12px 0", borderRadius: 10, border: "none",
                    background: isBusiness ? "#6dbf8b" : PLAN_ACCENT[i % PLAN_ACCENT.length],
                    color: isBusiness ? "#fff" : PLAN_COLORS[i % PLAN_COLORS.length],
                    fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%",
                    border: `1.5px solid ${PLAN_COLORS[i % PLAN_COLORS.length]}`,
                  } as any}
                >
                  {plan.priceMonthly === 0 ? "Downgrade to Free" : `Upgrade to ${plan.name}`}
                </button>
              )}
              {isCurrentPlan && (
                <div style={{ textAlign: "center", padding: "10px 0", color: "#6dbf8b", fontWeight: 700, fontSize: 14 }}>
                  ✓ Your current plan
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* How it works */}
      <div style={{ background: "#f8f9fa", borderRadius: 14, padding: 28, marginBottom: 40 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1a2332" }}>How the contact approval works</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {[
            { icon: "bi-person-plus", title: "Buyer submits inquiry", desc: "A potential buyer finds your listing and sends an inquiry through the portal." },
            { icon: "bi-shield-check", title: "Admin reviews", desc: "Our team reviews the buyer's inquiry. Free & Standard: reviewed within 24 to 48 hrs. Business: immediate." },
            { icon: "bi-envelope-check", title: "You get notified", desc: "Once approved, you receive the buyer's full name, email and phone. Standard & Business clients get full details. Free clients get name only." },
            { icon: "bi-chat-dots", title: "Direct contact", desc: "You contact the buyer directly. Business plan owners can also see all buyer details immediately, no waiting." },
          ].map((step, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 48, height: 48, background: "#6dbf8b20", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                <i className={`bi ${step.icon}`} style={{ fontSize: 22, color: "#6dbf8b" }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1a2332", marginBottom: 4 }}>{step.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade modal */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 36, width: "100%", maxWidth: 500 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1a2332" }}>Upgrade to {selected.name}</h3>
                <div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>
                  R{price(selected).toLocaleString()} / {billing === "yearly" ? "year" : "month"}
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#aaa" }}>×</button>
            </div>

            {selected.priceMonthly === 0 ? (
              <div style={{ background: "#f8f9fa", borderRadius: 10, padding: 16, marginBottom: 20, color: "#555", fontSize: 13, lineHeight: 1.7 }}>
                Downgrading to the Free plan will take effect at the end of your current billing period. Your existing listings will remain active until then.
              </div>
            ) : (
              <>
                {/* Payment instructions */}
                <div style={{ background: "#f0fff4", borderRadius: 10, padding: 16, marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#1a2332", marginBottom: 8 }}>Payment Instructions</div>
                  <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
                    Please make an EFT payment to:<br />
                    <strong>Bank:</strong> FNB&nbsp;&nbsp;
                    <strong>Account:</strong> 62850941234<br />
                    <strong>Branch:</strong> 250655&nbsp;&nbsp;
                    <strong>Ref:</strong> DGP-{selected.name.toUpperCase()}-YOUR-EMAIL<br />
                    <strong>Amount:</strong> R{price(selected).toLocaleString()}
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Payment Reference / Transaction ID *</label>
                  <input
                    value={payRef}
                    onChange={(e) => setPayRef(e.target.value)}
                    placeholder="e.g. FNB123456789"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13, boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Proof of Payment URL <span style={{ color: "#aaa", fontWeight: 400 }}>(optional, Google Drive, Dropbox link, etc.)</span></label>
                  <input
                    value={payProofUrl}
                    onChange={(e) => setPayProofUrl(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13, boxSizing: "border-box" }}
                  />
                </div>
              </>
            )}

            {error && <div style={{ color: "#c00", fontSize: 13, marginBottom: 12 }}>{error}</div>}

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setSelected(null)} style={{ flex: 1, padding: "12px 0", background: "#f0f0f0", color: "#555", border: "none", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Cancel</button>
              <button onClick={handleUpgrade} disabled={submitting} style={{
                flex: 2, padding: "12px 0", background: "#6dbf8b", color: "#fff",
                border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: submitting ? "not-allowed" : "pointer",
              }}>
                {submitting ? "Submitting..." : selected.priceMonthly === 0 ? "Confirm Downgrade" : "Submit Payment & Upgrade"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
