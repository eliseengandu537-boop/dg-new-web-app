import { Router, Request, Response } from "express";
import { Op } from "sequelize";
import { PageView } from "../models/PageView";

const router = Router();

// Public: record a page view. One row is stored per view (page navigation) so we
// can report both total views and unique browsers per day. A short de-dupe
// window prevents refreshes / rapid re-renders from inflating the count.
const DEDUPE_WINDOW_MS = 10_000;

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = typeof req.body?.sessionId === "string" ? req.body.sessionId.trim() : "";
    const path = typeof req.body?.path === "string" ? req.body.path.trim() : "/";

    if (!sessionId) {
      res.status(400).json({ error: "sessionId is required" });
      return;
    }

    const since = new Date(Date.now() - DEDUPE_WINDOW_MS);
    const recent = await PageView.findOne({
      where: { sessionId, path: path || "/", createdAt: { [Op.gte]: since } },
    });
    if (recent) {
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
