import { usePortfolio } from '../hooks/usePortfolio';
import { Header } from './Header';
import { CryptoCarousel } from './CryptoCarousel';
import { PortfolioOverview } from './PortfolioOverview';
import { CryptoListItem } from './CryptoListItem';
import { PortfolioChart } from './PortfolioChart';

export const Dashboard = () => {
  const { data: portfolioData, isLoading, error } = usePortfolio();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <CryptoCarousel />
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
      <CryptoCarousel />
      
      <main className="w-full px-8 py-6">
        {/* Two Column Layout exactly like OrionX */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Mi Resumen */}
          <div>
            <PortfolioOverview 
              summary={portfolioData?.summary} 
              isLoading={isLoading} 
            />
          </div>

          {/* Right Column - Billeteras */}
          <div>
            <div className="bg-white border border-gray-300 h-64">
              <div className="p-4 border-b border-gray-300">
                <h3 className="text-base font-semibold text-gray-900">Billeteras</h3>
              </div>
              
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-sm text-gray-500">Cargando billeteras...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};