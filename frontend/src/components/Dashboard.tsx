import { usePortfolio } from '../hooks/usePortfolio';
import { Header } from './Header';
import { PortfolioOverview } from './PortfolioOverview';
import { CryptoCard } from './CryptoCard';
import { PortfolioChart } from './PortfolioChart';

export const Dashboard = () => {
  const { data: portfolioData, isLoading, error } = usePortfolio();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar el portfolio</h2>
            <p className="text-gray-600">Por favor asegúrate de que el servidor backend esté ejecutándose</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Overview Section - similar to OrionX account verification area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <PortfolioOverview 
              summary={portfolioData?.summary} 
              isLoading={isLoading} 
            />
          </div>
          
          {/* TODO(human): Design the main dashboard layout
           * 
           * Looking at the OrionX screenshot, I need your input on the best way to arrange:
           * 1. Crypto cards grid (similar to the circular crypto icons in OrionX)
           * 2. Portfolio chart (performance over time)
           * 
           * Layout options inspired by OrionX:
           * A) Crypto cards grid on the right (2 columns), chart below overview
           * B) Crypto cards grid full width below overview, chart in sidebar
           * C) Mixed layout: cards grid top-right, chart bottom spanning full width
           * 
           * The OrionX design has a clean balance - what layout would work best for our portfolio data?
           */}
          
          {/* Temporary layout */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tus Criptomonedas</h3>
              
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {portfolioData?.assets.map((asset) => (
                    <CryptoCard key={asset.symbol} asset={asset} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <PortfolioChart 
            data={portfolioData?.priceHistory || []} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
};