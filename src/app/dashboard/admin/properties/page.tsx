"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import { fetchAllProperties, deleteProperty, updatePropertyStatus } from "@/utils/dashboardApi";
import dayjs from "dayjs";
import {
  ADMIN_LISTING_CATEGORY_LABELS,
  ADMIN_LISTING_CATEGORY_OPTIONS,
  deriveListingCategory,
} from "@/data/commercialPropertyConfig";

interface Property {
  id: number; title: string; referenceNumber: string; category: string;
  listingCategory?: string; listingType: string; price?: number; city?: string; province?: string;
  suburb?: string;
  status: string; featuredImage?: string; isFeatured: boolean;
  createdAt: string; brokers?: { id: number; fullName: string }[];
  submittedByUser?: { id: number; name: string; email: string; avatar?: string; jobTitle?: string; company?: string };
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  draft:       { bg: "#f0f0f0",  color: "#718096" },
  pending:     { bg: "#fef9c3",  color: "#92400e" },
  published:   { bg: "#f0fff4",  color: "#276749" },
  under_offer: { bg: "#ebf8ff",  color: "#1a56db" },
  sold:        { bg: "#f3e8ff",  color: "#6b21a8" },
  leased:      { bg: "#fff7ed",  color: "#9a3412" },
  archived:    { bg: "#fef2f2",  color: "#991b1b" },
};

const WORKFLOW = ["draft", "pending", "published", "under_offer", "sold", "leased", "archived"];

const CATEGORY_LABELS: Record<string, string> = {
  commercial_office: "Commercial Office",
  retail: "Retail Property",
  industrial_warehouse: "Industrial Warehouse",
  development_land: "Development Land",
  mixed_use: "Mixed-Use",
  investment: "Investment",
  fuel_station: "Fuel Station",
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", listingCategory: "", category: "", listingType: "", search: "" });
  const [statusEditing, setStatusEditing] = useState<number | null>(null);

  const load = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const params: any = { page: p, limit: 15 };
      if (filters.status) params.status = filters.status;
      if (filters.listingCategory) params.listingCategory = filters.listingCategory;
      if (filters.category) params.category = filters.category;
      if (filters.listingType) params.listingType = filters.listingType;
      if (filters.search) params.search = filters.search;
      const res = await fetchAllProperties(params);
      setProperties(res.data.properties);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
      setPage(p);
    } catch { /* */ }
    setLoading(false);
  }, [filters]);

  useEffect(() => { load(1); }, [load]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this property?")) return;
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setTotal((t) => t - 1);
    } catch { alert("Failed to delete property."); }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updatePropertyStatus(id, status);
      setProperties((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));
    } catch { alert("Failed to update status."); }
    setStatusEditing(null);
  };

  return (
    <>
      <AdminHeader title="Property Management" onMenuToggle={() => {}} />
      <main style={{ padding: "24px 28px", flex: 1 }}>

        {/* Header Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", margin: 0 }}>All Properties</h2>
            <p style={{ color: "#718096", fontSize: 14, margin: "4px 0 0" }}>{total} properties total</p>
          </div>
          <Link href="/dashboard/admin/properties/add" style={{ ...btnPrimary, textDecoration: "none" }}>
            <i className="bi bi-plus-lg" /> Add Property
          </Link>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <input
            placeholder="Search title..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            style={{ ...filterInput, maxWidth: 220 }}
          />
          <Select value={filters.status} onChange={(v) => setFilters({ ...filters, status: v })} placeholder="All Statuses">
            {WORKFLOW.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
          </Select>
          <Select value={filters.listingCategory} onChange={(v) => setFilters({ ...filters, listingCategory: v })} placeholder="All Listing Pages">
            {ADMIN_LISTING_CATEGORY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </Select>
          <Select value={filters.category} onChange={(v) => setFilters({ ...filters, category: v })} placeholder="All Categories">
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </Select>
          <Select value={filters.listingType} onChange={(v) => setFilters({ ...filters, listingType: v })} placeholder="All Types">
            <option value="sale">For Sale</option>
            <option value="lease">For Lease</option>
            <option value="investment">Investment</option>
          </Select>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#a0aec0" }}>
            <i className="bi bi-arrow-repeat" style={{ fontSize: 28 }} />
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f7fafc" }}>
                  {["", "Reference", "Title", "Listing Page", "Property Type", "Type", "Price", "Location", "Status", "Brokers", "Actions"].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {properties.length === 0 ? (
                  <tr><td colSpan={11} style={{ padding: 40, textAlign: "center", color: "#a0aec0" }}>
                    No properties found. <Link href="/dashboard/admin/properties/add" style={{ color: "#6dbf8b" }}>Add one now</Link>
                  </td></tr>
                ) : (
                  properties.map((p) => {
                    const sc = STATUS_COLORS[p.status] || STATUS_COLORS.draft;
                    const normalizedListingCategory = deriveListingCategory(p.category, p.listingType);
                    return (
                      <tr key={p.id} style={{ borderBottom: "1px solid #f0f4f8" }}>
                        <td style={tdStyle}>
                          {p.featuredImage ? (
                            <img src={p.featuredImage} alt="" style={{ width: 48, height: 36, objectFit: "cover", borderRadius: 4 }} />
                          ) : (
                            <div style={{ width: 48, height: 36, background: "#f0f4f8", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <i className="bi bi-building" style={{ color: "#a0aec0" }} />
                            </div>
                          )}
                        </td>
                        <td style={{ ...tdStyle, fontFamily: "var(--site-font-family)", fontSize: 12, color: "#718096" }}>{p.referenceNumber}</td>
                        <td style={tdStyle}>
                          <div style={{ fontWeight: 500, color: "#2d3748" }}>{p.title}</div>
                          {p.isFeatured && <span style={{ fontSize: 11, background: "#fef9c3", color: "#92400e", padding: "1px 6px", borderRadius: 3, marginRight: 4 }}>Featured</span>}
                          {p.submittedByUser && (
                            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
                              {p.submittedByUser.avatar && (
                                <img src={p.submittedByUser.avatar} alt="" style={{ width: 18, height: 18, borderRadius: "50%", objectFit: "cover" }} />
                              )}
                              <span style={{ fontSize: 11, color: "#3498db", fontWeight: 600 }}>👤 {p.submittedByUser.name}</span>
                              {p.status === "pending" && <span style={{ fontSize: 10, background: "#fff3cd", color: "#856404", padding: "1px 5px", borderRadius: 4, fontWeight: 700 }}>CLIENT SUBMISSION</span>}
                            </div>
                          )}
                        </td>
                        <td style={tdStyle}>{ADMIN_LISTING_CATEGORY_LABELS[normalizedListingCategory] || "—"}</td>
                        <td style={tdStyle}>{CATEGORY_LABELS[p.category] || p.category}</td>
                        <td style={tdStyle}><span style={{ textTransform: "capitalize" }}>{p.listingType}</span></td>
                        <td style={tdStyle}>
                          {p.price ? `R ${p.price.toLocaleString()}` : "N/A"}
                        </td>
                        <td style={tdStyle}>{[p.suburb, p.city].filter(Boolean).join(", ") || p.city || "N/A"}</td>
                        <td style={tdStyle}>
                          {statusEditing === p.id ? (
                            <select
                              autoFocus
                              defaultValue={p.status}
                              onBlur={() => setStatusEditing(null)}
                              onChange={(e) => handleStatusChange(p.id, e.target.value)}
                              style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, border: "1px solid #e2e8f0" }}
                            >
                              {WORKFLOW.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                            </select>
                          ) : (
                            <button
                              onClick={() => setStatusEditing(p.id)}
                              style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", border: "none", background: sc.bg, color: sc.color }}
                            >
                              {p.status.replace("_", " ")}
                            </button>
                          )}
                        </td>
                        <td style={tdStyle}>
                          {p.brokers?.map((b) => (
                            <span key={b.id} style={{ fontSize: 12, background: "#f0f4f8", borderRadius: 4, padding: "2px 6px", marginRight: 4 }}>{b.fullName}</span>
                          ))}
                        </td>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <Link href={`/dashboard/admin/properties/${p.id}/edit`} style={btnIconBlue} title="Edit">
                              <i className="bi bi-pencil" />
                            </Link>
                            <button onClick={() => handleDelete(p.id)} style={btnIconRed} title="Delete">
                              <i className="bi bi-trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: 16, borderTop: "1px solid #f0f4f8" }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => load(p)}
                    style={{
                      width: 32, height: 32, borderRadius: 6, border: "1px solid #e2e8f0",
                      background: p === page ? "#6dbf8b" : "#fff", color: p === page ? "#fff" : "#4a5568",
                      cursor: "pointer", fontWeight: p === page ? 600 : 400, fontSize: 14,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}

function Select({ value, onChange, children, placeholder }: { value: string; onChange: (v: string) => void; children: React.ReactNode; placeholder: string }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={filterInput}>
      <option value="">{placeholder}</option>
      {children}
    </select>
  );
}

const thStyle: React.CSSProperties = { padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#718096", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 };
const tdStyle: React.CSSProperties = { padding: "12px 12px", color: "#4a5568", verticalAlign: "middle" };
const filterInput: React.CSSProperties = { padding: "7px 12px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 14, outline: "none", background: "#fff" };
const btnPrimary: React.CSSProperties = { background: "#6dbf8b", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const btnIconBlue: React.CSSProperties = { background: "#ebf8ff", color: "#2b6cb0", border: "1px solid #bee3f8", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 14, textDecoration: "none", display: "inline-block" };
const btnIconRed: React.CSSProperties = { background: "#fff5f5", color: "#c53030", border: "1px solid #fed7d7", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 14 };
