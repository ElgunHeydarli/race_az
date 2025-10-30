import axios from 'axios';

const BASE_URL = 'https://admin.race.az';

export const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Accept-Language': 'az',
  },
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
