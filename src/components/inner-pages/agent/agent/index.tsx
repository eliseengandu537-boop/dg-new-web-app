import HeaderOne from '@/layouts/headers/HeaderOne'
import FooterFour from '@/layouts/footers/FooterFour'
import AgentArea from './AgentArea'
import Link from 'next/link'

const Agent = () => {
   return (
      <>
         <HeaderOne style={true} />

         {/* ── Hero Banner ── */}
         <div style={{
            position: 'relative',
            width: '100%',
            minHeight: 520,
            backgroundImage: 'url(/assets/images/media/bro.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
         }}>
            {/* Overlay */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg, rgba(13,31,45,0.72) 0%, rgba(13,31,45,0.42) 52%, rgba(13,31,45,0.16) 100%)' }} />
            {/* Gold top bar */}
            <div style={{ position:'absolute', top:0, left:0, width:'100%', height:4, background:'linear-gradient(90deg,#c8973a,#e8b86d,#c8973a)' }} />

            <div className="container" style={{ position:'relative', zIndex:2, padding:'170px 0 92px' }}>
               <div className="row align-items-center">
                  <div className="col-lg-7">
                     <p style={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#e8b86d', marginBottom:16 }}>De Gennaro Property</p>
                     <h1 style={{ fontSize:'clamp(2rem,4.5vw,3.4rem)', fontWeight:700, color:'#fff', lineHeight:1.15, marginBottom:20, fontFamily:'var(--site-font-family)' }}>
                        Meet the Team<br />Behind DG Property.
                     </h1>
                     <div style={{ width:48, height:3, background:'#e8b86d', borderRadius:2, marginBottom:24 }} />
                     <p style={{ fontSize:'1rem', color:'rgba(255,255,255,0.70)', maxWidth:480, lineHeight:1.75 }}>
                        Leadership, operations and commercial property expertise working together to deliver outstanding results across South Africa.
                     </p>
                     <div style={{ display:'flex', gap:12, marginTop:32, flexWrap:'wrap' }}>
                        <Link href="/inquiry" style={{ padding:'12px 28px', background:'#e8b86d', color:'#0d1f2d', fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.1em', textTransform:'uppercase', borderRadius:4, textDecoration:'none' }}>Get In Touch</Link>
                        <Link href="/listing_01" style={{ padding:'12px 28px', border:'1px solid rgba(255,255,255,0.35)', color:'#fff', fontWeight:600, fontSize:'0.82rem', letterSpacing:'0.1em', textTransform:'uppercase', borderRadius:4, textDecoration:'none' }}>View Listings</Link>
                     </div>
                  </div>
                  <div className="col-lg-5 d-none d-lg-flex justify-content-end">
                     <div style={{ display:'flex', flexDirection:'column', gap:16, alignItems:'flex-end' }}>
                        {[['18+','Years Combined Experience'],['R250M+','Transactions Completed'],['3','Specialist Divisions']].map(([num,label],i) => (
                           <div key={i} style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:12, padding:'18px 28px', textAlign:'right', minWidth:220 }}>
                              <div style={{ fontSize:'1.8rem', fontWeight:700, color:'#e8b86d', lineHeight:1 }}>{num}</div>
                              <div style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.60)', marginTop:4 }}>{label}</div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <AgentArea />
         <FooterFour/>
      </>
   )
}

export default Agent
