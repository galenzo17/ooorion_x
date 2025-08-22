import { useQuery } from '@tanstack/react-query';
import { portfolioApi } from '../services/api';

export const usePortfolio = () => {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: portfolioApi.getPortfolio,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const usePortfolioSummary = () => {
  return useQuery({
    queryKey: ['portfolio', 'summary'],
    queryFn: portfolioApi.getPortfolioSummary,
    refetchInterval: 30000,
  });
};

export const useAssets = () => {
  return useQuery({
    queryKey: ['portfolio', 'assets'],
    queryFn: portfolioApi.getAssets,
    refetchInterval: 30000,
  });
};

export const usePriceHistory = () => {
  return useQuery({
    queryKey: ['portfolio', 'history'],
    queryFn: portfolioApi.getPriceHistory,
    refetchInterval: 60000, // Refetch every minute
  });
};