"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard/admin", label: "Dashboard", icon: "bi-speedometer2" },
    ],
  },
  {
    label: "Listings",
    items: [
      { href: "/dashboard/admin/properties", label: "All Properties", icon: "bi-building" },
      { href: "/dashboard/admin/properties/add", label: "Add Property", icon: "bi-plus-square" },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/dashboard/admin/brokers", label: "Brokers", icon: "bi-person-badge" },
      { href: "/dashboard/admin/leads", label: "Bond Leads", icon: "bi-funnel" },
    ],
  },
  {
    label: "Communications",
    items: [
      { href: "/dashboard/admin/inquiries", label: "Inquiries", icon: "bi-chat-dots" },
      { href: "/dashboard/admin/messages", label: "Messages", icon: "bi-envelope" },
    ],
  },
  {
    label: "Engagement",
    items: [
      { href: "/dashboard/admin/reviews", label: "Reviews", icon: "bi-star" },
      { href: "/dashboard/admin/favorites", label: "Favorites", icon: "bi-heart" },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/dashboard/admin/success-stories", label: "Success Stories", icon: "bi-trophy" },
      { href: "/dashboard/admin/news", label: "Property News", icon: "bi-newspaper" },
    ],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("dg_token");
    localStorage.removeItem("dg_user");
    router.push("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 998, display: "none",
          }}
        />
      )}

      <aside
        className={`admin-sidebar ${isOpen ? "admin-sidebar--open" : ""}`}
        style={{
          width: 260,
          height: "100vh",
          background: "#1a2332",
          color: "#c8d0dc",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 999,
          overflowY: "auto",
          transition: "transform 0.25s ease",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/dashboard/admin" style={{ display: "block" }}>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, letterSpacing: 0.5 }}>
              <span style={{ color: "#6dbf8b" }}>DG</span> Property Admin
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 0" }}>
          {navGroups.map((group) => (
            <div key={group.label} style={{ marginBottom: 8 }}>
              <div style={{ padding: "6px 20px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2, color: "rgba(255,255,255,0.35)" }}>
                {group.label}
              </div>
              {group.items.map((item) => {
                const active =
                  item.href === "/dashboard/admin"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 20px", fontSize: 14,
                      color: active ? "#fff" : "#a0aec0",
                      background: active ? "rgba(109,191,139,0.15)" : "transparent",
                      borderLeft: active ? "3px solid #6dbf8b" : "3px solid transparent",
                      textDecoration: "none", transition: "all 0.15s",
                    }}
                  >
                    <i className={`bi ${item.icon}`} style={{ fontSize: 16, minWidth: 20, color: active ? "#6dbf8b" : "inherit" }} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%",
              background: "none", border: "none", color: "#fc8181", cursor: "pointer",
              fontSize: 14, padding: "8px 0",
            }}
          >
            <i className="bi bi-box-arrow-right" style={{ fontSize: 16 }} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
