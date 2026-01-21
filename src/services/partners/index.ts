import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import { PartnerCompetitions, PartnerResponse } from './types';

export const useGetPartners = () => {
  return useFetch<PartnerResponse>(pathToUrl(apiMainRoutes.getPartners));
};

export const useGetPartnerCompetitions = () => {
  return useFetch<PartnerCompetitions>(
    pathToUrl(apiMainRoutes.getPartnerCompetitions)
  );
};
