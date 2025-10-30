import { BaseResponseType } from '@/types';

export type Count = {
  count: number | string;
  title: string;
};

export type GetQualitiesResponse = BaseResponseType<Count[]>;
