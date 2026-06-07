"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { recordPageView } from "@/utils/dashboardApi";

// Generates or retrieves a persistent anonymous browser ID (kept across visits
// so the same browser is counted once per day, not once ever).
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("_dg_sid");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("_dg_sid", id);
  }
  return id;
}

export default function PageViewTracker() {
  const pathname = usePathname();
  const lastRecorded = useRef<string | null>(null);

  useEffect(() => {
    // Don't track admin/dashboard pages.
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) return;

    // Record a view once per navigation (guards against StrictMode double-run).
    if (lastRecorded.current === pathname) return;
    lastRecorded.current = pathname;

    const sessionId = getSessionId();
    recordPageView(sessionId, pathname).catch(() => {
      lastRecorded.current = null;
    });
  }, [pathname]);

  return null;
}
