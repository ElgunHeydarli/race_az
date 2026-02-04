# 📖 Migration Guide: Adding Translations to Other Forms

This guide explains how to add API-based translations to any form or component in your application, following the same pattern as the registration form.

---

## Step-by-Step Guide

### Step 1: Create Admin Panel Translation Group

1. Login to admin panel at `https://admin.race.az/admin`
2. Navigate to `/admin/pages/translations`
3. Create a new translation group (e.g., `contact`, `volunteer`, etc.)
4. Add translation keys with values for each language (az, en, ru)

Example:
```
Group: contact
Keys:
  - contact_name_hint: "Adınızı daxil edin"
  - contact_email_hint: "Əlaqə e-poçtunuz"
  - contact_submit_text: "Göndər"
```

---

### Step 2: Create Custom Hook (Optional but Recommended)

Create a new hook file for your form's translations:

**File:** `src/hooks/useContactTranslations/index.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchTranslationsByGroup } from '@/services/translations';
import { useChangeLang } from '@/hooks/useChangeLang';
import { useMemo } from 'react';

export const useContactTranslations = () => {
  const { lang } = useChangeLang();

  const { data, isLoading, error } = useQuery({
    queryKey: ['translations', 'contact', lang],
    queryFn: () => fetchTranslationsByGroup('contact', lang),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
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
```

---

### Step 3: Use Hook in Component

Update your form component to use the new hook:

```typescript
import { useContactTranslations } from '@/hooks/useContactTranslations';

const ContactForm = () => {
  const { translations } = useContactTranslations();
  
  return (
    <form>
      <div>
        <label>Name</label>
        <input name="name" />
        {translations.contact_name_hint && (
          <p className="text-xs text-gray-500">
            {translations.contact_name_hint}
          </p>
        )}
      </div>
      
      <div>
        <label>Email</label>
        <input name="email" type="email" />
        {translations.contact_email_hint && (
          <p className="text-xs text-gray-500">
            {translations.contact_email_hint}
          </p>
        )}
      </div>
      
      <button type="submit">
        {translations.contact_submit_text || 'Submit'}
      </button>
    </form>
  );
};
```

---

## Alternative: Direct API Call

If you only need one or two translations, you can use the service directly:

```typescript
import { fetchTranslationByKey } from '@/services/translations';
import { useChangeLang } from '@/hooks/useChangeLang';
import { useQuery } from '@tanstack/react-query';

const MyComponent = () => {
  const { lang } = useChangeLang();
  
  const { data } = useQuery({
    queryKey: ['translation', 'my_key', lang],
    queryFn: () => fetchTranslationByKey('my_key', lang),
  });
  
  return <p>{data?.data?.value}</p>;
};
```

---

## Alternative: Using useTranslationKeys Hook

For multiple specific keys without creating a custom hook:

```typescript
import { useTranslationKeys } from '@/hooks/useTranslationKey';

const MyComponent = () => {
  const { translations } = useTranslationKeys([
    'contact_name_hint',
    'contact_email_hint',
    'contact_submit_text',
  ]);
  
  return (
    <div>
      <p>{translations.contact_name_hint}</p>
      <p>{translations.contact_email_hint}</p>
      <button>{translations.contact_submit_text}</button>
    </div>
  );
};
```

---

## Real-World Examples

### Example 1: Volunteer Form

**Admin Panel:**
- Group: `volunteer`
- Keys: `volunteer_welcome`, `volunteer_requirements`, `volunteer_submit`

**Hook:** `src/hooks/useVolunteerTranslations/index.ts`
```typescript
export const useVolunteerTranslations = () => {
  const { lang } = useChangeLang();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['translations', 'volunteer', lang],
    queryFn: () => fetchTranslationsByGroup('volunteer', lang),
    staleTime: 1000 * 60 * 5,
  });
  
  const translations = useMemo(() => {
    if (!data?.data) return {};
    return data.data.reduce((acc, t) => ({ ...acc, [t.key]: t.value }), {});
  }, [data]);
  
  return { translations, isLoading, error };
};
```

**Usage:**
```typescript
const { translations } = useVolunteerTranslations();

<div>
  <h1>{translations.volunteer_welcome}</h1>
  <p>{translations.volunteer_requirements}</p>
  <button>{translations.volunteer_submit}</button>
</div>
```

---

### Example 2: Product Order Form

**Admin Panel:**
- Group: `product_order`
- Keys: `order_shipping_info`, `order_terms`, `order_confirm`

**Usage (without custom hook):**
```typescript
import { fetchTranslationsByGroup } from '@/services/translations';
import { useChangeLang } from '@/hooks/useChangeLang';
import { useQuery } from '@tanstack/react-query';

const OrderForm = () => {
  const { lang } = useChangeLang();
  
  const { data } = useQuery({
    queryKey: ['translations', 'product_order', lang],
    queryFn: () => fetchTranslationsByGroup('product_order', lang),
  });
  
  const t = data?.data?.reduce((acc, item) => ({
    ...acc,
    [item.key]: item.value
  }), {}) || {};
  
  return (
    <form>
      <p>{t.order_shipping_info}</p>
      <label>{t.order_terms}</label>
      <button>{t.order_confirm}</button>
    </form>
  );
};
```

---

## Best Practices

### ✅ DO:

- Create separate hooks for different translation groups
- Use meaningful, descriptive translation keys
- Provide fallback text for all translations
- Cache translations with React Query
- Keep translation groups focused and specific

### ❌ DON'T:

- Hardcode translation strings in components
- Mix different translation groups in one hook
- Fetch translations on every render (use caching)
- Ignore loading states in your UI
- Skip error handling

---

## Performance Tips

1. **Group Related Translations:** Fetch related translations in one group rather than individual keys
2. **Use Caching:** Set appropriate `staleTime` (default: 5 minutes)
3. **Lazy Loading:** Only fetch translations when needed with the `enabled` option
4. **Prefetching:** Prefetch translations for better UX

```typescript
// Prefetch example
const queryClient = useQueryClient();

useEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['translations', 'contact', 'az'],
    queryFn: () => fetchTranslationsByGroup('contact', 'az'),
  });
}, []);
```

---

## Testing

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useContactTranslations } from './useContactTranslations';

test('fetches contact translations', async () => {
  const { result } = renderHook(() => useContactTranslations());
  
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  
  expect(result.current.translations).toHaveProperty('contact_name_hint');
});
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Translations not updating | Clear cache or reduce `staleTime` |
| Wrong language | Check `useChangeLang` state |
| Empty translations | Verify group name matches admin panel |
| TypeScript errors | Check return type matches `Translation` type |

---

## Summary Checklist

- [ ] Create translation group in admin panel
- [ ] Add all required translation keys (az, en, ru)
- [ ] Create custom hook (optional)
- [ ] Import and use hook in component
- [ ] Add fallback text for all translations
- [ ] Handle loading states
- [ ] Test with all supported languages

---

## Need Help?

- See `REGISTRATION_TRANSLATIONS.md` for detailed API documentation
- See `src/examples/TranslationExamples.tsx` for code examples
- See `src/hooks/useRegistrationTranslations/index.ts` for reference implementation
