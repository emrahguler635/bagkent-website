@echo off
chcp 65001 >nul
echo ========================================
echo   BağKent Web Sitesi - Build ve Deploy
echo ========================================
echo.

:: Git durumunu kontrol et
echo [1/5] Git durumu kontrol ediliyor...
git status
if %errorlevel% neq 0 (
    echo [HATA] Git durumu kontrol edilemedi!
    pause
    exit /b 1
)
echo.

:: Değişiklikleri ekle
echo [2/5] Değişiklikler staging'e ekleniyor...
git add -A
if %errorlevel% neq 0 (
    echo [HATA] Dosyalar eklenemedi!
    pause
    exit /b 1
)
echo [OK] Dosyalar eklendi.
echo.

:: Commit mesajı al
echo [3/5] Commit mesajı girin (veya Enter'a basın varsayılan için):
set /p commit_msg="Commit mesajı: "
if "%commit_msg%"=="" set commit_msg=Otomatik commit - Build ve deploy
echo.

:: Commit yap
echo [4/5] Commit yapılıyor: %commit_msg%
git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo [UYARI] Commit yapılamadı (belki değişiklik yok).
    echo Devam ediliyor...
)
echo.

:: GitHub'a push yap
echo [5/5] GitHub'a push yapılıyor...
git push
if %errorlevel% neq 0 (
    echo [HATA] Push başarısız oldu!
    pause
    exit /b 1
)
echo.

echo ========================================
echo   [BAŞARILI] Tüm işlemler tamamlandı!
echo ========================================
echo.
echo GitHub Actions üzerinden build başlatılacak.
echo Birkaç dakika içinde sonucu kontrol edin:
echo https://github.com/emrahguler635/bagkent-website/actions
echo.
pause

