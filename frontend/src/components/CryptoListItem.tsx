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
    <div className="grid grid-cols-2 gap-6 p-6 border-b border-gray-100 last:border-b-0">
      {/* Left Column */}
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-base font-bold ${getCryptoColor(asset.symbol)}`}>
          {getCryptoIcon(asset.symbol)}
        </div>
        <div>
          <h3 className="font-semibold text-base text-gray-900">{asset.name}</h3>
          <p className="text-sm text-gray-500">{asset.balance.toFixed(4)} {asset.symbol}</p>
        </div>
      </div>
      
      {/* Right Column */}
      <div className="text-right">
        <p className="font-bold text-lg text-gray-900">
          ${asset.value.toLocaleString()}
        </p>
        <p className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};