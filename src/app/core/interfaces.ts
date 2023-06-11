export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  nutriScore: string;
  priceType: {
    type: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface Category {
  id: number;
  name: string;
}
