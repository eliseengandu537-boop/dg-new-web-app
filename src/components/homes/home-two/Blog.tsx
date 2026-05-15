import blog_data from "@/data/home-data/BlogData"
import Link from "next/link"

const Blog = ({ style }: any) => {
   return (
      <div style={{ background: "#fff", paddingTop: 90, paddingBottom: 90 }}>
         <div className="container">

            {/* Section header */}
            <div className="d-flex align-items-end justify-content-between mb-50 wow fadeInUp" style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: 24 }}>
               <div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#f0b95e", marginBottom: 10 }}>Market Intelligence</div>
                  <h2 className="font-garamond m0" style={{ fontSize: "2.4rem", color: "#0d1f2d", lineHeight: 1.15 }}>Latest Insights</h2>
                  <p className="m0 mt-2" style={{ fontSize: 16, color: "#6b7280" }}>Market updates and specialist insight from DG Property.</p>
               </div>
               <Link href="/blog_03" className="d-none d-md-inline-flex align-items-center gap-2 tran3s"
                  style={{ fontSize: 14, fontWeight: 600, color: "#0d1f2d", borderBottom: "1px solid #0d1f2d", paddingBottom: 2, whiteSpace: "nowrap" }}>
                  All Articles <i className="bi bi-arrow-up-right ms-1"></i>
               </Link>
            </div>

            {/* Blog cards */}
            <div className="row gx-4 gy-4">
               {blog_data.filter((items) => items.page === "home_2").map((item) => (
                  <div key={item.id} className="col-md-6 wow fadeInUp" data-wow-delay={item.data_delay_time}>
                     <article style={{ background: "#f8f9fa", borderRadius: 16, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                        <div className={`blog-meta-one post-img ${item.class_name}`} style={{ height: 280, position: "relative" }}>
                           <span style={{ position: "absolute", top: 16, left: 16, background: "#0d1f2d", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "5px 12px", borderRadius: 20 }}>
                              {item.date}
                           </span>
                        </div>
                        <div style={{ padding: "24px 28px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                           <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 10 }}>
                              <span style={{ color: "#f0b95e", fontWeight: 600 }}>{item.info_name}</span> {item.info_time} min read
                           </div>
                           <Link href="/blog_details" style={{ flex: 1 }}>
                              <h4 style={{ fontSize: 20, fontWeight: 600, color: "#0d1f2d", lineHeight: 1.5, marginBottom: 20 }}>{item.title}</h4>
                           </Link>
                           <Link href="/blog_details" className="d-inline-flex align-items-center gap-2 tran3s"
                              style={{ fontSize: 13, fontWeight: 700, color: "#0d1f2d", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #0d1f2d", paddingBottom: 2, width: "fit-content" }}>
                              Read Article <i className="bi bi-arrow-up-right"></i>
                           </Link>
                        </div>
                     </article>
                  </div>
               ))}
            </div>

            {/* Mobile CTA */}
            <div className="text-center mt-40 d-md-none">
               <Link href="/blog_03" className="btn-eight"><span>Explore All</span> <i className="bi bi-arrow-up-right"></i></Link>
            </div>

         </div>
      </div>
   )
}

export default Blog
