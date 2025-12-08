# 🚀 GitHub Pages'e Yayına Alma - Adım Adım Rehber

Bu rehber, BağKent A.Ş. web sitesini GitHub Pages'e yayınlamak için gerekli tüm adımları içerir.

---

## 📋 Gereksinimler

- GitHub hesabı
- Git yüklü (bilgisayarınızda)
- Terminal/PowerShell erişimi

---

## 🎯 Adım Adım Talimatlar

### 1️⃣ GitHub Repository Oluşturun

1. [GitHub.com](https://github.com) adresine gidin ve giriş yapın
2. Sağ üst köşede **"+"** → **"New repository"** tıklayın
3. Repository bilgilerini girin:
   - **Repository name**: `bagkent-website` (veya istediğiniz isim)
   - **Description**: "BağKent A.Ş. Kurumsal Web Sitesi" (opsiyonel)
   - **Public** veya **Private** seçin (Public önerilir)
   - **Initialize this repository with a README** işaretini kaldırın
4. **"Create repository"** butonuna tıklayın

---

### 2️⃣ Projeyi Bilgisayarınıza Hazırlayın

Windows PowerShell veya Command Prompt'u açın ve şu komutları çalıştırın:

```powershell
# Proje klasörüne gidin
cd "C:\Users\11273907392\Downloads\Web_Sitesi_Tasar_m___ste_i\bagkent_website\nextjs_space"

# Git repository'sini başlatın
git init

# Tüm dosyaları ekleyin
git add .

# İlk commit'i yapın
git commit -m "İlk commit - BağKent A.Ş. Web Sitesi"

# Main branch olarak ayarlayın
git branch -M main

# GitHub repository'nizi remote olarak ekleyin
# NOT: KULLANICI_ADI ve REPO_ADI kısımlarını kendi bilgilerinizle değiştirin
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git

# Kodu GitHub'a gönderin
git push -u origin main
```

**Önemli:** `KULLANICI_ADI` ve `REPO_ADI` kısımlarını GitHub'da oluşturduğunuz repository bilgileriyle değiştirin.

**Örnek:**
```powershell
git remote add origin https://github.com/ahmetcan/bagkent-website.git
```

---

### 3️⃣ GitHub Pages Ayarlarını Yapın

1. GitHub'da repository'nize gidin
2. Üst menüden **"Settings"** sekmesine tıklayın
3. Sol menüden **"Pages"** seçin
4. **"Source"** bölümünde:
   - **"Deploy from a branch"** yerine **"GitHub Actions"** seçin
5. Ayarlar otomatik olarak kaydedilir

---

### 4️⃣ İlk Deploy'u Başlatın

İki yöntem var:

#### Yöntem A: Otomatik (Önerilen)

1. Repository ana sayfasına gidin
2. Üst menüden **"Actions"** sekmesine tıklayın
3. **"Deploy to GitHub Pages"** workflow'unu göreceksiniz
4. Sağ tarafta **"Run workflow"** → **"Run workflow"** tıklayın
5. İlk deploy 5-10 dakika sürebilir

#### Yöntem B: Manuel Tetikleme

Yeni bir commit oluşturun:

```powershell
# Herhangi bir dosyada küçük bir değişiklik yapın veya
# .gitkeep gibi boş bir dosya oluşturun
echo "" > .gitkeep

git add .
git commit -m "Trigger GitHub Pages deployment"
git push
```

---

### 5️⃣ Site URL'ini Kontrol Edin

Deploy tamamlandıktan sonra:

1. Repository **"Settings"** → **"Pages"** bölümüne gidin
2. **"Your site is live at"** altında URL'inizi göreceksiniz:
   - Örnek: `https://KULLANICI_ADI.github.io/REPO_ADI/`
3. URL'ye tıklayarak sitenizi kontrol edin

---

## 🔄 Sonraki Deploy'lar

Artık kodunuzu her güncellediğinizde:

```powershell
git add .
git commit -m "Değişiklik açıklaması"
git push
```

GitHub Actions otomatik olarak yeni bir deploy başlatacak.

---

## ⚙️ Önemli Notlar

### Base Path

GitHub Pages, repository adınızı URL'nin bir parçası yapar:
- Repository: `bagkent-website`
- URL: `https://kullanici.github.io/bagkent-website/`

Bu ayar otomatik olarak yapılmıştır, elle değiştirmenize gerek yok.

### Custom Domain (Özel Domain)

Eğer kendi domain'inizi kullanmak isterseniz:

1. **"Settings"** → **"Pages"** → **"Custom domain"**
2. Domain adınızı girin (örn: `www.bagkent.com.tr`)
3. DNS ayarlarını yapın:
   ```
   A Record: 185.199.108.153
   A Record: 185.199.109.153
   A Record: 185.199.110.153
   A Record: 185.199.111.153
   ```
   Veya
   ```
   CNAME: KULLANICI_ADI.github.io
   ```

---

## 🐛 Sorun Giderme

### Build Başarısız Olursa

1. **"Actions"** sekmesine gidin
2. Başarısız workflow'u tıklayın
3. Log'ları inceleyin
4. Hata mesajını kontrol edin

### Site Açılmıyor / 404 Hatası

1. Repository adının doğru olduğundan emin olun
2. Base path ayarlarını kontrol edin
3. **"Settings"** → **"Pages"** → Source'un **"GitHub Actions"** olduğundan emin olun

### Görseller Görünmüyor

1. Görsellerin `public/` klasöründe olduğundan emin olun
2. External URL'ler (harici linkler) her zaman çalışır
3. Local görseller için path'lerin doğru olduğundan emin olun

---

## ✅ Kontrol Listesi

Deploy işlemi başarılı oldu mu kontrol edin:

- [ ] GitHub repository oluşturuldu
- [ ] Kod GitHub'a push edildi
- [ ] Settings → Pages → Source: "GitHub Actions" seçildi
- [ ] Actions sekmesinde workflow çalışıyor
- [ ] Build başarılı
- [ ] Site URL'i çalışıyor
- [ ] Tüm sayfalar açılıyor
- [ ] Görseller görünüyor
- [ ] Menü linkleri çalışıyor

---

## 📞 Yardım

### GitHub Actions Log'larını Görüntüleme

1. Repository → **"Actions"** sekmesi
2. Workflow run'ını tıklayın
3. **"build"** job'unu tıklayın
4. Her adımı detaylı görebilirsiniz

### Destek Kaynakları

- GitHub Pages Dokümantasyon: https://docs.github.com/pages
- Next.js Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- GitHub Actions: https://docs.github.com/actions

---

## 🎉 Başarılı Deploy Sonrası

Deploy başarılı olduktan sonra:

1. ✅ Site canlı ve erişilebilir
2. ✅ Her push sonrası otomatik güncelleniyor
3. ✅ Ücretsiz hosting
4. ✅ HTTPS sertifikası otomatik

**Tebrikler! Siteniz artık canlıda! 🚀**

---

**Son Güncelleme:** 4 Aralık 2025  
**Versiyon:** 1.0.0


