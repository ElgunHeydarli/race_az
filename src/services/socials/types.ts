import { BaseResponseType, Entity } from '@/types';

export type Social = Entity<{
  image: string;
  link: string;
}>;

export type SocialResponse = BaseResponseType<Social[]>;
