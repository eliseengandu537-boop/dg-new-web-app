import { Response, Request } from "express";
import { Inquiry } from "../models/Inquiry";
import { Property } from "../models/Property";
import { User } from "../models/User";
import { UserSubscription } from "../models/UserSubscription";
import { MembershipPlan } from "../models/MembershipPlan";
import { AuthRequest } from "../middleware/authMiddleware";

// ── All inquiries (admin) — includes property owner plan info ──────────
export const getAllInquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = "1", limit = "20" } = req.query;
    const where: any = {};
    if (status) where.status = status;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const { rows: inquiries, count } = await Inquiry.findAndCountAll({
      where,
      include: [
        {
          model: Property,
          attributes: ["id", "title", "referenceNumber", "featuredImage", "submittedByUserId"],
          include: [{ model: User, as: "submittedByUser", attributes: ["id", "name", "email"], required: false }],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
    });

    // Attach owner plan info
    const result = await Promise.all(inquiries.map(async (inq: any) => {
      const ownerId = inq.property?.submittedByUserId;
      let ownerPlan: string | null = null;
      if (ownerId) {
        const sub = await UserSubscription.findOne({
          where: { userId: ownerId, status: "active" },
          include: [{ model: MembershipPlan, attributes: ["name"] }],
        });
        ownerPlan = (sub as any)?.membershipPlan?.name || "Free";
      }
      return { ...inq.toJSON(), ownerPlan };
    }));

    res.json({ inquiries: result, total: count, page: pageNum, totalPages: Math.ceil(count / limitNum) });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch inquiries", details: err.message });
  }
};

// ── Submit inquiry (public, no auth required) ──────────────────────────
export const submitInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, message, propertyId } = req.body;
    if (!name || !email) {
      res.status(400).json({ error: "Name and email are required." }); return;
    }
    const inquiry = await Inquiry.create({ name, email, phone, message, propertyId });
    res.status(201).json({ message: "Inquiry submitted successfully.", inquiry });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to submit inquiry", details: err.message });
  }
};

// ── Update inquiry status (admin) ─────────────────────────────────────
export const updateInquiryStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const valid = ["new", "read", "replied", "closed"];
    const { status, adminNotes } = req.body;
    if (status && !valid.includes(status)) {
      res.status(400).json({ error: "Invalid status" }); return;
    }
    const inquiry = await Inquiry.findByPk(req.params.id);
    if (!inquiry) { res.status(404).json({ error: "Inquiry not found" }); return; }
    await inquiry.update({ ...(status && { status }), ...(adminNotes !== undefined && { adminNotes }) });
    res.json(inquiry);
  } catch {
    res.status(500).json({ error: "Failed to update inquiry" });
  }
};

// ── Delete inquiry (admin) ──────────────────────────────────────────────
export const deleteInquiry = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id);
    if (!inquiry) { res.status(404).json({ error: "Inquiry not found" }); return; }
    await inquiry.destroy();
    res.json({ message: "Inquiry deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete inquiry" });
  }
};

// ── Approve / deny contact sharing (admin) ─────────────────────────────
// When approved = true, the property owner can see the buyer's contact details
export const approveContact = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { approved } = req.body; // boolean
    const inquiry = await Inquiry.findByPk(req.params.id, {
      include: [{ model: Property, attributes: ["id", "title", "submittedByUserId"] }],
    });
    if (!inquiry) { res.status(404).json({ error: "Inquiry not found" }); return; }

    await inquiry.update({
      contactApproved: approved,
      contactApprovedAt: approved ? new Date() : null,
    });
    res.json(inquiry);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update contact approval", details: err.message });
  }
};
