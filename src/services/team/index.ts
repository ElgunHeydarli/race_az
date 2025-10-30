import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import { BaseTeamResponse } from './types';

export const useGetTeams = () => {
  return useFetch<BaseTeamResponse>(pathToUrl(apiMainRoutes.getTeams));
};
