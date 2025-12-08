# 🎨 Yeni BağKent Logosu Ekleme Rehberi

Yeni BağKent logosunu siteye eklemek için:

## 📝 Adımlar:

### 1. Logo Dosyasını Hazırlayın
- Logo dosyasını PNG formatında hazırlayın
- Dosya adı: `bagkent-logo.png` (küçük harf)
- Önerilen boyut: 200x200px veya daha büyük (kaliteli görünüm için)

### 2. Dosyayı Kopyalayın

**Seçenek A: Uploads Klasörüne Kopyalayın**
```
1. Logo dosyanızı seçin
2. Uploads klasörüne kopyalayın
3. Dosya adını "bagkent-logo.png" yapın
```

**Seçenek B: Doğrudan Public Klasörüne Kopyalayın**
```
1. Logo dosyanızı seçin
2. Şu klasöre kopyalayın:
   bagkent_website/nextjs_space/public/
3. Dosya adını "bagkent-logo.png" yapın
4. Mevcut bagkent-logo.png dosyasının üzerine yazın
```

### 3. GitHub'a Gönderin

PowerShell'de:
```powershell
cd "C:\Users\11273907392\Downloads\Web_Sitesi_Tasar_m___ste_i\bagkent_website\nextjs_space"

git add public/bagkent-logo.png
git commit -m "Yeni BağKent logosu eklendi"
git push
```

## ✅ Kontrol

- Header'da logo görünüyor mu?
- Footer'da logo görünüyor mu?
- Logo net ve kaliteli görünüyor mu?

---

**Not:** Logo değiştirildikten sonra GitHub Actions otomatik olarak deploy edecektir.


