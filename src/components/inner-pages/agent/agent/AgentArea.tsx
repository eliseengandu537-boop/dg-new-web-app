"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { API_ROOT } from "@/utils/api";

interface Broker {
   id: number;
   fullName: string;
   position?: string;
   photo?: string;
   officeLocation?: string;
   specialization?: string;
}

const AgentArea = () => {
   const [brokers, setBrokers] = useState<Broker[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      axios.get(`${API_ROOT}/brokers/public`)
         .then(res => setBrokers(res.data))
         .catch(() => setBrokers([]))
         .finally(() => setLoading(false));
   }, []);

   if (loading) return (
      <div className="agent-section-two mt-130 xl-mt-100 mb-150 xl-mb-100">
         <div className="container text-center py-80"><p className="fs-20">Loading brokers...</p></div>
      </div>
   );

   if (brokers.length === 0) return (
      <div className="agent-section-two mt-130 xl-mt-100 mb-150 xl-mb-100">
         <div className="container text-center py-80"><p className="fs-20">No brokers available at this time.</p></div>
      </div>
   );

   return (
      <div style={{ background: "#f8f9fa", padding: "100px 0 80px" }}>
         <div className="container">
            {/* Section header */}
            <div style={{ textAlign:"center", marginBottom:64 }}>
               <p style={{ fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#c8973a", marginBottom:12 }}>Our Team</p>
               <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:700, color:"#0d1f2d", marginBottom:16, fontFamily:"var(--site-font-family)" }}>Commercial Property Specialists</h2>
               <div style={{ width:48, height:3, background:"#e8b86d", borderRadius:2, margin:"0 auto" }} />
            </div>

            <div className="row g-4 justify-content-center">
               {brokers.map((broker, i) => (
                  <div key={broker.id} className="col-xl-3 col-md-4 col-sm-6">
                     <div style={{ background:"#fff", borderRadius:16, overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,0.07)", border:"1px solid #f0f0f0", transition:"transform 0.3s, box-shadow 0.3s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform="translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 12px 40px rgba(0,0,0,0.13)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 4px 24px rgba(0,0,0,0.07)"; }}
                     >
                        {/* Photo */}
                        <div style={{ position:"relative", overflow:"hidden", background:"#eef2f5", aspectRatio:"4 / 5", minHeight:360 }}>
                           {broker.photo ? (
                              <Image src={broker.photo} alt={broker.fullName} width={400} height={480}
                                 style={{ objectFit:"cover", width:"100%", height:"100%", display:"block" }} unoptimized />
                           ) : (
                              <div style={{ height:"100%", background:"linear-gradient(135deg,#0d1f2d,#1a3a52)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                                 <i className="bi bi-person-circle" style={{ fontSize:80, color:"rgba(255,255,255,0.25)" }} />
                              </div>
                           )}
                           {/* Gold badge */}
                           <div style={{ position:"absolute", top:16, left:16, background:"#e8b86d", color:"#0d1f2d", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"4px 12px", borderRadius:20 }}>
                              DG Property
                           </div>
                        </div>

                        {/* Info */}
                        <div style={{ padding:"24px 24px 28px" }}>
                           <h6 style={{ fontSize:"1rem", fontWeight:700, color:"#0d1f2d", marginBottom:4 }}>
                              <Link href={`/agent_details?id=${broker.id}`} style={{ color:"inherit", textDecoration:"none" }}>
                                 {broker.fullName}
                              </Link>
                           </h6>
                           <p style={{ fontSize:"0.82rem", color:"#c8973a", fontWeight:600, marginBottom: broker.officeLocation ? 8 : 0 }}>
                              {broker.position || "Commercial Broker"}
                           </p>
                           {broker.officeLocation && (
                              <p style={{ fontSize:"0.78rem", color:"#888", marginBottom:0 }}>
                                 <i className="bi bi-geo-alt" style={{ marginRight:4 }} />{broker.officeLocation}
                              </p>
                           )}
                           <div style={{ borderTop:"1px solid #f0f0f0", marginTop:16, paddingTop:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                              <Link href={`/agent_details?id=${broker.id}`} style={{ fontSize:"0.78rem", fontWeight:600, color:"#0d1f2d", textDecoration:"none", letterSpacing:"0.05em", textTransform:"uppercase" }}>
                                 View Profile
                              </Link>
                              <Link href={`/agent_details?id=${broker.id}`} style={{ width:32, height:32, borderRadius:"50%", background:"#0d1f2d", display:"flex", alignItems:"center", justifyContent:"center", color:"#e8b86d", textDecoration:"none" }}>
                                 <i className="bi bi-arrow-up-right" style={{ fontSize:14 }} />
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default AgentArea
