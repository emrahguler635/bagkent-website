@echo off
echo ========================================
echo Görsel BasePath Düzeltmeleri GitHub'a Gönderiliyor
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/3] Değişiklikler ekleniyor...
call git add .

echo [2/3] Commit yapılıyor...
call git commit -m "GitHub Pages basePath görsel düzeltmeleri - img tag kullanımı"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Yapılan Düzeltmeler:
echo - getImagePath() helper fonksiyonu eklendi
echo - Header logo: img tag + basePath
echo - Footer logolar: img tag + basePath
echo - Yönetim sayfası görselleri: img tag + basePath
echo - NEXT_PUBLIC_BASE_PATH environment variable eklendi
echo.
echo GitHub Actions otomatik deploy başlatacak...
echo ========================================
pause


