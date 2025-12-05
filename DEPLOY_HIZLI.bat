@echo off
echo ========================================
echo HIZLI DEPLOY
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo Değişiklikler GitHub'a gönderiliyor...

call git add -A
call git commit -m "Site güncellemesi - %date% %time%"
call git push

echo.
echo ========================================
echo Tamamlandı!
echo GitHub Actions deploy başlatıyor...
echo ========================================
timeout /t 3
exit

