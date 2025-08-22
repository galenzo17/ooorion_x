import { Injectable } from '@nestjs/common';
import { CryptoAsset, PortfolioData, PortfolioSummary, PriceHistoryPoint } from './portfolio.interface';

@Injectable()
export class PortfolioService {
  private generateMockAssets(): CryptoAsset[] {
    const mockAssets: CryptoAsset[] = [
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

    return mockAssets;
  }

  private generatePriceHistory(): PriceHistoryPoint[] {
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

  getPortfolioData(): PortfolioData {
    const assets = this.generateMockAssets();
    const priceHistory = this.generatePriceHistory();
    
    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
    const totalChange24h = assets.reduce((sum, asset) => sum + asset.change24h, 0);
    const totalChangePercent24h = (totalChange24h / (totalValue - totalChange24h)) * 100;
    
    const summary: PortfolioSummary = {
      totalValue: Math.round(totalValue * 100) / 100,
      totalChange24h: Math.round(totalChange24h * 100) / 100,
      totalChangePercent24h: Math.round(totalChangePercent24h * 100) / 100,
      totalAssets: assets.length,
    };

    return {
      summary,
      assets,
      priceHistory,
    };
  }
}