import { useQuery } from '@tanstack/react-query';
import { fetchTranslationsByGroup } from '@/services/translations';
import { useChangeLang } from '@/hooks/useChangeLang';
import { useMemo } from 'react';

/**
 * Hook to fetch registration translations
 * Returns a map of translation keys to their values
 */
export const useRegistrationTranslations = () => {
  const { lang } = useChangeLang();

  const { data, isLoading, error } = useQuery({
    queryKey: ['translations', 'registration', lang],
    queryFn: () => fetchTranslationsByGroup('registration', lang),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const translations = useMemo(() => {
    if (!data?.data) return {};
    
    return data.data.reduce((acc, translation) => {
      acc[translation.key] = translation.value;
      return acc;
    }, {} as Record<string, string>);
  }, [data]);

  return {
    translations,
    isLoading,
    error,
  };
};
