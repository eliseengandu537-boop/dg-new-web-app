import { Router } from "express";
import {
  getAllBrokers,
  getPublicBrokers,
  getBrokerById,
  createBroker,
  updateBroker,
  deleteBroker,
  toggleBrokerActive,
  toggleBrokerWebsite,
  reorderBrokers,
} from "../controllers/BrokerController";
import { authenticateUser } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/roleMiddleware";
import { uploadBrokerPhoto } from "../middleware/uploadMiddleware";

const router = Router();

// Public
router.get("/public", getPublicBrokers);
router.get("/:id", getBrokerById);

// Admin only
router.get("/", authenticateUser, requireAdmin, getAllBrokers);
router.post("/", authenticateUser, requireAdmin, uploadBrokerPhoto, createBroker);
router.put("/:id", authenticateUser, requireAdmin, uploadBrokerPhoto, updateBroker);
router.delete("/:id", authenticateUser, requireAdmin, deleteBroker);
router.patch("/:id/toggle-active", authenticateUser, requireAdmin, toggleBrokerActive);
router.patch("/:id/toggle-website", authenticateUser, requireAdmin, toggleBrokerWebsite);
router.post("/reorder", authenticateUser, requireAdmin, reorderBrokers);

export default router;
