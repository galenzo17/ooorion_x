import { Injectable } from '@nestjs/common';
import { CryptoAsset, PortfolioData, PortfolioSummary, PriceHistoryPoint } from './portfolio.interface';
import { DatabaseService } from '../database/database.service';
import { assets, priceHistory, portfolioSnapshots } from '../database/schema';
import { desc, sql } from 'drizzle-orm';

@Injectable()
export class PortfolioService {
  constructor(private readonly databaseService: DatabaseService) {}

  private async getAssetsFromDb(): Promise<CryptoAsset[]> {
    const dbAssets = await this.databaseService.db
      .select()
      .from(assets)
      .orderBy(desc(assets.value));

    return dbAssets.map(asset => ({
      symbol: asset.symbol,
      name: asset.name,
      balance: asset.balance,
      price: asset.price,
      value: asset.value,
      change24h: asset.change24h,
      changePercent24h: asset.changePercent24h,
    }));
  }

  private async generatePriceHistory(): Promise<PriceHistoryPoint[]> {
    // For now, still generate mock history
    // In production, this would query the priceHistory table
    const history: PriceHistoryPoint[] = [];
    const now = new Date();
    const startValue = 45000;
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      const variance = (Math.random() - 0.5) * 5000;
      const trendFactor = (30 - i) * 50; // Slight upward trend
      const value = startValue + trendFactor + variance;
      
      history.push({
        timestamp: date.toISOString(),
        value: Math.round(value * 100) / 100,
      });
    }
    
    return history;
  }

  async getPortfolioData(): Promise<PortfolioData> {
    const assets = await this.getAssetsFromDb();
    const priceHistory = await this.generatePriceHistory();
    
    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
    const totalChange24h = assets.reduce((sum, asset) => sum + asset.change24h, 0);
    const totalChangePercent24h = totalValue > 0 
      ? (totalChange24h / (totalValue - totalChange24h)) * 100 
      : 0;
    
    const summary: PortfolioSummary = {
      totalValue: Math.round(totalValue * 100) / 100,
      totalChange24h: Math.round(totalChange24h * 100) / 100,
      totalChangePercent24h: Math.round(totalChangePercent24h * 100) / 100,
      totalAssets: assets.length,
    };

    // Optionally save snapshot to database
    await this.savePortfolioSnapshot(summary);

    return {
      summary,
      assets,
      priceHistory,
    };
  }

  private async savePortfolioSnapshot(summary: PortfolioSummary) {
    try {
      await this.databaseService.db.insert(portfolioSnapshots).values({
        totalValue: summary.totalValue,
        totalChange24h: summary.totalChange24h,
        totalChangePercent24h: summary.totalChangePercent24h,
        totalAssets: summary.totalAssets,
      });
    } catch (error) {
      console.error('Error saving portfolio snapshot:', error);
    }
  }

  async updateAssetPrice(symbol: string, newPrice: number) {
    const asset = await this.databaseService.db
      .select()
      .from(assets)
      .where(sql`${assets.symbol} = ${symbol}`)
      .limit(1);

    if (asset.length > 0) {
      const currentAsset = asset[0];
      const newValue = currentAsset.balance * newPrice;
      const change24h = newValue - currentAsset.value;
      const changePercent24h = currentAsset.value > 0 
        ? (change24h / currentAsset.value) * 100 
        : 0;

      await this.databaseService.db
        .update(assets)
        .set({
          price: newPrice,
          value: newValue,
          change24h,
          changePercent24h,
          updatedAt: new Date().toISOString(),
        })
        .where(sql`${assets.symbol} = ${symbol}`);

      // Save price history
      await this.databaseService.db.insert(priceHistory).values({
        assetId: currentAsset.id,
        price: newPrice,
        totalValue: newValue,
      });
    }
  }
}