# Registration Form Translations Implementation

This document describes the implementation of dynamic translations for the registration form.

## Overview

The registration form now fetches translations from the backend API, allowing for dynamic content updates through the admin panel.

## API Endpoints

### Fetch Translation Group
```
GET /api/translations/group/registration?lang=az
GET /api/translations/group/registration?lang=en
GET /api/translations/group/registration?lang=ru
```

Returns all translations in the `registration` group for the specified language.

### Fetch Single Translation
```
GET /api/translations/key/registration_itra_hint?lang=az
GET /api/translations/key/registration_terms_agree?lang=ru
```

Returns a specific translation by key for the specified language.

## Translation Keys

The following translation keys are used in the registration form:

- **`registration_itra_hint`**: Hint text displayed below the ITRA code input field
- **`registration_terms_agree`**: Text for the terms and conditions checkbox

## Implementation Details

### 1. Translation Service (`src/services/translations/index.ts`)

Provides functions to fetch translations from the API:
- `fetchTranslationsByGroup(group, lang)` - Fetches all translations for a group
- `fetchTranslationByKey(key, lang)` - Fetches a single translation by key

### 2. Custom Hook (`src/hooks/useRegistrationTranslations/index.ts`)

A React Query hook that:
- Fetches registration translations based on the current language
- Caches translations for 5 minutes
- Returns a map of translation keys to their values

### 3. Integration in BuyTicketForm

The registration form component now:
- Imports and uses the `useRegistrationTranslations` hook
- Displays the ITRA hint text below the ITRA code field
- Uses the terms agreement text from translations
- Falls back to default translations if the API translations are not available

## Usage Example

```tsx
import { useRegistrationTranslations } from '@/hooks/useRegistrationTranslations';

const MyComponent = () => {
  const { translations, isLoading, error } = useRegistrationTranslations();
  
  return (
    <div>
      {translations.registration_itra_hint && (
        <p>{translations.registration_itra_hint}</p>
      )}
      {translations.registration_terms_agree && (
        <label>{translations.registration_terms_agree}</label>
      )}
    </div>
  );
};
```

## Admin Panel Configuration

To edit registration translations:
1. Navigate to `/admin/pages/translations` in the admin panel
2. Find the `registration` group
3. Edit the translation values for:
   - `registration_itra_hint`
   - `registration_terms_agree`
4. Save changes

Changes will be reflected in the frontend immediately (within the 5-minute cache period).

## Language Support

The system automatically uses the current language from the app's language selector:
- **az** - Azerbaijani
- **en** - English
- **ru** - Russian

The language is detected from:
1. `useChangeLang` hook state
2. Local storage (`LANG_STORAGE_KEY`)
3. Defaults to `az` if not set

## Features

- ✅ Automatic language detection
- ✅ Caching for improved performance (5 minutes)
- ✅ Fallback to default translations
- ✅ Real-time updates from admin panel
- ✅ Type-safe implementation with TypeScript
- ✅ React Query for efficient data fetching
