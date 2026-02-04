/**
 * Example component demonstrating how to use the translation service
 * for fetching and displaying dynamic translations from the API
 */

import { useQuery } from '@tanstack/react-query';
import { fetchTranslationsByGroup, fetchTranslationByKey } from '@/services/translations';
import { useChangeLang } from '@/hooks/useChangeLang';

/**
 * Example 1: Fetch all translations in a group
 */
export const TranslationGroupExample = () => {
  const { lang } = useChangeLang();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['translations', 'registration', lang],
    queryFn: () => fetchTranslationsByGroup('registration', lang),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (isLoading) return <div>Loading translations...</div>;
  if (error) return <div>Error loading translations</div>;

  return (
    <div>
      <h2>Registration Translations</h2>
      <ul>
        {data?.data.map((translation) => (
          <li key={translation.id}>
            <strong>{translation.key}:</strong> {translation.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Example 2: Fetch a single translation by key
 */
export const TranslationKeyExample = () => {
  const { lang } = useChangeLang();
  
  const { data, isLoading } = useQuery({
    queryKey: ['translation', 'registration_itra_hint', lang],
    queryFn: () => fetchTranslationByKey('registration_itra_hint', lang),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <p className="text-sm text-gray-600">
        {data?.data?.value || 'Default hint text'}
      </p>
    </div>
  );
};

/**
 * Example 3: Create a custom hook for a specific translation group
 */
export const useCustomGroupTranslations = (groupName: string) => {
  const { lang } = useChangeLang();

  const { data, isLoading, error } = useQuery({
    queryKey: ['translations', groupName, lang],
    queryFn: () => fetchTranslationsByGroup(groupName, lang),
    staleTime: 1000 * 60 * 5,
  });

  const translations = data?.data.reduce((acc, translation) => {
    acc[translation.key] = translation.value;
    return acc;
  }, {} as Record<string, string>) || {};

  return { translations, isLoading, error };
};

/**
 * Example 4: Using the custom hook
 */
export const CustomGroupExample = () => {
  // Usage: Replace 'my_group' with your actual group name
  const { translations, isLoading } = useCustomGroupTranslations('my_group');

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3>{translations.my_title}</h3>
      <p>{translations.my_description}</p>
    </div>
  );
};

/**
 * Example 5: Fetch translations with error handling
 */
export const TranslationWithErrorHandling = () => {
  const { lang } = useChangeLang();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['translations', 'registration', lang],
    queryFn: () => fetchTranslationsByGroup('registration', lang),
    staleTime: 1000 * 60 * 5,
    retry: 2, // Retry failed requests 2 times
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent" />
        <span>Loading translations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded p-4">
        <p className="text-red-600">Failed to load translations</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {data?.data.map((translation) => (
        <div key={translation.id}>
          {translation.value}
        </div>
      ))}
    </div>
  );
};
