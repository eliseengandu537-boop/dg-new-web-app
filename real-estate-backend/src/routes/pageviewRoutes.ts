import { Router, Request, Response } from "express";
import { PageView } from "../models/PageView";

const router = Router();

// Public: record a page view
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = typeof req.body?.sessionId === "string" ? req.body.sessionId.trim() : "";
    const path = typeof req.body?.path === "string" ? req.body.path.trim() : "/";

    if (!sessionId) {
      res.status(400).json({ error: "sessionId is required" });
      return;
    }

    const existing = await PageView.findOne({ where: { sessionId } });
    if (existing) {
      res.json({ ok: true, recorded: false });
      return;
    }

    await PageView.create({ sessionId, path: path || "/" });
    res.json({ ok: true, recorded: true });
  } catch {
    res.status(500).json({ error: "Failed to record page view" });
  }
});

export default router;
