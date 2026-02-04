/**
 * Hook for fetching individual translation keys
 * Useful when you only need specific translations instead of an entire group
 */

import { useQuery } from '@tanstack/react-query';
import { fetchTranslationByKey } from '@/services/translations';
import { useChangeLang } from '@/hooks/useChangeLang';

/**
 * Hook to fetch a single translation by key
 * @param key - The translation key (e.g., 'registration_itra_hint')
 * @param enabled - Whether to enable the query (default: true)
 */
export const useTranslationKey = (key: string, enabled = true) => {
  const { lang } = useChangeLang();

  const { data, isLoading, error } = useQuery({
    queryKey: ['translation', key, lang],
    queryFn: () => fetchTranslationByKey(key, lang),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled, // Only fetch if enabled
  });

  return {
    translation: data?.data?.value || '',
    isLoading,
    error,
  };
};

/**
 * Hook to fetch multiple translation keys in parallel
 * More efficient than calling useTranslationKey multiple times
 * 
 * @param keys - Array of translation keys to fetch
 */
export const useTranslationKeys = (keys: string[]) => {
  const { lang } = useChangeLang();

  const queries = keys.map((key) => ({
    queryKey: ['translation', key, lang],
    queryFn: () => fetchTranslationByKey(key, lang),
    staleTime: 1000 * 60 * 5,
  }));

  const results = queries.map((query) => 
    useQuery(query)
  );

  const isLoading = results.some((result) => result.isLoading);
  const hasError = results.some((result) => result.error);

  const translations = results.reduce((acc, result, index) => {
    const key = keys[index];
    acc[key] = result.data?.data?.value || '';
    return acc;
  }, {} as Record<string, string>);

  return {
    translations,
    isLoading,
    hasError,
  };
};
