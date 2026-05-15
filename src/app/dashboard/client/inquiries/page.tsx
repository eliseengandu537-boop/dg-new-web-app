"use client";
import { useEffect, useState } from "react";
import ClientHeader from "@/components/dashboard/client/ClientHeader";
import { fetchClientInquiries } from "@/utils/dashboardApi";
import dayjs from "dayjs";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new: { bg: "#ebf8ff", color: "#2b6cb0" },
  read: { bg: "#faf5ff", color: "#6b21a8" },
  replied: { bg: "#f0fff4", color: "#276749" },
  closed: { bg: "#f7fafc", color: "#718096" },
};

export default function ClientInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientInquiries().then((r) => setInquiries(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <ClientHeader title="My Inquiries" onMenuToggle={() => {}} />
      <main style={{ padding: "24px 28px", flex: 1 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", margin: "0 0 20px" }}>Inquiry History ({inquiries.length})</h2>
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#a0aec0" }}>Loading...</div>
        ) : inquiries.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <i className="bi bi-chat-dots" style={{ fontSize: 48, color: "#e2e8f0" }} />
            <p style={{ color: "#a0aec0", marginTop: 12 }}>No inquiries submitted yet.</p>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f7fafc" }}>
                  {["Property", "Your Message", "Status", "Date"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#718096", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq: any) => {
                  const sc = STATUS_COLORS[inq.status] || { bg: "#e2e8f0", color: "#718096" };
                  return (
                    <tr key={inq.id} style={{ borderBottom: "1px solid #f0f4f8" }}>
                      <td style={{ padding: "12px 16px", verticalAlign: "middle" }}>
                        {inq.property ? (
                          <>
                            <div style={{ fontWeight: 500, color: "#2d3748" }}>{inq.property.title}</div>
                            <div style={{ fontSize: 11, color: "#a0aec0" }}>{inq.property.referenceNumber}</div>
                          </>
                        ) : <span style={{ color: "#a0aec0" }}>General Inquiry</span>}
                      </td>
                      <td style={{ padding: "12px 16px", color: "#718096", maxWidth: 320 }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inq.message}</div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: sc.bg, color: sc.color }}>
                          {inq.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#718096" }}>{dayjs(inq.createdAt).format("DD MMM YYYY")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
