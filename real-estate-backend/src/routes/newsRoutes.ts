import { Router } from "express";
import {
  getPublicNews,
  getPublicNewsBySlug,
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/NewsController";
import { authenticateUser } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/roleMiddleware";
import { uploadNewsImage } from "../middleware/uploadMiddleware";

const router = Router();

// Public
router.get("/public", getPublicNews);
router.get("/public/:slug", getPublicNewsBySlug);

// Admin
router.get("/", authenticateUser, requireAdmin, getAllNews);
router.post("/", authenticateUser, requireAdmin, uploadNewsImage, createNews);
router.put("/:id", authenticateUser, requireAdmin, uploadNewsImage, updateNews);
router.delete("/:id", authenticateUser, requireAdmin, deleteNews);

export default router;
