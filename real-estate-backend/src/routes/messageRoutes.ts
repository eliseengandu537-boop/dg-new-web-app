import { Router } from "express";
import { submitMessage, getAllMessages, updateMessage, deleteMessage } from "../controllers/MessageController";
import { authenticateUser } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/roleMiddleware";

const router = Router();

// Public — anyone can submit a contact message
router.post("/", submitMessage);

// Admin only
router.get("/", authenticateUser, requireAdmin, getAllMessages);
router.patch("/:id", authenticateUser, requireAdmin, updateMessage);
router.delete("/:id", authenticateUser, requireAdmin, deleteMessage);

export default router;
