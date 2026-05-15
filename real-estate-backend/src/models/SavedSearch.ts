import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Table({ tableName: "saved_searches" })
export class SavedSearch extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  // JSON blob: { category, listingType, province, city, priceMin, priceMax, ... }
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: "{}",
    get() {
      const raw = (this as any).getDataValue("searchParams");
      return raw ? JSON.parse(raw) : {};
    },
    set(val: any) {
      (this as any).setDataValue("searchParams", val ? JSON.stringify(val) : "{}");
    },
  })
  searchParams!: Record<string, any>;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  alertsEnabled!: boolean;
}
