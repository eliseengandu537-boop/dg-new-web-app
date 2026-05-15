import { Response, Request } from "express";
import { Review } from "../models/Review";
import { Property } from "../models/Property";
import { User } from "../models/User";

// ── Submit review (public/client) ─────────────────────────────────────
export const submitReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { propertyId, userId, reviewerName, reviewerEmail, rating, comment } = req.body;
    if (!comment || !rating) { res.status(400).json({ error: "Rating and comment required" }); return; }
    if (!reviewerName && !userId) { res.status(400).json({ error: "Reviewer name or user required" }); return; }
    const review = await Review.create({ propertyId, userId, reviewerName, reviewerEmail, rating, comment, status: "pending" });
    res.status(201).json(review);
  } catch {
    res.status(500).json({ error: "Failed to submit review" });
  }
};

// ── Get all reviews (admin) ────────────────────────────────────────────
export const getAllReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = "1", limit = "20" } = req.query;
    const where: any = {};
    if (status) where.status = status;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const { rows: reviews, count } = await Review.findAndCountAll({
      where,
      include: [
        { model: Property, attributes: ["id", "title", "referenceNumber"], required: false },
        { model: User, attributes: ["id", "name", "email"], required: false },
      ],
      order: [["createdAt", "DESC"]],
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
    });
    res.json({ reviews, total: count, page: pageNum, totalPages: Math.ceil(count / limitNum) });
  } catch {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// ── Approve / reject / feature review (admin) ─────────────────────────
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) { res.status(404).json({ error: "Review not found" }); return; }
    await review.update(req.body);
    res.json(review);
  } catch {
    res.status(500).json({ error: "Failed to update review" });
  }
};

// ── Delete review (admin) ──────────────────────────────────────────────
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) { res.status(404).json({ error: "Review not found" }); return; }
    await review.destroy();
    res.json({ message: "Review deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
