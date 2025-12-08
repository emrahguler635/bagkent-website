@echo off
echo ========================================
echo Final Görsel Düzeltmeleri
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/3] Değişiklikler ekleniyor...
call git add .

echo [2/3] Commit yapılıyor...
call git commit -m "getImagePath fonksiyonu final düzeltmesi - basePath algılama iyileştirildi"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Yapılan Düzeltmeler:
echo - getImagePath() fonksiyonu basePath algılamasını iyileştirdi
echo - Ana sayfa görseli: /homepage-about.jpeg
echo - Footer logolar: /bagkent-logo.png, /bagcilar-belediyesi-logo.png
echo - document.baseURI kullanarak basePath algılama eklendi
echo.
echo GitHub Actions otomatik deploy başlatacak...
echo ========================================
pause


