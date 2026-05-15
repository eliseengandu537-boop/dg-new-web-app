import { Response, Request } from "express";
import { ContactMessage } from "../models/ContactMessage";
import { Property } from "../models/Property";
import { User } from "../models/User";

// ── Submit message (public) ────────────────────────────────────────────
export const submitMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message, propertyId, userId } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email and message are required" });
      return;
    }
    const msg = await ContactMessage.create({ name, email, phone, subject, message, propertyId, userId });
    res.status(201).json(msg);
  } catch {
    res.status(500).json({ error: "Failed to submit message" });
  }
};

// ── Get all messages (admin) ───────────────────────────────────────────
export const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = "1", limit = "20" } = req.query;
    const where: any = {};
    if (status) where.status = status;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const { rows: messages, count } = await ContactMessage.findAndCountAll({
      where,
      include: [
        { model: Property, attributes: ["id", "title", "referenceNumber"], required: false },
        { model: User, attributes: ["id", "name", "email"], required: false },
      ],
      order: [["createdAt", "DESC"]],
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
    });
    res.json({ messages, total: count, page: pageNum, totalPages: Math.ceil(count / limitNum) });
  } catch {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// ── Update message status / reply (admin) ─────────────────────────────
export const updateMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) { res.status(404).json({ error: "Message not found" }); return; }
    const { status, adminReply } = req.body;
    await msg.update({ ...(status && { status }), ...(adminReply !== undefined && { adminReply }) });
    res.json(msg);
  } catch {
    res.status(500).json({ error: "Failed to update message" });
  }
};

// ── Delete message (admin) ─────────────────────────────────────────────
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) { res.status(404).json({ error: "Message not found" }); return; }
    await msg.destroy();
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete message" });
  }
};
