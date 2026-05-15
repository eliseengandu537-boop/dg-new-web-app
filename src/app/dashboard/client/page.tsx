"use client";
import { useEffect, useState } from "react";
import ClientHeader from "@/components/dashboard/client/ClientHeader";
import { fetchClientDashboard } from "@/utils/dashboardApi";
import dayjs from "dayjs";
import Link from "next/link";

interface DashboardData {
  savedCount: number;
  viewingCount: number;
  inquiryCount: number;
  savedSearchCount: number;
  recentViewings: any[];
  recentInquiries: any[];
}

export default function ClientOverviewPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientDashboard()
      .then((r) => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const viewingStatusColor: Record<string, string> = {
    pending: "#f0f4ff", confirmed: "#f0fff4", completed: "#f7fafc", cancelled: "#fff5f5",
  };
  const viewingStatusText: Record<string, string> = {
    pending: "#4c6ef5", confirmed: "#276749", completed: "#718096", cancelled: "#c53030",
  };
  const inquiryStatusColor: Record<string, string> = {
    new: "#ebf8ff", read: "#faf5ff", replied: "#f0fff4", closed: "#f7fafc",
  };
  const inquiryStatusText: Record<string, string> = {
    new: "#2b6cb0", read: "#6b21a8", replied: "#276749", closed: "#718096",
  };

  return (
    <>
      <ClientHeader title="My Dashboard" onMenuToggle={() => {}} />
      <main style={{ padding: "24px 28px", flex: 1 }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#a0aec0" }}>Loading...</div>
        ) : !data ? (
          <div style={{ textAlign: "center", padding: 80, color: "#a0aec0" }}>Unable to load dashboard data.</div>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
              {[
                { title: "Saved Properties", value: data.savedCount, icon: "bi-heart", color: "#e53e3e", href: "/dashboard/client/saved" },
                { title: "Scheduled Viewings", value: data.viewingCount, icon: "bi-calendar3", color: "#4c6ef5", href: "/dashboard/client/viewings" },
                { title: "Inquiries Sent", value: data.inquiryCount, icon: "bi-chat-dots", color: "#6dbf8b", href: "/dashboard/client/inquiries" },
                { title: "Saved Searches", value: data.savedSearchCount, icon: "bi-bell", color: "#f6ad55", href: "/dashboard/client/alerts" },
              ].map((s) => (
                <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#fff", borderRadius: 12, padding: "20px 22px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", cursor: "pointer", transition: "box-shadow 0.15s" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontSize: 13, color: "#718096", fontWeight: 500 }}>{s.title}</span>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: s.color + "1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: 18 }} />
                      </div>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#1a2332" }}>{s.value}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* Recent Viewings */}
              <div style={{ background: "#fff", borderRadius: 12, padding: "20px 22px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a2332", margin: 0 }}>Recent Viewings</h3>
                  <Link href="/dashboard/client/viewings" style={{ fontSize: 13, color: "#6dbf8b", textDecoration: "none" }}>View all</Link>
                </div>
                {data.recentViewings.length === 0 ? (
                  <p style={{ color: "#a0aec0", fontSize: 14, textAlign: "center", padding: "20px 0" }}>No viewings scheduled yet.</p>
                ) : data.recentViewings.map((v: any) => (
                  <div key={v.id} style={{ padding: "10px 0", borderBottom: "1px solid #f0f4f8", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#2d3748" }}>{v.property?.title || "Property"}</div>
                      <div style={{ fontSize: 12, color: "#718096", marginTop: 2 }}>{dayjs(v.scheduledDate).format("DD MMM YYYY, HH:mm")}</div>
                    </div>
                    <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 500, background: viewingStatusColor[v.status] || "#e2e8f0", color: viewingStatusText[v.status] || "#718096" }}>
                      {v.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Recent Inquiries */}
              <div style={{ background: "#fff", borderRadius: 12, padding: "20px 22px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a2332", margin: 0 }}>Recent Inquiries</h3>
                  <Link href="/dashboard/client/inquiries" style={{ fontSize: 13, color: "#6dbf8b", textDecoration: "none" }}>View all</Link>
                </div>
                {data.recentInquiries.length === 0 ? (
                  <p style={{ color: "#a0aec0", fontSize: 14, textAlign: "center", padding: "20px 0" }}>No inquiries submitted yet.</p>
                ) : data.recentInquiries.map((inq: any) => (
                  <div key={inq.id} style={{ padding: "10px 0", borderBottom: "1px solid #f0f4f8", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#2d3748" }}>{inq.property?.title || "General Inquiry"}</div>
                      <div style={{ fontSize: 12, color: "#718096", marginTop: 2 }}>{dayjs(inq.createdAt).format("DD MMM YYYY")}</div>
                    </div>
                    <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 500, background: inquiryStatusColor[inq.status] || "#e2e8f0", color: inquiryStatusText[inq.status] || "#718096" }}>
                      {inq.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
