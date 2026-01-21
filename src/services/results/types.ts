import { Entity } from '@/types';
import { Competition } from '../competitions/types';

export type Result = Entity<{
  name: string;
  surname: string;
  rank: number;
  team_name: string;
  distance: string;
}>;

export type ResultField = {
  competition: Competition  ;
  results: Result[];
};

export type ResultsResponse = {
  competitions_results: ResultField[];
};
