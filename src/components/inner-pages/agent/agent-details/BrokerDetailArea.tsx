import Image from "next/image";
import Link from "next/link";
import { resolveMediaUrl } from "@/utils/publicMedia";
import { getPublicBrokerById } from "@/utils/publicServerApi";

const BrokerDetailArea = async ({ id }: { id?: string }) => {
  const broker = id ? await getPublicBrokerById(id).catch(() => null) : null;

  if (!broker) {
    return (
      <div style={{ padding: "80px 0 96px", textAlign: "center" }}>
        <div className="container">
          <div style={{ maxWidth: 560, margin: "0 auto", background: "#fff", borderRadius: 24, padding: "32px 24px", border: "1px solid rgba(13,31,45,0.08)", boxShadow: "0 12px 36px rgba(13,31,45,0.08)" }}>
            <p style={{ color: "#5f6b76", fontSize: "1rem", lineHeight: 1.7, marginBottom: 22 }}>
              Broker details are unavailable right now. Please go back to the team page and try another profile.
            </p>
            <Link href="/agent" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 22px", background: "#0d1f2d", color: "#fff", borderRadius: 999, textDecoration: "none", fontWeight: 700 }}>
              Back to Brokers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const bioParagraphs = broker.bio?.trim() ? broker.bio.split(/\n\n+/) : [];

  return (
    <div style={{ background:"#f8f9fa", padding:"80px 0 100px" }}>
      <div className="container">
        <div className="row g-5">

          {/* ── LEFT: Photo + contact card ── */}
          <div className="col-lg-4">
            <div style={{ position:"sticky", top:120 }}>

              {/* Photo card */}
              <div style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,0.08)", border:"1px solid #f0f0f0", marginBottom:24 }}>
                <div style={{ position:"relative", background:"#f0f0f0" }}>
                  {broker.photo ? (
                    <Image src={resolveMediaUrl(broker.photo)} alt={broker.fullName} width={500} height={560}
                      style={{ objectFit:"cover", width:"100%", height:"auto", display:"block" }} sizes="(max-width: 991px) 100vw, 33vw" />
                  ) : (
                    <div style={{ height:320, background:"linear-gradient(135deg,#0d1f2d,#1a3a52)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <i className="bi bi-person-circle" style={{ fontSize:100, color:"rgba(255,255,255,0.2)" }} />
                    </div>
                  )}
                  <div style={{ position:"absolute", top:16, left:16, background:"#e8b86d", color:"#0d1f2d", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"4px 12px", borderRadius:20 }}>
                    DG Property
                  </div>
                </div>
                <div style={{ padding:"24px 24px 28px" }}>
                  <h4 style={{ fontSize:"1.3rem", fontWeight:700, color:"#0d1f2d", marginBottom:4 }}>{broker.fullName}</h4>
                  <p style={{ fontSize:"0.88rem", color:"#c8973a", fontWeight:600, marginBottom: broker.officeLocation ? 12 : 0 }}>{broker.position || "Commercial Broker"}</p>
                  {broker.officeLocation && (
                    <p style={{ fontSize:"0.82rem", color:"#888", marginBottom:16 }}>
                      <i className="bi bi-geo-alt" style={{ marginRight:5 }} />{broker.officeLocation}
                    </p>
                  )}
                  {/* Social icons */}
                  <div style={{ display:"flex", gap:10 }}>
                    {broker.whatsapp && (
                      <a href={`https://wa.me/${broker.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
                        style={{ width:38, height:38, borderRadius:"50%", background:"#0d1f2d", display:"flex", alignItems:"center", justifyContent:"center", color:"#e8b86d", textDecoration:"none", fontSize:16 }}>
                        <i className="fa-brands fa-whatsapp" />
                      </a>
                    )}
                    {broker.linkedin && (
                      <a href={broker.linkedin} target="_blank" rel="noreferrer"
                        style={{ width:38, height:38, borderRadius:"50%", background:"#0d1f2d", display:"flex", alignItems:"center", justifyContent:"center", color:"#e8b86d", textDecoration:"none", fontSize:16 }}>
                        <i className="fa-brands fa-linkedin" />
                      </a>
                    )}
                    {broker.email && (
                      <a href={`mailto:${broker.email}`}
                        style={{ width:38, height:38, borderRadius:"50%", background:"#0d1f2d", display:"flex", alignItems:"center", justifyContent:"center", color:"#e8b86d", textDecoration:"none", fontSize:16 }}>
                        <i className="fa-regular fa-envelope" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact card */}
              <div style={{ background:"#0d1f2d", borderRadius:20, padding:"28px 24px", boxShadow:"0 8px 32px rgba(0,0,0,0.12)" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e8b86d", marginBottom:20 }}>Get In Touch</p>
                {broker.phone && (
                  <a href={`tel:${broker.phone}`} style={{ display:"flex", alignItems:"center", gap:12, color:"#fff", textDecoration:"none", marginBottom:14 }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(232,184,109,0.15)", border:"1px solid rgba(232,184,109,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <i className="bi bi-telephone-fill" style={{ color:"#e8b86d", fontSize:14 }} />
                    </div>
                    <span style={{ fontSize:"0.9rem", fontWeight:500 }}>{broker.phone}</span>
                  </a>
                )}
                {broker.email && (
                  <a href={`mailto:${broker.email}`} style={{ display:"flex", alignItems:"center", gap:12, color:"#fff", textDecoration:"none", marginBottom:20 }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(232,184,109,0.15)", border:"1px solid rgba(232,184,109,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <i className="bi bi-envelope-fill" style={{ color:"#e8b86d", fontSize:14 }} />
                    </div>
                    <span style={{ fontSize:"0.9rem", fontWeight:500 }}>{broker.email}</span>
                  </a>
                )}
                <Link href="/inquiry" style={{ display:"block", textAlign:"center", padding:"12px", background:"#e8b86d", color:"#0d1f2d", fontWeight:700, fontSize:"0.8rem", letterSpacing:"0.1em", textTransform:"uppercase", borderRadius:8, textDecoration:"none" }}>
                  Send a Message
                </Link>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Bio + details ── */}
          <div className="col-lg-8">

            {/* Info chips */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:40 }}>
              {broker.specialization && (
                <div style={{ background:"#fff", border:"1px solid #f0f0f0", borderRadius:40, padding:"8px 20px", fontSize:"0.82rem", fontWeight:600, color:"#0d1f2d", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
                  <i className="bi bi-briefcase" style={{ marginRight:7, color:"#c8973a" }} />{broker.specialization}
                </div>
              )}
              {broker.officeLocation && (
                <div style={{ background:"#fff", border:"1px solid #f0f0f0", borderRadius:40, padding:"8px 20px", fontSize:"0.82rem", fontWeight:600, color:"#0d1f2d", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
                  <i className="bi bi-geo-alt" style={{ marginRight:7, color:"#c8973a" }} />{broker.officeLocation}
                </div>
              )}
            </div>

            {/* Bio */}
            <div style={{ background:"#fff", borderRadius:20, padding:"40px", boxShadow:"0 4px 20px rgba(0,0,0,0.06)", border:"1px solid #f0f0f0", marginBottom:32 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
                <div style={{ width:4, height:28, background:"#e8b86d", borderRadius:2 }} />
                <h5 style={{ fontSize:"1.1rem", fontWeight:700, color:"#0d1f2d", margin:0 }}>About {broker.fullName}</h5>
              </div>
              {bioParagraphs.length > 0 ? (
                bioParagraphs.map((para, i) => (
                  <p key={i} style={{ fontSize:"0.97rem", lineHeight:1.85, color:"#555", marginBottom:16 }}>{para}</p>
                ))
              ) : (
                <p style={{ fontSize:"0.97rem", color:"#aaa", fontStyle:"italic" }}>Bio coming soon.</p>
              )}
            </div>

            {/* Details table */}
            {(broker.phone || broker.email || broker.officeLocation || broker.specialization) && (
              <div style={{ background:"#fff", borderRadius:20, padding:"32px 40px", boxShadow:"0 4px 20px rgba(0,0,0,0.06)", border:"1px solid #f0f0f0", marginBottom:32 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
                  <div style={{ width:4, height:28, background:"#e8b86d", borderRadius:2 }} />
                  <h5 style={{ fontSize:"1.1rem", fontWeight:700, color:"#0d1f2d", margin:0 }}>Broker Details</h5>
                </div>
                <div className="row g-3">
                  {[
                    broker.position && { icon:"bi-person-badge", label:"Position", value: broker.position },
                    broker.specialization && { icon:"bi-briefcase", label:"Specialization", value: broker.specialization },
                    broker.officeLocation && { icon:"bi-geo-alt", label:"Office Location", value: broker.officeLocation },
                    broker.phone && { icon:"bi-telephone", label:"Phone", value: <a href={`tel:${broker.phone}`} style={{ color:"#0d1f2d", textDecoration:"none" }}>{broker.phone}</a> },
                    broker.email && { icon:"bi-envelope", label:"Email", value: <a href={`mailto:${broker.email}`} style={{ color:"#c8973a", textDecoration:"none" }}>{broker.email}</a> },
                  ].filter(Boolean).map((row: any, i) => (
                    <div key={i} className="col-md-6">
                      <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                        <div style={{ width:36, height:36, borderRadius:8, background:"#f8f9fa", border:"1px solid #ebebeb", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <i className={`bi ${row.icon}`} style={{ color:"#c8973a", fontSize:15 }} />
                        </div>
                        <div>
                          <p style={{ fontSize:"0.68rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"#aaa", margin:"0 0 3px" }}>{row.label}</p>
                          <p style={{ fontSize:"0.9rem", fontWeight:600, color:"#0d1f2d", margin:0 }}>{row.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link href="/agent" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px", border:"2px solid #0d1f2d", color:"#0d1f2d", fontWeight:700, fontSize:"0.82rem", letterSpacing:"0.1em", textTransform:"uppercase", borderRadius:6, textDecoration:"none" }}>
              <i className="bi bi-arrow-left" />
              Back to All Brokers
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BrokerDetailArea;
