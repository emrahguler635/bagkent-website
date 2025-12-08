@echo off
echo ========================================
echo Logo Düzeltmeleri - Final
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/3] Değişiklikler ekleniyor...
call git add .

echo [2/3] Commit yapılıyor...
call git commit -m "Logo path düzeltmesi - getImagePath regex iyileştirildi"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Yapılan Düzeltmeler:
echo - getImagePath() fonksiyonu basitleştirildi
echo - Regex ile repository adı çıkarılıyor
echo - Ana sayfada da garantili çalışıyor
echo - Header logo: /bagkent-logo.png
echo - Footer logolar: /bagkent-logo.png, /bagcilar-belediyesi-logo.png
echo.
echo GitHub Actions otomatik deploy başlatacak...
echo ========================================
pause


