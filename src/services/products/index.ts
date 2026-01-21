import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import { ProdcutDetailResponse, ProductResponse } from './types';

export const useGetProducts = () => {
  return useFetch<ProductResponse>(pathToUrl(apiMainRoutes.getProducts));
};

export const useGetProductDetail = (id: string) => {
  return useFetch<ProdcutDetailResponse>(
    pathToUrl(apiMainRoutes.getProductById, { id })
  );
};
