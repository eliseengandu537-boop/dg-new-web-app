"use client";
import { useEffect, useState, useRef } from "react";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import {
  fetchAllBrokers, createBroker, updateBroker,
  deleteBroker, toggleBrokerActive, toggleBrokerWebsite, reorderBrokers,
} from "@/utils/dashboardApi";
import { getApiErrorMessage } from "@/utils/apiError";
import { resolveMediaUrl } from "@/utils/publicMedia";

interface Broker {
  id: number; fullName: string; position?: string; email: string;
  phone?: string; whatsapp?: string; officeLocation?: string;
  photo?: string; bio?: string; specialization?: string;
  linkedin?: string; isActive: boolean; showOnWebsite: boolean;
}

const EMPTY: Partial<Broker> = {
  fullName: "", position: "", email: "", phone: "", whatsapp: "",
  officeLocation: "", bio: "", specialization: "", linkedin: "",
  isActive: true, showOnWebsite: true,
};

const BROKER_PHOTO_MAX_BYTES = 4 * 1024 * 1024;

export default function BrokersPage() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Broker | null>(null);
  const [form, setForm] = useState<Partial<Broker>>(EMPTY);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchAllBrokers();
      setBrokers(res.data);
    } catch { setError("Failed to load brokers."); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setPhotoFile(null); setPhotoPreview(""); setShowModal(true); };
  const openEdit = (b: Broker) => { setEditing(b); setForm(b); setPhotoPreview(resolveMediaUrl(b.photo)); setPhotoFile(null); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setError(""); };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > BROKER_PHOTO_MAX_BYTES) {
      setPhotoFile(null);
      setPhotoPreview(editing?.photo || "");
      setError("The broker photo is too large for the live site. Please use an image under 4 MB.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setError("");
    setPhotoFile(f);
    setPhotoPreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    if (!form.fullName || !form.email) { setError("Full name and email are required."); return; }
    setSaving(true); setError("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== undefined && v !== null && k !== "id") fd.append(k, String(v));
      });
      if (photoFile) fd.append("photo", photoFile);

      if (editing) {
        const res = await updateBroker(editing.id, fd);
        setBrokers((prev) => prev.map((b) => b.id === editing.id ? res.data : b));
      } else {
        const res = await createBroker(fd);
        setBrokers((prev) => [res.data, ...prev]);
      }
      closeModal();
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to save broker."));
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this broker? This cannot be undone.")) return;
    try {
      await deleteBroker(id);
      setBrokers((prev) => prev.filter((b) => b.id !== id));
    } catch { alert("Failed to delete broker."); }
  };

  const handleToggleActive = async (b: Broker) => {
    try {
      const res = await toggleBrokerActive(b.id);
      setBrokers((prev) => prev.map((x) => x.id === b.id ? { ...x, isActive: res.data.isActive } : x));
    } catch { alert("Failed to update status."); }
  };

  const handleToggleWebsite = async (b: Broker) => {
    try {
      const res = await toggleBrokerWebsite(b.id);
      setBrokers((prev) => prev.map((x) => x.id === b.id ? { ...x, showOnWebsite: res.data.showOnWebsite } : x));
    } catch { alert("Failed to update visibility."); }
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const updated = [...brokers];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setBrokers(updated);
    try { await reorderBrokers(updated.map((b) => b.id)); } catch { load(); }
  };

  const moveDown = async (index: number) => {
    if (index === brokers.length - 1) return;
    const updated = [...brokers];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setBrokers(updated);
    try { await reorderBrokers(updated.map((b) => b.id)); } catch { load(); }
  };

  return (
    <>
      <AdminHeader title="Broker Management" onMenuToggle={() => {}} />
      <main style={{ padding: "24px 28px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", margin: 0 }}>Brokers</h2>
            <p style={{ color: "#718096", fontSize: 14, margin: "4px 0 0" }}>{brokers.length} total brokers</p>
          </div>
          <button onClick={openAdd} style={btnPrimary}>
            <i className="bi bi-plus-lg" /> Add Broker
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f7fafc" }}>
                  {["Photo", "Order", "Name", "Email", "Phone", "Specialization", "Active", "Website", "Actions"].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {brokers.length === 0 ? (
                  <tr><td colSpan={9} style={{ padding: 40, textAlign: "center", color: "#a0aec0" }}>No brokers yet. Add your first broker.</td></tr>
                ) : (
                  brokers.map((b, index) => (
                    <tr key={b.id} style={{ borderBottom: "1px solid #f0f4f8" }}>
                      <td style={tdStyle}>
                        {b.photo ? (
                          <img src={resolveMediaUrl(b.photo)} alt={b.fullName} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#718096" }}>
                            {b.fullName[0]}
                          </div>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <button onClick={() => moveUp(index)} disabled={index === 0} title="Move up" style={{ background: "none", border: "none", cursor: index === 0 ? "default" : "pointer", color: index === 0 ? "#cbd5e0" : "#4a5568", padding: 2, fontSize: 13 }}><i className="bi bi-chevron-up" /></button>
                          <button onClick={() => moveDown(index)} disabled={index === brokers.length - 1} title="Move down" style={{ background: "none", border: "none", cursor: index === brokers.length - 1 ? "default" : "pointer", color: index === brokers.length - 1 ? "#cbd5e0" : "#4a5568", padding: 2, fontSize: 13 }}><i className="bi bi-chevron-down" /></button>
                        </div>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 500 }}>{b.fullName}</div>
                        {b.position && <div style={{ fontSize: 12, color: "#718096" }}>{b.position}</div>}
                      </td>
                      <td style={tdStyle}>{b.email}</td>
                      <td style={tdStyle}>{b.phone || "N/A"}</td>
                      <td style={tdStyle}>{b.specialization || "N/A"}</td>
                      <td style={tdStyle}>
                        <Toggle value={b.isActive} onChange={() => handleToggleActive(b)} onLabel="Active" offLabel="Inactive" onColor="#48bb78" />
                      </td>
                      <td style={tdStyle}>
                        <Toggle value={b.showOnWebsite} onChange={() => handleToggleWebsite(b)} onLabel="Visible" offLabel="Hidden" onColor="#6dbf8b" />
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => openEdit(b)} style={btnIconBlue} title="Edit"><i className="bi bi-pencil" /></button>
                          <button onClick={() => handleDelete(b.id)} style={btnIconRed} title="Delete"><i className="bi bi-trash" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <Modal title={editing ? "Edit Broker" : "Add New Broker"} onClose={closeModal}>
          {error && <ErrorBanner msg={error} />}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Full Name *" value={form.fullName || ""} onChange={(v) => setForm({ ...form, fullName: v })} />
            <Field label="Position" value={form.position || ""} onChange={(v) => setForm({ ...form, position: v })} />
            <Field label="Email *" value={form.email || ""} onChange={(v) => setForm({ ...form, email: v })} type="email" />
            <Field label="Phone" value={form.phone || ""} onChange={(v) => setForm({ ...form, phone: v })} />
            <Field label="WhatsApp" value={form.whatsapp || ""} onChange={(v) => setForm({ ...form, whatsapp: v })} />
            <Field label="Office Location" value={form.officeLocation || ""} onChange={(v) => setForm({ ...form, officeLocation: v })} />
            <Field label="Specialization" value={form.specialization || ""} onChange={(v) => setForm({ ...form, specialization: v })} />
            <Field label="LinkedIn URL" value={form.linkedin || ""} onChange={(v) => setForm({ ...form, linkedin: v })} />
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Biography</label>
            <textarea
              value={form.bio || ""}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Profile Photo</label>
            {photoPreview && (
              <img src={photoPreview} alt="Preview" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginBottom: 8, display: "block" }} />
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ fontSize: 14 }} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
            <button onClick={closeModal} style={btnSecondary}>Cancel</button>
            <button onClick={handleSave} disabled={saving} style={btnPrimary}>
              {saving ? "Saving..." : editing ? "Update Broker" : "Create Broker"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 60, color: "#718096" }}>
      <i className="bi bi-arrow-repeat" style={{ fontSize: 28 }} />
    </div>
  );
}

function ErrorBanner({ msg }: { msg: string }) {
  return (
    <div style={{ background: "#fff5f5", border: "1px solid #fed7d7", borderRadius: 6, padding: "10px 14px", color: "#c53030", fontSize: 14, marginBottom: 16 }}>
      {msg}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 20px", overflowY: "auto" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 680, position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a2332", margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#718096" }}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
    </div>
  );
}

function Toggle({ value, onChange, onLabel, offLabel, onColor }: { value: boolean; onChange: () => void; onLabel: string; offLabel: string; onColor: string }) {
  return (
    <button
      onClick={onChange}
      style={{
        padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer",
        background: value ? onColor + "1a" : "#f0f0f0",
        color: value ? onColor : "#718096",
        border: `1px solid ${value ? onColor : "#e2e8f0"}`,
      }}
    >
      {value ? onLabel : offLabel}
    </button>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#718096",
  fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5,
};

const tdStyle: React.CSSProperties = {
  padding: "12px 16px", color: "#4a5568", verticalAlign: "middle",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 6,
  fontSize: 14, outline: "none", boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 13, fontWeight: 500, color: "#4a5568", marginBottom: 6,
};

const btnPrimary: React.CSSProperties = {
  background: "#6dbf8b", color: "#fff", border: "none", borderRadius: 8,
  padding: "9px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer",
  display: "flex", alignItems: "center", gap: 6,
};

const btnSecondary: React.CSSProperties = {
  background: "#f0f4f8", color: "#4a5568", border: "1px solid #e2e8f0", borderRadius: 8,
  padding: "9px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer",
};

const btnIconBlue: React.CSSProperties = {
  background: "#ebf8ff", color: "#2b6cb0", border: "1px solid #bee3f8",
  borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 14,
};

const btnIconRed: React.CSSProperties = {
  background: "#fff5f5", color: "#c53030", border: "1px solid #fed7d7",
  borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 14,
};
