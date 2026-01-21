import { apiMainRoutes } from '@/api/routes';
import { BaseResponseType, Entity } from '@/types';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';

export type Logo = Entity<{
  header_logo: string;
  footer_logo: string;
  header_alt: string;
  footer_alt: string;
  header_title: string;
  footer_title: string;
}>;

export type LogosResponse = BaseResponseType<Logo[]>;

export const useGetLogos = () => {
  return useFetch<LogosResponse>(pathToUrl(apiMainRoutes.getLogos));
};
