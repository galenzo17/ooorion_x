import axios from 'axios';
import { PortfolioData } from '../types/portfolio';

const API_BASE_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const portfolioApi = {
  getPortfolio: (): Promise<PortfolioData> =>
    api.get('/portfolio').then(response => response.data),
  
  getPortfolioSummary: () =>
    api.get('/portfolio/summary').then(response => response.data),
    
  getAssets: () =>
    api.get('/portfolio/assets').then(response => response.data),
    
  getPriceHistory: () =>
    api.get('/portfolio/history').then(response => response.data),
};