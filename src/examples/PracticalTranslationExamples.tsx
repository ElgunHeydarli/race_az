/**
 * Practical examples demonstrating real-world usage of translation hooks
 */

import { useTranslationKey, useTranslationKeys } from '@/hooks/useTranslationKey';
import { useRegistrationTranslations } from '@/hooks/useRegistrationTranslations';

/**
 * Example 1: Simple single key usage
 */
export const ItraHintDisplay = () => {
  const { translation, isLoading } = useTranslationKey('registration_itra_hint');

  if (isLoading) return <span>...</span>;

  return (
    <p className="text-xs text-gray-500 mt-1">
      {translation || 'Enter your ITRA code if you have one'}
    </p>
  );
};

/**
 * Example 2: Multiple keys in one component
 */
export const RegistrationInfoBox = () => {
  const { translations, isLoading } = useTranslationKeys([
    'registration_itra_hint',
    'registration_terms_agree',
    'registration_welcome_message',
  ]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-blue-50 p-4 rounded">
      <h3 className="font-bold">{translations.registration_welcome_message}</h3>
      <p className="text-sm mt-2">{translations.registration_itra_hint}</p>
      <p className="text-xs mt-1">{translations.registration_terms_agree}</p>
    </div>
  );
};

/**
 * Example 3: Using the group hook (most efficient for multiple keys)
 */
export const RegistrationFormLabels = () => {
  const { translations } = useRegistrationTranslations();

  return (
    <div>
      <label htmlFor="itra">
        ITRA Code
        {translations.registration_itra_hint && (
          <span className="block text-xs text-gray-500">
            {translations.registration_itra_hint}
          </span>
        )}
      </label>

      <div className="mt-4 flex items-center gap-2">
        <input type="checkbox" id="terms" />
        <label htmlFor="terms" className="text-sm">
          {translations.registration_terms_agree || 'I agree to the terms'}
        </label>
      </div>
    </div>
  );
};

/**
 * Example 4: Conditional rendering based on translation availability
 */
export const ConditionalHint = () => {
  const { translation } = useTranslationKey('registration_itra_hint');

  // Only show hint if translation is available
  if (!translation) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">{translation}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Example 5: Integration with a form field
 */
export const ItraCodeField = () => {
  const { translations } = useRegistrationTranslations();

  return (
    <div className="space-y-2">
      <label htmlFor="itra_code" className="block text-sm font-medium text-gray-700">
        ITRA Code
      </label>
      
      <input
        id="itra_code"
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your ITRA code"
      />
      
      {translations.registration_itra_hint && (
        <p className="text-xs text-gray-500">
          💡 {translations.registration_itra_hint}
        </p>
      )}
    </div>
  );
};

/**
 * Example 6: Terms checkbox with translation
 */
export const TermsCheckbox = () => {
  const { translations } = useRegistrationTranslations();

  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id="terms_accepted"
        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor="terms_accepted" className="text-sm text-gray-700">
        {translations.registration_terms_agree || (
          <>
            I agree to the <a href="/terms" className="text-blue-600 hover:underline">terms and conditions</a>
          </>
        )}
      </label>
    </div>
  );
};

/**
 * Example 7: Loading state with skeleton
 */
export const TranslationWithSkeleton = () => {
  const { translations, isLoading } = useRegistrationTranslations();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{translations.registration_itra_hint}</p>
      <p className="text-xs text-gray-600">{translations.registration_terms_agree}</p>
    </div>
  );
};

/**
 * Example 8: Error boundary
 */
export const TranslationWithErrorBoundary = () => {
  const { translations, isLoading, error } = useRegistrationTranslations();

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-800">
        Failed to load translations. Using defaults.
      </div>
    );
  }

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div>
      {Object.entries(translations).map(([key, value]) => (
        <div key={key} className="mb-2">
          <span className="font-mono text-xs text-gray-500">{key}:</span>
          <p className="text-sm">{value}</p>
        </div>
      ))}
    </div>
  );
};

/**
 * Example 9: Tooltip with translation
 */
export const ItraTooltip = () => {
  const { translation } = useTranslationKey('registration_itra_hint');

  return (
    <div className="relative inline-block group">
      <button type="button" className="text-gray-400 hover:text-gray-600">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>
      
      {translation && (
        <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg w-64 z-10">
          {translation}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
};
