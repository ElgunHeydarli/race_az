import { ProductCategory } from '@/data/filters';
import { SortOption } from '@/data/sorts';
import { create } from 'zustand';

type FilterProduct = {
  category: string;
  filterProduct: (cat: string) => void;
  sortOption: SortOption;
  sortProduct: (sort: SortOption) => void;
};

export const useFilterProduct = create<FilterProduct>((set) => ({
  category: ProductCategory.ALL,
  filterProduct: (category) => set({ category }),
  sortOption: { value: 'default', label: 'Default' },
  sortProduct: (sort) => set({ sortOption: sort }),
}));
