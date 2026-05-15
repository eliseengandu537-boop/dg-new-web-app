import { Router } from "express";
import { submitReview, getAllReviews, updateReview, deleteReview } from "../controllers/ReviewController";
import { authenticateUser } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/roleMiddleware";

const router = Router();

// Public — submit review
router.post("/", submitReview);

// Admin only
router.get("/", authenticateUser, requireAdmin, getAllReviews);
router.patch("/:id", authenticateUser, requireAdmin, updateReview);
router.delete("/:id", authenticateUser, requireAdmin, deleteReview);

export default router;
