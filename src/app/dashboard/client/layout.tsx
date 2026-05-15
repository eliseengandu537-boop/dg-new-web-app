"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClientSidebar from "@/components/dashboard/client/ClientSidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("dg_token");
    if (!token) { router.replace("/login"); return; }
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f7fafc" }}>
        <div style={{ textAlign: "center", color: "#718096" }}>
          <i className="bi bi-arrow-repeat" style={{ fontSize: 32 }} />
          <p style={{ marginTop: 12 }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7fafc", display: "flex" }}>
      <ClientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{ flex: 1, marginLeft: 240, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}
