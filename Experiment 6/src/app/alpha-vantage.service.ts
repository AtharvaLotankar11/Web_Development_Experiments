import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlphaVantageService {
  private apiKey = 'UOXUOE6SFWJ4MXR7'; // Replace with your key
  private apiUrl = 'https://www.alphavantage.co/query';

  constructor() {}

  async getStockData(symbol: string = 'IBM'): Promise<any> {
    const url = `${this.apiUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return await response.json();
  }
}