import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/core/interfaces';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  fetchProducts() {
    const url = 'http://localhost:5298/api/Products';
    this.http.get<Product[]>(url).subscribe(
      (data: Product[]) => {
        this.products = data;
        console.log('Received products:', this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
