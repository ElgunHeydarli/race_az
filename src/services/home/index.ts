import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import {
  HomeFormResponse,
  HomeGalleryResponse,
  HomeQuestionsResponse,
} from './types';

export const useGetHomeForm = () => {
  return useFetch<HomeFormResponse>(pathToUrl(apiMainRoutes.getHomeFormHeroes));
};

export const useGetHomeGalleries = () => {
  return useFetch<HomeGalleryResponse>(
    pathToUrl(apiMainRoutes.getHomeGalleries)
  );
};

export const useGetHomeQuestions = () => {
  return useFetch<HomeQuestionsResponse>(pathToUrl(apiMainRoutes.getQuestions));
};
