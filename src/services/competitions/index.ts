import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import {
  BaseCompetitionBannerResponse,
  BaseCompetitionDeailResponse,
  BaseCompetitionGalleryResponse,
  BaseCompetitionResponse,
  BasePaticipantsResponse,
} from './types';
import { competitionApi } from './api';

export const useGetCompetitions = () => {
  return useFetch<BaseCompetitionResponse>(competitionApi.getAll());
};

export const useGetCompetitionDetail = (slug: string) => {
  return useFetch<BaseCompetitionDeailResponse>(competitionApi.getDetail(slug));
};

export const useGetTerms = (slug: string) => {
  return useFetch<any>(competitionApi.getTerms(slug));
};

export const useGetRules = (slug: string) => {
  return useFetch<any>(competitionApi.getRules(slug));
};

export const useGetParticipants = (slug: string) => {
  return useFetch<BasePaticipantsResponse>(
    competitionApi.getParticipants(slug)
  );
};

export const useGetCompetitionBanner = () => {
  return useFetch<BaseCompetitionBannerResponse>(
    pathToUrl(apiMainRoutes.getCompetitionBanner)
  );
};

export const useGetCompetitionGallery = (slug?: string) => {
  if (!slug) return { data: null, isLoading: false, error: null };
  return useFetch<BaseCompetitionGalleryResponse>(
    pathToUrl(apiMainRoutes.getCompetitionGallery, { slug })
  );
};
