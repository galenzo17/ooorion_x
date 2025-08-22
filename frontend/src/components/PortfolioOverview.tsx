import type { PortfolioSummary } from '../types/portfolio';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

interface PortfolioOverviewProps {
  summary?: PortfolioSummary;
  isLoading?: boolean;
}

export const PortfolioOverview = ({ summary, isLoading }: PortfolioOverviewProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border">
        <div className="flex items-center justify-center h-32">
          <div className="animate-pulse text-gray-400">Cargando resumen...</div>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  const isPositive = summary.totalChangePercent24h >= 0;

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Mi Resumen</h2>
            <p className="text-sm text-gray-500">Portfolio general</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            ${summary.totalValue.toLocaleString()}
          </p>
          <div className="flex items-center justify-end space-x-1 mt-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{summary.totalChangePercent24h.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Cambio 24h</p>
          <p className={`text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(summary.totalChange24h).toLocaleString()}
          </p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Assets</p>
          <p className="text-lg font-semibold text-gray-900">
            {summary.totalAssets}
          </p>
        </div>
      </div>
    </div>
  );
};