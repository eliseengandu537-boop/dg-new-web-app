"use client";
import { useEffect, useState } from "react";

export default function ClientHeader({ title, onMenuToggle }: { title: string; onMenuToggle: () => void }) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try { setUser(JSON.parse(localStorage.getItem("dg_user") || "{}")); } catch {}
  }, []);

  return (
    <header
      style={{
        height: 64, background: "#fff", borderBottom: "1px solid #eef2f7",
        display: "flex", alignItems: "center", padding: "0 24px",
        position: "sticky", top: 0, zIndex: 100, justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onMenuToggle} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }} className="d-lg-none">
          <i className="bi bi-list" style={{ fontSize: 22, color: "#4a5568" }} />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: "#1a2332", margin: 0 }}>{title}</h1>
      </div>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#2d3748" }}>{user.name || user.email}</div>
            <div style={{ fontSize: 11, color: "#6dbf8b" }}>Client</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#718096" }}>
            {user.name?.[0] || "C"}
          </div>
        </div>
      )}
    </header>
  );
}
