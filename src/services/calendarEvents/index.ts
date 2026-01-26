import { apiMainRoutes } from '@/api/routes';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import { BaseCalendarEventsResponse } from './types';

export const useGetCalendarEvents = () => {
  return useFetch<BaseCalendarEventsResponse>(
    pathToUrl(apiMainRoutes.getCalendarEvents),
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetCalendarEventsUpcoming = () => {
  return useFetch<BaseCalendarEventsResponse>(
    pathToUrl(apiMainRoutes.getCalendarEventsUpcoming),
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
