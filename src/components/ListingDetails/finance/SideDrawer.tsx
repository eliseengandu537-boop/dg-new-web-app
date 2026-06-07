"use client";

import { useEffect, type ReactNode } from "react";

interface SideDrawerProps {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}

const SideDrawer = ({ open, title, subtitle, onClose, children }: SideDrawerProps) => {
  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1200,
          background: "rgba(15,23,42,0.45)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 1201,
          width: "min(440px, 100vw)",
          background: "#fff",
          boxShadow: "-12px 0 40px rgba(15,23,42,0.18)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex", flexDirection: "column",
        }}
      >
        <header style={{
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16,
          padding: "22px 24px", borderBottom: "1px solid #eef2f7", flexShrink: 0,
        }}>
          <div>
            <h4 style={{ margin: 0, color: "#0f172a", fontSize: 20, fontWeight: 700, lineHeight: 1.25 }}>{title}</h4>
            {subtitle && <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13, lineHeight: 1.5 }}>{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              flexShrink: 0, width: 36, height: 36, borderRadius: "50%",
              border: "1px solid #e2e8f0", background: "#f8fafc", color: "#334155",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}
          >
            <i className="bi bi-x-lg" />
          </button>
        </header>

        <div style={{ padding: "22px 24px", overflowY: "auto", flex: 1 }}>
          {children}
        </div>
      </aside>
    </>
  );
};

export default SideDrawer;
