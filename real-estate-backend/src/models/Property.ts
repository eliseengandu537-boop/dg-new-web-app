import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Broker } from "./Broker";
import { PropertyBroker } from "./PropertyBroker";
import { Inquiry } from "./Inquiry";
import { SavedProperty } from "./SavedProperty";
import { Viewing } from "./Viewing";
import { User } from "./User";

/**
 * Property categories:
 *   commercial_office | retail | industrial_warehouse
 *   development_land  | mixed_use | investment
 *
 * Listing types:  sale | lease | investment
 *
 * Status workflow:
 *   draft → pending → published → under_offer → sold | leased | archived
 */

@Table({ tableName: "properties" })
export class Property extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  referenceNumber!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description?: string;

  // e.g. commercial_office, retail, industrial_warehouse, development_land, mixed_use, investment
  @Column({ type: DataType.STRING, allowNull: false })
  category!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  listingCategory?: string;

  // sale | lease | investment
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "sale" })
  listingType!: string;

  @Column({ type: DataType.FLOAT, allowNull: true })
  price?: number;

  @Column({ type: DataType.STRING, allowNull: true })
  province?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  city?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  suburb?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  address?: string;

  @Column({ type: DataType.FLOAT, allowNull: true })
  gpsLat?: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  gpsLng?: number;

  @Column({ type: DataType.STRING, allowNull: true })
  featuredImage?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  virtualTourLink?: string;

  // draft | pending | published | under_offer | sold | leased | archived
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "draft" })
  status!: string;

  // JSON blob for category-specific fields
  @Column({ type: DataType.TEXT, allowNull: true, get() {
    const raw = (this as any).getDataValue("categoryDetails");
    return raw ? JSON.parse(raw) : null;
  }, set(val: any) {
    (this as any).setDataValue("categoryDetails", val ? JSON.stringify(val) : null);
  }})
  categoryDetails?: Record<string, any>;

  // Gallery image paths stored as JSON array
  @Column({ type: DataType.TEXT, allowNull: true, get() {
    const raw = (this as any).getDataValue("gallery");
    return raw ? JSON.parse(raw) : [];
  }, set(val: any) {
    (this as any).setDataValue("gallery", val ? JSON.stringify(val) : "[]");
  }})
  gallery?: string[];

  // Floor plan paths stored as JSON array
  @Column({ type: DataType.TEXT, allowNull: true, get() {
    const raw = (this as any).getDataValue("floorPlans");
    return raw ? JSON.parse(raw) : [];
  }, set(val: any) {
    (this as any).setDataValue("floorPlans", val ? JSON.stringify(val) : "[]");
  }})
  floorPlans?: string[];

  // Nearby places stored as JSON array [{name, distance}]
  @Column({ type: DataType.TEXT, allowNull: true, get() {
    const raw = (this as any).getDataValue("nearby");
    return raw ? JSON.parse(raw) : [];
  }, set(val: any) {
    (this as any).setDataValue("nearby", val ? JSON.stringify(val) : "[]");
  }})
  nearby?: { name: string; distance: string }[];

  @Column({ type: DataType.STRING, allowNull: true })
  brochurePdf?: string;

  // Amenities stored as JSON array of strings
  @Column({ type: DataType.TEXT, allowNull: true, get() {
    const raw = (this as any).getDataValue("amenities");
    return raw ? JSON.parse(raw) : [];
  }, set(val: any) {
    (this as any).setDataValue("amenities", val ? JSON.stringify(val) : "[]");
  }})
  amenities?: string[];

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isFeatured!: boolean;

  @BelongsToMany(() => Broker, () => PropertyBroker)
  brokers?: Broker[];

  @HasMany(() => Inquiry)
  inquiries?: Inquiry[];

  @HasMany(() => SavedProperty)
  savedByUsers?: SavedProperty[];

  @HasMany(() => Viewing)
  viewings?: Viewing[];

  // Client who submitted this listing (null = admin/broker-managed)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  submittedByUserId?: number;

  @BelongsTo(() => User, "submittedByUserId")
  submittedByUser?: User;

  // Admin can assign a specific broker to override the default (used when client has no paid plan)
  @ForeignKey(() => Broker)
  @Column({ type: DataType.INTEGER, allowNull: true })
  assignedBrokerId?: number;

  @BelongsTo(() => Broker, "assignedBrokerId")
  assignedBroker?: Broker;
}
