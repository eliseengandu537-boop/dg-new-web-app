"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { readConsent, saveConsent, type ConsentChoice } from "@/utils/consent";

const CookieConsent = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [footerElement, setFooterElement] = useState<HTMLElement | null>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsOpen(readConsent() === null);
  }, []);

  useEffect(() => {
    setFooterElement(document.querySelector<HTMLElement>("[data-cookie-settings-slot]"));
  }, [pathname, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    firstButtonRef.current?.focus();

    const keepFocusInside = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') || [],
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", keepFocusInside);
    return () => {
      document.removeEventListener("keydown", keepFocusInside);
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setIsOpen(false);
  };

  if (!isOpen) {
    if (!footerElement) return null;

    return createPortal(
      <button type="button" className="dg-cookie-settings" onClick={() => setIsOpen(true)}>
        Cookie settings
      </button>,
      footerElement,
    );
  }

  return (
    <div className="dg-cookie-backdrop">
      <section
        ref={panelRef}
        className="dg-cookie-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div>
          <p className="dg-cookie-eyebrow">Your privacy choices</p>
          <h2 id="cookie-consent-title">Choose how this site measures visits</h2>
          <p id="cookie-consent-description">
            Essential storage keeps your choice and supports secure account features. Optional,
            first-party analytics records the page visited with a short-lived anonymous browser ID.
            There are no advertising trackers.
          </p>
          <Link href="/cookie-policy">Read the cookie policy</Link>
        </div>
        <div className="dg-cookie-actions">
          <button ref={firstButtonRef} type="button" className="dg-cookie-primary" data-cookie-choice="analytics" onClick={() => choose("analytics")}>
            Allow anonymous analytics
          </button>
          <button type="button" className="dg-cookie-secondary" data-cookie-choice="essential" onClick={() => choose("essential")}>
            Use essential only
          </button>
        </div>
      </section>
    </div>
  );
};

export default CookieConsent;
