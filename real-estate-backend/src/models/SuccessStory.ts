import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "success_stories" })
export class SuccessStory extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  slug!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  tag?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  location?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  gla?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  parking?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  openingDate?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  anchorTenant?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  projectType?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  summary?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  body?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  imageUrl?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  brochureUrl?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  googleMapsQuery?: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  sortOrder!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isPublished!: boolean;
}
