# 🚀 GitHub Üzerinden Yayına Alma Rehberi

Bu dokümantasyon, BağKent A.Ş. web sitesini GitHub üzerinden yayına alma adımlarını içerir.

## 📋 İçindekiler

1. [Seçenek 1: Vercel ile GitHub Entegrasyonu (Önerilen)](#seçenek-1-vercel-ile-github-entegrasyonu)
2. [Seçenek 2: GitHub Pages](#seçenek-2-github-pages)
3. [Manuel Deploy](#manuel-deploy)

---

## 🎯 Seçenek 1: Vercel ile GitHub Entegrasyonu (ÖNERİLEN)

**Avantajları:**
- ✅ Ücretsiz SSL sertifikası
- ✅ Otomatik HTTPS
- ✅ Global CDN
- ✅ Next.js'in tüm özelliklerini destekler
- ✅ GitHub'a push yaptıkça otomatik deploy
- ✅ Preview deployment'lar (her PR için)

### Adımlar:

1. **GitHub Repository Oluşturun**
   ```bash
   cd bagkent_website/nextjs_space
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
   git push -u origin main
   ```

2. **Vercel'e Giriş Yapın**
   - [vercel.com](https://vercel.com) adresine gidin
   - "Sign Up" butonuna tıklayın
   - GitHub hesabınızla giriş yapın

3. **Projeyi İçe Aktarın**
   - Dashboard'da "Add New..." → "Project" seçin
   - GitHub repository'nizi seçin
   - Vercel otomatik olarak Next.js projesini algılayacak

4. **Deploy Ayarları**
   - **Root Directory**: `bagkent_website/nextjs_space` (eğer repo root'ta değilse)
   - **Build Command**: `yarn build` (otomatik algılanır)
   - **Output Directory**: `.next` (otomatik algılanır)
   - **Install Command**: `yarn install` (otomatik algılanır)

5. **Deploy'a Tıklayın**
   - 2-3 dakika içinde site canlıya alınır!
   - Size özel bir URL verilir: `https://bagkent-xxx.vercel.app`
   - Özel domain ekleyebilirsiniz: "Settings" → "Domains"

6. **Otomatik Deploy**
   - Artık `git push` yaptığınızda otomatik deploy yapılır
   - Her PR için preview URL oluşturulur

---

## 📄 Seçenek 2: GitHub Pages

**Not:** GitHub Pages statik site hosting sağlar. Next.js'in bazı özellikleri (API routes, server-side rendering) kullanılamaz. Bu proje static export ile çalışır.

### Adımlar:

1. **GitHub Repository Oluşturun**
   ```bash
   cd bagkent_website/nextjs_space
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
   git push -u origin main
   ```

2. **GitHub Pages Ayarlarını Yapın**
   - GitHub repository'nize gidin
   - "Settings" sekmesine tıklayın
   - Sol menüden "Pages" seçin
   - **Source**: "GitHub Actions" seçin
   - Ayarları kaydedin

3. **GitHub Actions Workflow Çalışacak**
   - `.github/workflows/deploy.yml` dosyası otomatik çalışacak
   - Her `push` işleminde site yeniden build edilip deploy edilir
   - İlk deploy 5-10 dakika sürebilir

4. **Site URL'i**
   - Site şu adreste yayında olacak:
     - `https://KULLANICI_ADI.github.io/REPO_ADI/`
   - Veya özel domain ekleyebilirsiniz

5. **Özel Domain Ekleme (Opsiyonel)**
   - GitHub Pages Settings'te "Custom domain" alanına domain adınızı girin
   - DNS ayarlarını yapın:
     ```
     A Record: 185.199.108.153
     A Record: 185.199.109.153
     A Record: 185.199.110.153
     A Record: 185.199.111.153
     CNAME: KULLANICI_ADI.github.io
     ```

### GitHub Pages için Notlar:

- ⚠️ **Base Path:** Repository adına göre otomatik ayarlanır
- ⚠️ **Build Time:** İlk build 5-10 dakika sürebilir
- ⚠️ **Static Export:** Sadece static sayfalar çalışır

---

## 🔧 Manuel Deploy

Eğer GitHub Actions kullanmak istemiyorsanız, manuel olarak build edip deploy edebilirsiniz:

### GitHub Pages için Manuel Deploy:

```bash
cd bagkent_website/nextjs_space

# Bağımlılıkları yükle
yarn install

# Static export build
NEXT_OUTPUT_MODE=export yarn build

# GitHub Pages için gh-pages branch'ine push
# gh-pages package'ı yükle
npm install -g gh-pages

# Deploy et
gh-pages -d out
```

---

## 📝 Environment Variables

Eğer environment variable'lara ihtiyacınız varsa:

### Vercel:
- Settings → Environment Variables → Add

### GitHub Pages:
- Repository Settings → Secrets and variables → Actions → New repository secret

---

## 🔍 Deployment Kontrolü

### Vercel:
- Dashboard'da deployment geçmişini görebilirsiniz
- Her commit için log'ları inceleyebilirsiniz

### GitHub Pages:
- Actions sekmesinde workflow durumunu görebilirsiniz
- Build log'larını inceleyebilirsiniz

---

## 🐛 Sorun Giderme

### Build Hataları:

1. **Yarn lockfile hatası:**
   ```bash
   yarn install --frozen-lockfile
   ```

2. **TypeScript hataları:**
   - `next.config.js` içinde `ignoreBuildErrors: true` yapabilirsiniz

3. **Memory hatası:**
   - GitHub Actions'da `NODE_OPTIONS=--max-old-space-size=4096` ekleyin

### Deploy Sonrası 404 Hatası:

- GitHub Pages için: Base path'in doğru ayarlandığından emin olun
- Vercel için: Route'ların doğru tanımlandığından emin olun

---

## 📞 Destek

- **Vercel Dokümantasyon:** [vercel.com/docs](https://vercel.com/docs)
- **GitHub Pages Dokümantasyon:** [docs.github.com/pages](https://docs.github.com/pages)
- **Next.js Dokümantasyon:** [nextjs.org/docs](https://nextjs.org/docs)

---

## ✅ Checklist

- [ ] GitHub repository oluşturuldu
- [ ] Kod GitHub'a push edildi
- [ ] `.gitignore` dosyası kontrol edildi
- [ ] Deploy seçeneği seçildi (Vercel veya GitHub Pages)
- [ ] Deploy ayarları yapıldı
- [ ] İlk deploy başarılı
- [ ] Site canlı ve çalışıyor
- [ ] (Opsiyonel) Özel domain eklendi

---

**Son Güncelleme:** 4 Aralık 2025  
**Versiyon:** 1.0.0

🎉 **Başarılar dileriz!**

