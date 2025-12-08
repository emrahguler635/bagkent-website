# ⚡ Hızlı Başlangıç - Kopyala Yapıştır Komutları

GitHub Pages'e deploy etmek için şu komutları sırayla çalıştırın:

## 📝 Adım 1: Git Repository Başlatma

PowerShell veya Command Prompt'u açın ve şu komutları çalıştırın:

```powershell
# Proje klasörüne gidin
cd "C:\Users\11273907392\Downloads\Web_Sitesi_Tasar_m___ste_i\bagkent_website\nextjs_space"

# Git'i başlatın
git init

# Tüm dosyaları ekleyin
git add .

# İlk commit
git commit -m "İlk commit - BağKent A.Ş. Web Sitesi"

# Main branch
git branch -M main
```

## 📝 Adım 2: GitHub'a Bağlama

**ÖNEMLİ:** `KULLANICI_ADI` ve `REPO_ADI` kısımlarını kendi GitHub bilgilerinizle değiştirin!

```powershell
# GitHub repository'nizi remote olarak ekleyin
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git

# Kodu GitHub'a gönderin
git push -u origin main
```

**Örnek:**
Eğer GitHub kullanıcı adınız `ahmetcan` ve repository adınız `bagkent-website` ise:
```powershell
git remote add origin https://github.com/ahmetcan/bagkent-website.git
git push -u origin main
```

## 📝 Adım 3: GitHub'da Ayarlar

1. GitHub'da repository'nize gidin
2. **Settings** → **Pages** → Source: **"GitHub Actions"** seçin
3. **Actions** sekmesinden **"Run workflow"** ile deploy'u başlatın

## 📝 Sonraki Güncellemeler İçin

Kod değişikliklerinden sonra:

```powershell
git add .
git commit -m "Değişiklik açıklaması"
git push
```

---

**Detaylı rehber için:** `GITHUB_PAGES_REHBERI.md` dosyasına bakın.


