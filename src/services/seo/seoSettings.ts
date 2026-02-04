import { api } from '@/api/axiosClient';

export interface SeoSettings {
  success: boolean;
  site_name: string;
  title_separator: string;
  default_og_image: string;
  google_analytics_id: string;
  google_tag_manager_id: string;
  google_verification: string;
  custom_head_code: string;
  favicon: string;
  social_profiles: string[];
}

export const getSeoSettings = async (): Promise<SeoSettings> => {
  const response = await api.get<SeoSettings>('/settings/seo');
  return response.data;
};
