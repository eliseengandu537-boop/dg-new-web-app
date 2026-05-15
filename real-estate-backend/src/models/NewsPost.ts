import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "news_posts" })
export class NewsPost extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  slug!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  category?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  author?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  summary?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  body?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  imageUrl?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  tags?: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isPublished!: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  publishedAt?: Date;
}
