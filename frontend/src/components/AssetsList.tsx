import { TrendingUp, TrendingDown } from 'lucide-react';
import type { CryptoAsset } from '../types/portfolio';

interface AssetsListProps {
  assets: CryptoAsset[];
  isLoading?: boolean;
}

export const AssetsList = ({ assets, isLoading }: AssetsListProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Portfolio Assets</h2>
        </div>
        <div className="p-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-4 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getCryptoIcon = (symbol: string) => {
    const iconMap: { [key: string]: string } = {
      BTC: '₿',
      ETH: 'Ξ',
      BNB: 'BNB',
      SOL: '◎',
      ADA: '₳',
      DOT: '●',
    };
    return iconMap[symbol] || symbol.charAt(0);
  };

  const getCryptoColor = (symbol: string) => {
    const colorMap: { [key: string]: string } = {
      BTC: 'bg-orange-500',
      ETH: 'bg-blue-500',
      BNB: 'bg-yellow-500',
      SOL: 'bg-purple-500',
      ADA: 'bg-blue-600',
      DOT: 'bg-pink-500',
    };
    return colorMap[symbol] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Portfolio Assets</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {assets.map((asset) => {
          const isPositive = asset.changePercent24h >= 0;
          return (
            <div key={asset.symbol} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 ${getCryptoColor(asset.symbol)} rounded-full flex items-center justify-center text-white font-bold`}>
                    {getCryptoIcon(asset.symbol)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{asset.name}</h3>
                    <p className="text-sm text-gray-500">{asset.symbol}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-gray-900">${asset.value.toLocaleString()}</p>
                  <div className="flex items-center space-x-1">
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600">{asset.balance.toFixed(4)}</p>
                  <p className="text-sm text-gray-500">${asset.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};