import { axiosClient } from '@/api/axiosClient';
import { useChangeLang } from '@/hooks/useChangeLang';
import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

type QueryKeyT = [string, object | undefined, string];

export const fetcher = <T>({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  return axiosClient
    .get<T>(url, { params: { ...params, pageParam } })
    .then((res) => res.data);
};


export const useFetch = <T extends object>(
  url: string | null,
  params?: object,
  config?: Omit<
    UseQueryOptions<T, Error, T, QueryKeyT>,
    'queryKey' | 'queryFn'
  >
) => {
  const { lang } = useChangeLang();
  const langCode = lang.toLocaleLowerCase();
  if (window.location.pathname.includes('/dashboard')) {
    axiosClient.defaults.headers['Accept-Language'] = 'az';
  } else {
    axiosClient.defaults.headers['Accept-Language'] = langCode;
  }
  return useQuery<T, Error, T, QueryKeyT>({
    queryKey: [url!, params, langCode],
    queryFn: async (context) => {
      const response = await fetcher<T>(context);

      return response;
    },
    enabled: !!url,
    ...config,
  });
};
