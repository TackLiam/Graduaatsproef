import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { Product } from 'src/app/core/interfaces';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: Product = {} as Product;

  constructor(private shoppingCartService: ShoppingCartService) {}

  AddProduct() {
    this.shoppingCartService.addToCart(this.product);
  }
}
