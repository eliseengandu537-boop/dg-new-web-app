import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Property } from "./Property";
import { User } from "./User";

@Table({ tableName: "reviews", timestamps: true })
export class Review extends Model {
  @ForeignKey(() => Property)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare propertyId: number;

  @BelongsTo(() => Property)
  declare property: Property;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  // For non-registered reviewers
  @Column({ type: DataType.STRING, allowNull: true })
  declare reviewerName: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare reviewerEmail: string;

  // 1–5
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 5 })
  declare rating: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare comment: string;

  // pending | approved | rejected
  @Column({ type: DataType.STRING, defaultValue: "pending" })
  declare status: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isFeatured: boolean;

  @CreatedAt declare createdAt: Date;
  @UpdatedAt declare updatedAt: Date;
}
