import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';

export type SettingsResponse = {
  success: boolean;
  snow_effect: boolean;
  favicon: string;
};

export const useGetSettings = () => {
  return useFetch<SettingsResponse>(
    apiMainRoutes.getSettings,
    ['settings']
  );
};
