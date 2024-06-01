import type { Product } from "./product";

export interface CartItem {
  count: number;
  product: Product;
}

export type Cart = Array<CartItem>;
