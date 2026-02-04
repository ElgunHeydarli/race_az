# Frontend SEO Integration - Tətbiqi Sənəd

## ✅ Tamamlanmış Funksionallıq

### 1. **SEO Settings Context** ✓
- **Dosya**: `src/context/SeoContext.tsx`
- **Xüsusiyyətlər**:
  - App startup-da `/api/settings/seo` endpoint-ə sorğu
  - Google Analytics 4 ID'si yüklənir
  - Google Tag Manager ID'si yüklənir
  - Google Site Verification tegi əlavə olunur
  - Custom head code DOM-a inject olunur
  - Favicon dinamik dəyişdirilir
  - Social profiles yüklənir
- **İstifadə**:
  ```typescript
  const { settings, loading, error } = useSeoSettings();
  ```

### 2. **SEO Services** ✓
- **Dosya**: `src/services/seo/`
  - `seoSettings.ts` - Global SEO tənzimləmələri
  - `seoPage.ts` - Səhifə SEO məlumatı
  - `schema.ts` - JSON-LD Structured Data
  - `redirects.ts` - 301 Redirects və Sitemap/Robots

### 3. **SEO Components** ✓
- **Dosya**: `src/components/SEO/`
  - `SEO.tsx` - Hər səhifə üçün meta tags, OG, Twitter Card
  - `SeoScripts.tsx` - GA4 və GTM scripts
  - `SeoHead.tsx` - Advanced SEO head component
  - `JsonLd.tsx` - Structured Data (JSON-LD) üçün helper'lar

**Hər səhifədə istifadə**:
```tsx
import { SEO } from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO seoKey="home" />
      {/* Səhifə kontenti */}
    </>
  );
}
```

### 4. **Structured Data (JSON-LD)** ✓
- **Global Schemas** (Root Layout-da yüklənir):
  - Organization Schema
  - WebSite Schema
- **Dynamic Schemas**:
  - Competition/SportsEvent (yarış detalı)
  - Product (məhsul detalı)
  - Breadcrumb (bütün səhifələrdə)

**İstifadə**:
```tsx
import { JsonLd } from '@/components/SEO';
import { useDynamicSeo } from '@/hooks/useDynamicSeo';

const { schema, breadcrumbSchema } = useDynamicSeo({
  seoKey: 'competitionDetail',
  schemaType: 'competition',
  slug: competitionSlug,
  breadcrumbs: [
    { name: 'Ana Səhifə', url: 'https://race.az/' },
    { name: 'Yarışlar', url: 'https://race.az/competitions' },
    { name: 'Yarış Adı', url: 'https://race.az/competition/slug' }
  ]
});

return (
  <>
    <SEO seoKey="competitionDetail" />
    {schema && <JsonLd schema={schema} />}
    {breadcrumbSchema && <JsonLd schema={breadcrumbSchema} />}
  </>
);
```

### 5. **Sitemap.xml və Robots.txt** ✓
- **Dev Server** (Vite Proxy):
  - `/sitemap.xml` → `https://admin.race.az/api/sitemap.xml`
  - `/robots.txt` → `https://admin.race.az/api/robots.txt`
- **Production** (Vercel Rewrites):
  - Vercel konfigurasiyanında rewrites qurulduğu
  - Public fallback faylları var (`public/sitemap.xml`, `public/robots.txt`)

### 6. **301 Redirects** ✓
- **Hook**: `useRedirectCheck()`
- **Root Layout-da aktivdir**
- **Xüsusiyyətlər**:
  - Hər səhifə yüklənəndə eski URL-ləri yoxlayır
  - Təyin olunmuş yönləndirilmə varsa redirect edir
  - `replace: true` istifadə edildiyindən browser historiyasından silinir

### 7. **Provider Setup** ✓
- **Dosya**: `src/provider/Provider.tsx`
- **Hierarchy**:
  ```
  BrowserRouter
  → QueryClientProvider (React Query)
    → HelmetProvider (react-helmet-async)
      → SeoProvider (Global SEO Settings)
        → TranslateProvider
          → App
  ```

### 8. **Root Layout Integration** ✓
- **Dosya**: `src/layout/Root/Root.tsx`
- **Xüsusiyyətlər**:
  - SeoScripts component (GA/GTM yükləyir)
  - Organization + WebSite JSON-LD schemas
  - Redirect check hook
  - Lang attribute dynamic dəyişir

---

## 🔧 SEO Keys Cədvəli

| Səhifə | SEO Key | URL | Implemented |
|--------|---------|-----|-------------|
| Ana Səhifə | home | / | ✅ |
| Haqımızda | about | /about | ✅ |
| Partnyorluq | partner | /partner | ⏳ |
| Könüllü | volunteer | /volunteer | ✅ |
| Yarış Detalı | competitionDetail | /competition/:slug | ✅ |
| Nəticələr | results | /results | ✅ |
| Nəticə Detalı | resultDetail | /result/:slug | ✅ |
| Qalereya | gallery | /gallery | ✅ |
| Qalereya Detalı | galleryDetail | /gallery/:slug | ✅ |
| Partner Yarışları | partnerCompetitions | /partner-competitions | ✅ |
| Məhsullar | products | /products | ✅ |
| Məhsul Detalı | productDetail | /product/:id | ✅ |
| Bilet Al | buy-ticket | /buy-ticket | ✅ |
| Təqvim | calendar | /calendar | ✅ |
| Səbət | basket | /basket | ✅ |
| Sifariş | order | /order | ✅ |

---

## 📝 API Endpoints Tələbələri

### Settings
```
GET /api/settings/seo
```

### Per-Page SEO
```
GET /api/seo/{key}
```

### Schemas
```
GET /api/schema/organization
GET /api/schema/website
GET /api/schema/competition/{slug}
GET /api/schema/product/{slug}
GET /api/schema/breadcrumb?items=[...]
```

### Redirects & Static Files
```
GET /api/redirects/check?path=/path
GET /api/redirects
GET /api/sitemap.xml
GET /api/robots.txt
```

---

## 🚀 Build & Deployment

### Build Komandası
```bash
npm run build
```

### Vercel Configuration
`vercel.json` faylında sitemap.xml və robots.txt üçün rewrites qurulmuşdur.

### Vite Dev Server
Dev modunda sitemap.xml və robots.txt üçün proxy qurulmuşdur.

---

## 🔍 Testing Checklist

- [ ] Google Search Console'da site tesdiq edilmir
- [ ] Meta tags səhifə mənbəsində göründü
- [ ] Open Graph images sosial şəbəkələrdə göstərilir
- [ ] Twitter Card preview düzgün
- [ ] Sitemap.xml /sitemap.xml-də mövcuddur
- [ ] Robots.txt /robots.txt-də mövcuddur
- [ ] 301 redirects işləyir
- [ ] Structured data Google Rich Results Test-də validdır

---

## 📌 Qeydlər

1. SEO Settings ilk dəfə app startup-da yüklənir
2. Səhifə SEO məlumatları lazy loading ilə yüklənir
3. Schemas API-dən yüklənir, `staleTime: Infinity` ilə cache-lənir
4. Breadcrumb schema helper funksiyası var və manual olaraq yaradıla bilinir
5. Custom head code HTML string kimi inject olunur

