export interface OrderInput {
  quantity: string;
  productId: string;
  userId?: string;
}

export interface Cart {
  itemId: number;
  item: string;
  price: string;
  category: string;
}

export interface Order {
  id: number;
  userId: number;
  status: Status;
  cart: Cart;
}
export enum Status {
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
}
