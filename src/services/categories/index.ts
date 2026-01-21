import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import { CategoryResponse } from './types';

export const useGetCategories = () => {
  return useFetch<CategoryResponse>(pathToUrl(apiMainRoutes.getCategories));
};
