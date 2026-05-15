import { Router } from "express";
import {
  getAllProperties,
  getPublicProperties,
  getPublicPropertySuggestions,
  getPropertyById,
  createProperty,
  updateProperty,
  updatePropertyStatus,
  deleteProperty,
} from "../controllers/PropertyController";
import { authenticateUser } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/roleMiddleware";
import { uploadAny } from "../middleware/uploadMiddleware";

const router = Router();

// Public
router.get("/public", getPublicProperties);
router.get("/public/suggestions", getPublicPropertySuggestions);
router.get("/public/:id", getPropertyById);

// Admin only
router.get("/", authenticateUser, requireAdmin, getAllProperties);
router.post("/", authenticateUser, requireAdmin, uploadAny, createProperty);
router.put("/:id", authenticateUser, requireAdmin, uploadAny, updateProperty);
router.patch("/:id/status", authenticateUser, requireAdmin, updatePropertyStatus);
router.delete("/:id", authenticateUser, requireAdmin, deleteProperty);

// Any authenticated user can view a property
router.get("/:id", authenticateUser, getPropertyById);

export default router;
