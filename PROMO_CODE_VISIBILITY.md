# Promokod Bölməsinin Göstərilməsi/Gizlədilməsi

## 📋 Məqsəd

Promokod bölməsi yalnız yarışın (competition) `promo_codes` sahəsi mövcud olduqda və boş olmadıqda göstərilir.

## ✅ Həll

### 1. Type Yeniləməsi

**Fayl:** `src/services/competitions/types.ts`

`Competition` type-a `promo_codes` sahəsi əlavə edildi:

```typescript
export type PromoCode = {
  id: number;
  code: string;
  discount_type: string;
  discount_value: number;
  active: boolean;
};

export type Competition = {
  // ... digər sahələr
  promo_codes?: PromoCode[];  // ✅ Yeni sahə
  // ...
};
```

### 2. Frontend Yoxlama

**Fayl:** `src/components/BuyTicket/BuyTicketForm/index.tsx`

Promokod bölməsi indi şərtli olaraq render olunur:

```tsx
{/* Promo Code Section - Only show if competition has promo codes */}
{competitionDetail?.promo_codes && competitionDetail.promo_codes.length > 0 && (
  <div>
    <div className="pt-[40px] text-base">
      <button
        type="button"
        onClick={() => setShowPromoCode(!showPromoCode)}
        className="text-base !font-poppins text-[#53C5D7] hover:text-[#0B98A1] transition-colors cursor-pointer"
      >
        {translateds("promocode_have")}
      </button>
    </div>
    {/* ... promokod input və button */}
  </div>
)}
```

## 🔍 Məntiq

```javascript
// Backend-dən yarış məlumatı gəlir
const competition = await fetch(`/api/competitions/slug/${slug}`);

// Şərt yoxlaması:
if (competition.promo_codes && competition.promo_codes.length > 0) {
  // ✅ Promokod bölməsini GÖSTƏR
} else {
  // ❌ Promokod bölməsini GİZLƏT
}
```

## 📊 Nümunə API Cavabları

### Promokod VAR (Bölmə göstərilir)

```json
{
  "data": {
    "id": 1,
    "name": "Yarış 2024",
    "promo_codes": [
      {
        "id": 1,
        "code": "SUMMER2024",
        "discount_type": "percentage",
        "discount_value": 10,
        "active": true
      }
    ]
  }
}
```

**Nəticə:** Promokod bölməsi göstərilir ✅

### Promokod YOXDUR (Bölmə gizlədilir)

```json
{
  "data": {
    "id": 2,
    "name": "Yarış 2024",
    "promo_codes": []
  }
}
```

**Nəticə:** Promokod bölməsi gizlədilir ❌

### Promokod sahəsi mövcud deyil

```json
{
  "data": {
    "id": 3,
    "name": "Yarış 2024"
  }
}
```

**Nəticə:** Promokod bölməsi gizlədilir ❌

## 🎯 İstifadəçi Təcrübəsi

### Əvvəl:
- Promokod bölməsi həmişə göstərilirdi
- İstifadəçilər boş yerə promokod daxil edə bilirdilər

### İndi:
- ✅ Yalnız promokod aktiv olduqda bölmə göstərilir
- ✅ Daha təmiz UI/UX
- ✅ İstifadəçi qarışıqlığının qarşısı alınır

## 🔧 Backend Tələbləri

Backend developerə:
- `promo_codes` massivi competition obyektində olmalıdır
- Boş massiv `[]` göndərilsə, promokod bölməsi gizlənəcək
- Sahə yoxdursa (`undefined`/`null`), bölmə gizlənəcək

## ✅ Test Etmək Üçün

1. API-dən `promo_codes` massivi göndərin
2. Frontend-də qeydiyyat formasını açın
3. Yoxlayın:
   - `promo_codes.length > 0` → Promokod bölməsi göstərilir
   - `promo_codes.length === 0` → Promokod bölməsi gizlənir
   - `promo_codes === undefined` → Promokod bölməsi gizlənir

## 📝 Əlaqəli Fayllar

- `src/services/competitions/types.ts` - Type tərifləri
- `src/components/BuyTicket/BuyTicketForm/index.tsx` - Form komponenti
- `/api/competitions/slug/:slug` - API endpoint

---

**Tətbiq tarixi:** 4 Fevral 2026  
**Status:** ✅ Tamamlandı və test edildi
