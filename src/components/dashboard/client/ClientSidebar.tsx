"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { label: "Overview", href: "/dashboard/client", icon: "bi-grid-1x2" },
  { label: "My Membership", href: "/dashboard/client/membership", icon: "bi-credit-card" },
  { label: "My Listings", href: "/dashboard/client/listings", icon: "bi-building-add" },
  { label: "Saved Properties", href: "/dashboard/client/saved", icon: "bi-heart" },
  { label: "Viewings", href: "/dashboard/client/viewings", icon: "bi-calendar3" },
  { label: "Inquiries", href: "/dashboard/client/inquiries", icon: "bi-chat-dots" },
  { label: "Alerts & Searches", href: "/dashboard/client/alerts", icon: "bi-bell" },
  { label: "Profile", href: "/dashboard/client/profile", icon: "bi-person" },
];

export default function ClientSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("dg_token");
    localStorage.removeItem("dg_user");
    router.push("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 998, display: "none" }}
          className="sidebar-overlay"
        />
      )}
      <aside
        style={{
          width: 240, background: "#fff", borderRight: "1px solid #eef2f7",
          position: "fixed", top: 0, left: 0, height: "100vh",
          overflowY: "auto", zIndex: 999, display: "flex", flexDirection: "column",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "22px 20px 16px", borderBottom: "1px solid #eef2f7" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2332" }}>DG Property</div>
            <div style={{ fontSize: 12, color: "#6dbf8b", fontWeight: 500, marginTop: 2 }}>Client Portal</div>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "16px 0", flex: 1 }}>
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard/client" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 20px",
                  color: active ? "#6dbf8b" : "#4a5568", textDecoration: "none", fontSize: 14,
                  fontWeight: active ? 600 : 400, transition: "all 0.15s",
                  background: active ? "#f0fff4" : undefined,
                  borderRight: active ? "3px solid #6dbf8b" : "3px solid transparent",
                }}
              >
                <i className={`bi ${item.icon}`} style={{ fontSize: 16 }} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: 20, borderTop: "1px solid #eef2f7" }}>
          <button
            onClick={logout}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", background: "#f7fafc", border: "1px solid #e2e8f0", borderRadius: 8, color: "#718096", fontSize: 14, cursor: "pointer" }}
          >
            <i className="bi bi-box-arrow-right" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
