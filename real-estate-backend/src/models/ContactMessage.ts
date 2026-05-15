import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Property } from "./Property";
import { User } from "./User";

@Table({ tableName: "contact_messages", timestamps: true })
export class ContactMessage extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare phone: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare subject: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare message: string;

  // Optional link to a property
  @ForeignKey(() => Property)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare propertyId: number;

  @BelongsTo(() => Property)
  declare property: Property;

  // Optional link to a registered user
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  // new | read | replied | archived
  @Column({ type: DataType.STRING, defaultValue: "new" })
  declare status: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare adminReply: string;

  @CreatedAt declare createdAt: Date;
  @UpdatedAt declare updatedAt: Date;
}
