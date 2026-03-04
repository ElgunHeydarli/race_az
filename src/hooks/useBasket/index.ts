import { Color, Size } from '@/services/products/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BasketItem = {
  id: number;
  title: string;
  price: string;
  image: string;
  color: Color;
  size: Size | null;
  variant_id?: number;
  currency: string;
  quantity: number;
  stock?: number;
};

export type OrderItem = {
  product_id: number;
  quantity: number;
  color_id: Color | number;
  size_id: Size | null | number;
  variant_id?: number;
};

const matchItem = (
  a: { id: number; variant_id?: number },
  b: { id: number; variant_id?: number }
) => {
  if (a.variant_id || b.variant_id) {
    return a.id === b.id && a.variant_id === b.variant_id;
  }
  return a.id === b.id;
};

interface BasketState {
  basket: BasketItem[];
  orderItems: OrderItem[];
  addItem: (item: BasketItem) => void;
  increaseQuantity: (itemId: number, variantId?: number) => void;
  removeFromBasket: (itemId: number, variantId?: number) => void;
  decreaseQuantity: (itemId: number, variantId?: number) => void;
  selectOrderItems: (orderItems: OrderItem[]) => void;
  clearBasket: () => void;
}

export const useBasket = create<BasketState>()(
  persist<BasketState>(
    (set, get) => ({
      basket: [],
      orderItems: [],
      addItem: (item) =>
        set((state) => {
          const getBasket = get().basket;

          const existingItem = getBasket.find((product) =>
            matchItem(product, item)
          );

          if (existingItem) {
            return {
              basket: getBasket.map((product) =>
                matchItem(product, item)
                  ? { ...product, quantity: product.quantity + 1 }
                  : product
              ),
            };
          }

          return { basket: [...state.basket, item] };
        }),
      increaseQuantity: (itemId: number, variantId?: number) => {
        set(() => {
          const basketData = get().basket;
          return {
            basket: basketData.map((item) => {
              if (!matchItem(item, { id: itemId, variant_id: variantId })) return item;
              if (typeof item.stock === 'number' && item.quantity >= item.stock) return item;
              return { ...item, quantity: item.quantity + 1 };
            }),
          };
        });
      },
      decreaseQuantity: (itemId: number, variantId?: number) => {
        set(() => {
          const basketData = get().basket.map((product) =>
            matchItem(product, { id: itemId, variant_id: variantId })
              ? { ...product, quantity: product.quantity - 1 }
              : product
          );

          const updatedData = basketData.filter(
            (product) => product.quantity > 0
          );
          return { basket: updatedData };
        });
      },
      removeFromBasket: (itemId: number, variantId?: number) => {
        const basketData = get().basket;
        set(() => ({
          basket: basketData.filter(
            (item) => !matchItem(item, { id: itemId, variant_id: variantId })
          ),
        }));
      },
      selectOrderItems: (orderItems: OrderItem[]) => {
        set(() => {
          return { orderItems: [...orderItems] };
        });
      },
      clearBasket: () => {
        set(() => {
          return { basket: [] };
        });
      },
    }),
    {
      name: 'basket-storage',
    }
  )
);
