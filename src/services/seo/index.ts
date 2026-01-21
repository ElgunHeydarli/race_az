import { apiMainRoutes } from '@/api/routes';
import { BaseResponseType, Entity } from '@/types';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';

export type SeoPage = Entity<{
  key: string;
  meta_title: string;
  meta_description: string;
}>;

export type GetSeoPageResponse = BaseResponseType<SeoPage[]>;

export const useGetSeoOfPage = (page: string) => {
  return useFetch<GetSeoPageResponse>(
    pathToUrl(apiMainRoutes.getSeoPage, { page })
  );
};
