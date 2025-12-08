@echo off
echo ========================================
echo Hata Düzeltmeleri GitHub'a Gönderiliyor
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/3] Değişiklikler ekleniyor...
call git add .

echo [2/3] Commit yapılıyor...
call git commit -m "Workflow hata düzeltmeleri"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Şimdi yapmanız gerekenler:
echo 1. GitHub'da Actions sekmesine gidin
echo 2. Yeni workflow otomatik başlayacak
echo 3. Başarılı olmasını bekleyin
echo ========================================
pause


