export type PromoResponse = {
  valid: boolean;
  promo_code: string;
  type: string;
  value: string;
  is_global: boolean;
  message: string;
  total_discount: string;
  original_total: string;
  discounted_total: string;
  items: Array<{
    product_id: number;
    name: string;
    price: string;
    quantity: number;
    total: string;
    discount: string;
    discounted_total: string;
  }>;
};
