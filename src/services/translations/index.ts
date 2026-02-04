import { axiosClient } from '@/api/axiosClient';
import { BaseResponseType } from '@/types';

export type Translation = {
  id: number;
  key: string;
  value: string;
  group: string;
  lang: string;
};

export type TranslationGroupResponse = BaseResponseType<Translation[]>;
export type TranslationKeyResponse = BaseResponseType<Translation>;

/**
 * Fetch translations by group
 * @param group - The translation group (e.g., 'registration')
 * @param lang - The language code (e.g., 'az', 'en', 'ru')
 */
export const fetchTranslationsByGroup = async (
  group: string,
  lang: string
): Promise<TranslationGroupResponse> => {
  const response = await axiosClient.get<TranslationGroupResponse>(
    `/translations/group/${group}`,
    {
      params: { lang },
    }
  );
  return response.data;
};

/**
 * Fetch a single translation by key
 * @param key - The translation key (e.g., 'registration_itra_hint')
 * @param lang - The language code (e.g., 'az', 'en', 'ru')
 */
export const fetchTranslationByKey = async (
  key: string,
  lang: string
): Promise<TranslationKeyResponse> => {
  const response = await axiosClient.get<TranslationKeyResponse>(
    `/translations/key/${key}`,
    {
      params: { lang },
    }
  );
  return response.data;
};
