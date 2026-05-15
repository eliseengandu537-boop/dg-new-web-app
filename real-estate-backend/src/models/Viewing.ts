import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Property } from "./Property";

@Table({ tableName: "viewings" })
export class Viewing extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Property)
  @Column({ type: DataType.INTEGER, allowNull: false })
  propertyId!: number;

  @BelongsTo(() => Property)
  property?: Property;

  @Column({ type: DataType.DATE, allowNull: false })
  scheduledDate!: Date;

  // pending | confirmed | completed | cancelled
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "pending" })
  status!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  contactName?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  contactPhone?: string;
}
