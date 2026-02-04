import axios from 'axios';
import { useChangeLang } from '@/hooks/useChangeLang';

// Use relative URL in development to leverage Vite proxy
const BASE_URL = import.meta.env.DEV ? '' : 'https://admin.race.az';

export const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Accept-Language': 'az',
  },
});

// Add language interceptor
axiosClient.interceptors.request.use((config) => {
  const { lang } = useChangeLang.getState?.() || { lang: 'az' };
  config.headers['Accept-Language'] = lang;
  return config;
});

export const api = {
  get: <T>(url: string, params?: object) =>
    axiosClient.get<T>(url, { ...params }),
  post: <T>(url: string, data: any) => axiosClient.post<T>(url, data),
  put: <T>(url: string, data: any) => axiosClient.put<T>(url, data),
  patch: <T>(url: string, data: any) => axiosClient.patch<T>(url, data),
  delete: <T>(url: string, options?: any) =>
    axiosClient.delete<T>(url, options),
};
