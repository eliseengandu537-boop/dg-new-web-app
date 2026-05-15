"use client";
import { useEffect, useState } from "react";
import ClientHeader from "@/components/dashboard/client/ClientHeader";
import { fetchClientViewings, cancelViewing } from "@/utils/dashboardApi";
import dayjs from "dayjs";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending: { bg: "#f0f4ff", color: "#4c6ef5" },
  confirmed: { bg: "#f0fff4", color: "#276749" },
  completed: { bg: "#f7fafc", color: "#718096" },
  cancelled: { bg: "#fff5f5", color: "#c53030" },
};

export default function ViewingsPage() {
  const [viewings, setViewings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientViewings().then((r) => setViewings(r.data)).finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id: number) => {
    if (!confirm("Cancel this viewing?")) return;
    try {
      await cancelViewing(id);
      setViewings((p) => p.map((v) => v.id === id ? { ...v, status: "cancelled" } : v));
    } catch { alert("Failed to cancel viewing."); }
  };

  return (
    <>
      <ClientHeader title="My Viewings" onMenuToggle={() => {}} />
      <main style={{ padding: "24px 28px", flex: 1 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", margin: "0 0 20px" }}>Scheduled Viewings ({viewings.length})</h2>
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#a0aec0" }}>Loading...</div>
        ) : viewings.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <i className="bi bi-calendar3" style={{ fontSize: 48, color: "#e2e8f0" }} />
            <p style={{ color: "#a0aec0", marginTop: 12 }}>No viewings scheduled.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {viewings.map((v: any) => {
              const sc = STATUS_COLORS[v.status] || { bg: "#e2e8f0", color: "#718096" };
              return (
                <div key={v.id} style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 120, height: 80, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                    {v.property?.featuredImage ? (
                      <img src={v.property.featuredImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className="bi bi-building" style={{ fontSize: 24, color: "#a0aec0" }} />
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#1a2332" }}>{v.property?.title || "Property Viewing"}</div>
                        <div style={{ fontSize: 13, color: "#718096", marginTop: 2 }}>
                          <i className="bi bi-geo-alt" style={{ marginRight: 4 }} />
                          {v.property?.city || "N/A"}
                        </div>
                      </div>
                      <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: sc.bg, color: sc.color }}>
                        {v.status}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: "#4a5568", marginBottom: 8 }}>
                      <i className="bi bi-clock" style={{ marginRight: 6 }} />
                      {dayjs(v.scheduledDate).format("dddd, DD MMMM YYYY [at] HH:mm")}
                    </div>
                    {v.notes && <div style={{ fontSize: 13, color: "#718096", marginBottom: 8 }}>{v.notes}</div>}
                    {v.status === "pending" && (
                      <button onClick={() => handleCancel(v.id)} style={{ padding: "5px 14px", borderRadius: 6, fontSize: 12, background: "#fff5f5", color: "#c53030", border: "1px solid #fed7d7", cursor: "pointer" }}>
                        Cancel Viewing
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
