import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockDataComponent } from './stock-data/stock-data.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, StockDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Alpha Vantage Demo';
}