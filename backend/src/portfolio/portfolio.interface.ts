export interface CryptoAsset {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  value: number;
  change24h: number;
  changePercent24h: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalChange24h: number;
  totalChangePercent24h: number;
  totalAssets: number;
}

export interface PortfolioData {
  summary: PortfolioSummary;
  assets: CryptoAsset[];
  priceHistory: PriceHistoryPoint[];
}

export interface PriceHistoryPoint {
  timestamp: string;
  value: number;
}