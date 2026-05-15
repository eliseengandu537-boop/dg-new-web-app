import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Property } from "./Property";
import { User } from "./User";

@Table({ tableName: "inquiries" })
export class Inquiry extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  message?: string;

  @ForeignKey(() => Property)
  @Column({ type: DataType.INTEGER, allowNull: true })
  propertyId?: number;

  @BelongsTo(() => Property)
  property?: Property;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  userId?: number;

  @BelongsTo(() => User)
  user?: User;

  // new | read | replied | closed
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "new" })
  status!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  adminNotes?: string;

  // Contact sharing: has admin approved sharing this buyer's details with the property owner?
  // null = pending decision | true = approved | false = denied
  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: null })
  contactApproved?: boolean | null;

  @Column({ type: DataType.DATE, allowNull: true })
  contactApprovedAt?: Date;
}
