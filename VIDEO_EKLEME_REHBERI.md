# 🎥 Hero Section Video Ekleme Rehberi

Hero section'a video arka plan eklenmiştir. Video eklemek için aşağıdaki adımları izleyin:

## 📝 Adımlar

### 1. Video Dosyasını Hazırlayın
- Video formatı: **MP4** (önerilen)
- Video çözünürlüğü: 1920x1080 veya daha yüksek (Full HD veya 4K)
- Video süresi: Kısa ve öz (10-30 saniye)
- Dosya boyutu: Mümkün olduğunca küçük (10-20 MB ideal)

### 2. Video Dosyasını Kopyalayın
Video dosyanızı şu klasöre kopyalayın:
```
bagkent_website/nextjs_space/public/
```
Dosya adı: `hero-video.mp4` (veya istediğiniz isim)

### 3. Kodda Video Dosya Adını Güncelleyin
`bagkent_website/nextjs_space/components/hero-section.tsx` dosyasını açın ve şu satırı bulun:

```typescript
const heroVideo = '/hero-video.mp4'; // Video dosyası varsa buraya dosya adını yazın
```

Video dosyanızın adını buraya yazın:
```typescript
const heroVideo = '/video-adi.mp4';
```

### 4. Video Yoksa Görseller Kullanılır
Eğer video dosyası yoksa veya `null` yaparsanız, mevcut görsel slider otomatik olarak çalışır:

```typescript
const heroVideo = null; // Video kullanılmayacak
```

veya

```typescript
const heroVideo = ''; // Video kullanılmayacak
```

## ✅ Video Özellikleri

- ✅ **Otomatik oynatma** (Auto-play)
- ✅ **Sonsuz döngü** (Loop)
- ✅ **Sessiz** (Muted - tarayıcılar sesli otomatik oynatmayı engeller)
- ✅ **Mobil uyumlu** (playsInline)
- ✅ **Poster görsel** (Video yüklenirken gösterilir)
- ✅ **Fallback** (Video yüklenemezse görsel gösterilir)

## 🎨 Video İpuçları

1. **Video Konusu**: Şehir manzarası, inşaat alanı, modern binalar
2. **Hareket**: Yavaş, yumuşak hareket (drone çekimi ideal)
3. **Işık**: İyi aydınlatılmış, net görüntü
4. **Renk**: Mavi tonları (marka renklerinize uygun)

## 📦 Örnek Video Kaynakları

- Pexels Videos: https://www.pexels.com/videos/
- Pixabay Videos: https://pixabay.com/videos/
- Unsplash Videos: https://unsplash.com/videos

## 🔧 Sorun Giderme

### Video görünmüyor?
1. Video dosyasının `public/` klasöründe olduğundan emin olun
2. Dosya adının kodda doğru yazıldığını kontrol edin
3. Tarayıcı konsolunda (F12) hata var mı kontrol edin
4. Video formatının MP4 olduğundan emin olun

### Video çok büyük?
Video sıkıştırma araçları kullanın:
- HandBrake: https://handbrake.fr/
- FFmpeg: https://ffmpeg.org/

## 🚀 Deploy

Video ekledikten sonra:
1. `DEPLOY_HIZLI.bat` dosyasını çalıştırın
2. GitHub Actions deploy edecek
3. Video 2-3 dakika içinde canlı olacak

---

**Not:** Video dosyası büyükse, GitHub'a yükleme süresi artabilir (100 MB limit var).

