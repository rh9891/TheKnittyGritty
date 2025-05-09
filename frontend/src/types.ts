export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  weight: string;
  length: string;
  gauge: string;
  knitting_needle: string;
  crochet_hook: string;
  recommended_care: string;
  content: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

export type ShippingAddress = {
  name: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export interface CartItem extends Product {
  quantity: number;
  product: Product;
}

export type CartState = {
  cartItems: CartItem[];
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UserResponse = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};
