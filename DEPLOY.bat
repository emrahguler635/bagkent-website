@echo off
chcp 65001 >nul
cls
echo ========================================
echo   GitHub Pages Deploy
echo   BağKent A.Ş. Web Sitesi
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/5] Git durumu kontrol ediliyor...
call git status --short
echo.

echo [2/5] Değişiklikler ekleniyor...
call git add -A
if %errorlevel% neq 0 (
    echo HATA: Git add başarısız oldu!
    pause
    exit /b 1
)
echo ✓ Değişiklikler eklendi
echo.

echo [3/5] Commit mesajı...
set /p commit_msg="Commit mesajı girin (boş bırakırsanız otomatik kullanılır): "
if "%commit_msg%"=="" (
    set commit_msg=Site güncellemesi - %date:~-4,4%-%date:~-7,2%-%date:~-10,2% %time:~0,8%
    echo Otomatik mesaj kullanılıyor: %commit_msg%
)
call git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo UYARI: Commit yapılamadı (muhtemelen değişiklik yok)
    echo Devam ediliyor...
)
echo.

echo [4/5] GitHub'a gönderiliyor...
call git push
if %errorlevel% neq 0 (
    echo HATA: Git push başarısız oldu!
    echo Lütfen internet bağlantınızı ve GitHub erişiminizi kontrol edin.
    pause
    exit /b 1
)
echo ✓ GitHub'a başarıyla gönderildi
echo.

echo [5/5] Deploy durumu...
echo.
echo ========================================
echo ✓ DEPLOY TAMAMLANDI!
echo ========================================
echo.
echo GitHub Actions otomatik olarak deploy edecek.
echo Deploy'un tamamlanması yaklaşık 2-3 dakika sürebilir.
echo.
echo Deploy durumunu kontrol etmek için:
echo https://github.com/emrahguler635/bagkent-website/actions
echo.
echo Site URL'i:
echo https://emrahguler635.github.io/bagkent-website/
echo.
echo ========================================
pause
