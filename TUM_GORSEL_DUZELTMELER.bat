@echo off
echo ========================================
echo Tüm Görsel Düzeltmeleri - Final
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/3] Değişiklikler ekleniyor...
call git add .

echo [2/3] Commit yapılıyor...
call git commit -m "Tüm görseller düzeltildi - hakkımızda sayfası ve logolar"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Yapılan Düzeltmeler:
echo - Hakkımızda sayfası: /hakkimizda-hero.jpeg, /hakkimizda-team.jpeg
echo - Header logo: /bagkent-logo.png
echo - Footer logolar: /bagkent-logo.png, /bagcilar-belediyesi-logo.png
echo - Ana sayfa: /homepage-about.jpeg
echo - Hero section: /hero-bg-2.jpg
echo - Yönetim sayfası: /baskan.png, /genel-mudur.png
echo.
echo Tüm görseller getImagePath() ile basePath eklendi
echo.
echo GitHub Actions otomatik deploy başlatacak...
echo ========================================
pause

