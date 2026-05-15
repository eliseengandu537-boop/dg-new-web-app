"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderFour from "@/layouts/headers/HeaderFour";

const courseModules = [
  {
    title: "Cold Calling",
    icon: "bi-telephone-fill",
    lessons: [
      { name: "Master of Cold Calling", duration: "07:26" },
    ],
  },
  {
    title: "Qualifying Clients",
    icon: "bi-person-check-fill",
    lessons: [
      { name: "How to Qualify Clients", duration: null },
    ],
  },
  {
    title: "Networking with Purpose",
    icon: "bi-people-fill",
    lessons: [
      { name: "Where and how to network", duration: null },
    ],
  },
  {
    title: "Types of Assets",
    icon: "bi-building",
    lessons: [
      { name: "Understanding the types of Assets", duration: "06:28" },
      { name: "Types of Assets Quiz", duration: null },
    ],
  },
  {
    title: "Valuations",
    icon: "bi-graph-up",
    lessons: [
      { name: "Valuations", duration: "08:20" },
    ],
  },
  {
    title: "Legal Documentation",
    icon: "bi-file-earmark-text-fill",
    lessons: [
      { name: "Legal Documentation", duration: "03:35" },
    ],
  },
];

const materials = [
  "Course Handbook: A comprehensive guide covering key concepts and principles.",
  "Cold Calling Scripts: Templates and strategies for effective cold calling.",
  "Networking Guide: Tips and best practices for building a professional network.",
  "Property Types Cheat Sheet: A quick reference for understanding different commercial property assets.",
  "Rate and Zoning Analysis Worksheets: Tools for assessing property rates and zoning classifications.",
  "Client Qualification Forms: Templates to assess client needs and suitability for commercial property deals.",
  "Interactive Quizzes: Knowledge checks to reinforce learning and gauge progress.",
  "Video Tutorials: Expert-led videos explaining key concepts and techniques.",
  "Access to Online Community: A platform for networking with peers, instructors, and industry experts.",
];

const audience = [
  "Real Estate Brokers",
  "Entrepreneurs",
  "Brokers",
  "Commercial Property Brokers",
];

const learnings = [
  "Master the art of cold calling to generate leads and build client relationships.",
  "Develop effective networking strategies to expand your professional connections.",
  "Gain a solid understanding of different types of commercial property assets.",
  "Learn how to analyze property rates and zoning for successful deal-making.",
  "Understand client qualifications and how to assess their needs effectively.",
  "Navigate legal documentation and contracts with confidence and accuracy.",
];

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("info");
  const [openModules, setOpenModules] = useState<number[]>([0]);
  const [showBankDetails, setShowBankDetails] = useState(false);

  const toggleModule = (i: number) =>
    setOpenModules((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  return (
    <>
      <HeaderFour />
      <main style={{ background: "#f7f8fb", minHeight: "100vh" }}>
        {/* ── HERO BANNER ───────────────────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(135deg, #0a1828 0%, #1b3a50 70%, #0a1828 100%)",
            paddingTop: 140,
            paddingBottom: 60,
            position: "relative",
            overflow: "hidden",
          }}
        >
        {/* decorative blobs */}
        <span style={{ position:"absolute",width:500,height:500,borderRadius:"50%",background:"rgba(232,119,58,0.06)",top:-100,right:-100,zIndex:0 }} />
        <span style={{ position:"absolute",width:300,height:300,borderRadius:"50%",background:"rgba(232,119,58,0.04)",bottom:-80,left:-60,zIndex:0 }} />

        <div className="container position-relative" style={{ zIndex: 1 }}>
          {/* breadcrumb */}
          <nav style={{ marginBottom: 18 }}>
            <ol style={{ display:"flex",gap:8,alignItems:"center",listStyle:"none",padding:0,margin:0 }}>
              <li><Link href="/" style={{ color:"rgba(255,255,255,0.55)",fontSize:"0.85rem",textDecoration:"none" }}>Home</Link></li>
              <li style={{ color:"rgba(255,255,255,0.3)",fontSize:"0.85rem" }}>/</li>
              <li><Link href="/courses" style={{ color:"rgba(255,255,255,0.55)",fontSize:"0.85rem",textDecoration:"none" }}>Courses</Link></li>
              <li style={{ color:"rgba(255,255,255,0.3)",fontSize:"0.85rem" }}>/</li>
              <li style={{ color:"#e8773a",fontSize:"0.85rem" }}>Candidate Practitioner</li>
            </ol>
          </nav>

          <div className="row align-items-start g-5">
            <div className="col-lg-8">
              <span
                style={{
                  background:"rgba(232,119,58,0.18)",color:"#e8773a",
                  fontSize:"0.75rem",fontWeight:700,padding:"5px 14px",
                  borderRadius:20,textTransform:"uppercase",letterSpacing:"0.12em",
                  marginBottom:16,display:"inline-block",
                }}
              >
                Beginner
              </span>
              <h1
                className="font-garamond text-white"
                style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)",lineHeight:1.2,marginBottom:16 }}
              >
                Candidate Practitioner Course: Beginner
              </h1>
              <p style={{ color:"rgba(255,255,255,0.65)",fontSize:"0.85rem",marginBottom:28,fontStyle:"italic" }}>
                Uncategorized
              </p>

              {/* meta row */}
              <div style={{ display:"flex",gap:24,flexWrap:"wrap" }}>
                {[
                  { icon:"bi-star-fill",text:"Top Rated",color:"#f5c94e" },
                  { icon:"bi-people",text:"1 Enrolled",color:"#e8773a" },
                  { icon:"bi-clock",text:"30 Hours",color:"#e8773a" },
                  { icon:"bi-calendar3",text:"Last Updated Aug 1, 2025",color:"#e8773a" },
                ].map((m,i) => (
                  <span key={i} style={{ display:"flex",alignItems:"center",gap:7,color:"rgba(255,255,255,0.75)",fontSize:"0.88rem" }}>
                    <i className={`bi ${m.icon}`} style={{ color:m.color }} />
                    {m.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="row g-5 align-items-start">

          {/* LEFT COLUMN */}
          <div className="col-lg-8">

            {/* Video Player */}
            <div
              style={{
                borderRadius: 20, overflow: "hidden",
                boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
                marginBottom: 36,
                background: "#000",
                position: "relative",
                aspectRatio: "16/9",
              }}
            >
              <Image
                src="/assets/images/media/img_20.jpg"
                alt="Course Preview"
                fill
                style={{ objectFit: "cover", opacity: 0.7 }}
              />
              {/* play button */}
              <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:2 }}>
                <div
                  style={{
                    width:72,height:72,borderRadius:"50%",
                    background:"rgba(232,119,58,0.95)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    boxShadow:"0 8px 32px rgba(232,119,58,0.45)",
                    cursor:"pointer",
                    transition:"transform 0.2s",
                  }}
                >
                  <i className="bi bi-play-fill" style={{ fontSize:30,color:"#fff",marginLeft:4 }} />
                </div>
                <p style={{ color:"rgba(255,255,255,0.8)",fontSize:"0.85rem",marginTop:12 }}>
                  Preview this course
                </p>
              </div>
              {/* duration bar */}
              <div style={{ position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,0.75)",padding:"10px 18px",display:"flex",alignItems:"center",gap:12,zIndex:2 }}>
                <i className="bi bi-play-circle" style={{ color:"#fff",fontSize:18,cursor:"pointer" }} />
                <div style={{ flex:1,height:3,background:"rgba(255,255,255,0.25)",borderRadius:2,position:"relative" }}>
                  <div style={{ width:"35%",height:"100%",background:"#e8773a",borderRadius:2 }} />
                </div>
                <span style={{ color:"rgba(255,255,255,0.7)",fontSize:"0.78rem" }}>00:34 / 00:48</span>
                <i className="bi bi-volume-up" style={{ color:"#fff",fontSize:16,cursor:"pointer" }} />
                <i className="bi bi-fullscreen" style={{ color:"#fff",fontSize:14,cursor:"pointer" }} />
              </div>
            </div>

            {/* Tabs */}
            <div
              style={{
                display:"flex",gap:0,marginBottom:36,
                borderBottom:"2px solid #e8e8e8",
              }}
            >
              {(["info","reviews"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  style={{
                    padding:"12px 28px",
                    background:"none",border:"none",cursor:"pointer",
                    fontWeight:600,fontSize:"0.95rem",
                    color: activeTab===t ? "#e8773a" : "#888",
                    borderBottom: activeTab===t ? "2px solid #e8773a" : "2px solid transparent",
                    marginBottom:-2,
                    textTransform:"capitalize",
                    transition:"all 0.2s",
                  }}
                >
                  {t === "info" ? "Course Info" : "Reviews"}
                </button>
              ))}
            </div>

            {activeTab === "info" && (
              <>
                {/* About Course */}
                <div
                  style={{
                    background:"#fff",borderRadius:20,
                    padding:"36px 32px",marginBottom:28,
                    boxShadow:"0 4px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  <h3 style={{ fontSize:"1.3rem",fontWeight:700,color:"#0f1f2e",marginBottom:20 }}>
                    About Course
                  </h3>
                  <p style={{ fontSize:"0.95rem",color:"#555",lineHeight:1.85,marginBottom:16 }}>
                    Are you looking to break into the world of commercial property brokerage with the freedom to{" "}
                    <strong>shape your own career?</strong> The Candidate Practitioner for Commercial Property Broker
                    Selling course is the perfect starting point for individuals who want to build a{" "}
                    <strong>flexible, rewarding career in real estate.</strong>
                  </p>
                  <p style={{ fontSize:"0.95rem",color:"#555",lineHeight:1.85,marginBottom:16 }}>
                    This beginner-friendly course provides <strong>essential knowledge</strong> and{" "}
                    <strong>practical skills</strong> to get you started in the commercial property sector. You will
                    learn the fundamentals of cold calling and networking, two key strategies for building
                    relationships and growing your client base. Dive into the different types of commercial assets,
                    understand how to evaluate property rates and zones, and gain the expertise needed to assess
                    client qualifications and navigate the complexities of legal documentation.
                  </p>
                  <p style={{ fontSize:"0.95rem",color:"#555",lineHeight:1.85,marginBottom:16 }}>
                    Whether you&apos;re interested in creating your own business, establishing yourself as an independent
                    broker, or excelling in your role within a real estate company, this course offers the
                    foundational knowledge to help you succeed. It&apos;s ideal for individuals who value flexibility,
                    autonomy, and the opportunity to craft a career on their own terms.
                  </p>
                  <p style={{ fontSize:"0.95rem",color:"#555",lineHeight:1.85,marginBottom:16 }}>
                    With guidance from experienced industry professional and Director,{" "}
                    <strong>Michela De Gennaro</strong>, you&apos;ll be well-equipped to start your journey in commercial
                    property selling.
                  </p>
                  <p style={{ fontSize:"0.95rem",color:"#e8773a",lineHeight:1.85,fontWeight:600,margin:0 }}>
                    Join us today and start your path toward becoming a successful commercial property broker
                    with the freedom and flexibility you&apos;ve always wanted!
                  </p>
                </div>

                {/* What You'll Learn */}
                <div
                  style={{
                    background:"#fff",borderRadius:20,
                    padding:"36px 32px",marginBottom:28,
                    boxShadow:"0 4px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  <h3 style={{ fontSize:"1.3rem",fontWeight:700,color:"#0f1f2e",marginBottom:24 }}>
                    What Will You Learn?
                  </h3>
                  <div className="row g-3">
                    {learnings.map((item, i) => (
                      <div className="col-md-6" key={i}>
                        <div style={{ display:"flex",gap:12,alignItems:"flex-start" }}>
                          <div
                            style={{
                              width:26,height:26,borderRadius:"50%",flexShrink:0,
                              background:"rgba(232,119,58,0.12)",
                              display:"flex",alignItems:"center",justifyContent:"center",
                              marginTop:2,
                            }}
                          >
                            <i className="bi bi-check2" style={{ color:"#e8773a",fontSize:14,fontWeight:700 }} />
                          </div>
                          <p style={{ fontSize:"0.9rem",color:"#444",lineHeight:1.6,margin:0 }}>
                            <strong>{i+1}.</strong> {item}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Content */}
                <div
                  style={{
                    background: "#fff", borderRadius: 20,
                    padding: "36px 32px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* header row */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
                    <div>
                      <h3 style={{ fontSize:"1.3rem", fontWeight:700, color:"#0f1f2e", margin:0 }}>
                        Course Content
                      </h3>
                      <p style={{ fontSize:"0.82rem", color:"#aaa", margin:"5px 0 0" }}>
                        {courseModules.length} sections &bull;{" "}
                        {courseModules.reduce((a,m) => a + m.lessons.length, 0)} lessons
                      </p>
                    </div>
                    <button
                      onClick={() => setOpenModules(openModules.length === courseModules.length ? [] : courseModules.map((_,i)=>i))}
                      style={{ background:"none", border:"none", cursor:"pointer", color:"#e8773a", fontSize:"0.82rem", fontWeight:600, padding:0 }}
                    >
                      {openModules.length === courseModules.length ? "Collapse all" : "Expand all"}
                    </button>
                  </div>

                  <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                    {courseModules.map((mod, i) => {
                      const isOpen = openModules.includes(i);
                      return (
                        <div key={i}>
                          {/* divider */}
                          {i > 0 && <div style={{ height:1, background:"#f3f3f3" }} />}

                          {/* module header */}
                          <button
                            onClick={() => toggleModule(i)}
                            style={{
                              width:"100%", display:"flex", alignItems:"center",
                              justifyContent:"space-between", padding:"18px 4px",
                              background:"#fff", border:"none", cursor:"pointer",
                            }}
                          >
                            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                              {/* step number */}
                              <div
                                style={{
                                  width:38, height:38, borderRadius:"50%",
                                  background: isOpen ? "#e8773a" : "#f5f5f5",
                                  display:"flex", alignItems:"center", justifyContent:"center",
                                  flexShrink:0,
                                  transition:"background 0.2s",
                                }}
                              >
                                <span style={{ fontSize:"0.8rem", fontWeight:800, color: isOpen ? "#fff" : "#aaa" }}>
                                  {String(i+1).padStart(2,"0")}
                                </span>
                              </div>
                              <div style={{ textAlign:"left" }}>
                                <span style={{ fontWeight:700, color:"#0f1f2e", fontSize:"0.95rem", display:"block" }}>
                                  {mod.title}
                                </span>
                                <span style={{ fontSize:"0.78rem", color:"#bbb" }}>
                                  {mod.lessons.length} {mod.lessons.length === 1 ? "lesson" : "lessons"}
                                  {mod.lessons.some(l=>l.duration) && " · " + mod.lessons.filter(l=>l.duration).map(l=>l.duration).join(", ")}
                                </span>
                              </div>
                            </div>
                            <div
                              style={{
                                width:28, height:28, borderRadius:"50%",
                                background: isOpen ? "rgba(232,119,58,0.1)" : "#f5f5f5",
                                display:"flex", alignItems:"center", justifyContent:"center",
                                transition:"background 0.2s",
                              }}
                            >
                              <i
                                className={`bi bi-chevron-${isOpen ? "up" : "down"}`}
                                style={{ color: isOpen ? "#e8773a" : "#bbb", fontSize:13 }}
                              />
                            </div>
                          </button>

                          {/* lessons */}
                          {isOpen && (
                            <div
                              style={{
                                background:"#fafafa",
                                borderRadius:12,
                                marginBottom:4,
                                overflow:"hidden",
                              }}
                            >
                              {mod.lessons.map((lesson, j) => (
                                <div
                                  key={j}
                                  style={{
                                    display:"flex", alignItems:"center",
                                    justifyContent:"space-between",
                                    padding:"12px 18px",
                                    borderBottom: j < mod.lessons.length-1 ? "1px solid #efefef" : "none",
                                  }}
                                >
                                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                    <div
                                      style={{
                                        width:28, height:28, borderRadius:"50%",
                                        background:"rgba(232,119,58,0.08)",
                                        display:"flex", alignItems:"center", justifyContent:"center",
                                        flexShrink:0,
                                      }}
                                    >
                                      <i className="bi bi-play-fill" style={{ color:"#e8773a", fontSize:10, marginLeft:1 }} />
                                    </div>
                                    <span style={{ fontSize:"0.88rem", color:"#444" }}>{lesson.name}</span>
                                  </div>
                                  {lesson.duration ? (
                                    <span
                                      style={{
                                        fontSize:"0.75rem", color:"#e8773a", fontWeight:600,
                                        background:"rgba(232,119,58,0.08)",
                                        padding:"3px 10px", borderRadius:20,
                                      }}
                                    >
                                      {lesson.duration}
                                    </span>
                                  ) : (
                                    <i className="bi bi-lock" style={{ color:"#ccc", fontSize:13 }} />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {activeTab === "reviews" && (
              <div
                style={{
                  background:"#fff",borderRadius:20,
                  padding:"36px 32px",
                  boxShadow:"0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <h3 style={{ fontSize:"1.3rem",fontWeight:700,color:"#0f1f2e",marginBottom:28 }}>
                  Student Reviews
                </h3>
                {[
                  { name:"Khaya Nyamathe",role:"Commercial Property Broker",img:"/assets/images/agent/img_01.jpg",text:"Taking the property course has been a game-changer for me. It provided me with a solid understanding of the property market, investment strategies, and the legal aspects that come within the game. The course's practical approach made complex concepts easier to grasp, and the real-world examples helped me connect theory with practice." },
                  { name:"Cassidy O'Keefe",role:"Intern Broker",img:"/assets/images/agent/img_02.jpg",text:"This course has been an incredibly valuable experience, providing me with the essential knowledge and tools to excel as a broker. The insights gained have deepened my understanding of the industry, equipping me with strategies to navigate challenges and seize properties with confidence." },
                  { name:"Deylin Pillay",role:"Retail Property Broker",img:"/assets/images/agent/img_03.jpg",text:"This course has been a game-changer for me as a property broker! The knowledge and practical tips Michela shares are incredibly valuable and easy to apply. Since implementing what I've learned, I've closed more deals and grown so much in my career." },
                ].map((r,i) => (
                  <div
                    key={i}
                    style={{
                      display:"flex",gap:18,padding:"24px 0",
                      borderBottom: i<2 ? "1px solid #f0f0f0" : "none",
                    }}
                  >
                    <div style={{ width:52,height:52,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:"2px solid rgba(232,119,58,0.3)" }}>
                      <Image src={r.img} alt={r.name} width={52} height={52} style={{ objectFit:"cover",width:"100%",height:"100%" }} />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6 }}>
                        <div>
                          <span style={{ fontWeight:700,color:"#0f1f2e",fontSize:"0.95rem" }}>{r.name}</span>
                          <span style={{ color:"#e8773a",fontSize:"0.82rem",marginLeft:10 }}>{r.role}</span>
                        </div>
                        <div style={{ display:"flex",gap:2 }}>
                          {[1,2,3,4,5].map(s => <i key={s} className="bi bi-star-fill" style={{ color:"#f5c94e",fontSize:12 }} />)}
                        </div>
                      </div>
                      <p style={{ fontSize:"0.9rem",color:"#666",lineHeight:1.7,margin:0 }}>{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-lg-4">
            <div style={{ position:"sticky",top:100 }}>

              {/* Price Card */}
              <div
                style={{
                  background:"#fff",borderRadius:24,
                  boxShadow:"0 16px 48px rgba(0,0,0,0.12)",
                  overflow:"hidden",
                  marginBottom:24,
                  border:"1px solid #f0f0f0",
                }}
              >
                {/* top accent */}
                <div style={{ height:5,background:"linear-gradient(90deg,#e8773a,#ff9d5c)" }} />

                <div style={{ padding:"28px 28px 32px" }}>
                  {/* price */}
                  <div style={{ display:"flex",alignItems:"baseline",gap:8,marginBottom:20 }}>
                    <span style={{ fontSize:"2.2rem",fontWeight:900,color:"#0f1f2e" }}>R4&nbsp;000</span>
                    <span style={{ fontSize:"0.85rem",color:"#bbb",textDecoration:"line-through" }}>R5 000</span>
                  </div>

                  <button
                    onClick={() => setShowBankDetails((v) => !v)}
                    className="btn-nine text-uppercase"
                    style={{ display:"block",width:"100%",textAlign:"center",padding:"15px 20px",fontSize:"0.9rem",marginBottom:16,border:"none",cursor:"pointer" }}
                  >
                    <span>{showBankDetails ? "Hide Details ✕" : "Add to Cart 🛒"}</span>
                  </button>

                  {/* Bank Details Panel */}
                  {showBankDetails && (
                    <div
                      style={{
                        background:"linear-gradient(135deg,#0f1f2e 0%,#1b3a50 100%)",
                        borderRadius:16,
                        padding:"22px 20px",
                        marginBottom:16,
                        border:"1px solid rgba(232,119,58,0.25)",
                      }}
                    >
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:16 }}>
                        <i className="bi bi-bank2" style={{ color:"#e8773a",fontSize:18 }} />
                        <h6 style={{ color:"#fff",fontWeight:700,margin:0,fontSize:"0.95rem" }}>Payment Details</h6>
                      </div>
                      <p style={{ color:"rgba(255,255,255,0.6)",fontSize:"0.78rem",marginBottom:16 }}>
                        Please make an EFT payment using the details below and send your proof of payment to{" "}
                        <a href="mailto:info@dg-property.co.za" style={{ color:"#e8773a" }}>info@dg-property.co.za</a>
                      </p>
                      <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                        {[
                          { label:"Account Name", value:"DG Property" },
                          { label:"Bank", value:"First National Bank (FNB)" },
                          { label:"Account Number", value:"62924816392" },
                          { label:"Branch Code", value:"250655" },
                          { label:"Account Type", value:"Cheque / Current" },
                          { label:"Reference", value:"Your Full Name + Course" },
                          { label:"Amount", value:"R4 000.00" },
                        ].map((row,i) => (
                          <div
                            key={i}
                            style={{
                              display:"flex",justifyContent:"space-between",alignItems:"center",
                              padding:"9px 12px",borderRadius:8,
                              background:"rgba(255,255,255,0.06)",
                              gap:8,
                            }}
                          >
                            <span style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.55)",flexShrink:0 }}>{row.label}</span>
                            <span style={{ fontSize:"0.85rem",fontWeight:700,color:"#fff",textAlign:"right" }}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                      <p style={{ color:"rgba(255,255,255,0.5)",fontSize:"0.75rem",marginTop:14,marginBottom:0 }}>
                        Enrolment is confirmed once payment is verified. Courses begin within 24 to 48 hours.
                      </p>
                    </div>
                  )}

                  <p style={{ fontSize:"0.8rem",color:"#aaa",textAlign:"center",margin:"0 0 24px" }}>
                    30-day money-back guarantee
                  </p>

                  {/* meta info */}
                  <div style={{ display:"flex",flexDirection:"column",gap:13,paddingTop:20,borderTop:"1px solid #f0f0f0" }}>
                    {[
                      { icon:"bi-bar-chart-steps",label:"Level",value:"Beginner" },
                      { icon:"bi-people",label:"Enrolled",value:"1 Student" },
                      { icon:"bi-clock-history",label:"Duration",value:"30 Hours" },
                      { icon:"bi-calendar-check",label:"Last Updated",value:"August 1, 2025" },
                    ].map((m,i) => (
                      <div key={i} style={{ display:"flex",alignItems:"center",gap:12 }}>
                        <div style={{ width:34,height:34,borderRadius:8,background:"rgba(232,119,58,0.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                          <i className={`bi ${m.icon}`} style={{ color:"#e8773a",fontSize:15 }} />
                        </div>
                        <div>
                          <p style={{ fontSize:"0.72rem",color:"#aaa",margin:0,lineHeight:1 }}>{m.label}</p>
                          <p style={{ fontSize:"0.88rem",fontWeight:600,color:"#333",margin:0 }}>{m.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* instructor */}
                <div style={{ padding:"20px 28px",borderTop:"1px solid #f5f5f5",background:"#fafafa" }}>
                  <p style={{ fontSize:"0.72rem",color:"#aaa",textTransform:"uppercase",letterSpacing:"0.12em",margin:"0 0 12px" }}>A course by</p>
                  <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                    <div
                      style={{
                        width:42,height:42,borderRadius:"50%",
                        background:"linear-gradient(135deg,#e8773a,#c45d1e)",
                        display:"flex",alignItems:"center",justifyContent:"center",
                        flexShrink:0,
                      }}
                    >
                      <span style={{ color:"#fff",fontWeight:700,fontSize:"0.9rem" }}>MD</span>
                    </div>
                    <div>
                      <p style={{ fontWeight:700,color:"#0f1f2e",margin:0,fontSize:"0.95rem" }}>Michela De Gennaro</p>
                      <p style={{ color:"#e8773a",margin:0,fontSize:"0.78rem" }}>CEO &amp; Director</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Material Includes */}
              <div
                style={{
                  background:"#fff",borderRadius:20,
                  boxShadow:"0 8px 28px rgba(0,0,0,0.07)",
                  padding:"24px 24px",
                  marginBottom:24,
                  border:"1px solid #f0f0f0",
                }}
              >
                <h6 style={{ fontWeight:700,color:"#0f1f2e",marginBottom:18,fontSize:"0.95rem" }}>
                  Material Includes
                </h6>
                <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:10 }}>
                  {materials.map((m,i) => (
                    <li key={i} style={{ display:"flex",gap:9,alignItems:"flex-start" }}>
                      <i className="bi bi-check-circle-fill" style={{ color:"#e8773a",fontSize:13,flexShrink:0,marginTop:3 }} />
                      <span style={{ fontSize:"0.82rem",color:"#555",lineHeight:1.6 }}>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Audience */}
              <div
                style={{
                  background:"#fff",borderRadius:20,
                  boxShadow:"0 8px 28px rgba(0,0,0,0.07)",
                  padding:"24px 24px",
                  border:"1px solid #f0f0f0",
                }}
              >
                <h6 style={{ fontWeight:700,color:"#0f1f2e",marginBottom:18,fontSize:"0.95rem" }}>
                  Audience
                </h6>
                <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:10 }}>
                  {audience.map((a,i) => (
                    <li key={i} style={{ display:"flex",gap:9,alignItems:"center" }}>
                      <i className="bi bi-person-fill" style={{ color:"#e8773a",fontSize:13 }} />
                      <span style={{ fontSize:"0.85rem",color:"#555",fontWeight:500 }}>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
        </div>
      </main>
    </>
  );
}
