import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { CartItem } from 'src/app/core/interfaces';
import { I18nService } from 'src/app/core/services/i18n.service';

@Component({
  selector: 'app-shoppingcart-page',
  templateUrl: './shoppingcart-page.component.html',
  styleUrls: ['./shoppingcart-page.component.css'],
})
export class ShoppingcartPageComponent implements OnInit {
  title: string = '';
  summary: string = '';
  inputPlaceholder: string = '';
  inputAllowed: string = '';
  cartAmount: string = '';
  promoAmount: string = '';
  total: string = '';
  confirmBtn: string = '';
  removeCartItems: string = '';

  cartItems: CartItem[] = [];
  cartPrice: number = 0;
  totalPrice: number = 0;
  promoPrice: number = 0;
  promoCode: string = 'B4N44N';
  promoValue: string = '';

  isReadOnly: boolean = false;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.i18nService.getTranslations().subscribe((translations) => {
      this.title = translations['shoppingcartpage.title'];
      this.summary = translations['shoppingcartpage.summary'];
      this.inputPlaceholder = translations['shoppingcartpage.inputPlaceholder'];
      this.inputAllowed = translations['shoppingcartpage.inputAllowed'];
      this.cartAmount = translations['shoppingcartpage.cartAmount'];
      this.promoAmount = translations['shoppingcartpage.promoAmount'];
      this.total = translations['shoppingcartpage.total'];
      this.confirmBtn = translations['shoppingcartpage.confirmBtn'];
      this.removeCartItems = translations['shoppingcartpage.removeCartItems'];
    });

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
