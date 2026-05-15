import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "./User";
import { MembershipPlan } from "./MembershipPlan";

@Table({ tableName: "user_subscriptions", timestamps: true })
export class UserSubscription extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => MembershipPlan)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare planId: number;

  @BelongsTo(() => MembershipPlan)
  declare membershipPlan: MembershipPlan;

  // active | cancelled | expired
  @Column({ type: DataType.STRING, defaultValue: "active" })
  declare status: string;

  // monthly | yearly
  @Column({ type: DataType.STRING, defaultValue: "monthly" })
  declare billingCycle: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare startDate: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare endDate: Date;

  // Payment reference / proof of payment
  @Column({ type: DataType.STRING, allowNull: true })
  declare paymentReference: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare paymentProofUrl: string;

  @CreatedAt declare createdAt: Date;
  @UpdatedAt declare updatedAt: Date;
}
