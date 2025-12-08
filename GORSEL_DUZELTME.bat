@echo off
echo ========================================
echo Görsel Düzeltmeleri GitHub'a Gönderiliyor
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/3] Değişiklikler ekleniyor...
call git add .

echo [2/3] Commit yapılıyor...
call git commit -m "Logo ve görsel path düzeltmeleri"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Değişiklikler:
echo - Header logo düzeltildi (yerel logo kullanılıyor)
echo - Başkan resmi güncellendi
echo.
echo GitHub Actions otomatik deploy başlatacak...
echo ========================================
pause


