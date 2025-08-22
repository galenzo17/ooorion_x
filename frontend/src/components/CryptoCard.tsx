import type { CryptoAsset } from '../types/portfolio';

interface CryptoCardProps {
  asset: CryptoAsset;
}

export const CryptoCard = ({ asset }: CryptoCardProps) => {
  const getCryptoColor = (symbol: string): string => {
    const colorMap: { [key: string]: string } = {
      BTC: 'from-orange-400 to-orange-600',
      ETH: 'from-blue-400 to-blue-600', 
      BNB: 'from-yellow-400 to-yellow-600',
      SOL: 'from-purple-400 to-purple-600',
      ADA: 'from-blue-500 to-blue-700',
      DOT: 'from-pink-400 to-pink-600',
    };
    return colorMap[symbol] || 'from-gray-400 to-gray-600';
  };

  const getCryptoIcon = (symbol: string): string => {
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

  const isPositive = asset.changePercent24h >= 0;

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl hover:shadow-md transition-shadow cursor-pointer">
      {/* Circular Icon */}
      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getCryptoColor(asset.symbol)} flex items-center justify-center text-white text-xl font-bold mb-3 shadow-lg`}>
        {getCryptoIcon(asset.symbol)}
      </div>
      
      {/* Asset Info */}
      <div className="text-center">
        <h3 className="font-medium text-gray-900 mb-1">{asset.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{asset.balance.toFixed(4)} {asset.symbol}</p>
        
        {/* Price */}
        <p className="text-lg font-semibold text-gray-900 mb-1">
          ${asset.value.toLocaleString()}
        </p>
        
        {/* Change */}
        <p className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};