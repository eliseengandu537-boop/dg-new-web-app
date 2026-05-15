import { Table, Column, Model, DataType, BelongsToMany } from "sequelize-typescript";
import { Property } from "./Property";
import { PropertyBroker } from "./PropertyBroker";

@Table({ tableName: "brokers" })
export class Broker extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  fullName!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  position?: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  whatsapp?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  officeLocation?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  photo?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  bio?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  specialization?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  linkedin?: string;

  // active / inactive for admin control
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isActive!: boolean;

  // controls whether they show on the public website
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  showOnWebsite!: boolean;

  // display order (lower = first)
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  sortOrder!: number;

  @BelongsToMany(() => Property, () => PropertyBroker)
  properties?: Property[];
}
