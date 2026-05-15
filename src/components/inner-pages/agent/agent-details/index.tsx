import { Suspense } from "react"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterFour from "@/layouts/footers/FooterFour"
import BrokerDetailArea from "./BrokerDetailArea"
import Link from "next/link"

const AgentDetails = () => {
   return (
      <>
         <HeaderOne style={true} />

         {/* ── Hero Banner ── */}
         <div style={{
            position: "relative",
            width: "100%",
            minHeight: 360,
            backgroundImage: "url(/assets/images/media/img_49.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
         }}>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(100deg, rgba(13,31,45,0.90) 0%, rgba(13,31,45,0.60) 100%)" }} />
            <div style={{ position:"absolute", top:0, left:0, width:"100%", height:4, background:"linear-gradient(90deg,#c8973a,#e8b86d,#c8973a)" }} />
            <div className="container" style={{ position:"relative", zIndex:2, padding:"150px 0 70px" }}>
               <p style={{ fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#e8b86d", marginBottom:14 }}>De Gennaro Property</p>
               <h1 style={{ fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:700, color:"#fff", lineHeight:1.15, marginBottom:18, fontFamily:"var(--site-font-family)" }}>
                  Broker Profile
               </h1>
               <div style={{ width:42, height:3, background:"#e8b86d", borderRadius:2, marginBottom:20 }} />
               <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:"0.85rem", color:"rgba(255,255,255,0.55)" }}>
                  <Link href="/" style={{ color:"rgba(255,255,255,0.55)", textDecoration:"none" }}>Home</Link>
                  <span>/</span>
                  <Link href="/agent" style={{ color:"rgba(255,255,255,0.55)", textDecoration:"none" }}>Our Brokers</Link>
                  <span>/</span>
                  <span style={{ color:"#e8b86d" }}>Broker Profile</span>
               </div>
            </div>
         </div>

         <Suspense fallback={<div className="container text-center py-80"><p>Loading...</p></div>}>
            <BrokerDetailArea />
         </Suspense>
         <FooterFour />
      </>
   )
}

export default AgentDetails
