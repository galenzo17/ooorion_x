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
      const initialAssets: schema.NewAsset[] = [
        {
          symbol: 'BTC',
          name: 'Bitcoin',
          balance: 0.5,
          price: 67500,
          value: 33750,
          change24h: 1250,
          changePercent24h: 1.85,
        },
        {
          symbol: 'ETH',
          name: 'Ethereum',
          balance: 2.3,
          price: 3850,
          value: 8855,
          change24h: -120,
          changePercent24h: -1.35,
        },
        {
          symbol: 'BNB',
          name: 'Binance Coin',
          balance: 5.7,
          price: 620,
          value: 3534,
          change24h: 85,
          changePercent24h: 2.46,
        },
        {
          symbol: 'SOL',
          name: 'Solana',
          balance: 12.4,
          price: 180,
          value: 2232,
          change24h: -45,
          changePercent24h: -1.98,
        },
        {
          symbol: 'ADA',
          name: 'Cardano',
          balance: 850,
          price: 0.85,
          value: 722.5,
          change24h: 12.5,
          changePercent24h: 1.76,
        },
        {
          symbol: 'DOT',
          name: 'Polkadot',
          balance: 45,
          price: 12.3,
          value: 553.5,
          change24h: -8.2,
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