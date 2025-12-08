@echo off
echo ========================================
echo Görsel ve Logo Düzeltmeleri GitHub'a Gönderiliyor
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/3] Değişiklikler ekleniyor...
call git add .

echo [2/3] Commit yapılıyor...
call git commit -m "Görsel path düzeltmeleri - public klasörü kontrolü"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Yapılan Düzeltmeler:
echo - Header logo: /bagkent-logo.png
echo - Footer logolar: /bagkent-logo.png, /bagcilar-belediyesi-logo.png
echo - Yönetim sayfası: /baskan.png, /genel-mudur.png
echo - Tüm görseller public klasöründen yükleniyor
echo.
echo GitHub Actions otomatik deploy başlatacak...
echo ========================================
pause


