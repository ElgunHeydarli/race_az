import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import { SocialResponse } from './types';

export const useGetSocials = () => {
  return useFetch<SocialResponse>(pathToUrl(apiMainRoutes.getSocials));
};
