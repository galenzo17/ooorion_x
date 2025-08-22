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
        {/* Portfolio Overview Section */}
        <div className="mb-8">
          <PortfolioOverview 
            summary={portfolioData?.summary} 
            isLoading={isLoading} 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Crypto Cards Section */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Tus Criptomonedas</h3>
              
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {portfolioData?.assets.map((asset) => (
                    <CryptoCard key={asset.symbol} asset={asset} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chart Section - Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento</h3>
              <div className="h-64">
                <PortfolioChart 
                  data={portfolioData?.priceHistory || []} 
                  isLoading={isLoading} 
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};