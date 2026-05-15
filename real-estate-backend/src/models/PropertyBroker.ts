import { Table, Column, Model, DataType, ForeignKey, PrimaryKey } from "sequelize-typescript";
import { Property } from "./Property";
import { Broker } from "./Broker";

@Table({ tableName: "property_brokers" })
export class PropertyBroker extends Model {
  @PrimaryKey
  @ForeignKey(() => Property)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: false })
  propertyId!: number;

  @PrimaryKey
  @ForeignKey(() => Broker)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: false })
  brokerId!: number;
}
