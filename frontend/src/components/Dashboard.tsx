import { usePortfolio } from '../hooks/usePortfolio';
import { PortfolioSummary } from './PortfolioSummary';
import { AssetsList } from './AssetsList';
import { PortfolioChart } from './PortfolioChart';

export const Dashboard = () => {
  const { data: portfolioData, isLoading, error } = usePortfolio();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error loading portfolio</h2>
          <p className="text-gray-600">Please make sure the backend server is running</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ooorion X Dashboard</h1>
          <p className="text-gray-600 mt-2">Your crypto portfolio overview</p>
        </div>

        {/* Portfolio Summary Cards */}
        <PortfolioSummary 
          summary={portfolioData?.summary} 
          isLoading={isLoading} 
        />

        {/* TODO(human): Design the main dashboard layout
         * 
         * I need your input on how to arrange these components:
         * 1. PortfolioChart - Shows 30-day performance graph
         * 2. AssetsList - Shows detailed list of crypto assets
         * 
         * Layout options to consider:
         * A) Chart on top (full width), Assets list below
         * B) Chart and Assets side by side (2 columns)
         * C) Chart larger on left, Assets smaller on right
         * D) Your own custom layout idea
         * 
         * Also consider:
         * - Should we add more sections like "Recent Transactions" or "Market News"?
         * - Do you want any additional charts (pie chart for allocation, etc.)?
         * - Any specific responsive behavior for mobile?
         */}

        {/* Temporary layout - please replace with your design */}
        <div className="space-y-8">
          <PortfolioChart 
            data={portfolioData?.priceHistory || []} 
            isLoading={isLoading} 
          />
          <AssetsList 
            assets={portfolioData?.assets || []} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
};