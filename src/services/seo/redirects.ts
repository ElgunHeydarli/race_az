import { api } from '@/api/axiosClient';

export interface RedirectData {
  redirect: boolean;
  destination_url?: string;
  status_code?: number;
}

export interface SitemapResponse {
  xml: string;
}

export interface RobotsResponse {
  text: string;
}

export const checkRedirect = async (path: string): Promise<RedirectData> => {
  const response = await api.get<RedirectData>('/redirects/check', {
    params: { path },
  });
  return response.data;
};

export const getAllRedirects = async (): Promise<Array<{ path: string; destination: string; status_code: number }>> => {
  const response = await api.get<Array<{ path: string; destination: string; status_code: number }>>('/redirects');
  return response.data;
};

export const getSitemap = async (): Promise<string> => {
  const response = await api.get<string>('/sitemap.xml', {
    headers: { 'Content-Type': 'application/xml' },
  });
  return response.data as string;
};

export const getRobots = async (): Promise<string> => {
  const response = await api.get<string>('/robots.txt', {
    headers: { 'Content-Type': 'text/plain' },
  });
  return response.data as string;
};
