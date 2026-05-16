import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { sequelize } from "./config/database";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import brokerRoutes from "./routes/brokerRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import adminRoutes from "./routes/adminRoutes";
import clientRoutes from "./routes/clientRoutes";
import messageRoutes from "./routes/messageRoutes";
import membershipRoutes from "./routes/membershipRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import successStoryRoutes from "./routes/successStoryRoutes";
import pageviewRoutes from "./routes/pageviewRoutes";
import newsRoutes from "./routes/newsRoutes";
import { User } from "./models/User";
import { MembershipPlan } from "./models/MembershipPlan";
import { PageView } from "./models/PageView";
import { Property } from "./models/Property";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL || "elisee@dg-property.co.za";
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || "adminelisee";

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/brokers", brokerRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/success-stories", successStoryRoutes);
app.use("/api/pageviews", pageviewRoutes);
app.use("/api/news", newsRoutes);

const repairPropertyBrokerTable = async () => {
  const dialect = sequelize.getDialect();

  if (dialect === "sqlite") {
    const [rows]: any = await sequelize.query(
      "SELECT sql FROM sqlite_master WHERE type='table' AND name='property_brokers'"
    );
    const createSql: string | undefined = rows?.[0]?.sql;
    const hasBrokenUniqueConstraints =
      !!createSql &&
      createSql.includes("propertyId` INTEGER NOT NULL UNIQUE") &&
      createSql.includes("brokerId` INTEGER NOT NULL UNIQUE");

    if (!hasBrokenUniqueConstraints) return;

    await sequelize.query("PRAGMA foreign_keys = OFF");
    const tx = await sequelize.transaction();

    try {
      await sequelize.query("DROP TABLE IF EXISTS property_brokers_fix", { transaction: tx });
      await sequelize.query(
        `CREATE TABLE property_brokers_fix (
          propertyId INTEGER NOT NULL REFERENCES properties (id) ON DELETE CASCADE ON UPDATE CASCADE,
          brokerId INTEGER NOT NULL REFERENCES brokers (id) ON DELETE CASCADE ON UPDATE CASCADE,
          createdAt DATETIME NOT NULL,
          updatedAt DATETIME NOT NULL,
          PRIMARY KEY (propertyId, brokerId)
        )`,
        { transaction: tx }
      );
      await sequelize.query(
        `INSERT OR IGNORE INTO property_brokers_fix (propertyId, brokerId, createdAt, updatedAt)
         SELECT propertyId, brokerId, createdAt, updatedAt FROM property_brokers`,
        { transaction: tx }
      );
      await sequelize.query("DROP TABLE property_brokers", { transaction: tx });
      await sequelize.query("ALTER TABLE property_brokers_fix RENAME TO property_brokers", { transaction: tx });
      await tx.commit();
      console.log("Repaired property_brokers schema for many-to-many broker assignments.");
    } catch (err) {
      await tx.rollback();
      throw err;
    } finally {
      await sequelize.query("PRAGMA foreign_keys = ON");
    }

    return;
  }

  if (dialect === "postgres") {
    const [rows]: any = await sequelize.query(`
      SELECT con.conname
      FROM pg_constraint con
      JOIN pg_class rel ON rel.oid = con.conrelid
      WHERE rel.relname = 'property_brokers' AND con.contype = 'u'
    `);

    if (!Array.isArray(rows) || rows.length === 0) return;

    for (const row of rows) {
      await sequelize.query(`ALTER TABLE "property_brokers" DROP CONSTRAINT IF EXISTS "${row.conname}"`);
    }

    console.log("Removed incorrect unique constraints from property_brokers.");
  }
};

const deriveListingCategory = (category?: string, listingType?: string) => {
  if (category === "retail") return "retail_leasing";
  if (category === "industrial_warehouse") return "industrial";
  if (category === "investment") return "investment";
  if (category === "fuel_station") return "fuel_station";
  if (category === "development_land") return "development";
  if (category === "commercial_office" || category === "mixed_use") return "commercial";
  if (listingType === "investment") return "investment";
  if (listingType === "lease") return "retail_leasing";
  return "commercial";
};

const backfillPropertyListingCategories = async () => {
  const properties = await Property.findAll();
  let updatedCount = 0;

  for (const property of properties) {
    const listingCategory = deriveListingCategory(property.category, property.listingType);
    if (property.listingCategory !== listingCategory) {
      await property.update({ listingCategory });
      updatedCount += 1;
    }
  }

  if (updatedCount > 0) {
    console.log(`Backfilled listingCategory for ${updatedCount} properties.`);
  }
};

const dedupePageViewsByBrowser = async () => {
  const pageViews = await PageView.findAll({
    raw: true,
    order: [["sessionId", "ASC"], ["createdAt", "ASC"], ["id", "ASC"]],
  }) as Array<{ id: number; sessionId?: string | null }>;

  const seenSessionIds = new Set<string>();
  const duplicateIds: number[] = [];

  for (const pageView of pageViews) {
    const sessionId = pageView.sessionId?.trim();
    if (!sessionId) continue;

    if (seenSessionIds.has(sessionId)) {
      duplicateIds.push(pageView.id);
      continue;
    }

    seenSessionIds.add(sessionId);
  }

  if (duplicateIds.length > 0) {
    await PageView.destroy({ where: { id: { [Op.in]: duplicateIds } } });
    console.log(`Removed ${duplicateIds.length} duplicate page view records to keep one record per browser.`);
  }
};

const ensureDefaultAdminUser = async () => {
  const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
  const existingUser = await User.findOne({ where: { email: DEFAULT_ADMIN_EMAIL } });

  if (existingUser) {
    await existingUser.update({
      name: existingUser.name || "Elisee Admin",
      password: hashedPassword,
      termsAccepted: true,
      role: "admin",
      isActive: true,
    });
    console.log(`Admin user ready: ${DEFAULT_ADMIN_EMAIL}`);
    return;
  }

  await User.create({
    name: "Elisee Admin",
    email: DEFAULT_ADMIN_EMAIL,
    password: hashedPassword,
    termsAccepted: true,
    role: "admin",
    isActive: true,
  });
  console.log(`Admin user created: ${DEFAULT_ADMIN_EMAIL}`);
};

sequelize.sync({ alter: { drop: false } }).then(async () => {
  console.log("📌 Database connected & synced!");
  await repairPropertyBrokerTable();
  await backfillPropertyListingCategories();
  await dedupePageViewsByBrowser();
  await ensureDefaultAdminUser();
  await seedDefaultPlans();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err: Error) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

async function seedDefaultPlans() {
  const defaultPlans = [
    {
      name: "Free",
      description: "Start listing your commercial or industrial property at no cost.",
      priceMonthly: 0,
      priceYearly: 0,
      features: JSON.stringify([
        "Browse all listings",
        "Save up to 3 properties",
        "Submit 1 property listing",
        "Buyer contact requests reviewed by admin (2–3 business days)",
        "1 viewing request per month",
      ]),
      maxSavedProperties: 3,
      maxViewings: 1,
      maxListings: 1,
      sortOrder: 1,
      isActive: true,
    },
    {
      name: "Standard",
      description: "Ideal for landlords and small developers actively leasing or selling.",
      priceMonthly: 299,
      priceYearly: 2990,
      features: JSON.stringify([
        "Everything in Free",
        "Save up to 20 properties",
        "Submit up to 5 property listings",
        "Buyer contact approved by admin within 24 hours",
        "You receive buyer name & email once approved",
        "5 viewing requests per month",
        "Listing view & inquiry count analytics",
        "Email notifications for new inquiries",
      ]),
      maxSavedProperties: 20,
      maxViewings: 5,
      maxListings: 5,
      sortOrder: 2,
      isActive: true,
    },
    {
      name: "Business",
      description: "For active investors, large landlords and commercial portfolio managers.",
      priceMonthly: 799,
      priceYearly: 7990,
      features: JSON.stringify([
        "Everything in Standard",
        "Unlimited saved properties",
        "Unlimited property listings",
        "Direct contact — buyers see your details immediately, no admin delay",
        "Unlimited viewing requests",
        "Featured badge on all your listings (priority placement)",
        "Full buyer profile on every inquiry",
        "Advanced analytics per listing",
        "Dedicated account manager",
        "Priority support",
      ]),
      maxSavedProperties: 9999,
      maxViewings: 9999,
      maxListings: 9999,
      sortOrder: 3,
      isActive: true,
    },
  ];

  for (const plan of defaultPlans) {
    const existing = await MembershipPlan.findOne({ where: { name: plan.name } });
    if (!existing) {
      await (MembershipPlan as any).create(plan);
      console.log(`✅ Seeded membership plan: ${plan.name}`);
    } else {
      // Update features/description/prices in case they changed
      await existing.update(plan);
    }
  }
}
