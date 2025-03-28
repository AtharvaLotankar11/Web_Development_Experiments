import { Component, OnInit } from '@angular/core';
import { AlphaVantageService } from '../alpha-vantage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-data',
  templateUrl: './stock-data.component.html',
  styleUrls: ['./stock-data.component.css'],
  imports: [CommonModule]
})
export class StockDataComponent implements OnInit {
  stockData: any;
  symbol: string = 'IBM';
  latestDate: string = '';
  latestPrice: any = {};

  constructor(private alphaVantageService: AlphaVantageService) {}

  async ngOnInit(): Promise<void> {
    this.stockData = await this.alphaVantageService.getStockData(this.symbol);
    this.extractLatestData();
  }

  extractLatestData() {
    if (this.stockData && this.stockData['Time Series (Daily)']) {
      const dates = Object.keys(this.stockData['Time Series (Daily)']);
      this.latestDate = dates[0];
      this.latestPrice = this.stockData['Time Series (Daily)'][this.latestDate];
    }
  }
}