import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import { AbouHeroesResponse } from './types';



export const useGetHeroes = () => {
  return useFetch<AbouHeroesResponse>(pathToUrl(apiMainRoutes.getAboutHeroes));
};
