@echo off
echo ========================================
echo Hakkımızda Sayfası Hızlandırma
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/3] Değişiklikler ekleniyor...
call git add .

echo [2/3] Commit yapılıyor...
call git commit -m "Hakkımızda sayfası görselleri hızlandırma - eager loading ve preload eklendi"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Yapılan İyileştirmeler:
echo - loading="eager" eklendi (lazy loading kapatıldı)
echo - fetchPriority="high" eklendi (öncelikli yükleme)
echo - whileInView yerine animate kullanıldı (hemen animasyon)
echo - useEffect ile preload link eklendi (önceden yükleme)
echo.
echo Görseller artık sayfa yüklenirken hemen yüklenecek!
echo.
echo GitHub Actions otomatik deploy başlatacak...
echo ========================================
pause

