# ⚠️ Video Dosyası Boyut Uyarısı

Video dosyanız **253 MB** boyutunda. GitHub'ın **100 MB dosya boyutu limiti** var.

## 🚨 Sorun

GitHub'a büyük video dosyası yüklemek sorun yaratabilir:
- Push başarısız olabilir
- Repository boyutu çok büyür
- Yavaş yüklenir

## ✅ Çözüm: Video Sıkıştırma

Video dosyanızı sıkıştırmanızı öneriyoruz:

### Önerilen Ayarlar:
- **Çözünürlük**: 1920x1080 (Full HD) - 4K yerine
- **Bitrate**: 5-10 Mbps (şu an 101 Mbps)
- **Format**: MP4 (H.264 codec)
- **Hedef Boyut**: 10-20 MB (şu an 253 MB)

### Sıkıştırma Araçları:

1. **HandBrake** (Ücretsiz, Kolay):
   - İndir: https://handbrake.fr/
   - Preset: "Fast 1080p30"
   - Bitrate: 8000 kbps

2. **FFmpeg** (Komut satırı):
   ```bash
   ffmpeg -i hero-video.mp4 -vcodec h264 -b:v 8000k -s 1920x1080 hero-video-compressed.mp4
   ```

3. **Online Araçlar**:
   - CloudConvert: https://cloudconvert.com/
   - FreeConvert: https://www.freeconvert.com/

## 📝 Geçici Çözüm

Eğer şimdilik video eklemek istemiyorsanız:

`components/hero-section.tsx` dosyasında:
```typescript
const heroVideo = null; // Video şimdilik kapalı
```

Bu şekilde mevcut görsel slider çalışmaya devam eder.

## 🎯 Sonuç

Video sıkıştırıldıktan sonra:
1. Yeni sıkıştırılmış dosyayı `public/` klasörüne koyun
2. `hero-video.mp4` adını verin (eski dosyanın üzerine yazın)
3. `DEPLOY_HIZLI.bat` çalıştırın

---

**Not:** 253 MB'lık video dosyası GitHub'a yüklenmeye çalışılırsa hata verebilir.


