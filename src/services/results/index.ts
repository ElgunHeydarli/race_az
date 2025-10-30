import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import { ResultField, ResultsResponse } from './types';

export const useGetAllResults = () => {
  return useFetch<ResultsResponse>(pathToUrl(apiMainRoutes.getResults));
};

export const useGetResult = (slug: string) => {
  return useFetch<ResultField>(
    pathToUrl(apiMainRoutes.getResult, { slug })
  );
};
