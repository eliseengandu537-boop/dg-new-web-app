import { Router } from "express";
import {
  getPublicStories,
  getPublicStoryBySlug,
  getAllStories,
  createStory,
  updateStory,
  deleteStory,
} from "../controllers/SuccessStoryController";
import { authenticateUser } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/roleMiddleware";
import { uploadStoryFiles } from "../middleware/uploadMiddleware";

const router = Router();

// Public
router.get("/public", getPublicStories);
router.get("/public/:slug", getPublicStoryBySlug);

// Admin
router.get("/", authenticateUser, requireAdmin, getAllStories);
router.post("/", authenticateUser, requireAdmin, uploadStoryFiles, createStory);
router.put("/:id", authenticateUser, requireAdmin, uploadStoryFiles, updateStory);
router.delete("/:id", authenticateUser, requireAdmin, deleteStory);

export default router;
