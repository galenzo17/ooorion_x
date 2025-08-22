import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CryptoCarouselItem {
  symbol: string;
  name: string;
  price: number;
  icon: string;
  color: string;
}

export const CryptoCarousel = () => {
  const cryptos: CryptoCarouselItem[] = [
    { symbol: 'ETH', name: 'Ether', price: 0.0000, icon: 'Ξ', color: 'text-purple-600' },
    { symbol: 'BNB', name: 'Binance Coin', price: 0.00, icon: 'BNB', color: 'text-yellow-500' },
    { symbol: 'LTC', name: 'Litecoin', price: 0.00, icon: 'Ł', color: 'text-gray-500' },
    { symbol: 'XLM', name: 'Stellar Lumens', price: 0.00, icon: '⚡', color: 'text-blue-400' },
    { symbol: 'DASH', name: 'Dash', price: 0.00, icon: 'D', color: 'text-blue-600' },
    { symbol: 'EOS', name: 'EOS', price: 0.00, icon: 'E', color: 'text-black' },
  ];

  return (
    <div className="bg-gray-200 border-b border-gray-300 py-4">
      <div className="w-full px-8">
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-gray-200">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          
          <div className="flex space-x-6 overflow-x-auto flex-1">
            {cryptos.map((crypto) => (
              <div key={crypto.symbol} className="flex items-center space-x-2 min-w-0 flex-shrink-0">
                <div className={`w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold ${crypto.color} border`}>
                  {crypto.icon}
                </div>
                <div className="text-xs">
                  <div className="font-medium text-gray-900">{crypto.name}</div>
                  <div className="text-gray-600">{crypto.price.toFixed(4)} {crypto.symbol}</div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="p-1 hover:bg-gray-200">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};