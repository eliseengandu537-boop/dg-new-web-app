import { Response, Request } from "express";
import { Op } from "sequelize";
import { Property } from "../models/Property";
import { Broker } from "../models/Broker";
import { PropertyBroker } from "../models/PropertyBroker";
import { User } from "../models/User";
import { UserSubscription } from "../models/UserSubscription";
import { MembershipPlan } from "../models/MembershipPlan";
import { AuthRequest } from "../middleware/authMiddleware";
import { v4 as uuidv4 } from "uuid";
import { toUploadUrl } from "../utils/uploads";

// Returns { type: 'client'|'broker', planName, data: {...} } for the "agent" shown on a listing
const buildAgentInfo = async (property: Property): Promise<{ type: string; planName: string; data: any }> => {
  if (property.submittedByUserId) {
    // Check if the submitter has an active paid plan
    const sub = await UserSubscription.findOne({
      where: { userId: property.submittedByUserId, status: "active" },
      include: [{ model: MembershipPlan, attributes: ["name", "priceMonthly"] }],
      order: [["createdAt", "DESC"]],
    });
    const planName: string = (sub as any)?.membershipPlan?.name || "Free";
    if (planName !== "Free") {
      // Paid plan — show client profile
      const user = property.submittedByUser ||
        await User.findByPk(property.submittedByUserId, { attributes: { exclude: ["password"] } });
      return { type: "client", planName, data: user };
    }
  }
  // Free / no plan — show assigned broker or first linked broker
  const agent = property.assignedBroker ||
    (property.brokers && property.brokers[0]) ||
    null;
  return { type: "broker", planName: "Free", data: agent };
};


const buildRefNumber = () =>
  "DG-" + uuidv4().split("-")[0].toUpperCase();

// ── Helpers ──────────────────────────────────────────────────────────────
const parseFiles = (files: any) => {
  const result: Record<string, any> = {};
  if (!files) return result;

  // uploadAny() returns an array; .fields() returns a keyed object — normalise both
  const byField: Record<string, any[]> = {};
  if (Array.isArray(files)) {
    for (const f of files) {
      if (!byField[f.fieldname]) byField[f.fieldname] = [];
      byField[f.fieldname].push(f);
    }
  } else {
    Object.assign(byField, files);
  }

  // All files land in uploads/misc when using uploadAny
  const url = (f: any) => toUploadUrl("misc", f.filename);

  if (byField.featuredImage?.[0]) result.featuredImage = url(byField.featuredImage[0]);
  if (byField.gallery?.length)    result.gallery    = byField.gallery.map(url);
  if (byField.brochurePdf?.[0])  result.brochurePdf = url(byField.brochurePdf[0]);
  if (byField.floorPlans?.length) result.floorPlans = byField.floorPlans.map(url);

  return result;
};

// Merge each unit's existing image URLs (sent in the units JSON) with any newly
// uploaded files, which arrive under field names like `unitImage_0`, `unitImage_1`.
const attachUnitImages = (units: any, files: any): { name: string; size: string; note: string; images: string[] }[] => {
  if (!Array.isArray(units)) return [];

  const byField: Record<string, any[]> = {};
  if (Array.isArray(files)) {
    for (const f of files) {
      if (!byField[f.fieldname]) byField[f.fieldname] = [];
      byField[f.fieldname].push(f);
    }
  } else if (files) {
    Object.assign(byField, files);
  }

  return units.map((u: any, i: number) => {
    const uploaded = (byField[`unitImage_${i}`] || []).map((f: any) => toUploadUrl("misc", f.filename));
    const existing = Array.isArray(u?.images) ? u.images.filter((x: any) => typeof x === "string") : [];
    return {
      name: String(u?.name ?? ""),
      size: String(u?.size ?? ""),
      note: String(u?.note ?? ""),
      images: [...existing, ...uploaded],
    };
  });
};

type PublicPropertyFilterMode = "contains" | "select" | "min" | "max";

const CATEGORY_TO_LISTING_CATEGORY_MAP: Record<string, string> = {
  commercial_office: "commercial",
  mixed_use: "commercial",
  development_land: "development",
  retail: "retail_leasing",
  industrial_warehouse: "industrial",
  investment: "investment",
  fuel_station: "fuel_station",
};

const deriveListingCategory = (category?: string, listingType?: string) => {
  if (category && CATEGORY_TO_LISTING_CATEGORY_MAP[category]) {
    return CATEGORY_TO_LISTING_CATEGORY_MAP[category];
  }

  if (listingType === "investment") return "investment";
  if (listingType === "lease") return "retail_leasing";

  return "commercial";
};

const PUBLIC_PROPERTY_FILTER_RULES: Record<string, { mode: PublicPropertyFilterMode; source?: "price" | "location" | "listingCategory" }> = {
  listingCategory: { mode: "select", source: "listingCategory" },
  location: { mode: "contains", source: "location" },
  area: { mode: "contains" },
  size: { mode: "min" },
  budget: { mode: "max", source: "price" },
  yield: { mode: "min" },
  anchorTenant: { mode: "contains" },
  numberOfTenants: { mode: "min" },
  rentalPerM2: { mode: "max" },
  operatingCost: { mode: "max" },
  boxType: { mode: "select" },
  extraction: { mode: "select" },
  minimumLeaseTerm: { mode: "max" },
  streetFacing: { mode: "select" },
  inlineStore: { mode: "select" },
  powerSupplyKva: { mode: "min" },
  yardSize: { mode: "min" },
  warehouseGla: { mode: "min" },
  officeGla: { mode: "min" },
  loadingDock: { mode: "select" },
  rollerShutters: { mode: "select" },
  zoning: { mode: "contains" },
  heightToEaves: { mode: "min" },
  cranes: { mode: "select" },
  litersPump: { mode: "min" },
  netIncome: { mode: "min" },
  landBusinessOption: { mode: "select" },
  leaseTerm: { mode: "contains" },
  oilCompany: { mode: "contains" },
  cStoreTurnover: { mode: "min" },
};

const isBlankFilterValue = (value: any) =>
  value === undefined || value === null || String(value).trim() === "";

const normalizeSearchText = (value: any) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

const normalizeSelectValue = (value: any) => {
  const normalized = normalizeSearchText(value);
  if (!normalized) return "";
  if (["yes", "true", "1"].includes(normalized)) return "yes";
  if (["no", "false", "0"].includes(normalized)) return "no";
  return normalized;
};

const parseComparableNumber = (value: any): number | null => {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;

  const match = String(value).replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  if (!match) return null;

  const parsed = parseFloat(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
};

const parseBooleanQuery = (value: any): boolean | undefined => {
  if (value === undefined || value === null || value === "") return undefined;

  const normalized = String(value).trim().toLowerCase();
  if (["true", "1", "yes"].includes(normalized)) return true;
  if (["false", "0", "no"].includes(normalized)) return false;

  return undefined;
};

const matchesContainsFilter = (propertyValue: any, filterValue: any) => {
  const expected = normalizeSearchText(filterValue);
  if (!expected) return true;

  const actual = normalizeSearchText(propertyValue);
  return actual.includes(expected);
};

const matchesSelectFilter = (propertyValue: any, filterValue: any) => {
  const expected = normalizeSelectValue(filterValue);
  if (!expected) return true;

  const actual = normalizeSelectValue(propertyValue);
  return actual === expected;
};

const matchesMinFilter = (propertyValue: any, filterValue: any) => {
  const expected = parseComparableNumber(filterValue);
  if (expected === null) return true;

  const actual = parseComparableNumber(propertyValue);
  return actual !== null && actual >= expected;
};

const matchesMaxFilter = (propertyValue: any, filterValue: any) => {
  const expected = parseComparableNumber(filterValue);
  if (expected === null) return true;

  const actual = parseComparableNumber(propertyValue);
  return actual !== null && actual <= expected;
};

const getLocationSearchValue = (property: Property) =>
  [property.address, property.suburb, property.city, property.province]
    .filter(Boolean)
    .join(" ");

const getKeywordSearchValues = (property: Property) =>
  [
    property.title,
    property.suburb,
    property.city,
    property.referenceNumber,
    property.description,
  ].filter(Boolean);

const resolveListingCategory = (property: Property) =>
  property.listingCategory || deriveListingCategory(property.category, property.listingType);

const matchesKeywordSearch = (property: Property, filterValue: any) => {
  const expected = normalizeSearchText(filterValue);
  if (!expected) return true;

  return getKeywordSearchValues(property).some((value) =>
    normalizeSearchText(value).includes(expected)
  );
};

const matchesAdvancedPublicFilters = (property: Property, filters: Record<string, any>) => {
  const categoryDetails = property.categoryDetails || {};

  return Object.entries(filters).every(([key, value]) => {
    if (isBlankFilterValue(value)) return true;

    const rule = PUBLIC_PROPERTY_FILTER_RULES[key];
    if (!rule) return true;

    const propertyValue = rule.source === "location"
      ? getLocationSearchValue(property)
      : rule.source === "listingCategory"
        ? resolveListingCategory(property)
      : rule.source === "price"
        ? property.price
        : categoryDetails[key];

    switch (rule.mode) {
      case "contains":
        return matchesContainsFilter(propertyValue, value);
      case "select":
        return matchesSelectFilter(propertyValue, value);
      case "min":
        return matchesMinFilter(propertyValue, value);
      case "max":
        return matchesMaxFilter(propertyValue, value);
      default:
        return true;
    }
  });
};

const buildPublicPropertySuggestions = (
  properties: Property[],
  term: string,
  field: "location" | "search"
) => {
  const normalizedTerm = normalizeSearchText(term);
  const seen = new Set<string>();
  const suggestions: { value: string; label: string; type: "title" | "location" | "reference" }[] = [];

  const addSuggestion = (
    value: any,
    type: "title" | "location" | "reference",
    label?: string
  ) => {
    const suggestionValue = String(value ?? "").trim();
    const normalizedValue = normalizeSearchText(suggestionValue);

    if (!suggestionValue || !normalizedValue.includes(normalizedTerm)) return;

    const key = `${type}:${normalizedValue}`;
    if (seen.has(key)) return;

    seen.add(key);
    suggestions.push({
      value: suggestionValue,
      label: label || suggestionValue,
      type,
    });
  };

  properties.forEach((property) => {
    const locationLabel = [property.suburb, property.city].filter(Boolean).join(", ");

    if (field === "location") {
      addSuggestion(property.suburb, "location");
      addSuggestion(property.city, "location");
      addSuggestion(property.province, "location");
      return;
    }

    addSuggestion(
      property.title,
      "title",
      locationLabel ? `${property.title} - ${locationLabel}` : property.title
    );
    addSuggestion(
      property.referenceNumber,
      "reference",
      property.title ? `${property.referenceNumber} - ${property.title}` : property.referenceNumber
    );
    addSuggestion(property.suburb, "location");
    addSuggestion(property.city, "location");
  });

  return suggestions.slice(0, 8);
};

// ── LIST all (admin, with filtering) ───────────────────────────────────
export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, status, listingType, listingCategory, city, province, search, page = "1", limit = "20" } = req.query;

    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;
    if (listingType) where.listingType = listingType;
    if (listingCategory) where.listingCategory = listingCategory;
    if (city) where.city = city;
    if (province) where.province = province;
    if (search) where.title = { [Op.like]: `%${search}%` };

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    const { rows: properties, count } = await Property.findAndCountAll({
      where,
      include: [
        { model: Broker, as: "brokers", through: { attributes: [] } },
        { model: User, as: "submittedByUser", attributes: ["id", "name", "email", "avatar", "jobTitle", "company"] },
      ],
      order: [["createdAt", "DESC"]],
      limit: limitNum,
      offset,
    });

    res.json({ properties, total: count, page: pageNum, totalPages: Math.ceil(count / limitNum) });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch properties", details: err.message });
  }
};

// ── LIST published (public, with filtering) ────────────────────────────
export const getPublicProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      category, listingType, listingCategory, city, province, suburb,
      priceMin, priceMax, search, location, featured,
      area, size, budget, yield: yieldFilter, anchorTenant, numberOfTenants,
      rentalPerM2, operatingCost, boxType, extraction, minimumLeaseTerm,
      streetFacing, inlineStore, powerSupplyKva, yardSize, warehouseGla,
      officeGla, loadingDock, rollerShutters, zoning, heightToEaves,
      cranes, litersPump, netIncome, landBusinessOption, leaseTerm,
      oilCompany, cStoreTurnover,
      page = "1", limit = "12",
    } = req.query;

    const where: any = { status: "published" };
    if (category) where.category = category;
    if (listingType) where.listingType = listingType;
    const featuredFilter = parseBooleanQuery(featured);
    if (featuredFilter !== undefined) where.isFeatured = featuredFilter;
    if (city) where.city = { [Op.like]: `%${city}%` };
    if (province) where.province = { [Op.like]: `%${province}%` };
    if (suburb) where.suburb = { [Op.like]: `%${suburb}%` };
    if (priceMin || priceMax) {
      where.price = {};
      if (priceMin) where.price[Op.gte] = parseFloat(priceMin as string);
      if (priceMax) where.price[Op.lte] = parseFloat(priceMax as string);
    }

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit as string, 10) || 12);

    const advancedFilters = {
      listingCategory,
      location,
      area,
      size,
      budget,
      yield: yieldFilter,
      anchorTenant,
      numberOfTenants,
      rentalPerM2,
      operatingCost,
      boxType,
      extraction,
      minimumLeaseTerm,
      streetFacing,
      inlineStore,
      powerSupplyKva,
      yardSize,
      warehouseGla,
      officeGla,
      loadingDock,
      rollerShutters,
      zoning,
      heightToEaves,
      cranes,
      litersPump,
      netIncome,
      landBusinessOption,
      leaseTerm,
      oilCompany,
      cStoreTurnover,
    };

    const properties = await Property.findAll({
      where,
      include: [
        { model: Broker, as: "brokers", through: { attributes: [] }, where: { isActive: true }, required: false },
        { model: Broker, as: "assignedBroker" },
        { model: User, as: "submittedByUser", attributes: ["id", "name", "email", "avatar", "jobTitle", "company", "phoneNumber", "whatsapp", "about", "website"] },
      ],
      order: [["isFeatured", "DESC"], ["createdAt", "DESC"]],
    });

    const filteredProperties = properties.filter((property) =>
      matchesKeywordSearch(property, search) &&
      matchesAdvancedPublicFilters(property, advancedFilters)
    );

    const total = filteredProperties.length;
    const totalPages = Math.max(1, Math.ceil(total / limitNum));
    const offset = (pageNum - 1) * limitNum;
    const paginatedProperties = filteredProperties.slice(offset, offset + limitNum);

    res.json({ properties: paginatedProperties, total, page: pageNum, totalPages });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch properties", details: err.message });
  }
};

export const getPublicPropertySuggestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      term,
      field = "search",
      category,
      listingType,
      priceMin,
      priceMax,
    } = req.query;

    if (!term || !String(term).trim()) {
      res.json({ suggestions: [] });
      return;
    }

    const where: any = { status: "published" };

    if (category) where.category = category;
    if (listingType) where.listingType = listingType;
    if (priceMin || priceMax) {
      where.price = {};
      if (priceMin) where.price[Op.gte] = parseFloat(priceMin as string);
      if (priceMax) where.price[Op.lte] = parseFloat(priceMax as string);
    }

    const properties = await Property.findAll({
      where,
      order: [["isFeatured", "DESC"], ["createdAt", "DESC"]],
      limit: 60,
    });

    const suggestionField = field === "location" ? "location" : "search";
    const matchedProperties = properties.filter((property) =>
      suggestionField === "location"
        ? matchesContainsFilter(getLocationSearchValue(property), term)
        : matchesKeywordSearch(property, term) || matchesContainsFilter(getLocationSearchValue(property), term)
    );

    res.json({
      suggestions: buildPublicPropertySuggestions(matchedProperties, String(term), suggestionField),
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch property suggestions", details: err.message });
  }
};

// ── GET single property ─────────────────────────────────────────────────
export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findByPk(req.params.id, {
      include: [
        { model: Broker, as: "brokers", through: { attributes: [] } },
        { model: Broker, as: "assignedBroker" },
        { model: User, as: "submittedByUser", attributes: { exclude: ["password"] } },
      ],
    });
    if (!property) { res.status(404).json({ error: "Property not found" }); return; }
    const agentInfo = await buildAgentInfo(property);
    res.json({ ...property.toJSON(), agentInfo });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch property", details: err.message });
  }
};

// ── CREATE property ─────────────────────────────────────────────────────
export const createProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data: any = { ...req.body };

    // Parse JSON strings from multipart/form-data
    if (typeof data.categoryDetails === "string") {
      try { data.categoryDetails = JSON.parse(data.categoryDetails); } catch { /**/ }
    }
    if (typeof data.gallery === "string") {
      try { data.gallery = JSON.parse(data.gallery); } catch { data.gallery = []; }
    }
    if (typeof data.floorPlans === "string") {
      try { data.floorPlans = JSON.parse(data.floorPlans); } catch { data.floorPlans = []; }
    }
    if (typeof data.nearby === "string") {
      try { data.nearby = JSON.parse(data.nearby); } catch { data.nearby = []; }
    }
    if (typeof data.amenities === "string") {
      try { data.amenities = JSON.parse(data.amenities); } catch { data.amenities = []; }
    }
    if (typeof data.units === "string") {
      try { data.units = JSON.parse(data.units); } catch { data.units = []; }
    }

    const files = parseFiles((req as any).files);
    Object.assign(data, files);

    if (data.units !== undefined) {
      data.units = attachUnitImages(data.units, (req as any).files);
    }

    if (!data.referenceNumber) {
      data.referenceNumber = buildRefNumber();
    }

    if (!data.listingCategory) {
      data.listingCategory = deriveListingCategory(data.category, data.listingType);
    }

    const toNullableFloat = (v: any) =>
      (v === "" || v === "null" || v === "undefined" || v == null) ? null : (parseFloat(v) || null);
    const toNullableInt = (v: any) =>
      (v === "" || v === "null" || v === "undefined" || v == null) ? null : (parseInt(v, 10) || null);

    if (data.assignedBrokerId !== undefined) data.assignedBrokerId = toNullableInt(data.assignedBrokerId);
    if (data.submittedByUserId !== undefined) data.submittedByUserId = toNullableInt(data.submittedByUserId);
    if (data.gpsLat !== undefined) data.gpsLat = toNullableFloat(data.gpsLat);
    if (data.gpsLng !== undefined) data.gpsLng = toNullableFloat(data.gpsLng);
    if (data.price !== undefined) data.price = toNullableFloat(data.price);
    if (data.isFeatured !== undefined) {
      data.isFeatured = data.isFeatured === true || data.isFeatured === "true";
    }

    const brokerIds: number[] = data.brokerIds
      ? (typeof data.brokerIds === "string" ? JSON.parse(data.brokerIds) : data.brokerIds)
      : [];
    delete data.brokerIds;

    const property = await Property.create(data);

    if (brokerIds.length > 0) {
      await Promise.all(
        brokerIds.map((bId) => PropertyBroker.create({ propertyId: property.id, brokerId: bId }))
      );
    }

    const full = await Property.findByPk(property.id, {
      include: [{ model: Broker, as: "brokers", through: { attributes: [] } }],
    });
    res.status(201).json(full);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to create property", details: err.message });
  }
};

// ── UPDATE property ─────────────────────────────────────────────────────
export const updateProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) { res.status(404).json({ error: "Property not found" }); return; }

    const data: any = { ...req.body };

    if (typeof data.categoryDetails === "string") {
      try { data.categoryDetails = JSON.parse(data.categoryDetails); } catch { /**/ }
    }
    if (typeof data.gallery === "string") {
      try { data.gallery = JSON.parse(data.gallery); } catch { data.gallery = []; }
    }
    if (typeof data.floorPlans === "string") {
      try { data.floorPlans = JSON.parse(data.floorPlans); } catch { data.floorPlans = []; }
    }
    if (typeof data.nearby === "string") {
      try { data.nearby = JSON.parse(data.nearby); } catch { data.nearby = []; }
    }
    if (typeof data.amenities === "string") {
      try { data.amenities = JSON.parse(data.amenities); } catch { data.amenities = []; }
    }
    if (typeof data.units === "string") {
      try { data.units = JSON.parse(data.units); } catch { data.units = []; }
    }

    if (!data.listingCategory) {
      data.listingCategory = deriveListingCategory(
        data.category || property.category,
        data.listingType || property.listingType
      );
    }

    // Sanitize FK and numeric fields — empty strings cause SQLITE_CONSTRAINT errors
    const toNullableFloat = (v: any) =>
      (v === "" || v === "null" || v === "undefined" || v == null) ? null : (parseFloat(v) || null);
    const toNullableInt = (v: any) =>
      (v === "" || v === "null" || v === "undefined" || v == null) ? null : (parseInt(v, 10) || null);

    if (data.assignedBrokerId !== undefined) data.assignedBrokerId = toNullableInt(data.assignedBrokerId);
    if (data.submittedByUserId !== undefined) data.submittedByUserId = toNullableInt(data.submittedByUserId);
    if (data.gpsLat !== undefined) data.gpsLat = toNullableFloat(data.gpsLat);
    if (data.gpsLng !== undefined) data.gpsLng = toNullableFloat(data.gpsLng);
    if (data.price !== undefined) data.price = toNullableFloat(data.price);
    if (data.isFeatured !== undefined)
      data.isFeatured = data.isFeatured === true || data.isFeatured === "true";

    // Capture existing arrays BEFORE parseFiles overwrites them
    const existingGallery: string[] = Array.isArray(data.gallery) ? data.gallery : [];
    const existingFloorPlans: string[] = Array.isArray(data.floorPlans) ? data.floorPlans : [];

    const rawFiles = (req as any).files;
    const files = parseFiles(rawFiles);
    Object.assign(data, files);

    // Merge existing URLs with newly uploaded files (don't drop existing on new upload)
    if (files.gallery) data.gallery = [...existingGallery, ...files.gallery];
    if (files.floorPlans) data.floorPlans = [...existingFloorPlans, ...files.floorPlans];

    if (data.units !== undefined) {
      data.units = attachUnitImages(data.units, rawFiles);
    }

    const brokerIds: number[] | undefined = data.brokerIds !== undefined
      ? (typeof data.brokerIds === "string" ? JSON.parse(data.brokerIds) : data.brokerIds)
      : undefined;
    delete data.brokerIds;

    await property.update(data);

    if (brokerIds !== undefined) {
      await PropertyBroker.destroy({ where: { propertyId: property.id } });
      if (brokerIds.length > 0) {
        await Promise.all(
          brokerIds.map((bId) => PropertyBroker.create({ propertyId: property.id, brokerId: bId }))
        );
      }
    }

    const full = await Property.findByPk(property.id, {
      include: [{ model: Broker, as: "brokers", through: { attributes: [] } }],
    });
    res.json(full);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update property", details: err.message });
  }
};

// ── UPDATE property status ──────────────────────────────────────────────
export const updatePropertyStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validStatuses = ["draft", "pending", "published", "under_offer", "sold", "leased", "archived"];
    const { status } = req.body;
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: "Invalid status" }); return;
    }
    const property = await Property.findByPk(req.params.id);
    if (!property) { res.status(404).json({ error: "Property not found" }); return; }
    await property.update({ status });
    res.json(property);
  } catch {
    res.status(500).json({ error: "Failed to update status" });
  }
};

// ── DELETE property ─────────────────────────────────────────────────────
export const deleteProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) { res.status(404).json({ error: "Property not found" }); return; }
    await PropertyBroker.destroy({ where: { propertyId: property.id } });
    await property.destroy();
    res.json({ message: "Property deleted" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete property", details: err.message });
  }
};
