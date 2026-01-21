import { BaseResponseType, Entity } from '@/types';
import { Competition } from '../competitions/types';

export type Partner = Entity<{
  name: string;
  image: string;
  image_alt: string;
  url: string;
  competitions: Competition[];
}>;

export type PartnerResponse = BaseResponseType<Partner[]>;

export type PartnerCompetitions = {
  competitions: Competition[];
};
