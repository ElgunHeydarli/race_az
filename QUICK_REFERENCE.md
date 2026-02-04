# 🚀 Quick Reference: Using Registration Translations

## Import

```tsx
import { useRegistrationTranslations } from '@/hooks/useRegistrationTranslations';
```

## Basic Usage

```tsx
const { translations, isLoading, error } = useRegistrationTranslations();
```

## Available Translation Keys

| Key | Purpose | Location |
|-----|---------|----------|
| `registration_itra_hint` | ITRA code helper text | Below ITRA input |
| `registration_terms_agree` | Terms checkbox label | Checkbox label |

## Usage in Component

### ITRA Hint
```tsx
{translations.registration_itra_hint && (
  <p className="text-xs text-gray-500 mt-2">
    {translations.registration_itra_hint}
  </p>
)}
```

### Terms Checkbox
```tsx
<label>
  {translations.registration_terms_agree || 'Default text'}
</label>
```

## API Endpoints

```
GET /api/translations/group/registration?lang={az|en|ru}
GET /api/translations/key/registration_itra_hint?lang={az|en|ru}
```

## Cache Duration

**5 minutes** - Translations are cached for 5 minutes to improve performance.

## Language Support

- `az` - Azerbaijani (default)
- `en` - English
- `ru` - Russian

## Admin Panel

Edit translations at: `/admin/pages/translations` → `registration` group

## Complete Example

```tsx
import { useRegistrationTranslations } from '@/hooks/useRegistrationTranslations';

const MyForm = () => {
  const { translations } = useRegistrationTranslations();
  
  return (
    <form>
      {/* ITRA Field */}
      <input name="itra_code" />
      {translations.registration_itra_hint && (
        <p className="hint">{translations.registration_itra_hint}</p>
      )}
      
      {/* Terms Checkbox */}
      <label>
        <input type="checkbox" />
        {translations.registration_terms_agree || 'I agree'}
      </label>
    </form>
  );
};
```

## With Loading State

```tsx
const { translations, isLoading } = useRegistrationTranslations();

if (isLoading) return <Spinner />;

return <div>{translations.registration_itra_hint}</div>;
```

## Files Modified

- ✅ `src/services/translations/index.ts` - API service
- ✅ `src/hooks/useRegistrationTranslations/index.ts` - Custom hook
- ✅ `src/components/BuyTicket/BuyTicketForm/index.tsx` - Form component

## Need Help?

See full documentation in:
- `REGISTRATION_TRANSLATIONS.md`
- `IMPLEMENTATION_SUMMARY.md`
- `src/examples/TranslationExamples.tsx`
