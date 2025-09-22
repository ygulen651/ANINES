# Yeni Marka Web Sitesi

Modern ve dinamik web sitesi projesi - Next.js ve Sanity CMS ile geliştirilmiştir.

## Özellikler

- 🎨 Modern ve responsive tasarım
- 📱 Mobil uyumlu
- 🚀 Next.js ile hızlı performans
- 📊 Sanity CMS ile içerik yönetimi
- 🎬 Video ve görsel desteği
- 📝 Blog sistemi
- 🛍️ Ürün kataloğu

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Sanity ayarlarını yapılandırın:
- `sanity.env.example` dosyasını `.env.local` olarak kopyalayın
- Yeni Sanity Project ID'nizi girin

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Sanity Studio'yu çalıştırın:
```bash
npm run sanity:dev
```

## Yapılandırma

Yeni marka için aşağıdaki dosyaları güncelleyin:
- `styles/globals.css` - Renk paleti
- `tailwind.config.js` - Tema renkleri
- `public/` klasörü - Logo ve görseller

## Sanity Studio

Studio'ya erişmek için: `http://localhost:3000/studio`

## Deployment

Vercel, Netlify veya herhangi bir Next.js destekleyen platformda deploy edebilirsiniz.

Sanity Studio'yu deploy etmek için:
```bash
npm run sanity:deploy
```