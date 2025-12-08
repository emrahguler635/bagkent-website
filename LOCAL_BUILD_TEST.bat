@echo off
chcp 65001 >nul
echo ========================================
echo   BağKent Web Sitesi - Local Build Test
echo ========================================
echo.

:: Node modüllerini kontrol et
if not exist "node_modules\" (
    echo [1/4] Node modülleri yükleniyor...
    call yarn install
    if %errorlevel% neq 0 (
        echo [HATA] Yarn install başarısız!
        pause
        exit /b 1
    )
    echo [OK] Modüller yüklendi.
    echo.
) else (
    echo [1/4] Node modülleri mevcut, atlanıyor...
    echo.
)

:: Environment variable ayarla (static export için)
set NEXT_OUTPUT_MODE=export
set GITHUB_REPOSITORY=emrahguler635/bagkent-website

:: Build yap
echo [2/4] Next.js build yapılıyor (static export)...
call yarn build
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   [HATA] Build başarısız oldu!
    echo ========================================
    echo.
    echo Build log'larını kontrol edin.
    echo Hataları düzeltip tekrar deneyin.
    echo.
    pause
    exit /b 1
)
echo [OK] Build başarılı!
echo.

:: Build çıktısını kontrol et
if exist "out\" (
    echo [3/4] Build çıktısı kontrol ediliyor...
    dir /b out\*.html >nul 2>&1
    if %errorlevel% neq 0 (
        echo [UYARI] HTML dosyaları bulunamadı!
    ) else (
        echo [OK] HTML dosyaları oluşturuldu.
    )
    echo.
) else (
    echo [HATA] 'out' klasörü bulunamadı!
    pause
    exit /b 1
)

:: Özet
echo [4/4] Build özeti:
echo   - Build klasörü: out\
echo   - Build modu: Static Export
echo   - Repository: %GITHUB_REPOSITORY%
echo.

echo ========================================
echo   [BAŞARILI] Local build başarılı!
echo ========================================
echo.
echo Build başarılı olduğuna göre, şimdi deploy edebilirsiniz.
echo 'BUILD_VE_DEPLOY.bat' dosyasını çalıştırarak GitHub'a push yapabilirsiniz.
echo.
echo İsterseniz 'out' klasörünü kontrol edebilirsiniz.
echo.
pause

