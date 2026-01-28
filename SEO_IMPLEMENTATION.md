# SEO Implementation Documentation

## Overview
Dynamic SEO implementation for Race.az using `react-helmet-async` with support for meta tags, Open Graph, Twitter Cards, and dynamic favicon.

## API Endpoints Used

### SEO Data
- **Endpoint**: `GET /api/seo/{key}`
- **Response**:
```json
{
  "data": {
    "id": 1,
    "key": "home",
    "meta_title": "Race.az - Trail Running in Azerbaijan",
    "meta_description": "Azərbaycanda trail running yarışları...",
    "meta_keywords": "trail running, race, azerbaijan, maraton, qaçış",
    "status": true
  }
}
```

### Settings (Favicon)
- **Endpoint**: `GET /api/settings/all`
- **Response**:
```json
{
  "success": true,
  "snow_effect": false,
  "favicon": "https://admin.race.az/uploads/settings/favicon_123456.png"
}
```

## Files Created/Modified

### New Files Created

1. **src/components/SEO/index.tsx**
   - Reusable SEO component using `react-helmet-async`
   - Handles meta tags, Open Graph, Twitter Cards, and favicon
   - Automatically fetches SEO data and settings from API

2. **src/services/settings/index.ts**
   - Settings service to fetch site-wide settings including favicon
   - Uses React Query for caching

### Modified Files

1. **src/api/routes.ts**
   - Added `getSeoByKey: '/seo/:key'`
   - Added `getSettings: '/settings/all'`

2. **src/services/seo/index.ts**
   - Updated `SeoPage` type to include `meta_keywords` and `status`
   - Added `useGetSeoByKey` hook for fetching individual SEO data by key

3. **All Page Components** (18 pages updated):
   - Home (`src/pages/Home/index.tsx`)
   - About (`src/pages/About/index.tsx`)
   - Partners (`src/pages/Partners/index.tsx`)
   - Volunteers (`src/pages/Volunteers/index.tsx`)
   - Competitions (`src/pages/Competitions/index.tsx`)
   - Competition Detail (`src/pages/CompetitionDetail/index.tsx`)
   - Results (`src/pages/Results/index.tsx`)
   - Result Detail (`src/pages/ResultDetail/index.tsx`)
   - Gallery (`src/pages/Gallery/index.tsx`)
   - Gallery Detail (`src/pages/GalleryDetail/index.tsx`)
   - Partner Competitions (`src/pages/PartnerCompetitions/index.tsx`)
   - Products (`src/pages/Products/index.tsx`)
   - Product Detail (`src/pages/ProductDetail/index.tsx`)
   - Buy Ticket (`src/pages/BuyTicket/index.tsx`)
   - Calendar (`src/pages/Calendar/index.tsx`)
   - Basket (`src/pages/Basket/index.tsx`)
   - Order (`src/pages/Order/index.tsx`)

## SEO Keys Mapping

| Page                  | SEO Key             |
|-----------------------|---------------------|
| Home                  | home                |
| About                 | about               |
| Partners              | partner             |
| Volunteers            | volunteer           |
| Competitions          | competitions        |
| Competition Detail    | competitionDetail   |
| Results               | results             |
| Result Detail         | resultDetail        |
| Gallery               | gallery             |
| Gallery Detail        | galleryDetail       |
| Partner Competitions  | partnerCompetitions |
| Products              | products            |
| Product Detail        | productDetail       |
| Buy Ticket            | buy-ticket          |
| Calendar              | calendar            |
| Basket                | basket              |
| Order                 | order               |

## Usage Example

### In any page component:
```tsx
import { SEO } from '@/components/SEO';

const MyPage = () => {
  return (
    <>
      <SEO seoKey="home" />
      {/* Rest of your page content */}
    </>
  );
};
```

## Features Implemented

### 1. Meta Tags
- Dynamic `<title>` tag
- Meta description
- Meta keywords (new field)
- Canonical URL

### 2. Open Graph Tags
- og:title
- og:description
- og:type (website)
- og:url (current page URL)

### 3. Twitter Card Tags
- twitter:card (summary_large_image)
- twitter:title
- twitter:description

### 4. Favicon
- Dynamic favicon from settings API
- Multiple link types (icon, shortcut icon, apple-touch-icon)
- Fallback to `/favicon.ico` if API doesn't provide one

## Provider Setup

The `HelmetProvider` was already configured in `src/provider/Provider.tsx`:
```tsx
<HelmetProvider>
  <TranslateProvider>
    {children}
  </TranslateProvider>
</HelmetProvider>
```

## Dependencies

- **react-helmet-async**: ^2.0.5 (already installed)
- **@tanstack/react-query**: For API data fetching and caching

## Backend Requirements

For this implementation to work properly, the backend admin panel should:

1. Provide SEO management interface at **SEO** section
2. Allow editing of all SEO keys listed in the mapping table
3. Each SEO entry should have:
   - `key` (string)
   - `meta_title` (string)
   - `meta_description` (text)
   - `meta_keywords` (string) - NEW FIELD
   - `status` (boolean)

4. Settings endpoint should return:
   - `favicon` URL
   - `snow_effect` boolean
   - `success` boolean

## Benefits

1. **SEO-Friendly**: All pages have proper meta tags for search engines
2. **Social Media Optimized**: Open Graph and Twitter Card support
3. **Centralized Management**: Admin can update SEO from backend
4. **Reusable**: Single `<SEO>` component used across all pages
5. **Type-Safe**: Full TypeScript support
6. **Cached**: React Query caches API responses for performance
7. **Dynamic Favicon**: Site favicon can be changed from admin panel

## Testing Checklist

- [ ] Verify all pages load without errors
- [ ] Check meta tags in browser DevTools
- [ ] Test Open Graph tags using Facebook Debugger
- [ ] Test Twitter Cards using Twitter Card Validator
- [ ] Verify favicon loads correctly
- [ ] Test with different SEO keys in admin panel
- [ ] Check that meta_keywords field is properly displayed
- [ ] Verify settings API returns favicon URL

## Notes

- Success pages (OrderSuccess, ProductOrderSuccess) were intentionally not included as they are transaction result pages that shouldn't be indexed
- The implementation uses the new API structure with individual key endpoints instead of fetching all SEO data at once
- Each page makes independent API calls, cached by React Query
