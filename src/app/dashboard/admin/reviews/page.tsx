"use client";
import { useEffect, useState } from "react";
import { fetchAllReviews, updateReview, deleteReview } from "@/utils/dashboardApi";

interface Review {
  id: number;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  isFeatured: boolean;
  createdAt: string;
  property?: { id: number; title: string; referenceNumber: string };
  user?: { id: number; name: string; email: string };
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#e67e22",
  approved: "#27ae60",
  rejected: "#e74c3c",
};

const Stars = ({ rating }: { rating: number }) => (
  <span style={{ color: "#f1c40f", fontSize: 15 }}>
    {"★".repeat(Math.max(0, Math.min(5, rating)))}{"☆".repeat(Math.max(0, 5 - Math.min(5, rating)))}
  </span>
);

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async (p = 1) => {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, any> = { page: p, limit: 20 };
      if (statusFilter) params.status = statusFilter;
      const res = await fetchAllReviews(params);
      const d = res.data;
      setReviews(Array.isArray(d) ? d : (d.reviews || []));
      setTotal(d.total ?? 0);
      setTotalPages(d.totalPages ?? 1);
    } catch {
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(page); }, [page, statusFilter]);

  const handleUpdate = async (id: number, data: Partial<Review>) => {
    try {
      const res = await updateReview(id, data);
      const updated = res.data;
      setReviews((prev) => prev.map((r) => r.id === id ? updated : r));
      if (selected?.id === id) setSelected(updated);
    } catch {
      alert("Failed to update review.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this review permanently?")) return;
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
      alert("Failed to delete review.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#1a2332" }}>Reviews</h2>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{total} total reviews</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13 }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {error && <div style={{ background: "#fde", padding: 12, borderRadius: 8, color: "#c00", marginBottom: 16 }}>{error}</div>}
      {loading && <div style={{ textAlign: "center", padding: 40, color: "#666" }}>Loading...</div>}

      {/* Split layout when something is selected */}
      <div style={{ display: "flex", gap: 24 }}>
        {/* List */}
        <div style={{ flex: selected ? "0 0 520px" : "1", minWidth: 0 }}>
          {!loading && reviews.length === 0 && (
            <div style={{ textAlign: "center", padding: 60, color: "#aaa" }}>No reviews found.</div>
          )}

          {!loading && reviews.map((review) => (
            <div key={review.id}
              style={{
                background: selected?.id === review.id ? "#eef4ff" : "#fff",
                border: `1px solid ${selected?.id === review.id ? "#6dbf8b" : "#e8e8e8"}`,
                borderRadius: 10, padding: "16px 18px", marginBottom: 10,
                borderLeft: `4px solid ${STATUS_COLORS[review.status] || "#ccc"}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, color: "#1a2332", fontSize: 14 }}>{review.reviewerName}</div>
                  <div style={{ color: "#888", fontSize: 12 }}>{review.reviewerEmail}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <Stars rating={review.rating} />
                  <span style={{
                    background: (STATUS_COLORS[review.status] || "#ccc") + "22",
                    color: STATUS_COLORS[review.status] || "#555",
                    padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: "capitalize",
                  }}>{review.status}</span>
                </div>
              </div>

              {review.property && (
                <div style={{ color: "#6dbf8b", fontSize: 12, marginBottom: 6 }}>
                  {review.property.title} <span style={{ color: "#aaa" }}>#{review.property.referenceNumber}</span>
                </div>
              )}

              <div style={{ color: "#555", fontSize: 13, marginBottom: 12, lineHeight: 1.5 }}>
                {review.comment.length > 180 ? review.comment.slice(0, 180) + "..." : review.comment}
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {review.status === "pending" && (
                  <>
                    <button onClick={() => handleUpdate(review.id, { status: "approved" })} style={{ padding: "6px 14px", background: "#27ae6020", color: "#27ae60", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Approve</button>
                    <button onClick={() => handleUpdate(review.id, { status: "rejected" })} style={{ padding: "6px 14px", background: "#e74c3c20", color: "#e74c3c", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Reject</button>
                  </>
                )}
                {review.status === "approved" && (
                  <button onClick={() => handleUpdate(review.id, { status: "rejected" })} style={{ padding: "6px 14px", background: "#e74c3c20", color: "#e74c3c", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Reject</button>
                )}
                {review.status === "rejected" && (
                  <button onClick={() => handleUpdate(review.id, { status: "approved" })} style={{ padding: "6px 14px", background: "#27ae6020", color: "#27ae60", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Approve</button>
                )}

                <button
                  onClick={() => handleUpdate(review.id, { isFeatured: !review.isFeatured })}
                  style={{
                    padding: "6px 14px", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer",
                    background: review.isFeatured ? "#f1c40f20" : "#f0f0f0",
                    color: review.isFeatured ? "#d4a017" : "#888",
                  }}
                >{review.isFeatured ? "★ Featured" : "☆ Feature"}</button>

                <button onClick={() => setSelected(selected?.id === review.id ? null : review)} style={{ padding: "6px 14px", background: "#f0f7ff", color: "#3498db", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
                  {selected?.id === review.id ? "Close" : "View"}
                </button>

                <button onClick={() => handleDelete(review.id)} style={{ padding: "6px 12px", background: "#fde", color: "#e74c3c", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Delete</button>

                <span style={{ color: "#bbb", fontSize: 11, marginLeft: "auto" }}>{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)} style={{
                  padding: "6px 14px", borderRadius: 6,
                  background: p === page ? "#6dbf8b" : "#f0f0f0",
                  color: p === page ? "#fff" : "#333",
                  border: "none", cursor: "pointer",
                }}>{p}</button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 28, alignSelf: "flex-start", position: "sticky", top: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1a2332" }}>{selected.reviewerName}</h3>
                <div style={{ color: "#888", fontSize: 12 }}>{selected.reviewerEmail}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#aaa" }}>×</button>
            </div>

            <div style={{ marginBottom: 12 }}>
              <Stars rating={selected.rating} />
              <span style={{ marginLeft: 8, color: "#888", fontSize: 12 }}>{selected.rating} / 5</span>
            </div>

            {selected.property && (
              <div style={{ background: "#f6fdf9", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: "#999", marginBottom: 2 }}>Property</div>
                <div style={{ color: "#27ae60", fontWeight: 600 }}>
                  {selected.property.title} <span style={{ color: "#aaa", fontWeight: 400 }}>#{selected.property.referenceNumber}</span>
                </div>
              </div>
            )}

            <div style={{ background: "#f8f9fa", borderRadius: 8, padding: 14, color: "#333", lineHeight: 1.8, whiteSpace: "pre-wrap", fontSize: 13, marginBottom: 20 }}>
              {selected.comment}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {selected.status !== "approved" && (
                <button onClick={() => handleUpdate(selected.id, { status: "approved" })} style={{ padding: "9px 20px", background: "#27ae60", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Approve</button>
              )}
              {selected.status !== "rejected" && (
                <button onClick={() => handleUpdate(selected.id, { status: "rejected" })} style={{ padding: "9px 20px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Reject</button>
              )}
              <button onClick={() => handleUpdate(selected.id, { isFeatured: !selected.isFeatured })} style={{
                padding: "9px 20px", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer",
                background: selected.isFeatured ? "#f1c40f" : "#f0f0f0",
                color: selected.isFeatured ? "#fff" : "#666",
              }}>{selected.isFeatured ? "★ Unfeature" : "☆ Feature"}</button>
              <button onClick={() => handleDelete(selected.id)} style={{ padding: "9px 20px", background: "#fde", color: "#e74c3c", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
