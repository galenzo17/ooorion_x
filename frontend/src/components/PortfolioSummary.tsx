import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';
import type { PortfolioSummary as PortfolioSummaryType } from '../types/portfolio';

interface PortfolioSummaryProps {
  summary: PortfolioSummaryType;
  isLoading?: boolean;
}

export const PortfolioSummary = ({ summary, isLoading }: PortfolioSummaryProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-sm border animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const isPositive = summary.totalChangePercent24h >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Portfolio</p>
            <p className="text-2xl font-bold text-gray-900">
              ${summary.totalValue.toLocaleString()}
            </p>
          </div>
          <DollarSign className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">24h Change</p>
            <p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(summary.totalChange24h).toLocaleString()}
            </p>
          </div>
          {isPositive ? (
            <TrendingUp className="w-8 h-8 text-green-500" />
          ) : (
            <TrendingDown className="w-8 h-8 text-red-500" />
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">24h Change %</p>
            <p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{summary.totalChangePercent24h.toFixed(2)}%
            </p>
          </div>
          {isPositive ? (
            <TrendingUp className="w-8 h-8 text-green-500" />
          ) : (
            <TrendingDown className="w-8 h-8 text-red-500" />
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Assets</p>
            <p className="text-2xl font-bold text-gray-900">{summary.totalAssets}</p>
          </div>
          <Wallet className="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>
  );
};