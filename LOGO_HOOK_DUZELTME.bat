@echo off
echo ========================================
echo Logo Hook Düzeltmeleri - React Hook Kullanımı
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/3] Değişiklikler ekleniyor...
call git add .

echo [2/3] Commit yapılıyor...
call git commit -m "Logo path düzeltmesi - React hook (useImagePath) kullanımı"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Yapılan Düzeltmeler:
echo - useImagePath() React hook eklendi
echo - Header logo: React hook kullanıyor
echo - Footer logolar: React hook kullanıyor
echo - Client-side basePath algılama iyileştirildi
echo.
echo GitHub Actions otomatik deploy başlatacak...
echo ========================================
pause

