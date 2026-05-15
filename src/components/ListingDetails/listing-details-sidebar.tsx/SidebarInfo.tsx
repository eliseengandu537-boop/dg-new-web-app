import Image from "next/image"
import Link from "next/link"

import infoAvatar from "@/assets/images/agent/img_06.jpg"
import { contactInfo } from "@/data/contact-info";

interface AgentInfo {
   type: "client" | "broker";
   planName: string;
   data: any;
}

interface Props {
   agentInfo?: AgentInfo | null;
}

const SidebarInfo = ({ agentInfo }: Props) => {
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
            {avatarUrl ? (
               <img src={avatarUrl} alt={name}
                  className="lazy-img rounded-circle ms-auto me-auto mt-3 avatar"
                  style={{ width: 90, height: 90, objectFit: "cover", display: "block" }} />
            ) : (
               <div className="ms-auto me-auto mt-3" style={{ width: 90, height: 90, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: "#718096" }}>
                  {name?.[0]?.toUpperCase() || "?"}
               </div>
            )}
            <div className="text-center mt-25">
               <h6 className="name">{name}</h6>
               <p className="fs-16">{role}</p>
               {isClient && agentInfo.planName && agentInfo.planName !== "Free" && (
                  <span style={{ background: "#f0fff4", color: "#276749", border: "1px solid #c6f6d5", borderRadius: 12, fontSize: 11, fontWeight: 600, padding: "3px 10px", display: "inline-block", marginBottom: 8 }}>
                     {agentInfo.planName} Member
                  </span>
               )}
            </div>
            <div className="divider-line mt-40 mb-45 pt-20">
               <ul className="style-none">
                  {address && (
                     <li style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                        <span style={{ fontWeight: 500 }}>Address:</span>
                        <span style={{ textAlign: "left" }}>{address}</span>
                     </li>
                  )}
                  {email && <li>Email: <span><Link href={`mailto:${email}`}>{email}</Link></span></li>}
                  {phone && <li>Phone: <span><Link href={`tel:${phone}`}>{phone}</Link></span></li>}
                  {isClient && a.whatsapp && a.whatsapp !== phone && (
                     <li>WhatsApp: <span><Link href={`https://wa.me/${a.whatsapp.replace(/\D/g,"")}`}>{a.whatsapp}</Link></span></li>
                  )}
                  {linkedin && (
                     <li>LinkedIn: <span><Link href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`} target="_blank" rel="noopener noreferrer">View Profile</Link></span></li>
                  )}
               </ul>
            </div>
            <Link href="/contact" className="btn-nine text-uppercase rounded-3 w-100 mb-10">CONTACT AGENT</Link>
         </>
      );
   }

   // Fallback: static placeholder
   return (
      <>
         <Image src={infoAvatar} alt=""
            className="lazy-img rounded-circle ms-auto me-auto mt-3 avatar" />
         <div className="text-center mt-25">
            <h6 className="name">DG Property Agent</h6>
            <p className="fs-16">Property Agent & Broker</p>
         </div>
         <div className="divider-line mt-40 mb-45 pt-20">
            <ul className="style-none">
               <li>Location: <span>{contactInfo.fullAddress}</span></li>
               <li>Email: <span><Link href={contactInfo.emailHref}>{contactInfo.emailDisplay}</Link></span></li>
               <li>Phone: <span><Link href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</Link></span></li>
            </ul>
         </div>
         <Link href="/contact" className="btn-nine text-uppercase rounded-3 w-100 mb-10">CONTACT AGENT</Link>
      </>
   )
}

export default SidebarInfo
