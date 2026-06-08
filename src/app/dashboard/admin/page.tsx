"use client";
import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import StatsCard from "@/components/dashboard/admin/StatsCard";
import { getApiErrorMessage } from "@/utils/apiError";
import {
  fetchAdminStats,
  fetchPropertyStatusChart,
  fetchPageViewStats,
  fetchPageViewTrend,
  fetchPageViewDaily,
  fetchRecentInquiries,
} from "@/utils/dashboardApi";
import dayjs from "dayjs";

interface Stats {
  totalProperties: number;
  activeListings: number;
  soldProperties: number;
  leasedProperties: number;
  totalBrokers: number;
  activeBrokers: number;
  totalLeads: number;
  newLeads: number;
  totalInquiries: number;
  newInquiries: number;
  investmentOpportunities: number;
  pendingViewings: number;
  totalPageViews: number;
}

interface PageViewStats {
  total: number; thisWeek: number; thisMonth: number;
  totalViews: number; uniqueBrowsers: number;
  viewsToday: number; browsersToday: number;
  viewsThisWeek: number; browsersThisWeek: number;
  viewsThisMonth: number; browsersThisMonth: number;
}
interface DailyPoint { date: string; label: string; views: number; browsers: number }
interface ChartPoint { status?: string; label?: string; fullLabel?: string; count: number }
interface Inquiry {
  id: number; name: string; email: string; phone?: string;
  message?: string; status: string; createdAt: string;
  property?: { title: string; referenceNumber: string };
}

const STATUS_COLORS: Record<string, string> = {
  draft: "#a0aec0", pending: "#ecc94b", published: "#48bb78",
  under_offer: "#4299e1", sold: "#805ad5", leased: "#ed8936", archived: "#fc8181",
};

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [statusChart, setStatusChart] = useState<ChartPoint[]>([]);
  const [pageViewStats, setPageViewStats] = useState<PageViewStats | null>(null);
  const [daily, setDaily] = useState<DailyPoint[]>([]);
  const [trendChart, setTrendChart] = useState<ChartPoint[]>([]);
  const [trendMode, setTrendMode] = useState<"weekly" | "monthly">("weekly");
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, statusRes, pvStatsRes, dailyRes, inquiryRes] = await Promise.all([
          fetchAdminStats(),
          fetchPropertyStatusChart(),
          fetchPageViewStats(),
          fetchPageViewDaily(30),
          fetchRecentInquiries(),
        ]);
        setStats(statsRes.data);
        setStatusChart(statusRes.data);
        setPageViewStats(pvStatsRes.data);
        setDaily(dailyRes.data);
        setRecentInquiries(inquiryRes.data);
      } catch (e: unknown) {
        setError(getApiErrorMessage(e, "Failed to load dashboard data."));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    fetchPageViewTrend(trendMode)
      .then((res) => setTrendChart(res.data))
      .catch(() => {});
  }, [trendMode]);

  if (loading) return (
    <>
      <AdminHeader title="Dashboard" onMenuToggle={() => setSidebarOpen(true)} />
      <main style={{ padding: 32, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
          <div style={{ textAlign: "center", color: "#718096" }}>
            <i className="bi bi-arrow-repeat" style={{ fontSize: 32, display: "block", marginBottom: 12 }} />
            Loading live data...
          </div>
        </div>
      </main>
    </>
  );

  if (error) return (
    <>
      <AdminHeader title="Dashboard" onMenuToggle={() => setSidebarOpen(true)} />
      <main style={{ padding: 32, flex: 1 }}>
        <div style={{ background: "#fff5f5", border: "1px solid #fed7d7", borderRadius: 8, padding: 20, color: "#c53030" }}>
          <strong>Error:</strong> {error}
        </div>
      </main>
    </>
  );

  const topCards = [
    { title: "Total Properties", value: stats!.totalProperties, icon: "bi-building", color: "#4299e1", sub: `${stats!.activeListings} active` },
    { title: "Properties Sold", value: stats!.soldProperties, icon: "bi-house-check", color: "#805ad5" },
    { title: "Properties Leased", value: stats!.leasedProperties, icon: "bi-key", color: "#ed8936" },
    { title: "Total Brokers", value: stats!.totalBrokers, icon: "bi-person-badge", color: "#6dbf8b", sub: `${stats!.activeBrokers} active` },
    { title: "Total Leads", value: stats!.totalLeads, icon: "bi-funnel", color: "#ecc94b", sub: `${stats!.newLeads} new`, href: "/dashboard/admin/leads" },
    { title: "Inquiries", value: stats!.totalInquiries, icon: "bi-chat-dots", color: "#fc8181", sub: `${stats!.newInquiries} unread` },
    { title: "Investment Opps", value: stats!.investmentOpportunities, icon: "bi-graph-up-arrow", color: "#667eea" },
    { title: "Website Views", value: pageViewStats?.totalViews ?? stats!.totalPageViews, icon: "bi-eye", color: "#f6ad55", sub: `${(pageViewStats?.uniqueBrowsers ?? 0).toLocaleString("en-ZA")} unique browsers` },
    { title: "Today", value: pageViewStats?.viewsToday ?? 0, icon: "bi-calendar-day", color: "#38b2ac", sub: `${(pageViewStats?.browsersToday ?? 0).toLocaleString("en-ZA")} browsers today` },
    { title: "Pending Viewings", value: stats!.pendingViewings, icon: "bi-calendar-check", color: "#4fd1c5" },
  ];

  const donutData = {
    labels: statusChart.map((s) => s.status),
    datasets: [{
      data: statusChart.map((s) => s.count),
      backgroundColor: statusChart.map((s) => STATUS_COLORS[s.status!] || "#a0aec0"),
      borderWidth: 2,
    }],
  };

  const latestTrendIndex = Math.max(trendChart.length - 1, 0);
  const trendRangeLabel = trendChart.length > 0
    ? `${trendChart[0].fullLabel || trendChart[0].label} - ${trendChart[trendChart.length - 1].fullLabel || trendChart[trendChart.length - 1].label}`
    : "No view data yet";
  const trendDescription = trendMode === "weekly"
    ? "Page views for each day of the current week."
    : "Page views by month for the last six months.";

  const barData = {
    labels: trendChart.map((t) => t.label),
    datasets: [{
      label: "Page views",
      data: trendChart.map((t) => t.count),
      backgroundColor: trendChart.map((_, index) => index === latestTrendIndex ? "#f6ad55" : "rgba(246, 173, 85, 0.42)"),
      hoverBackgroundColor: "#ed8936",
      borderRadius: 12,
      borderSkipped: false as const,
      maxBarThickness: trendMode === "weekly" ? 48 : 56,
    }],
  };

  const dailyData = {
    labels: daily.map((d) => d.label),
    datasets: [
      { label: "Views", data: daily.map((d) => d.views), backgroundColor: "#f6ad55", borderRadius: 5, maxBarThickness: 16 },
      { label: "Unique browsers", data: daily.map((d) => d.browsers), backgroundColor: "#4299e1", borderRadius: 5, maxBarThickness: 16 },
    ],
  };

  return (
    <>
      <AdminHeader title="Dashboard Overview" onMenuToggle={() => setSidebarOpen(true)} />
      <main style={{ padding: "24px 28px", flex: 1 }}>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {topCards.map((card) => (
            <StatsCard key={card.title} {...card} />
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 28 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1a2332", margin: 0 }}>Website Viewings</h3>
                <p style={{ margin: "6px 0 0", color: "#718096", fontSize: 13 }}>{trendDescription}</p>
              </div>
              <div style={{ display: "inline-flex", gap: 6, padding: 4, borderRadius: 999, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                {(["weekly", "monthly"] as const).map((m) => (
                  <button key={m} onClick={() => setTrendMode(m)} style={{
                    padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer",
                    border: "none",
                    background: trendMode === m ? "#f6ad55" : "transparent",
                    color: trendMode === m ? "#fff" : "#718096",
                    boxShadow: trendMode === m ? "0 8px 18px rgba(246,173,85,0.28)" : "none",
                  }}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, background: "#fff7ed", color: "#c26b14", fontSize: 12, fontWeight: 700 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f6ad55", display: "inline-block" }}></span>
                {trendRangeLabel}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>
                Updated from live page-view records
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 22 }}>
              <div style={{ background: "#fffbf5", border: "1px solid #fde8c8", borderRadius: 14, padding: "14px 18px" }}>
                <div style={{ fontSize: 11, color: "#a0aec0", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>This Week</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#1a2332", marginTop: 6 }}>{(pageViewStats?.viewsThisWeek ?? 0).toLocaleString("en-ZA")}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{(pageViewStats?.browsersThisWeek ?? 0).toLocaleString("en-ZA")} unique browsers</div>
              </div>
              <div style={{ background: "#fffbf5", border: "1px solid #fde8c8", borderRadius: 14, padding: "14px 18px" }}>
                <div style={{ fontSize: 11, color: "#a0aec0", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>This Month</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#1a2332", marginTop: 6 }}>{(pageViewStats?.viewsThisMonth ?? 0).toLocaleString("en-ZA")}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{(pageViewStats?.browsersThisMonth ?? 0).toLocaleString("en-ZA")} unique browsers</div>
              </div>
              <div style={{ background: "#fffbf5", border: "1px solid #fde8c8", borderRadius: 14, padding: "14px 18px" }}>
                <div style={{ fontSize: 11, color: "#a0aec0", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>All Time</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#1a2332", marginTop: 6 }}>{(pageViewStats?.totalViews ?? 0).toLocaleString("en-ZA")}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{(pageViewStats?.uniqueBrowsers ?? 0).toLocaleString("en-ZA")} unique browsers</div>
              </div>
            </div>

            <div style={{ height: 340 }}>
              <Bar
                data={barData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      displayColors: false,
                      backgroundColor: "#1a2332",
                      padding: 12,
                      callbacks: {
                        title: (items) => trendChart[items[0]?.dataIndex]?.fullLabel || items[0]?.label || "",
                        label: (context) => `Page views: ${Number(context.raw || 0).toLocaleString("en-ZA")}`,
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      border: { display: false },
                      ticks: {
                        color: "#718096",
                        font: { size: 12, weight: 700 },
                      },
                    },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        precision: 0,
                        color: "#94a3b8",
                        font: { size: 12 },
                      },
                      border: { display: false },
                      grid: {
                        color: "rgba(148,163,184,0.16)",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#2d3748", marginBottom: 16 }}>Properties by Status</h3>
            <Doughnut
              data={donutData}
              options={{
                responsive: true,
                plugins: { legend: { position: "bottom", labels: { boxWidth: 12 } } },
              }}
            />
          </div>
        </div>

        {/* Daily traffic — views & unique browsers per day */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1a2332", margin: 0 }}>Daily traffic</h3>
              <p style={{ margin: "6px 0 0", color: "#718096", fontSize: 13 }}>Page views and unique browsers for each of the last 30 days.</p>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#64748b" }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: "#f6ad55" }} /> Views
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#64748b" }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: "#4299e1" }} /> Unique browsers
              </span>
            </div>
          </div>

          <div style={{ height: 300, marginBottom: 20 }}>
            <Bar
              data={dailyData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "#1a2332",
                    padding: 12,
                    callbacks: {
                      title: (items) => daily[items[0]?.dataIndex]?.date || items[0]?.label || "",
                    },
                  },
                },
                scales: {
                  x: { grid: { display: false }, border: { display: false }, ticks: { color: "#94a3b8", font: { size: 11 }, maxRotation: 0, autoSkip: true } },
                  y: { beginAtZero: true, ticks: { precision: 0, color: "#94a3b8", font: { size: 12 } }, border: { display: false }, grid: { color: "rgba(148,163,184,0.16)" } },
                },
              }}
            />
          </div>

          <div style={{ overflowX: "auto", maxHeight: 280, overflowY: "auto", border: "1px solid #f0f4f8", borderRadius: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f7fafc" }}>
                  {["Date", "Views", "Unique browsers"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: h === "Date" ? "left" : "right", fontWeight: 600, color: "#718096", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, position: "sticky", top: 0, background: "#f7fafc" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {daily.length === 0 ? (
                  <tr><td colSpan={3} style={{ padding: "28px 16px", textAlign: "center", color: "#a0aec0" }}>No traffic recorded yet.</td></tr>
                ) : (
                  [...daily].reverse().map((d) => (
                    <tr key={d.date} style={{ borderTop: "1px solid #f0f4f8" }}>
                      <td style={{ padding: "10px 16px", color: "#2d3748", fontWeight: 500 }}>{dayjs(d.date).format("ddd, DD MMM YYYY")}</td>
                      <td style={{ padding: "10px 16px", textAlign: "right", color: "#2d3748", fontWeight: 700 }}>{d.views.toLocaleString("en-ZA")}</td>
                      <td style={{ padding: "10px 16px", textAlign: "right", color: "#4a5568" }}>{d.browsers.toLocaleString("en-ZA")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Inquiries Table */}
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #f0f4f8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#2d3748", margin: 0 }}>Recent Inquiries</h3>
            <a href="/dashboard/admin/inquiries" style={{ fontSize: 13, color: "#6dbf8b", textDecoration: "none" }}>View all →</a>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f7fafc" }}>
                  {["From", "Email", "Property", "Status", "Date"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#718096", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: "32px 16px", textAlign: "center", color: "#a0aec0" }}>
                      No inquiries yet.
                    </td>
                  </tr>
                ) : (
                  recentInquiries.map((inq) => (
                    <tr key={inq.id} style={{ borderBottom: "1px solid #f0f4f8" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 500, color: "#2d3748" }}>{inq.name}</td>
                      <td style={{ padding: "12px 16px", color: "#4a5568" }}>{inq.email}</td>
                      <td style={{ padding: "12px 16px", color: "#4a5568" }}>{inq.property?.title || "N/A"}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500,
                          background: inq.status === "new" ? "#ebf8ff" : "#f0fff4",
                          color: inq.status === "new" ? "#2b6cb0" : "#276749",
                        }}>
                          {inq.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#718096" }}>
                        {dayjs(inq.createdAt).format("DD MMM YYYY")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
