import { BaseResponseType, Entity } from '@/types';

export type Color = Entity<{
  id: number;
  name: string;
  hex_code: string;
  stock: number;
}>;

export type Size = Entity<{
  name: string;
  stock: number;
}>;

export type FaqTitle = Entity<{
  title: string;
  subtitle: string;
}>;

export type Image = Entity<{
  path: string;
}>;

export type Product = Entity<{
  id: number;
  name: string;
  type: string;
  price: string;
  stock: number;
  main_image: string;
  image_alt: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  status: boolean;
  order: number;
  colors: Color[];
  sizes: Size[];
  images: Image[];
  titles: FaqTitle[];
  created_at: string;
  updated_at: string;
}>;

export type ProductResponse = BaseResponseType<Product[]>;

export type ProdcutDetailResponse = BaseResponseType<Product>;
