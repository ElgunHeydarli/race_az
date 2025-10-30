import { Entity, BaseResponseType } from '@/types';

export type AboutHero = Entity<{
  title: string;
  description: string;
}>;

export type AbouHeroesResponse = BaseResponseType<AboutHero[]>;
