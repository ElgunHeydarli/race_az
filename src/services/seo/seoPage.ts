import { api } from '@/api/axiosClient';

export interface SeoPageData {
  key: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image: string;
  canonical_url: string;
  meta_robots: string;
  schema_type: string;
}

export interface GetSeoByKeyResponse {
  data: SeoPageData;
}

export const getSeoByKey = async (key: string): Promise<SeoPageData> => {
  const response = await api.get<GetSeoByKeyResponse>(`/seo/${key}`);
  return response.data.data;
};
