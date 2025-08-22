import { usePortfolio } from '../hooks/usePortfolio';
import { Header } from './Header';
import { PortfolioOverview } from './PortfolioOverview';
import { CryptoListItem } from './CryptoListItem';
import { PortfolioChart } from './PortfolioChart';

export const Dashboard = () => {
  const { data: portfolioData, isLoading, error } = usePortfolio();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="w-full px-8 py-10">
        {/* Main Content - 2 Column Layout like OrionX */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column - Portfolio Overview */}
          <div>
            <PortfolioOverview 
              summary={portfolioData?.summary} 
              isLoading={isLoading} 
            />
          </div>

          {/* Right Column - Crypto List */}
          <div>
            <div className="bg-white border border-gray-300">
              <div className="p-6 border-b border-gray-300">
                <h3 className="text-xl font-semibold text-gray-900">Tus Criptomonedas</h3>
              </div>
              
              {isLoading ? (
                <div className="divide-y divide-gray-100">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-6 animate-pulse">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200"></div>
                          <div>
                            <div className="h-4 bg-gray-200 w-20 mb-1"></div>
                            <div className="h-3 bg-gray-200 w-16"></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="h-4 bg-gray-200 w-16 mb-1"></div>
                          <div className="h-3 bg-gray-200 w-12"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {portfolioData?.assets.map((asset) => (
                    <CryptoListItem key={asset.symbol} asset={asset} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};