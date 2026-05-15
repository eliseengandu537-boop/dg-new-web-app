import { Response } from "express";
import { User } from "../models/User";
import { Property } from "../models/Property";
import { Broker } from "../models/Broker";
import { SavedProperty } from "../models/SavedProperty";
import { SavedSearch } from "../models/SavedSearch";
import { Viewing } from "../models/Viewing";
import { Inquiry } from "../models/Inquiry";
import { UserSubscription } from "../models/UserSubscription";
import { MembershipPlan } from "../models/MembershipPlan";
import { AuthRequest } from "../middleware/authMiddleware";
import { Op } from "sequelize";

// ── Client dashboard overview ──────────────────────────────────────────
export const getClientDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const [savedCount, viewingCount, inquiryCount, savedSearchCount] = await Promise.all([
      SavedProperty.count({ where: { userId } }),
      Viewing.count({ where: { userId } }),
      Inquiry.count({ where: { userId } }),
      SavedSearch.count({ where: { userId } }),
    ]);

    const recentViewings = await Viewing.findAll({
      where: { userId },
      include: [{ model: Property, attributes: ["id", "title", "featuredImage", "referenceNumber", "city"] }],
      order: [["scheduledDate", "ASC"]],
      limit: 5,
    });

    const recentInquiries = await Inquiry.findAll({
      where: { userId },
      include: [{ model: Property, attributes: ["id", "title", "featuredImage", "referenceNumber"] }],
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    res.json({ savedCount, viewingCount, inquiryCount, savedSearchCount, recentViewings, recentInquiries });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to load dashboard", details: err.message });
  }
};

// ── Saved properties ────────────────────────────────────────────────────
export const getSavedProperties = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const saved = await SavedProperty.findAll({
      where: { userId: req.user!.id },
      include: [
        {
          model: Property,
          include: [{ model: Broker, through: { attributes: [] }, required: false }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(saved);
  } catch {
    res.status(500).json({ error: "Failed to fetch saved properties" });
  }
};

// ── Save a property ─────────────────────────────────────────────────────
export const saveProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { propertyId } = req.params;
    const userId = req.user!.id;
    const exists = await SavedProperty.findOne({ where: { userId, propertyId } });
    if (exists) { res.status(400).json({ error: "Property already saved." }); return; }
    const saved = await SavedProperty.create({ userId, propertyId: parseInt(propertyId) });
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to save property", details: err.message });
  }
};

// ── Unsave a property ───────────────────────────────────────────────────
export const unsaveProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { propertyId } = req.params;
    const userId = req.user!.id;
    const record = await SavedProperty.findOne({ where: { userId, propertyId } });
    if (!record) { res.status(404).json({ error: "Saved property not found." }); return; }
    await record.destroy();
    res.json({ message: "Property removed from saved." });
  } catch {
    res.status(500).json({ error: "Failed to unsave property" });
  }
};

// ── Client viewings ─────────────────────────────────────────────────────
export const getClientViewings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const viewings = await Viewing.findAll({
      where: { userId: req.user!.id },
      include: [
        { model: Property, attributes: ["id", "title", "featuredImage", "referenceNumber", "address", "city"] },
      ],
      order: [["scheduledDate", "ASC"]],
    });
    res.json(viewings);
  } catch {
    res.status(500).json({ error: "Failed to fetch viewings" });
  }
};

// ── Schedule a viewing ──────────────────────────────────────────────────
export const scheduleViewing = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { propertyId, scheduledDate, notes, contactName, contactPhone } = req.body;
    const userId = req.user!.id;
    const viewing = await Viewing.create({ userId, propertyId, scheduledDate, notes, contactName, contactPhone });
    res.status(201).json(viewing);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to schedule viewing", details: err.message });
  }
};

// ── Cancel a viewing ────────────────────────────────────────────────────
export const cancelViewing = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const viewing = await Viewing.findOne({ where: { id: req.params.id, userId: req.user!.id } });
    if (!viewing) { res.status(404).json({ error: "Viewing not found." }); return; }
    await viewing.update({ status: "cancelled" });
    res.json(viewing);
  } catch {
    res.status(500).json({ error: "Failed to cancel viewing" });
  }
};

// ── Client inquiries ────────────────────────────────────────────────────
export const getClientInquiries = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const inquiries = await Inquiry.findAll({
      where: { userId: req.user!.id },
      include: [{ model: Property, attributes: ["id", "title", "featuredImage", "referenceNumber"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(inquiries);
  } catch {
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
};

// ── Saved searches ──────────────────────────────────────────────────────
export const getSavedSearches = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const searches = await SavedSearch.findAll({
      where: { userId: req.user!.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(searches);
  } catch {
    res.status(500).json({ error: "Failed to fetch saved searches" });
  }
};

// ── Save a search ───────────────────────────────────────────────────────
export const saveSearch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, searchParams, alertsEnabled } = req.body;
    const search = await SavedSearch.create({ userId: req.user!.id, name, searchParams, alertsEnabled });
    res.status(201).json(search);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to save search", details: err.message });
  }
};

// ── Delete saved search ─────────────────────────────────────────────────
export const deleteSavedSearch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const search = await SavedSearch.findOne({ where: { id: req.params.id, userId: req.user!.id } });
    if (!search) { res.status(404).json({ error: "Saved search not found." }); return; }
    await search.destroy();
    res.json({ message: "Saved search deleted." });
  } catch {
    res.status(500).json({ error: "Failed to delete saved search" });
  }
};

// ── Get client profile ─────────────────────────────────────────────────
export const getClientProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.user!.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) { res.status(404).json({ error: "User not found" }); return; }

    // Attach active subscription + plan
    const sub = await UserSubscription.findOne({
      where: { userId: req.user!.id, status: { [Op.in]: ["active", "pending_payment"] } },
      include: [{ model: MembershipPlan }],
      order: [["createdAt", "DESC"]],
    });

    res.json({ ...user.toJSON(), subscription: sub || null });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch profile", details: err.message });
  }
};

// ── Update client profile ───────────────────────────────────────────────
export const updateClientProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.user!.id);
    if (!user) { res.status(404).json({ error: "User not found" }); return; }
    const { name, firstName, lastName, phoneNumber, about, company, jobTitle, website, whatsapp, avatar } = req.body;
    await user.update({ name, firstName, lastName, phoneNumber, about, company, jobTitle, website, whatsapp, avatar } as any);
    res.json({ id: user.id, name: user.name, email: user.email, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, about: user.about, company: user.company, jobTitle: (user as any).jobTitle, website: (user as any).website, whatsapp: (user as any).whatsapp, avatar: user.avatar });
  } catch {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// ── Helper: get client's active plan ───────────────────────────────────
const getClientPlan = async (userId: number) => {
  const sub = await UserSubscription.findOne({
    where: { userId, status: "active" },
    include: [{ model: MembershipPlan }],
    order: [["createdAt", "DESC"]],
  });
  return sub?.membershipPlan || null;
};

// ── Get client's own property listings ─────────────────────────────────
export const getClientListings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const listings = await Property.findAll({
      where: { submittedByUserId: req.user!.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(listings);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch listings", details: err.message });
  }
};

// ── Submit a new property listing ──────────────────────────────────────
export const submitClientListing = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Check listing limit against plan
    const plan = await getClientPlan(userId);
    const maxListings = plan ? (plan as any).maxListings ?? 1 : 1;
    const existing = await Property.count({ where: { submittedByUserId: userId } });
    if (existing >= maxListings) {
      res.status(403).json({ error: `Your ${plan?.name || "Free"} plan allows up to ${maxListings} listing(s). Upgrade to add more.` });
      return;
    }

    const {
      title, category, listingType, price, province, city, suburb, address,
      description, featuredImage, virtualTourLink,
    } = req.body;

    if (!title || !category || !listingType) {
      res.status(400).json({ error: "Title, category and listing type are required." });
      return;
    }

    // Generate a reference number
    const ref = `DG-C-${Date.now().toString(36).toUpperCase()}`;

    const property = await Property.create({
      title, referenceNumber: ref, category, listingType,
      price, province, city, suburb, address, description,
      featuredImage, virtualTourLink,
      status: "pending",           // must be approved by admin before going live
      submittedByUserId: userId,
      isFeatured: false,
    } as any);

    res.status(201).json(property);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to submit listing", details: err.message });
  }
};

// ── Update a client's own listing (only if still pending/draft) ────────
export const updateClientListing = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const prop = await Property.findOne({ where: { id: req.params.id, submittedByUserId: req.user!.id } });
    if (!prop) { res.status(404).json({ error: "Listing not found." }); return; }
    if (!["draft", "pending"].includes(prop.status)) {
      res.status(403).json({ error: "Published listings can only be edited by admins." });
      return;
    }
    const { title, category, listingType, price, province, city, suburb, address, description, virtualTourLink } = req.body;
    await prop.update({ title, category, listingType, price, province, city, suburb, address, description, virtualTourLink });
    res.json(prop);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update listing", details: err.message });
  }
};

// ── Delete a client's own listing (only if pending/draft) ──────────────
export const deleteClientListing = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const prop = await Property.findOne({ where: { id: req.params.id, submittedByUserId: req.user!.id } });
    if (!prop) { res.status(404).json({ error: "Listing not found." }); return; }
    if (!["draft", "pending"].includes(prop.status)) {
      res.status(403).json({ error: "Cannot delete a published listing. Contact admin." });
      return;
    }
    await prop.destroy();
    res.json({ message: "Listing deleted." });
  } catch {
    res.status(500).json({ error: "Failed to delete listing" });
  }
};

// ── Submit payment proof for subscription upgrade ──────────────────────
export const submitPaymentProof = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { planId, billingCycle, paymentReference, paymentProofUrl } = req.body;
    if (!planId) { res.status(400).json({ error: "Plan ID required." }); return; }

    const plan = await MembershipPlan.findByPk(planId);
    if (!plan) { res.status(404).json({ error: "Plan not found." }); return; }

    // Cancel existing pending/active subscription
    await UserSubscription.update(
      { status: "cancelled" },
      { where: { userId: req.user!.id, status: { [Op.in]: ["active", "pending_payment"] } } }
    );

    const sub = await UserSubscription.create({
      userId: req.user!.id,
      planId,
      status: "pending_payment",
      billingCycle: billingCycle || "monthly",
      startDate: new Date(),
      paymentReference,
      paymentProofUrl,
    } as any);

    res.status(201).json({ message: "Payment submitted. Admin will activate your plan shortly.", subscription: sub });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to submit payment proof", details: err.message });
  }
};
