import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import { GetQualitiesResponse } from './types';

export const useGetQualities = () => {
  return useFetch<GetQualitiesResponse>(pathToUrl(apiMainRoutes.getQualities));
};
