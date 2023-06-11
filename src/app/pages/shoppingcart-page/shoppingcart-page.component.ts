import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { CartItem } from 'src/app/core/interfaces';

@Component({
  selector: 'app-shoppingcart-page',
  templateUrl: './shoppingcart-page.component.html',
  styleUrls: ['./shoppingcart-page.component.css'],
})
export class ShoppingcartPageComponent implements OnInit {
  constructor(private shoppingCartService: ShoppingCartService) {}

  cartItems: CartItem[] = [];
  cartPrice: number = 0;
  totalPrice: number = 0;
  promoPrice: number = 0;
  promoCode: string = 'B4N44N';
  promoValue: string = '';

  isReadOnly: boolean = false;

  ngOnInit(): void {
    this.shoppingCartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      console.log(this.cartItems);
    });
    this.shoppingCartService.getOriginalTotalPrice().subscribe((price) => {
      this.cartPrice = price;
    });
    this.shoppingCartService.getTotalPriceWithPromo().subscribe((price) => {
      this.totalPrice = price;
    });
    this.shoppingCartService.getPromoPrice().subscribe((price) => {
      this.promoPrice = price;
    });
    this.shoppingCartService.getIsReadOnly().subscribe((bool) => {
      this.isReadOnly = bool;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  increaseQuantity(id: number) {
    this.shoppingCartService.increaseQuantity(id);
  }
  decreaseQuantity(id: number) {
    this.shoppingCartService.decreaseQuantity(id);
  }
  removeFromCart(id: number) {
    this.shoppingCartService.removeFromCart(id);
  }
  clearCart() {
    this.shoppingCartService.clearCart();
  }

  checkPromo() {
    let promo = 6.9;
    if (this.promoValue == this.promoCode) {
      this.shoppingCartService.setPromoPrice(promo);
      this.shoppingCartService.toggleIsReadOnly();
      this.promoValue = '';
    }
  }
}
