import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Broker } from "../models/Broker";
import { Property } from "../models/Property";
import { PropertyBroker } from "../models/PropertyBroker";
import { Inquiry } from "../models/Inquiry";
import { Lead } from "../models/Lead";
import { SavedProperty } from "../models/SavedProperty";
import { SavedSearch } from "../models/SavedSearch";
import { Viewing } from "../models/Viewing";
import { ContactMessage } from "../models/ContactMessage";
import { MembershipPlan } from "../models/MembershipPlan";
import { UserSubscription } from "../models/UserSubscription";
import { Review } from "../models/Review";
import { SuccessStory } from "../models/SuccessStory";
import { PageView } from "../models/PageView";
import { NewsPost } from "../models/NewsPost";
import { FeaturedSlide } from "../models/FeaturedSlide";
import dotenv from "dotenv";

dotenv.config();

const ALL_MODELS = [
  User,
  Broker,
  Property,
  PropertyBroker,
  Inquiry,
  Lead,
  SavedProperty,
  SavedSearch,
  Viewing,
  ContactMessage,
  MembershipPlan,
  UserSubscription,
  Review,
  SuccessStory,
  PageView,
  NewsPost,
  FeaturedSlide,
];

const databaseUrl = process.env.DATABASE_URL;
const dbDialect = process.env.DB_DIALECT;

export const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: "postgres",
      models: ALL_MODELS,
    })
  : new Sequelize({
      dialect: dbDialect === "postgres" ? "postgres" : "sqlite",
      database: process.env.DB_NAME || "real_estate_db",
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      host: process.env.DB_HOST || "127.0.0.1",
      storage: process.env.DB_STORAGE || "./data/dev.sqlite",
      logging: false,
      models: ALL_MODELS,
    });
