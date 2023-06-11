import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, CartItem } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartItems: CartItem[] = [];
  private totalQuantity: number = 0;
  private promoPrice: number = 0;
  private cartPrice: number = 0;
  private totalPrice: number = 0;

  private isReadOnly: boolean = false;

  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >([]);
  private totalPriceSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private totalQuantitySubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private promoPriceSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private originalTotalPriceSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private totalPriceWithPromoSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private isReadOnlySubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  getTotalPrice() {
    return this.totalPriceSubject.asObservable();
  }

  getTotalQuantity() {
    return this.totalQuantitySubject.asObservable();
  }

  getPromoPrice() {
    return this.promoPriceSubject.asObservable();
  }

  getOriginalTotalPrice() {
    return this.originalTotalPriceSubject.asObservable();
  }

  getTotalPriceWithPromo() {
    return this.totalPriceWithPromoSubject.asObservable();
  }

  getIsReadOnly() {
    return this.isReadOnlySubject.asObservable();
  }

  toggleIsReadOnly() {
    this.isReadOnly = !this.isReadOnly;
    this.isReadOnlySubject.next(this.isReadOnly);
  }

  setPromoPrice(price: number) {
    this.promoPrice = price;
    this.promoPriceSubject.next(this.promoPrice);
    this.calculateTotalPrice();
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem: CartItem = {
        product: product,
        quantity: 1,
        totalPrice: product.price,
      };
      this.cartItems.push(newItem);
    }

    this.cartItemsSubject.next(this.cartItems);
    this.calculateTotalPrice();
    this.calculateTotalQuantity();
  }

  removeFromCart(productId: number) {
    const updatedItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this.cartItems = updatedItems;
    this.cartItemsSubject.next(this.cartItems);
    this.calculateTotalPrice();
    this.calculateTotalQuantity();
  }

  increaseQuantity(productId: number) {
    const item = this.cartItems.find((item) => item.product.id === productId);
    if (item) {
      item.quantity++;
      this.cartItemsSubject.next(this.cartItems);
      this.calculateTotalPrice();
      this.calculateTotalQuantity();
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.cartItems.find((item) => item.product.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.removeFromCart(productId);
      }
      this.cartItemsSubject.next(this.cartItems);
      this.calculateTotalPrice();
      this.calculateTotalQuantity();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.totalQuantity = 0;
    this.totalQuantitySubject.next(this.totalQuantity);
    this.cartPrice = 0;
    this.originalTotalPriceSubject.next(this.cartPrice);
    this.totalPrice = 0;
    this.totalPriceWithPromoSubject.next(this.totalPrice);
  }

  private calculateTotalPrice() {
    let total = 0;

    this.cartItems.forEach((item) => {
      const itemTotal = item.product.price * item.quantity;
      total += itemTotal;
      item.totalPrice = itemTotal;
    });

    this.cartPrice = total;
    this.originalTotalPriceSubject.next(this.cartPrice);
    this.totalPrice = total - this.promoPrice;
    this.totalPriceWithPromoSubject.next(this.totalPrice);
  }

  private calculateTotalQuantity() {
    let quantity = 0;

    this.cartItems.forEach((item) => {
      quantity += item.quantity;
    });

    this.totalQuantity = quantity;
    this.totalQuantitySubject.next(this.totalQuantity);
  }
}
