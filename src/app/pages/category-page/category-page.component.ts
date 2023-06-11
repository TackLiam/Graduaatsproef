import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product, Category } from 'src/app/core/interfaces';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css'],
})
export class CategoryPageComponent implements OnInit {
  categoryId: number = 0;
  category: Category | undefined;
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = +params['id'];
      console.log('Category ID:', this.categoryId);

      this.fetchCategory();
      this.fetchProducts();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  fetchCategory(): void {
    const url = `http://localhost:5298/api/Category/${this.categoryId}`;
    this.http.get<Category>(url).subscribe(
      (data) => {
        this.category = data;
        console.log('Category:', this.category);
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );
  }

  fetchProducts(): void {
    const url = `http://localhost:5298/api/Category/${this.categoryId}/Products`;
    this.http.get<Product[]>(url).subscribe(
      (data) => {
        this.products = data;
        console.log('Products:', this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
