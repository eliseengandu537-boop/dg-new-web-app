import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "featured_slides" })
export class FeaturedSlide extends Model {
  // Optional caption shown over the slide (e.g. property name)
  @Column({ type: DataType.STRING, allowNull: true })
  title?: string;

  // Optional secondary line (e.g. location)
  @Column({ type: DataType.STRING, allowNull: true })
  subtitle?: string;

  // Badge label — typically "sold" or "leased"
  @Column({ type: DataType.STRING, allowNull: true })
  status?: string;

  // The slide image (required in practice)
  @Column({ type: DataType.STRING, allowNull: true })
  imageUrl?: string;

  // Optional link the slide points to
  @Column({ type: DataType.STRING, allowNull: true })
  linkUrl?: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  sortOrder!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isPublished!: boolean;
}
