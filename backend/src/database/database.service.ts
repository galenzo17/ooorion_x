import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private sqlite: Database.Database;
  public db: ReturnType<typeof drizzle>;

  constructor() {
    const dbPath = './data';
    const dbFile = path.join(dbPath, 'ooorion_x.db');
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath, { recursive: true });
    }
    
    this.sqlite = new Database(dbFile);
    this.db = drizzle(this.sqlite, { schema });
  }

  async onModuleInit() {
    // Run migrations
    try {
      const migrationsFolder = './drizzle';
      if (fs.existsSync(migrationsFolder)) {
        migrate(this.db, { migrationsFolder });
      }
      
      // Seed initial data if database is empty
      await this.seedDatabase();
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }

  private async seedDatabase() {
    const existingAssets = await this.db.select().from(schema.assets);
    
    if (existingAssets.length === 0) {
      // Precios en pesos chilenos (CLP) - aproximados 
      const initialAssets: schema.NewAsset[] = [
        {
          symbol: 'BTC',
          name: 'Bitcoin',
          balance: 0.5,
          price: 67500000, // ~67.5M CLP
          value: 33750000,
          change24h: 1250000,
          changePercent24h: 1.85,
        },
        {
          symbol: 'ETH',
          name: 'Ethereum',
          balance: 2.3,
          price: 3850000, // ~3.85M CLP
          value: 8855000,
          change24h: -120000,
          changePercent24h: -1.35,
        },
        {
          symbol: 'BNB',
          name: 'Binance Coin',
          balance: 5.7,
          price: 620000, // ~620K CLP
          value: 3534000,
          change24h: 85000,
          changePercent24h: 2.46,
        },
        {
          symbol: 'SOL',
          name: 'Solana',
          balance: 12.4,
          price: 180000, // ~180K CLP
          value: 2232000,
          change24h: -45000,
          changePercent24h: -1.98,
        },
        {
          symbol: 'ADA',
          name: 'Cardano',
          balance: 850,
          price: 850, // ~850 CLP
          value: 722500,
          change24h: 12500,
          changePercent24h: 1.76,
        },
        {
          symbol: 'DOT',
          name: 'Polkadot',
          balance: 45,
          price: 12300, // ~12.3K CLP
          value: 553500,
          change24h: -8200,
          changePercent24h: -1.46,
        },
      ];

      await this.db.insert(schema.assets).values(initialAssets);
      console.log('Database seeded with initial crypto assets');
    }
  }

  onModuleDestroy() {
    this.sqlite.close();
  }
}