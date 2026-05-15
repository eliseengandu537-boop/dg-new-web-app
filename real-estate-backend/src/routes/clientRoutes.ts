import { Router } from "express";
import {
  getClientDashboard,
  getSavedProperties,
  saveProperty,
  unsaveProperty,
  getClientViewings,
  scheduleViewing,
  cancelViewing,
  getClientInquiries,
  getSavedSearches,
  saveSearch,
  deleteSavedSearch,
  getClientProfile,
  updateClientProfile,
  getClientListings,
  submitClientListing,
  updateClientListing,
  deleteClientListing,
  submitPaymentProof,
} from "../controllers/ClientController";
import { submitInquiry } from "../controllers/InquiryController";
import { createLead } from "../controllers/LeadController";
import { authenticateUser } from "../middleware/authMiddleware";
import { requireClient } from "../middleware/roleMiddleware";

const router = Router();

// Public inquiry submit (no auth)
router.post("/inquiries/submit", submitInquiry);

// Public lead capture (no auth)
router.post("/leads/capture", createLead);

// Authenticated client routes
router.use(authenticateUser, requireClient);

router.get("/dashboard", getClientDashboard);
router.get("/profile", getClientProfile);
router.put("/profile", updateClientProfile);

// Saved properties
router.get("/saved-properties", getSavedProperties);
router.post("/saved-properties/:propertyId", saveProperty);
router.delete("/saved-properties/:propertyId", unsaveProperty);

// Viewings
router.get("/viewings", getClientViewings);
router.post("/viewings", scheduleViewing);
router.patch("/viewings/:id/cancel", cancelViewing);

// Inquiries
router.get("/inquiries", getClientInquiries);

// Saved searches
router.get("/saved-searches", getSavedSearches);
router.post("/saved-searches", saveSearch);
router.delete("/saved-searches/:id", deleteSavedSearch);

// Client property listings
router.get("/listings", getClientListings);
router.post("/listings", submitClientListing);
router.put("/listings/:id", updateClientListing);
router.delete("/listings/:id", deleteClientListing);

// Payment / membership upgrade
router.post("/payment-proof", submitPaymentProof);

export default router;
