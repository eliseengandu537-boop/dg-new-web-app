"use client";

import { usePathname } from "next/navigation";
import { contactInfo } from "@/data/contact-info";

const PRIVATE_ROUTES = ["/dashboard", "/login", "/register"];

const WhatsAppSupport = () => {
  const pathname = usePathname();

  if (PRIVATE_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return null;
  }

  const pageUrl = `${contactInfo.websiteUrl}${pathname}`;
  const message = pathname.startsWith("/properties/")
    ? `Hello DG Property, I would like help with a property inquiry. I am viewing: ${pageUrl}`
    : "Hello DG Property, I would like help with a property inquiry.";
  const whatsappUrl = `${contactInfo.whatsappUrl}?text=${encodeURIComponent(message)}`;

  return (
    <a
      className="dg-whatsapp-support"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${contactInfo.tradingName} customer service on WhatsApp (opens in a new tab)`}
      title="Chat with DG Property on WhatsApp"
    >
      <span className="dg-whatsapp-icon" aria-hidden="true">
        <i className="bi bi-whatsapp" />
      </span>
    </a>
  );
};

export default WhatsAppSupport;
