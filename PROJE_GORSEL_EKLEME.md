# 📸 Proje Görselleri Ekleme Rehberi

Bağcılar Belediyesi projeleri için görseller eklemek için:

## 📝 Eklenmesi Gereken Görseller

1. **Kültür ve Sosyal Tesis Projeleri** 
   - Görsel: Kitap şeklinde kütüphane binası, park ve yeşil alan
   - Dosya adı: `kultur-tesis.jpg` veya `kultur-tesis.jpeg`
   - Konum: `public/kultur-tesis.jpg`

2. **Sağlık ve Eğitim Tesisleri**
   - Görsel: Bağcılar Hastanesi (aerial view)
   - Dosya adı: `saglik-tesis.jpg` veya `saglik-tesis.jpeg`
   - Konum: `public/saglik-tesis.jpg`

3. **Enerji Verimliliği ve Akıllı Şehir**
   - Görsel: Güneş panelleri olan bina (çatı görünümü)
   - Dosya adı: `enerji-verimliligi.jpg` veya `enerji-verimliligi.jpeg`
   - Konum: `public/enerji-verimliligi.jpg`

## 🚀 Adımlar

### 1. Görselleri Hazırlayın
- Görselleri JPG veya JPEG formatında hazırlayın
- Dosya boyutu: 1-2 MB (optimize edilmiş)
- Çözünürlük: 1920x1080 veya daha yüksek

### 2. Public Klasörüne Kopyalayın
Görselleri şu klasöre kopyalayın:
```
bagkent_website/nextjs_space/public/
```

Dosya adları:
- `kultur-tesis.jpg`
- `saglik-tesis.jpg`
- `enerji-verimliligi.jpg`

### 3. Kod Güncellenecek
Görseller eklendikten sonra kod otomatik olarak bu görselleri kullanacak şekilde ayarlanacak.

### 4. GitHub'a Gönderin
```powershell
cd "C:\Users\11273907392\Downloads\Web_Sitesi_Tasar_m___ste_i\bagkent_website\nextjs_space"

git add public/kultur-tesis.jpg public/saglik-tesis.jpg public/enerji-verimliligi.jpg
git commit -m "Proje görselleri eklendi"
git push
```

## ⚠️ Not

Eğer görselleri başka isimlerle eklemek isterseniz, kodda dosya adlarını güncellememiz gerekecek.

