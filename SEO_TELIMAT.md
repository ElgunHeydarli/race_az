# SEO İmplementasiyası - Qısa Təlimat

## Nə edildi?

Race.az layihəsinə dinamik SEO dəstəyi əlavə edildi. İndi hər səhifə üçün admin paneldən SEO məlumatları (title, description, keywords) idarə edilə bilər.

## Əlavə edilən fayllar

1. **src/components/SEO/index.tsx** - SEO komponenti
2. **src/services/settings/index.ts** - Settings servisi (favicon üçün)
3. **SEO_IMPLEMENTATION.md** - Ətraflı texniki dokumentasiya

## Yenilənən fayllar

- **src/api/routes.ts** - Yeni API route-lar əlavə edildi
- **src/services/seo/index.ts** - meta_keywords və yeni hook əlavə edildi
- **Bütün səhifələr (18 ədəd)** - SEO komponenti ilə yeniləndi

## Hər səhifə üçün SEO açarları (keys)

| Səhifə                | Key                 |
|-----------------------|---------------------|
| Ana səhifə            | home                |
| Haqqımızda            | about               |
| Partnyor              | partner             |
| Könüllülər            | volunteer           |
| Yarışlar              | competitions        |
| Yarış detalı          | competitionDetail   |
| Nəticələr             | results             |
| Nəticə detalı         | resultDetail        |
| Qalereya              | gallery             |
| Qalereya detalı       | galleryDetail       |
| Partnyor yarışları    | partnerCompetitions |
| Məhsullar             | products            |
| Məhsul detalı         | productDetail       |
| Bilet al              | buy-ticket          |
| Təqvim                | calendar            |
| Səbət                 | basket              |
| Sifariş               | order               |

## Backend tələbləri

Admin paneldə **SEO** bölməsi olmalıdır və aşağıdakı sahələr doldurulmalıdır:

### Hər SEO key üçün:
- **key** - Yuxarıdakı cədvəldən (məs: "home", "about")
- **meta_title** - Səhifə başlığı (məs: "Race.az - Trail Running in Azerbaijan")
- **meta_description** - Səhifə təsviri (məs: "Azərbaycanda trail running yarışları...")
- **meta_keywords** - ⚠️ YENİ SAHƏ (məs: "trail running, race, azerbaijan, maraton, qaçış")
- **status** - Aktiv/Deaktiv

### API Endpoint-ları:
1. `GET /api/seo/{key}` - Səhifəyə görə SEO məlumatları
2. `GET /api/settings/all` - Favicon və digər parametrlər

## İstifadə nümunəsi

Yeni səhifə əlavə edərkən:

```tsx
import { SEO } from '@/components/SEO';

const YeniSehife = () => {
  return (
    <>
      <SEO seoKey="yeniSehife" />
      {/* Səhifə məzmunu */}
    </>
  );
};
```

## Nə əldə etdik?

✅ Bütün səhifələr SEO-friendly
✅ Google və digər axtarış sistemləri üçün optimize edilmiş
✅ Facebook və Twitter üçün Open Graph dəstəyi
✅ Admin paneldən idarə edilən meta tag-lar
✅ Dinamik favicon (admin paneldən dəyişdirilə bilər)
✅ Keywords sahəsi əlavə edildi
✅ TypeScript dəstəyi

## Test etmək üçün

1. Saytı işə salın
2. Browser DevTools-da (F12) `<head>` tag-ına baxın
3. Meta tag-ların düzgün yüklənməsini yoxlayın
4. Facebook Sharing Debugger ilə Open Graph tag-larını test edin
5. Favicon-un düzgün görünməsini yoxlayın

## Qeydlər

- OrderSuccess və ProductOrderSuccess səhifələrinə SEO əlavə edilməyib (onlar axtarış sistemlərində indekslənməməlidir)
- Hər səhifə öz SEO məlumatlarını ayrıca çəkir (React Query keşləyir)
- Əgər settings API favicon qaytarmazsa, default `/favicon.ico` istifadə olunur

## Suallar?

Texniki suallar üçün `SEO_IMPLEMENTATION.md` faylına baxın.
