"use client";
import { useEffect, useState } from "react";
import { fetchClientProfile, updateClientProfile } from "@/utils/dashboardApi";

interface Profile {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  whatsapp?: string;
  company?: string;
  jobTitle?: string;
  about?: string;
  website?: string;
  role: string;
  subscription?: {
    status: string;
    billingCycle: string;
    membershipPlan?: { name: string; priceMonthly: number; maxListings: number };
  } | null;
}

export default function ClientProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  useEffect(() => {
    fetchClientProfile()
      .then((res) => {
        const d = res.data as Profile;
        setProfile(d);
        setForm({
          name: d.name || "",
          firstName: d.firstName || "",
          lastName: d.lastName || "",
          phoneNumber: d.phoneNumber || "",
          whatsapp: d.whatsapp || "",
          company: d.company || "",
          jobTitle: d.jobTitle || "",
          about: d.about || "",
          website: d.website || "",
          avatar: d.avatar || "",
        });
        setAvatarPreview(d.avatar || "");
      })
      .catch(() => setError("Failed to load profile."))
      .finally(() => setLoading(false));
  }, []);

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const res = await updateClientProfile(form);
      setProfile((p) => p ? { ...p, ...res.data } : p);
      setSuccess("Profile updated successfully!");
      // Update localStorage user display name
      try {
        const stored = JSON.parse(localStorage.getItem("dg_user") || "{}");
        stored.name = form.name || stored.name;
        stored.avatar = form.avatar || stored.avatar;
        localStorage.setItem("dg_user", JSON.stringify(stored));
      } catch { /* ignore */ }
      setTimeout(() => setSuccess(""), 4000);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const planName = profile?.subscription?.membershipPlan?.name || "Free";
  const planColor = planName === "Business" ? "#6dbf8b" : planName === "Standard" ? "#3498db" : "#718096";
  const isPaid = profile?.subscription?.status === "active" && planName !== "Free";
  const isPending = profile?.subscription?.status === "pending_payment";

  if (loading) return <div style={{ textAlign: "center", padding: 80, color: "#666" }}>Loading profile...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: "#1a2332" }}>My Profile</h2>
      <p style={{ margin: "0 0 32px", color: "#666", fontSize: 13 }}>
        Your public profile. This information appears on your property listings when you have an active paid plan.
      </p>

      {/* Membership banner */}
      <div style={{
        background: isPaid ? "#f0fff4" : isPending ? "#fff8e1" : "#f8f9fa",
        border: `1px solid ${isPaid ? "#6dbf8b" : isPending ? "#ffc107" : "#e0e0e0"}`,
        borderRadius: 12, padding: "16px 20px", marginBottom: 32,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#1a2332" }}>
              {planName} Plan
            </span>
            <span style={{ background: planColor + "20", color: planColor, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
              {isPaid ? "ACTIVE" : isPending ? "PAYMENT PENDING" : "FREE"}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
            {isPaid
              ? "Your profile photo and name appear on your listings. Buyers can contact you directly."
              : isPending
              ? "Your payment is being verified. Once activated, your profile will show on listings."
              : "On the Free plan, a DG Property broker is shown on your listings instead of your profile."}
          </div>
        </div>
        {!isPaid && (
          <a href="/dashboard/client/membership" style={{ padding: "8px 18px", background: "#6dbf8b", color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: 12, textDecoration: "none", whiteSpace: "nowrap" }}>
            Upgrade Plan
          </a>
        )}
      </div>

      {error && <div style={{ background: "#fde", padding: 12, borderRadius: 8, color: "#c00", marginBottom: 20, fontSize: 13 }}>{error}</div>}
      {success && <div style={{ background: "#f0fff4", padding: 12, borderRadius: 8, color: "#27ae60", marginBottom: 20, fontSize: 13, fontWeight: 600 }}>✓ {success}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 32, alignItems: "start" }}>
        {/* Avatar column */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 160, height: 160, borderRadius: "50%", overflow: "hidden", margin: "0 auto 16px", background: "#f0f0f0", border: "3px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {avatarPreview
              ? <img src={avatarPreview} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setAvatarPreview("")} />
              : <span style={{ fontSize: 64, color: "#ccc" }}>👤</span>
            }
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2332", marginBottom: 4 }}>
            {form.firstName || form.name || "Your Name"}
          </div>
          {form.jobTitle && <div style={{ fontSize: 12, color: "#666" }}>{form.jobTitle}</div>}
          {form.company && <div style={{ fontSize: 11, color: "#aaa" }}>{form.company}</div>}
          {isPaid && <div style={{ marginTop: 8 }}><span style={{ background: planColor + "20", color: planColor, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{planName} Member</span></div>}
        </div>

        {/* Form column */}
        <form onSubmit={handleSubmit}>
          {/* Avatar URL */}
          <div style={fieldWrap}>
            <label style={labelStyle}>Profile Photo URL</label>
            <input
              value={form.avatar || ""}
              onChange={(e) => { set("avatar", e.target.value); setAvatarPreview(e.target.value); }}
              placeholder="https://example.com/your-photo.jpg"
              style={inputStyle}
            />
            <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>Paste a link to your profile photo. This appears on your listings.</div>
          </div>

          {/* Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input value={form.firstName || ""} onChange={(e) => set("firstName", e.target.value)} placeholder="John" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input value={form.lastName || ""} onChange={(e) => set("lastName", e.target.value)} placeholder="Smith" style={inputStyle} />
            </div>
          </div>

          {/* Display name */}
          <div style={fieldWrap}>
            <label style={labelStyle}>Display Name *</label>
            <input value={form.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="How your name appears publicly" style={inputStyle} required />
          </div>

          {/* Job + Company */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Job Title / Role</label>
              <input value={form.jobTitle || ""} onChange={(e) => set("jobTitle", e.target.value)} placeholder="e.g. Property Investor" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Company / Agency</label>
              <input value={form.company || ""} onChange={(e) => set("company", e.target.value)} placeholder="e.g. ABC Properties" style={inputStyle} />
            </div>
          </div>

          {/* Contact */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input value={form.phoneNumber || ""} onChange={(e) => set("phoneNumber", e.target.value)} placeholder="+27 12 345 6789" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>WhatsApp Number</label>
              <input value={form.whatsapp || ""} onChange={(e) => set("whatsapp", e.target.value)} placeholder="+27 12 345 6789" style={inputStyle} />
            </div>
          </div>

          {/* Website */}
          <div style={fieldWrap}>
            <label style={labelStyle}>Website / LinkedIn</label>
            <input value={form.website || ""} onChange={(e) => set("website", e.target.value)} placeholder="https://yourwebsite.com" style={inputStyle} />
          </div>

          {/* About */}
          <div style={fieldWrap}>
            <label style={labelStyle}>About / Bio</label>
            <textarea
              value={form.about || ""}
              onChange={(e) => set("about", e.target.value)}
              rows={4}
              placeholder="Tell potential buyers and tenants about yourself, your experience, specialisation, and what makes you the right contact for this listing..."
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Email (read-only) */}
          <div style={fieldWrap}>
            <label style={labelStyle}>Email Address <span style={{ color: "#aaa", fontWeight: 400 }}>(cannot be changed)</span></label>
            <input value={profile?.email || ""} readOnly style={{ ...inputStyle, background: "#f8f9fa", color: "#aaa", cursor: "not-allowed" }} />
          </div>

          <button type="submit" disabled={saving} style={{
            width: "100%", padding: "14px 0", background: saving ? "#aaa" : "#6dbf8b",
            color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15,
            cursor: saving ? "not-allowed" : "pointer", marginTop: 8,
          }}>
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      {/* Preview card */}
      {isPaid && (
        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>How you appear on listings</div>
          <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: "20px 24px", maxWidth: 380, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", background: "#f0f0f0", flexShrink: 0, border: "2px solid #e8e8e8" }}>
                {avatarPreview
                  ? <img src={avatarPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setAvatarPreview("")} />
                  : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 24 }}>👤</div>
                }
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#1a2332", fontSize: 14 }}>{form.name || "Your Name"}</div>
                {(form.jobTitle || form.company) && (
                  <div style={{ fontSize: 12, color: "#666" }}>{form.jobTitle}{form.jobTitle && form.company ? " · " : ""}{form.company}</div>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  {form.phoneNumber && (
                    <span style={{ fontSize: 11, color: "#6dbf8b" }}>📞 {form.phoneNumber}</span>
                  )}
                  {form.whatsapp && (
                    <span style={{ fontSize: 11, color: "#25d366" }}>💬 WhatsApp</span>
                  )}
                </div>
              </div>
            </div>
            {form.about && (
              <div style={{ marginTop: 12, fontSize: 12, color: "#555", lineHeight: 1.6, borderTop: "1px solid #f0f0f0", paddingTop: 12 }}>
                {form.about.substring(0, 120)}{form.about.length > 120 ? "..." : ""}
              </div>
            )}
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ background: planColor + "20", color: planColor, padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{planName} Member</span>
            </div>
          </div>
        </div>
      )}

      {!isPaid && (
        <div style={{ marginTop: 40, background: "#f8f9fa", border: "1px dashed #ddd", borderRadius: 14, padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏢</div>
          <div style={{ fontWeight: 700, color: "#1a2332", fontSize: 15, marginBottom: 8 }}>Your listings currently show a DG Property broker</div>
          <p style={{ color: "#666", fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>
            On the Free plan, buyers see one of our professional brokers on your listings.<br />
            Upgrade to Standard or Business to show <strong>your own profile</strong> instead, including your photo, contact details, and bio.
          </p>
          <a href="/dashboard/client/membership" style={{ display: "inline-block", padding: "10px 28px", background: "#6dbf8b", color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
            View Membership Plans
          </a>
        </div>
      )}
    </div>
  );
}

const fieldWrap: React.CSSProperties = { marginBottom: 16 };
const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13, boxSizing: "border-box", outline: "none" };
