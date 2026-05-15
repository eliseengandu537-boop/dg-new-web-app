"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { recordPageView } from "@/utils/dashboardApi";

const BROWSER_VIEW_RECORDED_KEY = "_dg_browser_view_recorded";

// Generates or retrieves a persistent anonymous browser ID
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
  const hasAttemptedRecord = useRef(false);

  useEffect(() => {
    // Don't track admin/dashboard pages.
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) return;

    // Record a browser only once across the whole site.
    if (localStorage.getItem(BROWSER_VIEW_RECORDED_KEY) === "true") return;
    if (hasAttemptedRecord.current) return;

    hasAttemptedRecord.current = true;
    const sessionId = getSessionId();
    recordPageView(sessionId, pathname)
      .then(() => {
        localStorage.setItem(BROWSER_VIEW_RECORDED_KEY, "true");
      })
      .catch(() => {
        hasAttemptedRecord.current = false;
      });
  }, [pathname]);

  return null;
}
