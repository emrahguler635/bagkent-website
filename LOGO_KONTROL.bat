@echo off
echo ========================================
echo Logo Dosyası Kontrol
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo Logo dosyası bilgileri:
dir public\bagkent-logo.png
echo.
echo.
echo Eğer logo görünmüyorsa:
echo 1. Tarayıcı cache'ini temizleyin (Ctrl+F5)
echo 2. GitHub Actions deploy'unun tamamlanmasını bekleyin
echo 3. Site URL'i: https://emrahguler635.github.io/bagkent-website/
echo.
echo Logo path'i kontrol ediliyor...
echo Header: getImagePath("/bagkent-logo.png")
echo Footer: getImagePath("/bagkent-logo.png")
echo.
pause


