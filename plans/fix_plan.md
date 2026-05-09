# Premium PWA & UI Transformation Roadmap (Fix Plan)

Bu plan, YaşamKoçu (Personal Growth Tracker) uygulamasının tespit edilen eksikliklerini gidererek onu "Premium UI" ve "Professional PWA" standartlarına taşımayı hedeflemektedir.

## Mevcut Eksiklikler (Tespitler)

1. **PWA Standartları**: 
   - `vite.config.ts` içinde tanımlı olan ikonlar (`pwa-192x192.png`, `pwa-512x512.png`, `apple-touch-icon.png`, `favicon.ico`) `public/` dizininde **bulunmuyor**.
2. **Premium Tipografi**: Sadece `Inter` fontu yüklü. Başlıklar için premium görünüm sağlayan `Outfit` (veya `Satoshi`) eksik.
3. **Sayfa Animasyonları (Framer Motion)**: `App.tsx` içerisinde `<AnimatePresence>` kullanılmış ancak route'ların içi `<motion.div>` ile sarmalanmadığı için sayfa geçiş animasyonları (fade, slide) çalışmıyor.
4. **Glassmorphism & Mesh Gradients**: `tailwind.config.ts` ve `index.css`'te temel glass sınıfları var, ancak modern *mesh gradient* arka planları ve asimetrik *Bento Grid* yapıları eksik. AppShell sidebar'ında glass efekti yok.
5. **State Management**: Zustand store bulunuyor ancak kullanıcı verilerinin kalıcılığı için `persist` middleware (LocalStorage) entegrasyonu eksik gibi görünüyor.

## Yapılacak Değişiklikler (Adım Adım)

Aşağıdaki adımlar sırayla uygulanacaktır:

### 1. PWA & Asset Management
PWA ikonlarını üretecek ve gereksiz dosyaları temizleyeceğiz.

- [x] [NEW] `public/favicon.svg` (SVG vektör formatı oluşturuldu ve vite.config.ts ikon tanımlarına entegre edildi)
- [x] [DELETE] `public/manifest.json` (Vite eklentisi otomatik üretecek)
- [x] [DELETE] `public/service-worker.js` (Vite eklentisi otomatik üretecek)

### 2. Typography & Tailwind Config
Premium fontların eklenmesi ve Bento Grid / Mesh Gradient token'larının tanımlanması.

- [x] [MODIFY] `index.html`: Google Fonts üzerinden `Outfit` fontunu ekleyeceğiz.
- [x] [MODIFY] `tailwind.config.ts`: `fontFamily` bölümüne `heading: ['Outfit', 'sans-serif']` eklenecek. Bento grid için özel safelist veya grid alan tanımları yapılacak.
- [x] [MODIFY] `src/index.css`: Mesh gradient animasyonları ve daha derin glassmorphism (`backdrop-blur-lg`, `bg-white/5`) sınıfları eklenecek.

### 3. Core Architecture & UI 
Framer Motion entegrasyonu ve State kalıcılığı.

- [x] [MODIFY] `src/App.tsx`: Rotaları `framer-motion` `<motion.div>` komponenti ile sarıp, pürüzsüz sayfa geçişleri ekleyeceğiz. (AppShell Outlet'i AnimatePresence ile güncellendi)
- [x] [MODIFY] `src/components/layout/AppShell.tsx`: Sidebar ve Header için tam "Glassmorphism" ve border-white/20 detaylarını entegre edeceğiz. Mesh gradient eklendi.
- [x] [MODIFY] `src/core/store/store.ts`: Zustand state'lerine `persist` (LocalStorage) desteği eklenecek.

### 4. Dashboard (Bento Grid Uygulaması)
Dashboard'u premium asimetrik Bento tasarımına çevireceğiz.

- [x] [MODIFY] `src/components/ui/BentoGrid.tsx` ve `src/features/dashboard/components/Dashboard.tsx`: Veri gösterimini dinamik CSS Grid (Bento Grid) yapısına ve Glassmorphism kartlara çevirdik.
- [x] [FIX] Bağımlılık Eksikliği: Derleme ve deploy edilebilirlik sorunu `npm install` komutu ile çözüldü. Artık proje build alınabilir durumda.
