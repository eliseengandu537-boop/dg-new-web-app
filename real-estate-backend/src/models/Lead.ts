import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Broker } from "./Broker";

@Table({ tableName: "leads" })
export class Lead extends Model {
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "general" })
  leadType!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  email?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone?: string;

  // website | referral | cold_call | social_media | other
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: "website" })
  source?: string;

  // new | contacted | qualified | lost | converted
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "new" })
  status!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  interestedCategory?: string;

  @Column({ type: DataType.FLOAT, allowNull: true })
  budgetMin?: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  budgetMax?: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  homePrice?: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  deposit?: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  interestRate?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  loanTermYears?: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  monthlyRepayment?: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  loanAmount?: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  totalInterest?: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  totalPayable?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  convertedClientId?: number;

  @ForeignKey(() => Broker)
  @Column({ type: DataType.INTEGER, allowNull: true })
  assignedBrokerId?: number;

  @BelongsTo(() => Broker)
  assignedBroker?: Broker;
}
