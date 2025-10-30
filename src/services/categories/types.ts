import { Product } from '../products/types';

export type Category = string;

export type ProductTypeMap = {
  [category: string]: Product[];
}[];

export type CategoryResponse = {
  success: boolean;
  product_types: ProductTypeMap;
};
