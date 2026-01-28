import { apiMainRoutes } from '@/api/routes';
import { BaseResponseType, Entity } from '@/types';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';

export type SeoPage = Entity<{
  key: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  status: boolean;
}>;

export type GetSeoPageResponse = BaseResponseType<SeoPage[]>;

export type GetSeoByKeyResponse = {
  data: SeoPage;
};

export const useGetSeoOfPage = (page: string) => {
  return useFetch<GetSeoPageResponse>(
    pathToUrl(apiMainRoutes.getSeoPage, { page })
  );
};

export const useGetSeoByKey = (key: string) => {
  return useFetch<GetSeoByKeyResponse>(
    pathToUrl(apiMainRoutes.getSeoByKey, { key }),
    ['seo', key]
  );
};
