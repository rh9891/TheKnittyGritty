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

export type ProductUpdateInput = Omit<Product, "rating" | "numReviews">;

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
}

export interface OrderItem extends Product {
  _id: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string;
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

export type OrderResponse = {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
};

export type PaymentDetails = {
  id: string;
  status: string;
  update_time: string;
  payer: {
    email_address: string;
  };
};

export type PayPalClientIdResponse = {
  clientId: string;
};

export type PayPalError = Record<string, unknown>;
