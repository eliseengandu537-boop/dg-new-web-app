import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany } from "sequelize-typescript";
import { UserSubscription } from "./UserSubscription";

@Table({ tableName: "membership_plans", timestamps: true })
export class MembershipPlan extends Model {
  // free | standard | business
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  // Price in ZAR per month (0 for free)
  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  declare priceMonthly: number;

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  declare priceYearly: number;

  // JSON array of feature strings stored as TEXT
  @Column({
    type: DataType.TEXT,
    defaultValue: "[]",
    get() { try { return JSON.parse((this as any).getDataValue("features") || "[]"); } catch { return []; } },
    set(val: any) { (this as any).setDataValue("features", JSON.stringify(val)); },
  })
  declare features: string[];

  @Column({ type: DataType.INTEGER, defaultValue: 5 })
  declare maxSavedProperties: number;

  @Column({ type: DataType.INTEGER, defaultValue: 3 })
  declare maxViewings: number;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  declare maxListings: number;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  declare sortOrder: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare isActive: boolean;

  @HasMany(() => UserSubscription)
  declare subscriptions: UserSubscription[];

  @CreatedAt declare createdAt: Date;
  @UpdatedAt declare updatedAt: Date;
}
