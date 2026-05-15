"use client";
import { useEffect, useState } from "react";
import { fetchAllMessages, updateMessage, deleteMessage } from "@/utils/dashboardApi";

interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  adminReply?: string;
  createdAt: string;
  property?: { id: number; title: string; referenceNumber: string };
  user?: { id: number; name: string; email: string };
}

const STATUS_COLORS: Record<string, string> = {
  new: "#e74c3c",
  read: "#3498db",
  replied: "#27ae60",
  archived: "#95a5a6",
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [statusEdit, setStatusEdit] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async (p = 1) => {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, any> = { page: p, limit: 20 };
      if (statusFilter) params.status = statusFilter;
      const res = await fetchAllMessages(params);
      const data = res.data;
      setMessages(Array.isArray(data) ? data : (data.messages || []));
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(page); }, [page, statusFilter]);

  const openMessage = async (msg: Message) => {
    setSelected(msg);
    setReplyText(msg.adminReply || "");
    setStatusEdit(msg.status);
    // Mark as read automatically if new
    if (msg.status === "new") {
      try {
        await updateMessage(msg.id, { status: "read" });
        setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, status: "read" } : m));
      } catch { /* silent */ }
    }
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await updateMessage(selected.id, { status: statusEdit, adminReply: replyText });
      const updated = res.data;
      setMessages((prev) => prev.map((m) => m.id === updated.id ? updated : m));
      setSelected(updated);
    } catch {
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this message? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
      alert("Failed to delete message.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: 24, height: "100%" }}>
      {/* ── List panel ─────────────────────────────────────────────── */}
      <div style={{ flex: selected ? "0 0 480px" : "1", minWidth: 0 }}>
        {/* Toolbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#1a2332" }}>Messages</h2>
            <p style={{ margin: 0, color: "#666", fontSize: 13 }}>{total} total messages</p>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13 }}
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {loading && <div style={{ textAlign: "center", padding: 40, color: "#666" }}>Loading...</div>}
        {error && <div style={{ background: "#fde", padding: 14, borderRadius: 8, color: "#c00", marginBottom: 16 }}>{error}</div>}

        {!loading && messages.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "#888" }}>No messages found.</div>
        )}

        {!loading && messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => openMessage(msg)}
            style={{
              background: selected?.id === msg.id ? "#eef4ff" : "#fff",
              border: `1px solid ${selected?.id === msg.id ? "#6dbf8b" : "#e8e8e8"}`,
              borderRadius: 10, padding: "14px 16px", marginBottom: 8,
              cursor: "pointer", transition: "all 0.15s",
              borderLeft: `4px solid ${STATUS_COLORS[msg.status] || "#ccc"}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: msg.status === "new" ? 700 : 500, color: "#1a2332", fontSize: 14 }}>
                  {msg.name}
                </div>
                <div style={{ color: "#666", fontSize: 12 }}>{msg.email}</div>
                {msg.subject && <div style={{ color: "#444", fontSize: 13, marginTop: 4 }}>{msg.subject}</div>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <span style={{
                  background: STATUS_COLORS[msg.status] + "22",
                  color: STATUS_COLORS[msg.status],
                  padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: "capitalize"
                }}>{msg.status}</span>
                <span style={{ color: "#aaa", fontSize: 11 }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div style={{ color: "#555", fontSize: 12, marginTop: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 380 }}>
              {msg.message}
            </div>
            {msg.property && (
              <div style={{ color: "#6dbf8b", fontSize: 11, marginTop: 4 }}>
                Property: {msg.property.title}
              </div>
            )}
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} style={{
                padding: "6px 14px", borderRadius: 6,
                background: p === page ? "#6dbf8b" : "#f0f0f0",
                color: p === page ? "#fff" : "#333",
                border: "none", cursor: "pointer", fontWeight: p === page ? 700 : 400,
              }}>{p}</button>
            ))}
          </div>
        )}
      </div>

      {/* ── Detail panel ───────────────────────────────────────────── */}
      {selected && (
        <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 28, overflowY: "auto", alignSelf: "flex-start", position: "sticky", top: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a2332" }}>{selected.name}</h3>
              <div style={{ color: "#666", fontSize: 13 }}>{selected.email}{selected.phone ? ` · ${selected.phone}` : ""}</div>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#aaa" }}>×</button>
          </div>

          {selected.subject && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: "#999", marginBottom: 4 }}>Subject</div>
              <div style={{ fontWeight: 600, color: "#1a2332" }}>{selected.subject}</div>
            </div>
          )}

          {selected.property && (
            <div style={{ marginBottom: 14, padding: 10, background: "#f6fdf9", borderRadius: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: "#999", marginBottom: 2 }}>Property</div>
              <div style={{ color: "#27ae60", fontWeight: 600 }}>{selected.property.title} <span style={{ color: "#aaa", fontWeight: 400 }}>#{selected.property.referenceNumber}</span></div>
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: "#999", marginBottom: 6 }}>Message</div>
            <div style={{ background: "#f8f9fa", borderRadius: 8, padding: 14, color: "#333", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{selected.message}</div>
          </div>

          {/* Status */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Status</label>
            <select value={statusEdit} onChange={(e) => setStatusEdit(e.target.value)}
              style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13 }}>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Admin reply */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Admin Reply / Notes</label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={5}
              placeholder="Type a reply or internal note..."
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13, resize: "vertical", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleSave} disabled={saving} style={{
              flex: 1, padding: "11px 0", background: "#6dbf8b", color: "#fff",
              border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: saving ? "not-allowed" : "pointer",
            }}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={() => handleDelete(selected.id)} disabled={deleting} style={{
              padding: "11px 18px", background: "#e74c3c", color: "#fff",
              border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: deleting ? "not-allowed" : "pointer",
            }}>
              {deleting ? "..." : "Delete"}
            </button>
          </div>

          <div style={{ marginTop: 10, color: "#aaa", fontSize: 11, textAlign: "right" }}>
            Received {new Date(selected.createdAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
