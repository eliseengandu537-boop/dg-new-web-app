import { Request, Response } from "express";
import { NewsPost } from "../models/NewsPost";

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ── Public: published posts ────────────────────────────────────────────────
export const getPublicNews = async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await NewsPost.findAll({
      where: { isPublished: true },
      order: [["publishedAt", "DESC"], ["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

// ── Public: single post by slug ────────────────────────────────────────────
export const getPublicNewsBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await NewsPost.findOne({ where: { slug: req.params.slug, isPublished: true } });
    if (!post) { res.status(404).json({ error: "Post not found" }); return; }
    res.json(post);
  } catch {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

// ── Admin: all posts ───────────────────────────────────────────────────────
export const getAllNews = async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await NewsPost.findAll({ order: [["createdAt", "DESC"]] });
    res.json(posts);
  } catch {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

// ── Admin: create post ─────────────────────────────────────────────────────
export const createNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const body = req.body;

    const imageUrl = file ? `/uploads/news/${file.filename}` : body.imageUrl || null;

    const rawSlug = body.slug?.trim() ? slugify(body.slug) : slugify(body.title || "post");
    const existing = await NewsPost.findOne({ where: { slug: rawSlug } });
    const slug = existing ? `${rawSlug}-${Date.now()}` : rawSlug;

    const isPublished = body.isPublished === "true" || body.isPublished === true;

    const post = await NewsPost.create({
      title: body.title,
      slug,
      category: body.category || null,
      author: body.author || null,
      summary: body.summary || null,
      body: body.body || null,
      imageUrl,
      tags: body.tags || null,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    });

    res.status(201).json(post);
  } catch (err: any) {
    console.error("[createNews]", err);
    res.status(500).json({ error: err?.message || "Failed to create post" });
  }
};

// ── Admin: update post ─────────────────────────────────────────────────────
export const updateNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await NewsPost.findByPk(req.params.id);
    if (!post) { res.status(404).json({ error: "Post not found" }); return; }

    const file = req.file;
    const body = req.body;

    const imageUrl = file ? `/uploads/news/${file.filename}` : body.imageUrl ?? post.imageUrl;

    const isPublished = body.isPublished === "true" || body.isPublished === true;

    await post.update({
      title: body.title ?? post.title,
      category: body.category ?? post.category,
      author: body.author ?? post.author,
      summary: body.summary ?? post.summary,
      body: body.body ?? post.body,
      imageUrl,
      tags: body.tags ?? post.tags,
      isPublished,
      publishedAt: isPublished && !post.publishedAt ? new Date() : post.publishedAt,
    });

    res.json(post);
  } catch (err: any) {
    console.error("[updateNews]", err);
    res.status(500).json({ error: err?.message || "Failed to update post" });
  }
};

// ── Admin: delete post ─────────────────────────────────────────────────────
export const deleteNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await NewsPost.findByPk(req.params.id);
    if (!post) { res.status(404).json({ error: "Post not found" }); return; }
    await post.destroy();
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
