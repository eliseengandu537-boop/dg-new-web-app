import { Request, Response } from "express";
import { NewsPost } from "../models/NewsPost";

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Helper: get URL for an uploaded file by fieldname (req.files is File[] when using .any())
const getUploadedUrl = (files: Express.Multer.File[], fieldname: string): string | null => {
  const f = files.find(f => f.fieldname === fieldname);
  return f ? `/uploads/news/${f.filename}` : null;
};

// Patch story image URLs from uploaded files into the JSON string
const patchStoriesImages = (jsonStr: string | undefined, files: Express.Multer.File[]): string | null => {
  if (!jsonStr) return null;
  try {
    const stories = JSON.parse(jsonStr);
    stories.forEach((s: Record<string, unknown>, i: number) => {
      const url = getUploadedUrl(files, `storyImage_${i}`);
      if (url) s.imageUrl = url;
    });
    return JSON.stringify(stories);
  } catch { return null; }
};

// Patch gallery image URLs from uploaded files into the JSON string
const patchGalleryImages = (jsonStr: string | undefined, files: Express.Multer.File[]): string | null => {
  if (!jsonStr) return null;
  try {
    const items = JSON.parse(jsonStr);
    items.forEach((item: Record<string, unknown>, i: number) => {
      const url = getUploadedUrl(files, `galleryImage_${i}`);
      if (url) item.url = url;
    });
    return JSON.stringify(items);
  } catch { return null; }
};

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
    const files = (req.files as Express.Multer.File[]) || [];
    const body = req.body;

    const imageUrl = getUploadedUrl(files, "image") || body.imageUrl || null;

    const rawSlug = body.slug?.trim() ? slugify(body.slug) : slugify(body.title || "post");
    const existing = await NewsPost.findOne({ where: { slug: rawSlug } });
    const slug = existing ? `${rawSlug}-${Date.now()}` : rawSlug;

    const isPublished = body.isPublished === "true" || body.isPublished === true;

    const featuredStories = patchStoriesImages(body.featuredStories, files);
    const gallery = patchGalleryImages(body.gallery, files);

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
      featuredStories,
      deals: body.deals || null,
      gallery,
      leaderboard: body.leaderboard || null,
      breakingNewsTitle: body.breakingNewsTitle || null,
      breakingNewsDesc: body.breakingNewsDesc || null,
      breakingNewsUrl: body.breakingNewsUrl || null,
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

    const files = (req.files as Express.Multer.File[]) || [];
    const body = req.body;

    const imageUrl = getUploadedUrl(files, "image") || (body.imageUrl ?? post.imageUrl);

    const isPublished = body.isPublished === "true" || body.isPublished === true;

    const featuredStories = patchStoriesImages(body.featuredStories ?? post.featuredStories, files);
    const gallery = patchGalleryImages(body.gallery ?? post.gallery, files);

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
      featuredStories: featuredStories ?? post.featuredStories,
      deals: body.deals ?? post.deals,
      gallery: gallery ?? post.gallery,
      leaderboard: body.leaderboard ?? post.leaderboard,
      breakingNewsTitle: body.breakingNewsTitle ?? post.breakingNewsTitle,
      breakingNewsDesc: body.breakingNewsDesc ?? post.breakingNewsDesc,
      breakingNewsUrl: body.breakingNewsUrl ?? post.breakingNewsUrl,
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
