import { Response } from "express";
import { Broker } from "../models/Broker";
import { PropertyBroker } from "../models/PropertyBroker";
import { AuthRequest } from "../middleware/authMiddleware";
import path from "path";
import fs from "fs";

const UPLOADS_BASE = process.env.UPLOADS_BASE_URL || "http://localhost:5001/uploads";

// ── GET all brokers (admin) ──────────────────────────────────────────────
export const getAllBrokers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const brokers = await Broker.findAll({ order: [["sortOrder", "ASC"], ["createdAt", "DESC"]] });
    res.json(brokers);
  } catch {
    res.status(500).json({ error: "Failed to fetch brokers" });
  }
};

// ── GET public brokers (active + showOnWebsite) ─────────────────────────
export const getPublicBrokers = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const brokers = await Broker.findAll({
      where: { isActive: true, showOnWebsite: true },
      order: [["sortOrder", "ASC"], ["createdAt", "ASC"]],
    });
    res.json(brokers);
  } catch {
    res.status(500).json({ error: "Failed to fetch brokers" });
  }
};

// ── GET single broker ───────────────────────────────────────────────────
export const getBrokerById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const broker = await Broker.findByPk(req.params.id);
    if (!broker) { res.status(404).json({ error: "Broker not found" }); return; }
    res.json(broker);
  } catch {
    res.status(500).json({ error: "Failed to fetch broker" });
  }
};

// ── CREATE broker ───────────────────────────────────────────────────────
export const createBroker = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = req.body;
    if ((req as any).file) {
      data.photo = `${UPLOADS_BASE}/brokers/${(req as any).file.filename}`;
    }
    const broker = await Broker.create(data);
    res.status(201).json(broker);
  } catch (err: any) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "A broker with this email already exists." });
    } else {
      res.status(500).json({ error: "Failed to create broker", details: err.message });
    }
  }
};

// ── UPDATE broker ───────────────────────────────────────────────────────
export const updateBroker = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const broker = await Broker.findByPk(req.params.id);
    if (!broker) { res.status(404).json({ error: "Broker not found" }); return; }

    const data = req.body;
    if ((req as any).file) {
      // Remove old photo
      if (broker.photo) {
        const oldFile = path.join(process.cwd(), "uploads", "brokers", path.basename(broker.photo));
        if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
      }
      data.photo = `${UPLOADS_BASE}/brokers/${(req as any).file.filename}`;
    }

    await broker.update(data);
    res.json(broker);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update broker", details: err.message });
  }
};

// ── DELETE broker ───────────────────────────────────────────────────────
export const deleteBroker = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const broker = await Broker.findByPk(req.params.id);
    if (!broker) { res.status(404).json({ error: "Broker not found" }); return; }

    // Remove join table records first to avoid FK constraint errors
    await PropertyBroker.destroy({ where: { brokerId: broker.id } });

    if (broker.photo) {
      const file = path.join(process.cwd(), "uploads", "brokers", path.basename(broker.photo));
      if (fs.existsSync(file)) fs.unlinkSync(file);
    }
    await broker.destroy();
    res.json({ message: "Broker deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete broker", details: err.message });
  }
};

// ── TOGGLE active ───────────────────────────────────────────────────────
export const toggleBrokerActive = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const broker = await Broker.findByPk(req.params.id);
    if (!broker) { res.status(404).json({ error: "Broker not found" }); return; }
    await broker.update({ isActive: !broker.isActive });
    res.json(broker);
  } catch {
    res.status(500).json({ error: "Failed to toggle broker status" });
  }
};

// ── TOGGLE website visibility ───────────────────────────────────────────
export const toggleBrokerWebsite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const broker = await Broker.findByPk(req.params.id);
    if (!broker) { res.status(404).json({ error: "Broker not found" }); return; }
    await broker.update({ showOnWebsite: !broker.showOnWebsite });
    res.json(broker);
  } catch {
    res.status(500).json({ error: "Failed to toggle broker visibility" });
  }
};

// ── REORDER brokers ─────────────────────────────────────────────────────
// Body: { orderedIds: number[] }  — array of broker IDs in desired order
export const reorderBrokers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderedIds } = req.body as { orderedIds: number[] };
    if (!Array.isArray(orderedIds)) { res.status(400).json({ error: "orderedIds must be an array" }); return; }
    await Promise.all(orderedIds.map((id, index) => Broker.update({ sortOrder: index }, { where: { id } })));
    res.json({ message: "Reordered successfully" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to reorder brokers", details: err.message });
  }
};
