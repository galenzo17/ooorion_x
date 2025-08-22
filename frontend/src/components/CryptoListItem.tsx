import type { CryptoAsset } from '../types/portfolio';

interface CryptoListItemProps {
  asset: CryptoAsset;
}

export const CryptoListItem = ({ asset }: CryptoListItemProps) => {
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

  const getCryptoColor = (symbol: string): string => {
    const colorMap: { [key: string]: string } = {
      BTC: 'text-orange-500',
      ETH: 'text-blue-500', 
      BNB: 'text-yellow-500',
      SOL: 'text-purple-500',
      ADA: 'text-blue-600',
      DOT: 'text-pink-500',
    };
    return colorMap[symbol] || 'text-gray-500';
  };

  const isPositive = asset.changePercent24h >= 0;

  return (
    <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-100 last:border-b-0">
      {/* Left Column */}
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold ${getCryptoColor(asset.symbol)}`}>
          {getCryptoIcon(asset.symbol)}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{asset.name}</h3>
          <p className="text-xs text-gray-500">{asset.balance.toFixed(4)} {asset.symbol}</p>
        </div>
      </div>
      
      {/* Right Column */}
      <div className="text-right">
        <p className="font-semibold text-gray-900">
          ${asset.value.toLocaleString()}
        </p>
        <p className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};