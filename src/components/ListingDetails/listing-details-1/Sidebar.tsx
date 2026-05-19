import FeatureListing from "../listing-details-sidebar.tsx/FeatureListing"
import MortgageCalculator from "../listing-details-sidebar.tsx/MortgageCalculator"
import ScheduleForm from "../listing-details-sidebar.tsx/ScheduleForm"
import SidebarInfo from "../listing-details-sidebar.tsx/SidebarInfo"

interface AgentInfo { type: "client" | "broker"; planName: string; data: any }

const cardStyle: React.CSSProperties = {
   background: "#fff",
   border: "1px solid #e7ebf0",
   borderRadius: 28,
   padding: 28,
   boxShadow: "0 20px 48px rgba(15,34,49,0.08)",
};

const Sidebar = ({ agentInfo, propertyTitle, propertyId }: { agentInfo?: AgentInfo | null; propertyTitle?: string; propertyId?: number }) => {
   return (
      <div className="col-xl-4 col-lg-8 me-auto ms-auto">
         <div className="ms-xxl-3 lg-mt-80" style={{ position: "sticky", top: 140 }}>
            <div style={{ display: "grid", gap: 20 }}>
               <div className="agent-info" style={cardStyle}>
               <SidebarInfo agentInfo={agentInfo} />
            </div>
               <div className="tour-schedule" id="property-enquiry" style={cardStyle}>
               <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: "#8a927f", marginBottom: 8 }}>Enquire Now</div>
                  <h5 style={{ color: "#122231", fontSize: 26, marginBottom: 0 }}>Request more details</h5>
               </div>
               <ScheduleForm propertyId={propertyId} propertyTitle={propertyTitle} />
            </div>
               <div className="mortgage-calculator" style={cardStyle}>
               <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: "#8a927f", marginBottom: 8 }}>Finance Snapshot</div>
                  <h5 style={{ color: "#122231", fontSize: 26, marginBottom: 0 }}>Bond calculator</h5>
               </div>
               <MortgageCalculator sourceContext={propertyTitle} />
            </div>
            <FeatureListing />
            </div>
         </div>
      </div>
   )
}

export default Sidebar
