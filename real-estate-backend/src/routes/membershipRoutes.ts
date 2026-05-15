import { Router } from "express";
import {
  getPlans, getAllPlans, createPlan, updatePlan, deletePlan,
  getAllSubscriptions, upsertSubscription, getMySubscription, activateSubscription,
} from "../controllers/MembershipController";
import { authenticateUser } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/roleMiddleware";

const router = Router();

// Public — list active plans
router.get("/plans/public", getPlans);

// Admin — plan management
router.get("/plans", authenticateUser, requireAdmin, getAllPlans);
router.post("/plans", authenticateUser, requireAdmin, createPlan);
router.put("/plans/:id", authenticateUser, requireAdmin, updatePlan);
router.delete("/plans/:id", authenticateUser, requireAdmin, deletePlan);

// Admin — subscriptions
router.get("/subscriptions", authenticateUser, requireAdmin, getAllSubscriptions);
router.post("/subscriptions", authenticateUser, requireAdmin, upsertSubscription);
router.patch("/subscriptions/:id/activate", authenticateUser, requireAdmin, activateSubscription);

// Client — own subscription
router.get("/my-subscription", authenticateUser, getMySubscription);

export default router;
