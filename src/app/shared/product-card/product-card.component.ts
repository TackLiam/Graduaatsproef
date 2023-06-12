import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { Product } from 'src/app/core/interfaces';
import { I18nService } from 'src/app/core/services/i18n.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  orderBtn: string = '';

  @Input() product: Product = {} as Product;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.i18nService.getTranslations().subscribe((translations) => {
      this.orderBtn = translations['productCard.orderBtn'];
    });
  }

  AddProduct() {
    this.shoppingCartService.addToCart(this.product);
  }
}
