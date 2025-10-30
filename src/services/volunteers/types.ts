import { BaseResponseType, Entity } from '@/types';

export type Volunteer = Entity<{
  description: string;
  image: string;
  image_alt: string;
  title: string;
}>;

export type VolunteerResponse = BaseResponseType<Volunteer[]>;
