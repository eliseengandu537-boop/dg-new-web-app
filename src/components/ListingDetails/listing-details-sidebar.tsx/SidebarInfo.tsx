import Image from "next/image"
import Link from "next/link"

import infoAvatar from "@/assets/images/agent/img_06.jpg"
import { contactInfo } from "@/data/contact-info";
import { resolveMediaUrl } from "@/utils/publicMedia";

interface AgentInfo {
   type: "client" | "broker";
   planName: string;
   data: any;
}

interface Props {
   agentInfo?: AgentInfo | null;
}

const SidebarInfo = ({ agentInfo }: Props) => {
   const renderAvatar = (avatarUrl: string | null | undefined, name: string) => {
      const resolved = resolveMediaUrl(avatarUrl);

      if (resolved) {
         return (
            <img src={resolved} alt={name}
               className="lazy-img rounded-circle ms-auto me-auto"
               style={{ width: 104, height: 104, objectFit: "cover", display: "block", border: "4px solid #f5f7f2" }} />
         );
      }

      return (
         <div
            className="ms-auto me-auto"
            style={{
               width: 104,
               height: 104,
               borderRadius: "50%",
               background: "linear-gradient(135deg, #dfe7d5 0%, #f4f7ef 100%)",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               fontSize: 34,
               fontWeight: 700,
               color: "#586245",
               border: "4px solid #f5f7f2",
            }}
         >
            {name?.[0]?.toUpperCase() || "?"}
         </div>
      );
   };

   const renderContactRow = (icon: string, label: string, value: React.ReactNode) => (
      <div
         style={{
            display: "grid",
            gridTemplateColumns: "42px 1fr",
            gap: 12,
            alignItems: "start",
            padding: "14px 0",
            borderTop: "1px solid #edf0ea",
         }}
      >
         <div
            style={{
               width: 42,
               height: 42,
               borderRadius: 14,
               background: "#f4f7f1",
               color: "#586245",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               fontSize: 16,
            }}
         >
            <i className={`bi ${icon}`}></i>
         </div>
         <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#8a927f", marginBottom: 4 }}>
               {label}
            </div>
            <div style={{ color: "#203040", fontSize: 14, lineHeight: 1.7 }}>{value}</div>
         </div>
      </div>
   );

   // Dynamic agent from API
   if (agentInfo?.data) {
      const a = agentInfo.data;
      const isClient = agentInfo.type === "client";
      const avatarUrl = isClient ? a.avatar : a.photo;
      const name = isClient ? (a.name || `${a.firstName || ""} ${a.lastName || ""}`.trim()) : a.fullName;
      const role = isClient ? (a.jobTitle || a.company || "Property Owner") : (a.position || a.designation || "Property Broker");
      const phone = isClient ? (a.phoneNumber || a.whatsapp) : a.phone;
      const email = isClient ? a.email : a.email;
      const address = isClient ? a.address : a.officeLocation;
      const linkedin = isClient ? null : a.linkedin;

      return (
         <>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 18 }}>
               <span
                  style={{
                     display: "inline-flex",
                     alignItems: "center",
                     gap: 8,
                     borderRadius: 999,
                     padding: "8px 14px",
                     background: "#f4f7f1",
                     color: "#586245",
                     fontSize: 12,
                     fontWeight: 700,
                     letterSpacing: 1,
                     textTransform: "uppercase",
                  }}
               >
                  {isClient ? "Property Owner" : "Lead Broker"}
               </span>
               {isClient && agentInfo.planName && agentInfo.planName !== "Free" && (
                  <span style={{ color: "#276749", fontSize: 12, fontWeight: 700 }}>
                     {agentInfo.planName} Member
                  </span>
               )}
            </div>

            <div style={{ textAlign: "center", marginBottom: 24 }}>
               {renderAvatar(avatarUrl, name)}
               <h5 style={{ color: "#122231", fontSize: 24, margin: "18px 0 6px" }}>{name}</h5>
               <p style={{ color: "#667085", fontSize: 15, margin: 0 }}>{role}</p>
               <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.7, margin: "14px 0 0" }}>
                  {isClient
                     ? "Connect directly for ownership and property-specific information."
                     : "Reach out for pricing, availability, viewings and leasing guidance."}
               </p>
            </div>

            <div>
               {address && renderContactRow("bi-geo-alt", "Location", <span>{address}</span>)}
               {email && renderContactRow("bi-envelope", "Email", <Link href={`mailto:${email}`}>{email}</Link>)}
               {phone && renderContactRow("bi-telephone", "Phone", <Link href={`tel:${phone}`}>{phone}</Link>)}
               {isClient && a.whatsapp && a.whatsapp !== phone && (
                  renderContactRow("bi-whatsapp", "WhatsApp", <Link href={`https://wa.me/${a.whatsapp.replace(/\D/g, "")}`}>{a.whatsapp}</Link>)
               )}
               {linkedin && renderContactRow(
                  "bi-linkedin",
                  "LinkedIn",
                  <Link href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`} target="_blank" rel="noopener noreferrer">View Profile</Link>
               )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr 1fr" : "1fr", gap: 10, marginTop: 24 }}>
               {phone && (
                  <Link
                     href={`tel:${phone}`}
                     style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        borderRadius: 999,
                        padding: "14px 18px",
                        background: "#f4f7f1",
                        color: "#1d2d3d",
                        textDecoration: "none",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                     }}
                  >
                     Call now
                  </Link>
               )}
               <Link
                  href="/inquiry"
                  style={{
                     display: "inline-flex",
                     alignItems: "center",
                     justifyContent: "center",
                     gap: 8,
                     borderRadius: 999,
                     padding: "14px 18px",
                     background: "linear-gradient(135deg, #7a8561 0%, #5d6847 100%)",
                     color: "#fff",
                     textDecoration: "none",
                     fontSize: 13,
                     fontWeight: 700,
                     letterSpacing: 1,
                     textTransform: "uppercase",
                     boxShadow: "0 16px 28px rgba(93,104,71,0.18)",
                  }}
               >
                  Contact agent
               </Link>
            </div>
         </>
      );
   }

   // Fallback: static placeholder
   return (
      <>
         <div style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "8px 14px", background: "#f4f7f1", color: "#586245", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 18 }}>
            DG Property
         </div>
         <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Image src={infoAvatar} alt=""
               className="lazy-img rounded-circle ms-auto me-auto" />
            <h5 style={{ color: "#122231", fontSize: 24, margin: "18px 0 6px" }}>DG Property Advisor</h5>
            <p style={{ color: "#667085", fontSize: 15, margin: 0 }}>Commercial Property Broker</p>
         </div>
         <div>
            {renderContactRow("bi-geo-alt", "Location", <span>{contactInfo.fullAddress}</span>)}
            {renderContactRow("bi-envelope", "Email", <Link href={contactInfo.emailHref}>{contactInfo.emailDisplay}</Link>)}
            {renderContactRow("bi-telephone", "Phone", <Link href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</Link>)}
         </div>
         <Link
            href="/inquiry"
            style={{
               display: "inline-flex",
               alignItems: "center",
               justifyContent: "center",
               gap: 8,
               width: "100%",
               marginTop: 24,
               borderRadius: 999,
               padding: "14px 18px",
               background: "linear-gradient(135deg, #7a8561 0%, #5d6847 100%)",
               color: "#fff",
               textDecoration: "none",
               fontSize: 13,
               fontWeight: 700,
               letterSpacing: 1,
               textTransform: "uppercase",
            }}
         >
            Contact agent
         </Link>
      </>
   )
}

export default SidebarInfo
