import { Response } from "express";
import { Op, fn, col } from "sequelize";
import { sequelize } from "../config/database";
import { Property } from "../models/Property";
import { Broker } from "../models/Broker";
import { User } from "../models/User";
import { Lead } from "../models/Lead";
import { Inquiry } from "../models/Inquiry";
import { Viewing } from "../models/Viewing";
import { SavedProperty } from "../models/SavedProperty";
import { PageView } from "../models/PageView";
import { AuthRequest } from "../middleware/authMiddleware";

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfWeekMonday = (date: Date) => {
  const start = startOfDay(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);
  return start;
};

// ── Admin dashboard stats ───────────────────────────────────────────────
export const getAdminStats = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [
      totalProperties,
      activeListings,
      soldProperties,
      leasedProperties,
      availableProperties,
      totalBrokers,
      activeBrokers,
      totalClients,
      totalLeads,
      newLeads,
      totalInquiries,
      newInquiries,
      investmentOpportunities,
      developmentProjects,
      pendingViewings,
      totalPageViews,
    ] = await Promise.all([
      Property.count(),
      Property.count({ where: { status: "published" } }),
      Property.count({ where: { status: "sold" } }),
      Property.count({ where: { status: "leased" } }),
      Property.count({ where: { status: "published" } }),
      Broker.count(),
      Broker.count({ where: { isActive: true } }),
      User.count({ where: { role: "client" } }),
      Lead.count(),
      Lead.count({ where: { status: "new" } }),
      Inquiry.count(),
      Inquiry.count({ where: { status: "new" } }),
      Property.count({ where: { category: "investment", status: "published" } }),
      Property.count({
        where: {
          category: { [Op.in]: ["development_land", "mixed_use"] },
          status: { [Op.not]: "archived" },
        },
      }),
      Viewing.count({ where: { status: "pending" } }),
      PageView.count(),
    ]);

    res.json({
      totalProperties,
      activeListings,
      soldProperties,
      leasedProperties,
      availableProperties,
      totalBrokers,
      activeBrokers,
      totalClients,
      totalLeads,
      newLeads,
      totalInquiries,
      newInquiries,
      investmentOpportunities,
      developmentProjects,
      pendingViewings,
      totalPageViews,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch stats", details: err.message });
  }
};

// ── Recent inquiries for admin ─────────────────────────────────────────
export const getRecentInquiries = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const inquiries = await Inquiry.findAll({
      include: [{ model: Property, attributes: ["id", "title", "referenceNumber"] }],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    res.json(inquiries);
  } catch {
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
};

// ── All clients ─────────────────────────────────────────────────────────
export const getAllClients = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const clients = await User.findAll({
      where: { role: "client" },
      attributes: ["id", "name", "email", "firstName", "lastName", "phoneNumber", "isActive", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
    res.json(clients);
  } catch {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};

// ── Toggle client active ────────────────────────────────────────────────
export const toggleClientActive = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ where: { id: req.params.id, role: "client" } });
    if (!user) { res.status(404).json({ error: "Client not found" }); return; }
    await user.update({ isActive: !user.isActive });
    res.json({ id: user.id, isActive: user.isActive });
  } catch {
    res.status(500).json({ error: "Failed to toggle client status" });
  }
};

// ── Property status breakdown for chart ────────────────────────────────
export const getPropertyStatusChart = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const statuses = ["draft", "pending", "published", "under_offer", "sold", "leased", "archived"];
    const counts = await Promise.all(
      statuses.map((s) => Property.count({ where: { status: s } }))
    );
    res.json(statuses.map((s, i) => ({ status: s, count: counts[i] })));
  } catch {
    res.status(500).json({ error: "Failed to fetch chart data" });
  }
};

// ── Monthly inquiries for chart (last 6 months) ─────────────────────────
export const getInquiryTrendChart = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const months: { label: string; count: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      const count = await Inquiry.count({
        where: { createdAt: { [Op.gte]: start, [Op.lt]: end } },
      });
      months.push({
        label: start.toLocaleString("default", { month: "short", year: "2-digit" }),
        count,
      });
    }
    res.json(months);
  } catch {
    res.status(500).json({ error: "Failed to fetch inquiry trend" });
  }
};

// ── Most saved / favorited properties ──────────────────────────────────
export const getMostSavedProperties = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Step 1: group counts without JOIN (SQLite-safe)
    const counts = await SavedProperty.findAll({
      attributes: ["propertyId", [fn("COUNT", col("propertyId")), "saveCount"]],
      group: ["propertyId"],
      order: [[fn("COUNT", col("propertyId")), "DESC"]],
      limit: 20,
      raw: true,
    }) as any[];

    if (counts.length === 0) { res.json([]); return; }

    // Step 2: fetch matching properties
    const propertyIds = counts.map((c) => c.propertyId);
    const properties = await Property.findAll({
      where: { id: propertyIds },
      attributes: ["id", "title", "referenceNumber", "city", "category", "price", "featuredImage", "status"],
    });
    const propMap: Record<number, any> = Object.fromEntries(properties.map((p) => [p.id, p]));

    res.json(counts.map((c) => ({ propertyId: c.propertyId, saveCount: Number(c.saveCount), property: propMap[c.propertyId] || null })));
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch most saved properties", details: err.message });
  }
};

// ── Total browser records + this week / this month ──────────────────────
export const getPageViewStats = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const now = new Date();
    const weekStart = startOfWeekMonday(now);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const [total, thisWeek, thisMonth] = await Promise.all([
      PageView.count(),
      PageView.count({ where: { createdAt: { [Op.gte]: weekStart } } }),
      PageView.count({ where: { createdAt: { [Op.gte]: monthStart } } }),
    ]);
    res.json({ total, thisWeek, thisMonth });
  } catch {
    res.status(500).json({ error: "Failed to fetch page view stats" });
  }
};

// ── Browser record trend — current week by day + last 6 months by month ─
export const getPageViewTrend = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const mode = (req.query.mode as string) || "monthly";
    const points: { label: string; fullLabel: string; count: number }[] = [];

    if (mode === "weekly") {
      const weekStart = startOfWeekMonday(new Date());

      for (let i = 0; i < 7; i++) {
        const start = new Date(weekStart);
        start.setDate(weekStart.getDate() + i);

        const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
        const count = await PageView.count({ where: { createdAt: { [Op.gte]: start, [Op.lt]: end } } });
        points.push({
          label: start.toLocaleString("en-ZA", { weekday: "short" }),
          fullLabel: start.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "short", year: "numeric" }),
          count,
        });
      }
    } else {
      for (let i = 5; i >= 0; i--) {
        const d = new Date(); d.setMonth(d.getMonth() - i);
        const start = new Date(d.getFullYear(), d.getMonth(), 1);
        const end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        const count = await PageView.count({ where: { createdAt: { [Op.gte]: start, [Op.lt]: end } } });
        points.push({
          label: start.toLocaleString("en-ZA", { month: "short" }),
          fullLabel: start.toLocaleDateString("en-ZA", { month: "long", year: "numeric" }),
          count,
        });
      }
    }
    res.json(points);
  } catch {
    res.status(500).json({ error: "Failed to fetch page view trend" });
  }
};
