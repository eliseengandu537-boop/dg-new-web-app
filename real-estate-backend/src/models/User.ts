import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { SavedProperty } from "./SavedProperty";
import { SavedSearch } from "./SavedSearch";
import { Viewing } from "./Viewing";

@Table({ tableName: "users" })
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  termsAccepted!: boolean;

  // role: 'admin' | 'client'
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "client" })
  role!: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isActive!: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  firstName?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  lastName?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phoneNumber?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  about?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  company?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  jobTitle?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  website?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  whatsapp?: string;

  @HasMany(() => SavedProperty)
  savedProperties?: SavedProperty[];

  @HasMany(() => SavedSearch)
  savedSearches?: SavedSearch[];

  @HasMany(() => Viewing)
  viewings?: Viewing[];
}
