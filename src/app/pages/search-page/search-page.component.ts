import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/core/interfaces';
import { I18nService } from 'src/app/core/services/i18n.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent {
  resultSingular: string = '';
  resultPlural: string = '';

  searchTerm: string = '';
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.i18nService.getTranslations().subscribe((translations) => {
      this.resultSingular = translations['searchpage.resultSingular'];
      this.resultPlural = translations['searchpage.resultPlural'];
    });

    this.route.params.subscribe((params) => {
      this.searchTerm = params['term'];
      console.log('Search Term:', this.searchTerm);

      this.fetchProducts();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  fetchProducts(): void {
    const url = `http://localhost:5298/api/Products/${this.searchTerm}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.products = data;
        console.log('Received products:', this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
