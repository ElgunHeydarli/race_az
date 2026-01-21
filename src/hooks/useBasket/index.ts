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
  currency: string;
  quantity: number;
};

export type OrderItem = {
  product_id: number;
  quantity: number;
  color_id: Color | number;
  size_id: Size | null | number;
};
interface BasketState {
  basket: BasketItem[];
  orderItems: OrderItem[];
  addItem: (item: BasketItem) => void;
  increaseQuantity: (itemId: number) => void;
  removeFromBasket: (itemId: number) => void;
  decreaseQuantity: (itemId: number) => void;
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

          const existingItem = getBasket.find(
            (product) => product.id === item.id
          );

          if (existingItem) {
            return {
              basket: getBasket.map((product) =>
                product.id === item.id
                  ? { ...product, quantity: product.quantity + 1 }
                  : product
              ),
            };
          }

          return { basket: [...state.basket, item] };
        }),
      increaseQuantity: (itemId: number) => {
        set(() => {
          const basketData = get().basket;
          return {
            basket: basketData.map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        });
      },
      decreaseQuantity: (itemId: number) => {
        set(() => {
          const basketData = get().basket.map((product) =>
            product.id === itemId
              ? { ...product, quantity: product.quantity - 1 }
              : product
          );

          const updatedData = basketData.filter(
            (product) => product.quantity > 0
          );
          return { basket: updatedData };
        });
      },
      removeFromBasket: (itemId: number) => {
        const basketData = get().basket;
        set(() => ({
          basket: basketData.filter((item) => item.id !== itemId),
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
