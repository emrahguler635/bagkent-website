@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo Deploy başlatılıyor...

call git add -A
call git commit -m "Site güncellemesi - %date:~-4,4%-%date:~-7,2%-%date:~-10,2% %time:~0,8%"
call git push

echo.
echo ✓ Deploy tamamlandı!
echo GitHub Actions deploy başlatıyor...
timeout /t 2 >nul
