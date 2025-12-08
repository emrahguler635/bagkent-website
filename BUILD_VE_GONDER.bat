@echo off
chcp 65001 >nul
cls
echo ========================================
echo   BağKent Web Sitesi
echo   Build ve GitHub'a Gönderim
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

:: Adım 1: Node modüllerini kontrol et
echo [1/6] Node modülleri kontrol ediliyor...
if not exist "node_modules\" (
    echo Node modülleri bulunamadı, yükleniyor...
    call yarn install
    if %errorlevel% neq 0 (
        echo [HATA] Yarn install başarısız!
        pause
        exit /b 1
    )
    echo [OK] Modüller yüklendi.
) else (
    echo [OK] Modüller mevcut.
)
echo.

:: Adım 2: Environment variable'ları ayarla
echo [2/6] Environment variable'lar ayarlanıyor...
set NEXT_OUTPUT_MODE=export
set GITHUB_REPOSITORY=emrahguler635/bagkent-website
set NODE_ENV=production
echo [OK] Environment variable'lar ayarlandı.
echo.

:: Adım 3: Local build yap
echo [3/6] Next.js build yapılıyor (static export)...
echo Bu işlem birkaç dakika sürebilir...
echo.
call yarn build
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   [HATA] BUILD BAŞARISIZ!
    echo ========================================
    echo.
    echo Build hatası var. Lütfen hataları kontrol edin:
    echo - TypeScript hataları
    echo - Import/export sorunları
    echo - Eksik dosyalar
    echo.
    echo Hataları düzelttikten sonra tekrar deneyin.
    echo.
    pause
    exit /b 1
)
echo [OK] Build başarılı!
echo.

:: Adım 4: Build çıktısını kontrol et
echo [4/6] Build çıktısı kontrol ediliyor...
if exist "out\index.html" (
    echo [OK] Build çıktısı doğrulandı (out\index.html mevcut).
) else (
    echo [UYARI] index.html bulunamadı, ama devam ediliyor...
)
echo.

:: Adım 5: Git durumunu kontrol et
echo [5/6] Git durumu kontrol ediliyor...
call git status --short
if %errorlevel% neq 0 (
    echo [HATA] Git durumu kontrol edilemedi!
    pause
    exit /b 1
)
echo.

:: Değişiklikleri ekle
echo Değişiklikler staging'e ekleniyor...
call git add -A
if %errorlevel% neq 0 (
    echo [HATA] Dosyalar eklenemedi!
    pause
    exit /b 1
)
echo [OK] Dosyalar eklendi.
echo.

:: Commit mesajı al
set /p commit_msg="Commit mesajı girin (Enter'a basarsanız otomatik kullanılır): "
if "%commit_msg%"=="" (
    for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
    set commit_msg=Build başarılı - Otomatik deploy - %datetime:~0,8% %datetime:~8,6%
    echo Otomatik mesaj: %commit_msg%
)
echo.

:: Commit yap
echo Commit yapılıyor...
call git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo [UYARI] Commit yapılamadı (belki değişiklik yok).
    echo Devam ediliyor...
)
echo.

:: Adım 6: GitHub'a push yap
echo [6/6] GitHub'a push yapılıyor...
call git push
if %errorlevel% neq 0 (
    echo.
    echo [HATA] Push başarısız oldu!
    echo Lütfen:
    echo - Internet bağlantınızı kontrol edin
    echo - GitHub erişiminizi kontrol edin
    echo - Git credentials'larınızı kontrol edin
    echo.
    pause
    exit /b 1
)
echo [OK] Push başarılı!
echo.

echo ========================================
echo   [BAŞARILI] TÜM İŞLEMLER TAMAMLANDI!
echo ========================================
echo.
echo Local build: BAŞARILI
echo GitHub push: BAŞARILI
echo.
echo GitHub Actions şimdi otomatik olarak deploy edecek.
echo Deploy durumunu kontrol etmek için:
echo https://github.com/emrahguler635/bagkent-website/actions
echo.
echo Site URL'i (birkaç dakika sonra):
echo https://emrahguler635.github.io/bagkent-website/
echo.
echo ========================================
pause

