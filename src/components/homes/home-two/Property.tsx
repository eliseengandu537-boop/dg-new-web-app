"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import PropertyCard from "@/components/common/PropertyCard"
import { fetchPublicProperties } from "@/utils/dashboardApi"

const FEATURED_LIMIT = 6

const Property = () => {
   const [properties, setProperties] = useState<any[]>([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      setLoading(true)
      fetchPublicProperties({ featured: true, limit: FEATURED_LIMIT, page: 1 })
         .then((res) => {
            setProperties(res.data?.properties || [])
         })
         .catch(() => {
            setProperties([])
         })
         .finally(() => {
            setLoading(false)
         })
   }, [])

   return (
      <div style={{ background: "#f8f9fa", paddingTop: 90, paddingBottom: 90, marginTop: 0 }}>
         <div className="container">

            <div className="d-flex align-items-end justify-content-between mb-50 wow fadeInUp" style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: 24 }}>
               <div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#f0b95e", marginBottom: 10 }}>Current Listings</div>
                  <h2 className="font-garamond m0" style={{ fontSize: "2.4rem", color: "#0d1f2d", lineHeight: 1.15 }}>Featured Properties</h2>
                  <p className="m0 mt-2" style={{ fontSize: 16, color: "#6b7280" }}>
                     Featured listings selected in the admin dashboard and published from the live database.
                  </p>
               </div>
               <Link
                  href="/listing_07"
                  className="d-none d-md-inline-flex align-items-center gap-2 tran3s"
                  style={{ fontSize: 14, fontWeight: 600, color: "#0d1f2d", borderBottom: "1px solid #0d1f2d", paddingBottom: 2, whiteSpace: "nowrap" }}
               >
                  View All <i className="bi bi-arrow-up-right ms-1"></i>
               </Link>
            </div>

            {loading ? (
               <div className="text-center py-5">
                  <div className="spinner-border" role="status" />
                  <p className="mt-3" style={{ fontSize: 16, color: "#6b7280" }}>Loading featured properties...</p>
               </div>
            ) : properties.length === 0 ? (
               <div
                  className="text-center"
                  style={{
                     background: "#fff",
                     borderRadius: 20,
                     padding: "48px 24px",
                     boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                  }}
               >
                  <p className="m0" style={{ fontSize: 18, fontWeight: 600, color: "#0d1f2d" }}>No featured properties available right now.</p>
                  <p className="m0 mt-2" style={{ fontSize: 15, color: "#6b7280" }}>
                     Published properties marked as featured in the admin dashboard will appear here automatically.
                  </p>
               </div>
            ) : (
               <div className="row gx-4 gy-4">
                  {properties.map((item, index) => (
                     <div key={item.id} className="col-lg-4 col-md-6 d-flex wow fadeInUp" data-wow-delay={`${0.1 + (index % 3) * 0.1}s`}>
                        <PropertyCard item={item} detailsLink="/listing_details_06" />
                     </div>
                  ))}
               </div>
            )}

            <div className="text-center mt-40 d-md-none">
               <Link href="/listing_07" className="btn-eight"><span>View All Properties</span> <i className="bi bi-arrow-up-right"></i></Link>
            </div>

         </div>
      </div>
   )
}

export default Property
