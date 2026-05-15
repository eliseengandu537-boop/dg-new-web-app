import { Router } from "express";
import {
  getAdminStats,
  getRecentInquiries,
  getAllClients,
  toggleClientActive,
  getPropertyStatusChart,
  getInquiryTrendChart,
  getMostSavedProperties,
  getPageViewStats,
  getPageViewTrend,
} from "../controllers/AdminController";
import {
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
  approveContact,
} from "../controllers/InquiryController";
import {
  getAllLeads,
  createLead,
  updateLead,
  deleteLead,
  convertLeadToClient,
} from "../controllers/LeadController";
import { authenticateUser } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/roleMiddleware";

const router = Router();

router.use(authenticateUser, requireAdmin);

// Stats
router.get("/stats", getAdminStats);
router.get("/stats/properties/status", getPropertyStatusChart);
router.get("/stats/inquiries/trend", getInquiryTrendChart);
router.get("/stats/pageviews", getPageViewStats);
router.get("/stats/pageviews/trend", getPageViewTrend);
router.get("/recent-inquiries", getRecentInquiries);
router.get("/most-saved-properties", getMostSavedProperties);

// Clients
router.get("/clients", getAllClients);
router.patch("/clients/:id/toggle-active", toggleClientActive);

// Inquiries
router.get("/inquiries", getAllInquiries);
router.patch("/inquiries/:id", updateInquiryStatus);
router.patch("/inquiries/:id/approve-contact", approveContact);
router.delete("/inquiries/:id", deleteInquiry);

// Leads
router.get("/leads", getAllLeads);
router.post("/leads", createLead);
router.put("/leads/:id", updateLead);
router.post("/leads/:id/convert-client", convertLeadToClient);
router.delete("/leads/:id", deleteLead);

export default router;
