import { Response, Request } from "express";
import { Op } from "sequelize";
import { MembershipPlan } from "../models/MembershipPlan";
import { UserSubscription } from "../models/UserSubscription";
import { User } from "../models/User";

// ── Get all plans (public) ─────────────────────────────────────────────
export const getPlans = async (_req: Request, res: Response): Promise<void> => {
  try {
    const plans = await MembershipPlan.findAll({ where: { isActive: true }, order: [["sortOrder", "ASC"]] });
    res.json(plans);
  } catch {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
};

// ── Get all plans (admin, includes inactive) ──────────────────────────
export const getAllPlans = async (_req: Request, res: Response): Promise<void> => {
  try {
    const plans = await MembershipPlan.findAll({ order: [["sortOrder", "ASC"]] });
    res.json(plans);
  } catch {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
};

// ── Create plan ────────────────────────────────────────────────────────
export const createPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await MembershipPlan.create(req.body);
    res.status(201).json(plan);
  } catch {
    res.status(500).json({ error: "Failed to create plan" });
  }
};

// ── Update plan ────────────────────────────────────────────────────────
export const updatePlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await MembershipPlan.findByPk(req.params.id);
    if (!plan) { res.status(404).json({ error: "Plan not found" }); return; }
    await plan.update(req.body);
    res.json(plan);
  } catch {
    res.status(500).json({ error: "Failed to update plan" });
  }
};

// ── Delete plan ────────────────────────────────────────────────────────
export const deletePlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await MembershipPlan.findByPk(req.params.id);
    if (!plan) { res.status(404).json({ error: "Plan not found" }); return; }
    await plan.destroy();
    res.json({ message: "Plan deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete plan" });
  }
};

// ── Get all subscriptions (admin) ─────────────────────────────────────
export const getAllSubscriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, planId, page = "1", limit = "20" } = req.query;
    const where: any = {};
    if (status) where.status = status;
    if (planId) where.planId = planId;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const { rows: subscriptions, count } = await UserSubscription.findAndCountAll({
      where,
      include: [
        { model: User, attributes: ["id", "name", "email", "createdAt"] },
        { model: MembershipPlan, attributes: ["id", "name", "priceMonthly", "priceYearly"] },
      ],
      order: [["createdAt", "DESC"]],
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
    });
    res.json({ subscriptions, total: count, page: pageNum, totalPages: Math.ceil(count / limitNum) });
  } catch {
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
};

// ── Assign/update subscription (admin) ───────────────────────────────
export const upsertSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, planId, status, billingCycle, startDate, endDate, paymentReference, paymentProofUrl } = req.body;
    if (!userId || !planId) { res.status(400).json({ error: "userId and planId required" }); return; }

    // Cancel any existing active subscription for this user
    await UserSubscription.update({ status: "cancelled" }, { where: { userId, status: "active" } });

    const sub = await UserSubscription.create({ userId, planId, status: status || "active", billingCycle, startDate, endDate, paymentReference, paymentProofUrl });
    const full = await UserSubscription.findByPk(sub.id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: MembershipPlan, attributes: ["id", "name"] },
      ],
    });
    res.status(201).json(full);
  } catch {
    res.status(500).json({ error: "Failed to assign subscription" });
  }
};

// ── Get client's own subscription ─────────────────────────────────────
export const getMySubscription = async (req: any, res: Response): Promise<void> => {
  try {
    const sub = await UserSubscription.findOne({
      where: { userId: req.user.id, status: { [Op.in]: ["active", "pending_payment"] } },
      include: [{ model: MembershipPlan }],
      order: [["createdAt", "DESC"]],
    });
    res.json(sub || null);
  } catch {
    res.status(500).json({ error: "Failed to fetch subscription" });
  }
};

// ── Admin: activate a pending_payment subscription ────────────────────
export const activateSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const sub = await UserSubscription.findByPk(req.params.id);
    if (!sub) { res.status(404).json({ error: "Subscription not found" }); return; }
    await sub.update({ status: "active" });
    res.json(sub);
  } catch {
    res.status(500).json({ error: "Failed to activate subscription" });
  }
};
