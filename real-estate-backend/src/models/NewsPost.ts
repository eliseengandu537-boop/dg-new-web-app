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

  // ── Magazine structured sections ───────────────────────────────────────
  @Column({ type: DataType.TEXT, allowNull: true })
  featuredStories?: string; // JSON: FeaturedStory[]

  @Column({ type: DataType.TEXT, allowNull: true })
  deals?: string; // JSON: Deal[]

  @Column({ type: DataType.TEXT, allowNull: true })
  gallery?: string; // JSON: GalleryItem[]

  @Column({ type: DataType.TEXT, allowNull: true })
  leaderboard?: string; // JSON: LeaderboardEntry[]

  @Column({ type: DataType.STRING, allowNull: true })
  breakingNewsTitle?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  breakingNewsDesc?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  breakingNewsUrl?: string;
}
