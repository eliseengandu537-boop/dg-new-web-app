"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { recordPageView } from "@/utils/dashboardApi";
import {
  CONSENT_CHANGE_EVENT,
  getAnalyticsSessionId,
  readConsent,
} from "@/utils/consent";

export default function PageViewTracker() {
  const pathname = usePathname();
  const lastRecorded = useRef<string | null>(null);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const updateConsent = () => {
      const allowed = readConsent() === "analytics";
      setAnalyticsAllowed(allowed);
      if (!allowed) lastRecorded.current = null;
    };

    updateConsent();
    window.addEventListener(CONSENT_CHANGE_EVENT, updateConsent);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, updateConsent);
  }, []);

  useEffect(() => {
    if (!analyticsAllowed) return;
    // Don't track admin/dashboard pages.
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) return;

    // Record a view once per navigation (guards against StrictMode double-run).
    if (lastRecorded.current === pathname) return;
    lastRecorded.current = pathname;

    const sessionId = getAnalyticsSessionId();
    recordPageView(sessionId, pathname).catch(() => {
      lastRecorded.current = null;
    });
  }, [analyticsAllowed, pathname]);

  return null;
}
