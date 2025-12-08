@echo off
echo ========================================
echo Ana Sayfa Görsel Düzeltmeleri
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/3] Değişiklikler ekleniyor...
call git add .

echo [2/3] Commit yapılıyor...
call git commit -m "Ana sayfa görselleri düzeltildi - hero section ve about section"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Yapılan Düzeltmeler:
echo - Hero section görseli: /hero-bg-2.jpg
echo - Ana sayfa about section: /homepage-about.jpeg
echo - Tüm görseller getImagePath() ile basePath eklendi
echo.
echo GitHub Actions otomatik deploy başlatacak...
echo ========================================
pause


