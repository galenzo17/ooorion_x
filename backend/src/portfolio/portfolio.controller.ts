import { Controller, Get } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import type { PortfolioData } from './portfolio.interface';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async getPortfolio(): Promise<PortfolioData> {
    return this.portfolioService.getPortfolioData();
  }

  @Get('summary')
  async getPortfolioSummary() {
    const data = await this.portfolioService.getPortfolioData();
    return data.summary;
  }

  @Get('assets')
  async getAssets() {
    const data = await this.portfolioService.getPortfolioData();
    return data.assets;
  }

  @Get('history')
  async getPriceHistory() {
    const data = await this.portfolioService.getPortfolioData();
    return data.priceHistory;
  }
}