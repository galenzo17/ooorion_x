import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const assets = sqliteTable('assets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  symbol: text('symbol').notNull().unique(),
  name: text('name').notNull(),
  balance: real('balance').notNull().default(0),
  price: real('price').notNull().default(0),
  value: real('value').notNull().default(0),
  change24h: real('change_24h').notNull().default(0),
  changePercent24h: real('change_percent_24h').notNull().default(0),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});

export const priceHistory = sqliteTable('price_history', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  assetId: integer('asset_id').references(() => assets.id),
  timestamp: text('timestamp').notNull().default(sql`(datetime('now'))`),
  price: real('price').notNull(),
  totalValue: real('total_value').notNull(),
});

export const portfolioSnapshots = sqliteTable('portfolio_snapshots', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').notNull().default(sql`(datetime('now'))`),
  totalValue: real('total_value').notNull(),
  totalChange24h: real('total_change_24h').notNull(),
  totalChangePercent24h: real('total_change_percent_24h').notNull(),
  totalAssets: integer('total_assets').notNull(),
});

export type Asset = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;
export type PriceHistory = typeof priceHistory.$inferSelect;
export type NewPriceHistory = typeof priceHistory.$inferInsert;
export type PortfolioSnapshot = typeof portfolioSnapshots.$inferSelect;
export type NewPortfolioSnapshot = typeof portfolioSnapshots.$inferInsert;