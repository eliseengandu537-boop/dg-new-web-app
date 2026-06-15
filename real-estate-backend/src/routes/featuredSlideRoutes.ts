import { Router } from "express";
import {
  getPublicSlides,
  getAllSlides,
  createSlide,
  updateSlide,
  deleteSlide,
} from "../controllers/FeaturedSlideController";
import { authenticateUser } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/roleMiddleware";
import { uploadFeaturedSlideImage } from "../middleware/uploadMiddleware";

const router = Router();

// Public
router.get("/public", getPublicSlides);

// Admin
router.get("/", authenticateUser, requireAdmin, getAllSlides);
router.post("/", authenticateUser, requireAdmin, uploadFeaturedSlideImage, createSlide);
router.put("/:id", authenticateUser, requireAdmin, uploadFeaturedSlideImage, updateSlide);
router.delete("/:id", authenticateUser, requireAdmin, deleteSlide);

export default router;
