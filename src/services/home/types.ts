import { BaseResponseType, Entity } from '@/types';

export type HeroForm = {
  title: string;
  text: string;
  image: string;
};

export type Gallery = Entity<{
  image: string;
  image_alt: string;
}>;

export type Question = Entity<{
  title: string;
  description: string;
}>;

export type HomeFormResponse = BaseResponseType<HeroForm[]>;

export type HomeGalleryResponse = BaseResponseType<Gallery[]>;

export type HomeQuestionsResponse = BaseResponseType<Question[]>;