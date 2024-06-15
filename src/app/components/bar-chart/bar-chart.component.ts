import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  products: Product[] = [];
  chartData: any[] = [];

  view: [number, number] = [700, 400];
  xAxisLabel = 'Product Name';
  yAxisLabel = 'Price';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.updateChartData();
    });
  }

  updateChartData() {
    this.chartData = this.products.map(product => ({
      name: product.name,
      value: product.price
    }));
  }
}
