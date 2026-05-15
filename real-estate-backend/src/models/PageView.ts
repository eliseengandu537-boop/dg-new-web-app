import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "page_views", timestamps: true, updatedAt: false })
export class PageView extends Model {
  @Column({ type: DataType.STRING(64), allowNull: true })
  sessionId?: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  path?: string;
}
