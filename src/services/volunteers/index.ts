import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import { VolunteerResponse } from './types';

export const useGetVolunteers = () => {
  return useFetch<VolunteerResponse>(pathToUrl(apiMainRoutes.getVolunteers));
};
