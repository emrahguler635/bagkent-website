@echo off
echo ========================================
echo Görsel Path Düzeltmeleri - Final
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/3] Değişiklikler ekleniyor...
call git add .

echo [2/3] Commit yapılıyor...
call git commit -m "getImagePath fonksiyonu geliştirildi - basePath algılama iyileştirildi"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Yapılan Düzeltmeler:
echo - getImagePath() fonksiyonu iyileştirildi
echo - window.location'dan basePath otomatik algılanıyor
echo - GitHub Pages için özel kontrol eklendi
echo.
echo GitHub Actions otomatik deploy başlatacak...
echo ========================================
pause

