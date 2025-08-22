import { Controller, Get } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import type { PortfolioData } from './portfolio.interface';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  getPortfolio(): PortfolioData {
    return this.portfolioService.getPortfolioData();
  }

  @Get('summary')
  getPortfolioSummary() {
    const data = this.portfolioService.getPortfolioData();
    return data.summary;
  }

  @Get('assets')
  getAssets() {
    const data = this.portfolioService.getPortfolioData();
    return data.assets;
  }

  @Get('history')
  getPriceHistory() {
    const data = this.portfolioService.getPortfolioData();
    return data.priceHistory;
  }
}