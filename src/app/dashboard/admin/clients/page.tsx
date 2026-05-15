"use client";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import { fetchAllClients, toggleClientActive } from "@/utils/dashboardApi";
import dayjs from "dayjs";

const isNew = (date: string) => dayjs().diff(dayjs(date), "day") <= 7;

interface Client {
  id: number; name: string; email: string; firstName?: string; lastName?: string;
  phoneNumber?: string; isActive: boolean; createdAt: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllClients().then((r) => { setClients(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleToggle = async (c: Client) => {
    try {
      const res = await toggleClientActive(c.id);
      setClients((prev) => prev.map((x) => x.id === c.id ? { ...x, isActive: res.data.isActive } : x));
    } catch { alert("Failed to update client status."); }
  };

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AdminHeader title="Client Management" onMenuToggle={() => {}} />
      <main style={{ padding: "24px 28px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", margin: 0 }}>Clients</h2>
            <p style={{ color: "#718096", fontSize: 14, margin: "4px 0 0" }}>{clients.length} registered clients</p>
          </div>
          <input
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px 14px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 14, width: 240 }}
          />
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f7fafc" }}>
                  {["Name", "Email", "Phone", "Status", "Registered", "Actions"].map((h) => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: "#a0aec0" }}>No clients found.</td></tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} style={{ borderBottom: "1px solid #f0f4f8" }}>
                      <td style={td}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#718096", fontSize: 13 }}>
                            {c.name[0]}
                          </div>
                          <div>
                            <div style={{ fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                              {c.firstName && c.lastName ? `${c.firstName} ${c.lastName}` : c.name}
                              {isNew(c.createdAt) && (
                                <span style={{ background: "#6dbf8b", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 10, letterSpacing: 0.5 }}>NEW</span>
                              )}
                            </div>
                            {(c.firstName || c.lastName) && <div style={{ fontSize: 12, color: "#718096" }}>{c.name}</div>}
                          </div>
                        </div>
                      </td>
                      <td style={td}>{c.email}</td>
                      <td style={td}>{c.phoneNumber || "N/A"}</td>
                      <td style={td}>
                        <span style={{
                          padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500,
                          background: c.isActive ? "#f0fff4" : "#fef2f2",
                          color: c.isActive ? "#276749" : "#991b1b",
                        }}>
                          {c.isActive ? "Active" : "Deactivated"}
                        </span>
                      </td>
                      <td style={td}>{dayjs(c.createdAt).format("DD MMM YYYY")}</td>
                      <td style={td}>
                        <button
                          onClick={() => handleToggle(c)}
                          style={{
                            padding: "5px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 500,
                            background: c.isActive ? "#fff5f5" : "#f0fff4",
                            color: c.isActive ? "#c53030" : "#276749",
                            border: `1px solid ${c.isActive ? "#fed7d7" : "#9ae6b4"}`,
                          }}
                        >
                          {c.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}

function Spinner() {
  return <div style={{ textAlign: "center", padding: 60, color: "#a0aec0" }}><i className="bi bi-arrow-repeat" style={{ fontSize: 28 }} /></div>;
}

const th: React.CSSProperties = { padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#718096", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 };
const td: React.CSSProperties = { padding: "12px 16px", color: "#4a5568", verticalAlign: "middle" };
