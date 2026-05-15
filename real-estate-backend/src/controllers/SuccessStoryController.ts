import { Request, Response } from "express";
import { SuccessStory } from "../models/SuccessStory";

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ── Public: published stories ──────────────────────────────────────────────
export const getPublicStories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const stories = await SuccessStory.findAll({
      where: { isPublished: true },
      order: [["sortOrder", "ASC"], ["createdAt", "DESC"]],
    });
    res.json(stories);
  } catch {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};

// ── Public: single story by slug ───────────────────────────────────────────
export const getPublicStoryBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const story = await SuccessStory.findOne({ where: { slug: req.params.slug, isPublished: true } });
    if (!story) { res.status(404).json({ error: "Story not found" }); return; }
    res.json(story);
  } catch {
    res.status(500).json({ error: "Failed to fetch story" });
  }
};

// ── Admin: all stories ─────────────────────────────────────────────────────
export const getAllStories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const stories = await SuccessStory.findAll({ order: [["sortOrder", "ASC"], ["createdAt", "DESC"]] });
    res.json(stories);
  } catch {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};

// ── Admin: create story ────────────────────────────────────────────────────
export const createStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const body = req.body;

    const imageUrl = files?.["image"]?.[0]
      ? `/uploads/stories/${files["image"][0].filename}`
      : body.imageUrl || null;

    const brochureUrl = files?.["brochure"]?.[0]
      ? `/uploads/stories/${files["brochure"][0].filename}`
      : null;

    const slug = body.slug?.trim()
      ? slugify(body.slug)
      : slugify(body.title || "story");

    // ensure unique slug
    const existing = await SuccessStory.findOne({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const story = await SuccessStory.create({
      title: body.title,
      slug: finalSlug,
      tag: body.tag || null,
      location: body.location || null,
      gla: body.gla || null,
      parking: body.parking || null,
      openingDate: body.openingDate || null,
      anchorTenant: body.anchorTenant || null,
      projectType: body.projectType || null,
      summary: body.summary || null,
      body: body.body || null,
      imageUrl,
      brochureUrl,
      googleMapsQuery: body.googleMapsQuery || null,
      sortOrder: parseInt(body.sortOrder) || 0,
      isPublished: body.isPublished === "true" || body.isPublished === true,
    });

    res.status(201).json(story);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to create story" });
  }
};

// ── Admin: update story ────────────────────────────────────────────────────
export const updateStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const story = await SuccessStory.findByPk(req.params.id);
    if (!story) { res.status(404).json({ error: "Story not found" }); return; }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const body = req.body;

    const imageUrl = files?.["image"]?.[0]
      ? `/uploads/stories/${files["image"][0].filename}`
      : story.imageUrl;

    const brochureUrl = files?.["brochure"]?.[0]
      ? `/uploads/stories/${files["brochure"][0].filename}`
      : story.brochureUrl;

    await story.update({
      title: body.title ?? story.title,
      slug: body.slug ? slugify(body.slug) : story.slug,
      tag: body.tag ?? story.tag,
      location: body.location ?? story.location,
      gla: body.gla ?? story.gla,
      parking: body.parking ?? story.parking,
      openingDate: body.openingDate ?? story.openingDate,
      anchorTenant: body.anchorTenant ?? story.anchorTenant,
      projectType: body.projectType ?? story.projectType,
      summary: body.summary ?? story.summary,
      body: body.body ?? story.body,
      imageUrl,
      brochureUrl,
      googleMapsQuery: body.googleMapsQuery ?? story.googleMapsQuery,
      sortOrder: body.sortOrder !== undefined ? parseInt(body.sortOrder) : story.sortOrder,
      isPublished: body.isPublished !== undefined
        ? (body.isPublished === "true" || body.isPublished === true)
        : story.isPublished,
    });

    res.json(story);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to update story" });
  }
};

// ── Admin: delete story ────────────────────────────────────────────────────
export const deleteStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const story = await SuccessStory.findByPk(req.params.id);
    if (!story) { res.status(404).json({ error: "Story not found" }); return; }
    await story.destroy();
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete story" });
  }
};
