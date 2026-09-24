export interface CartItem {
  productId: number;
  quantity: number;
  productTitle?: string;
  productImage?: string;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
}
