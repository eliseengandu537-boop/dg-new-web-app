"use client";
import { useEffect, useState } from "react";
import ClientHeader from "@/components/dashboard/client/ClientHeader";
import { fetchSavedSearches, saveSearch, deleteSavedSearch } from "@/utils/dashboardApi";

interface SavedSearch {
  id: number; name: string; searchParams: any; alertsEnabled: boolean; createdAt: string;
}

export default function AlertsPage() {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formAlerts, setFormAlerts] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSavedSearches().then((r) => setSearches(r.data)).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!formName) return alert("Please enter a name.");
    setSaving(true);
    try {
      const res = await saveSearch({ name: formName, alertsEnabled: formAlerts, searchParams: {} });
      setSearches((p) => [res.data, ...p]);
      setShowForm(false); setFormName(""); setFormAlerts(true);
    } catch { alert("Failed to save search."); }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this saved search?")) return;
    try { await deleteSavedSearch(id); setSearches((p) => p.filter((x) => x.id !== id)); }
    catch { alert("Failed to delete."); }
  };

  const toggleAlert = async (s: SavedSearch) => {
    try {
      // Re-save with toggled alerts
      const res = await saveSearch({ name: s.name, alertsEnabled: !s.alertsEnabled, searchParams: s.searchParams });
      setSearches((p) => p.map((x) => x.id === s.id ? { ...x, alertsEnabled: !x.alertsEnabled } : x));
    } catch { alert("Failed to update alert."); }
  };

  return (
    <>
      <ClientHeader title="Alerts & Saved Searches" onMenuToggle={() => {}} />
      <main style={{ padding: "24px 28px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", margin: 0 }}>Saved Searches ({searches.length})</h2>
          <button onClick={() => setShowForm((p) => !p)} style={{ background: "#6dbf8b", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
            + Save Search
          </button>
        </div>

        {showForm && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "20px 22px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a2332", margin: "0 0 14px" }}>New Saved Search</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "end" }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#4a5568", marginBottom: 5 }}>Search Name</label>
                <input
                  type="text" value={formName} onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Offices in Cape Town under R5M"
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }}
                />
              </div>
              <button onClick={handleSave} disabled={saving} style={{ background: "#6dbf8b", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontWeight: 600, cursor: "pointer", fontSize: 14, whiteSpace: "nowrap" }}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 14, color: "#4a5568", cursor: "pointer" }}>
              <input type="checkbox" checked={formAlerts} onChange={(e) => setFormAlerts(e.target.checked)} />
              Enable email alerts for new matching properties
            </label>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#a0aec0" }}>Loading...</div>
        ) : searches.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <i className="bi bi-bell" style={{ fontSize: 48, color: "#e2e8f0" }} />
            <p style={{ color: "#a0aec0", marginTop: 12 }}>No saved searches yet. Save a search to get alerts when new properties match.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {searches.map((s) => (
              <div key={s.id} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: s.alertsEnabled ? "#f0fff4" : "#f7fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className={`bi ${s.alertsEnabled ? "bi-bell-fill" : "bi-bell-slash"}`} style={{ color: s.alertsEnabled ? "#6dbf8b" : "#a0aec0", fontSize: 18 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1a2332" }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "#a0aec0", marginTop: 2 }}>
                      Alerts: {s.alertsEnabled ? <span style={{ color: "#6dbf8b" }}>On</span> : <span>Off</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => toggleAlert(s)}
                    style={{ padding: "5px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", background: s.alertsEnabled ? "#fffbeb" : "#f0fff4", color: s.alertsEnabled ? "#92400e" : "#276749", border: `1px solid ${s.alertsEnabled ? "#fcd34d" : "#9ae6b4"}` }}
                  >
                    {s.alertsEnabled ? "Disable Alert" : "Enable Alert"}
                  </button>
                  <button onClick={() => handleDelete(s.id)} style={{ padding: "5px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", background: "#fff5f5", color: "#c53030", border: "1px solid #fed7d7" }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
