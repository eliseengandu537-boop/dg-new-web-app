import { Request, Response } from "express";
import { FeaturedSlide } from "../models/FeaturedSlide";

// ── Public: published slides ────────────────────────────────────────────────
export const getPublicSlides = async (_req: Request, res: Response): Promise<void> => {
  try {
    const slides = await FeaturedSlide.findAll({
      where: { isPublished: true },
      order: [["sortOrder", "ASC"], ["createdAt", "DESC"]],
    });
    res.json(slides);
  } catch {
    res.status(500).json({ error: "Failed to fetch slides" });
  }
};

// ── Admin: all slides ───────────────────────────────────────────────────────
export const getAllSlides = async (_req: Request, res: Response): Promise<void> => {
  try {
    const slides = await FeaturedSlide.findAll({ order: [["sortOrder", "ASC"], ["createdAt", "DESC"]] });
    res.json(slides);
  } catch {
    res.status(500).json({ error: "Failed to fetch slides" });
  }
};

// ── Admin: create slide ─────────────────────────────────────────────────────
export const createSlide = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file as Express.Multer.File | undefined;
    const body = req.body;

    const imageUrl = file
      ? `/uploads/slides/${file.filename}`
      : body.imageUrl || null;

    if (!imageUrl) {
      res.status(400).json({ error: "A slide image is required." });
      return;
    }

    const slide = await FeaturedSlide.create({
      title: body.title || null,
      subtitle: body.subtitle || null,
      status: body.status || null,
      imageUrl,
      linkUrl: body.linkUrl || null,
      sortOrder: parseInt(body.sortOrder) || 0,
      isPublished: body.isPublished === "true" || body.isPublished === true,
    });

    res.status(201).json(slide);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to create slide" });
  }
};

// ── Admin: update slide ─────────────────────────────────────────────────────
export const updateSlide = async (req: Request, res: Response): Promise<void> => {
  try {
    const slide = await FeaturedSlide.findByPk(req.params.id);
    if (!slide) { res.status(404).json({ error: "Slide not found" }); return; }

    const file = req.file as Express.Multer.File | undefined;
    const body = req.body;

    const imageUrl = file
      ? `/uploads/slides/${file.filename}`
      : slide.imageUrl;

    await slide.update({
      title: body.title ?? slide.title,
      subtitle: body.subtitle ?? slide.subtitle,
      status: body.status ?? slide.status,
      imageUrl,
      linkUrl: body.linkUrl ?? slide.linkUrl,
      sortOrder: body.sortOrder !== undefined ? parseInt(body.sortOrder) : slide.sortOrder,
      isPublished: body.isPublished !== undefined
        ? (body.isPublished === "true" || body.isPublished === true)
        : slide.isPublished,
    });

    res.json(slide);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to update slide" });
  }
};

// ── Admin: delete slide ─────────────────────────────────────────────────────
export const deleteSlide = async (req: Request, res: Response): Promise<void> => {
  try {
    const slide = await FeaturedSlide.findByPk(req.params.id);
    if (!slide) { res.status(404).json({ error: "Slide not found" }); return; }
    await slide.destroy();
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete slide" });
  }
};
