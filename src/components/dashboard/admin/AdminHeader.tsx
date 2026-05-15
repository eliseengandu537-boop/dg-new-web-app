"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  onMenuToggle: () => void;
}

export default function AdminHeader({ title, onMenuToggle }: Props) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("dg_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* */ }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("dg_token");
    localStorage.removeItem("dg_user");
    router.push("/login");
  };

  return (
    <header
      style={{
        height: 64,
        background: "#fff",
        borderBottom: "1px solid #e8edf2",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={onMenuToggle}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#4a5568" }}
        >
          <i className="bi bi-list" />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: "#1a2332", margin: 0 }}>{title}</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#2d3748" }}>{user?.name || "Admin"}</div>
          <div style={{ fontSize: 12, color: "#718096" }}>{user?.email || ""}</div>
        </div>
        <div
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#6dbf8b", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14,
          }}
        >
          {user?.name?.[0]?.toUpperCase() || "A"}
        </div>
      </div>
    </header>
  );
}
