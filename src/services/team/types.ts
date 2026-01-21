import { Entity, BaseResponseType } from '@/types';

export type Team = Entity<{
  name: string;
  position: string;
  image: string;
}>;

export type BaseTeamResponse = BaseResponseType<Team[]>;
