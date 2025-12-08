@echo off
chcp 65001 >nul
echo ========================================
echo   BağKent - Hizli Deploy (Build YOK)
echo ========================================
echo.

cd /d "%~dp0"
echo Mevcut dizin: %CD%
echo.

echo [1/3] Git durumu...
git status
if %errorlevel% neq 0 (
    echo [HATA] Git çalışmıyor!
    pause
    exit /b 1
)
echo.

echo [2/3] Değişiklikler ekleniyor ve commit yapılıyor...
git add -A
set /p commit_msg="Commit mesajı (Enter = otomatik): "
if "%commit_msg%"=="" set commit_msg=Hizli guncelleme
git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo [UYARI] Commit yapılamadı, devam ediliyor...
)
echo.

echo [3/3] GitHub'a push yapılıyor...
git push
if %errorlevel% neq 0 (
    echo [HATA] Push başarısız!
    pause
    exit /b 1
)
echo.

echo [OK] Push başarılı! GitHub Actions build yapacak.
echo.
pause

