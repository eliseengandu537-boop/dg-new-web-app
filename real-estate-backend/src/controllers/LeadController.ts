import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { Lead } from "../models/Lead";
import { Broker } from "../models/Broker";
import { User } from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

const getLeadWithRelations = (id: number) =>
  Lead.findByPk(id, {
    include: [{ model: Broker, attributes: ["id", "fullName", "email"] }],
  });

const toNumberOrNull = (value: unknown) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toIntegerOrNull = (value: unknown) => {
  const parsed = toNumberOrNull(value);
  return parsed === null ? null : Math.round(parsed);
};

// ── All leads (admin) ──────────────────────────────────────────────────
export const getAllLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, source, leadType, page = "1", limit = "100" } = req.query;
    const where: any = {};
    if (status) where.status = status;
    if (source) where.source = source;
    if (leadType) where.leadType = leadType;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const { rows: leads, count } = await Lead.findAndCountAll({
      where,
      include: [{ model: Broker, attributes: ["id", "fullName", "email"] }],
      order: [["createdAt", "DESC"]],
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
    });
    res.json({ leads, total: count, page: pageNum, totalPages: Math.ceil(count / limitNum) });
  } catch {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};

// ── Create lead (admin or public) ─────────────────────────────────────
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      leadType = "general",
      name,
      email,
      phone,
      source,
      notes,
      interestedCategory,
      budgetMin,
      budgetMax,
      assignedBrokerId,
      homePrice,
      deposit,
      interestRate,
      loanTermYears,
      monthlyRepayment,
      loanAmount,
      totalInterest,
      totalPayable,
      status = "new",
    } = req.body;

    const normalizedLeadType = leadType ? String(leadType).trim() : "general";
    const normalizedSource = source
      ? String(source).trim()
      : normalizedLeadType === "bond_calculator"
        ? "Bond Calculator"
        : "website";

    if (!name || !String(name).trim() || !phone || !String(phone).trim()) {
      res.status(400).json({ error: "Name and phone are required." }); return;
    }

    const lead = await Lead.create({
      leadType: normalizedLeadType,
      name: String(name).trim(),
      email: email ? String(email).trim() : null,
      phone: String(phone).trim(),
      source: normalizedSource,
      status: String(status).trim() || "new",
      notes: notes ? String(notes).trim() : null,
      interestedCategory: interestedCategory ? String(interestedCategory).trim() : null,
      budgetMin: toNumberOrNull(budgetMin),
      budgetMax: toNumberOrNull(budgetMax),
      assignedBrokerId: toIntegerOrNull(assignedBrokerId),
      homePrice: toNumberOrNull(homePrice),
      deposit: toNumberOrNull(deposit),
      interestRate: toNumberOrNull(interestRate),
      loanTermYears: toIntegerOrNull(loanTermYears),
      monthlyRepayment: toNumberOrNull(monthlyRepayment),
      loanAmount: toNumberOrNull(loanAmount),
      totalInterest: toNumberOrNull(totalInterest),
      totalPayable: toNumberOrNull(totalPayable),
    });

    const populatedLead = await getLeadWithRelations(lead.id);
    res.status(201).json(populatedLead || lead);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to create lead", details: err.message });
  }
};

// ── Update lead ────────────────────────────────────────────────────────
export const updateLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) { res.status(404).json({ error: "Lead not found" }); return; }

    const payload: Record<string, unknown> = { ...req.body };
    if ("name" in payload) payload.name = payload.name ? String(payload.name).trim() : payload.name;
    if ("email" in payload) payload.email = payload.email ? String(payload.email).trim() : null;
    if ("phone" in payload) payload.phone = payload.phone ? String(payload.phone).trim() : null;
    if ("source" in payload) payload.source = payload.source ? String(payload.source).trim() : null;
    if ("notes" in payload) payload.notes = payload.notes ? String(payload.notes).trim() : null;
    if ("homePrice" in payload) payload.homePrice = toNumberOrNull(payload.homePrice);
    if ("deposit" in payload) payload.deposit = toNumberOrNull(payload.deposit);
    if ("interestRate" in payload) payload.interestRate = toNumberOrNull(payload.interestRate);
    if ("loanTermYears" in payload) payload.loanTermYears = toIntegerOrNull(payload.loanTermYears);
    if ("monthlyRepayment" in payload) payload.monthlyRepayment = toNumberOrNull(payload.monthlyRepayment);
    if ("loanAmount" in payload) payload.loanAmount = toNumberOrNull(payload.loanAmount);
    if ("totalInterest" in payload) payload.totalInterest = toNumberOrNull(payload.totalInterest);
    if ("totalPayable" in payload) payload.totalPayable = toNumberOrNull(payload.totalPayable);
    if ("assignedBrokerId" in payload) payload.assignedBrokerId = toIntegerOrNull(payload.assignedBrokerId);
    if ("convertedClientId" in payload) payload.convertedClientId = toIntegerOrNull(payload.convertedClientId);

    await lead.update(payload);
    const populatedLead = await getLeadWithRelations(lead.id);
    res.json(populatedLead || lead);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update lead", details: err.message });
  }
};

// ── Delete lead ────────────────────────────────────────────────────────
export const deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) { res.status(404).json({ error: "Lead not found" }); return; }
    await lead.destroy();
    res.json({ message: "Lead deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete lead" });
  }
};

// ── Convert lead into CRM client ────────────────────────────────────────
export const convertLeadToClient = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) { res.status(404).json({ error: "Lead not found" }); return; }

    let existingClient = lead.convertedClientId ? await User.findByPk(lead.convertedClientId) : null;

    const trimmedName = (lead.name || "").trim();
    const [firstName = trimmedName, ...restName] = trimmedName.split(/\s+/).filter(Boolean);
    const lastName = restName.join(" ") || null;
    const normalizedEmail = lead.email?.trim().toLowerCase() || null;

    if (!existingClient && normalizedEmail) {
      existingClient = await User.findOne({ where: { email: normalizedEmail } });
      if (existingClient && existingClient.role !== "client") {
        res.status(409).json({ error: "This email already belongs to a non-client account." });
        return;
      }
    }

    let created = false;
    if (!existingClient) {
      const generatedEmail = normalizedEmail || `bondlead-${lead.id}-${Date.now()}@crm.local`;
      const generatedPassword = randomBytes(16).toString("hex");
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      existingClient = await User.create({
        name: trimmedName,
        email: generatedEmail,
        password: hashedPassword,
        termsAccepted: true,
        role: "client",
        isActive: true,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phoneNumber: lead.phone || undefined,
      });
      created = true;
    } else {
      await existingClient.update({
        name: existingClient.name || trimmedName,
        firstName: existingClient.firstName || firstName || undefined,
        lastName: existingClient.lastName || lastName || undefined,
        phoneNumber: existingClient.phoneNumber || lead.phone || undefined,
        isActive: true,
      });
    }

    await lead.update({
      status: "converted",
      convertedClientId: existingClient.id,
    });

    const populatedLead = await getLeadWithRelations(lead.id);
    res.json({
      created,
      client: {
        id: existingClient.id,
        name: existingClient.name,
        email: existingClient.email,
      },
      lead: populatedLead || lead,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to convert lead", details: err.message });
  }
};
